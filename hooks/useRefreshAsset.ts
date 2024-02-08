import { useCallback } from 'react'
import invariant from 'ts-invariant'
import {
  useGetAssetDataForRefreshLazyQuery,
  useRefreshAssetMutation,
} from '../graphql'

export default function useRefreshAsset(
  max = 12,
  interval = 5000,
): (asset: {
  chainId: number
  collectionAddress: string
  tokenId: string
}) => Promise<void> {
  const [refreshAssetMutation] = useRefreshAssetMutation()

  const [_getAssetData] = useGetAssetDataForRefreshLazyQuery()
  const getAssetData = useCallback(
    async (asset: {
      chainId: number
      collectionAddress: string
      tokenId: string
    }) => {
      const { data } = await _getAssetData({
        variables: {
          chainId: asset.chainId,
          collectionAddress: asset.collectionAddress,
          tokenId: asset.tokenId,
        },
        fetchPolicy: 'no-cache', // Disable the Apollo cache so that the polling gets the latest value
        // fetchPolicy: 'network-only', // with this fetch policy Apollo automatically executes a another query to refresh the Asset loaded by the main page
      })
      invariant(data?.asset, 'Asset not found')
      return data.asset
    },
    [_getAssetData],
  )

  const pollAsset = useCallback(
    async (
      asset: {
        chainId: number
        collectionAddress: string
        tokenId: string
      },
      initialUpdatedAt: Date,
    ) => {
      // poll the api until the asset is updated
      let i = 0
      while (i < max) {
        // fetch
        const { updatedAt } = await getAssetData(asset)

        // check if updatedAt is more recent, if yes, stop polling
        if (
          new Date(updatedAt).getTime() > new Date(initialUpdatedAt).getTime()
        )
          break

        // wait
        await new Promise((resolve) => setTimeout(resolve, interval))
        i++
      }
    },
    [getAssetData, interval, max],
  )

  const refreshAsset = useCallback(
    async (asset: {
      chainId: number
      collectionAddress: string
      tokenId: string
    }) => {
      // fetch the last updated date of this asset
      const {
        updatedAt: initialUpdatedAt,
        chainId,
        collectionAddress,
        tokenId,
      } = await getAssetData(asset)

      // ask backend to refresh asset
      await refreshAssetMutation({
        variables: {
          chainId,
          collectionAddress,
          tokenId,
        },
      })

      // poll until asset is refreshed or poll timeout
      await pollAsset(asset, initialUpdatedAt)
    },
    [getAssetData, pollAsset, refreshAssetMutation],
  )

  return refreshAsset
}
