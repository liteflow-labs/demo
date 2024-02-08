import { Divider, Flex, HStack, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { FC, useMemo } from 'react'
import useAccount from '../../../hooks/useAccount'
import { isSameAddress } from '../../../utils'
import AddToCartButton from '../../Button/AddToCart'
import Link from '../../Link/Link'
import Price from '../../Price/Price'

type Props = {
  sale: {
    id: string
    unitPrice: string
    currency: {
      decimals: number
      symbol: string
    }
    maker: {
      address: string
    }
  }
  numberOfSales: number
  hasMultiCurrency: boolean
  showButton?: boolean
}

const SaleDirectCardFooter: FC<Props> = ({
  sale,
  numberOfSales,
  hasMultiCurrency,
  showButton = true,
}) => {
  const { t } = useTranslation('components')
  const { address } = useAccount()

  // TODO: we should have a modal if there is more than one sale like we have on detail page
  // issue is tracked on https://github.com/liteflow-labs/starter-kit/issues/529 for this modal improvement
  const isOwner = useMemo(
    () => (address ? isSameAddress(sale.maker.address, address) : false),
    [address, sale.maker],
  )

  const chip = useMemo(() => {
    switch (numberOfSales) {
      case 0:
        return
      case 1:
        return (
          <>
            <Text as="span" variant="subtitle2" color="gray.500" mr={1}>
              {t('sales.direct.card-footer.price')}
            </Text>
            <Text as="span" variant="subtitle2" color="brand.black">
              <Price
                amount={sale.unitPrice}
                currency={sale.currency}
                averageFrom={100000}
              />
            </Text>
          </>
        )
      default:
        return hasMultiCurrency ? (
          <Text as="span" variant="subtitle2" color="gray.500">
            {t('sales.direct.card-footer.offers', {
              count: numberOfSales,
            })}
          </Text>
        ) : (
          <>
            <Text as="span" variant="subtitle2" color="gray.500" mr={1}>
              {t('sales.direct.card-footer.from')}
            </Text>
            <Text as="span" variant="subtitle2" color="brand.black">
              <Price
                amount={sale.unitPrice}
                currency={sale.currency}
                averageFrom={100000}
              />
            </Text>
          </>
        )
    }
  }, [hasMultiCurrency, numberOfSales, sale.currency, sale.unitPrice, t])

  return (
    <HStack gap={0}>
      <Flex
        as={Link}
        href={`/checkout/${sale.id}`}
        py={2}
        px={4}
        bgColor={showButton ? 'brand.500' : 'gray.100'}
        width="full"
      >
        <Text
          variant="subtitle2"
          color={showButton ? 'white' : 'gray.500'}
          noOfLines={1}
          wordBreak="break-all"
        >
          {showButton
            ? isOwner // TODO: we can be owner and still purchase for erc1155
              ? t('sales.direct.card-footer.view')
              : t('sales.direct.card-footer.purchase')
            : chip}
        </Text>
      </Flex>
      {showButton && address && (
        <>
          <Divider orientation="vertical" />
          <AddToCartButton
            offerId={sale.id}
            isDisabled={isOwner} // TODO: we can be owner and still purchase for erc1155
            borderRadius="none"
            h={9}
          />
        </>
      )}
    </HStack>
  )
}

export default SaleDirectCardFooter
