import { Flex, Heading, Icon } from '@chakra-ui/react'
import { HiOutlineClock } from '@react-icons/all-files/hi/HiOutlineClock'
import useTranslation from 'next-translate/useTranslation'
import { FC, useMemo } from 'react'
import Countdown from '../../../Countdown/Countdown'
import Image from '../../../Image/Image'
import Price from '../../../Price/Price'

type Props = {
  auction: {
    endAt: Date
    currency: {
      image: string
      symbol: string
    }
  }
  bestAuctionBid:
    | {
        unitPrice: string
        currency: {
          decimals: number
          symbol: string
          image: string
        }
      }
    | undefined
}

const SaleAuctionInProgress: FC<Props> = ({ auction, bestAuctionBid }) => {
  const { t } = useTranslation('components')
  const bidTitle = useMemo(
    () =>
      bestAuctionBid
        ? t('sales.auction.in-progress.highest-bid')
        : t('sales.auction.in-progress.open'),
    [bestAuctionBid, t],
  )

  const currency = useMemo(
    () => (bestAuctionBid ? bestAuctionBid.currency : auction.currency),
    [bestAuctionBid, auction],
  )

  const bidChildren = useMemo(
    () =>
      bestAuctionBid ? (
        <Price
          amount={bestAuctionBid.unitPrice}
          currency={bestAuctionBid.currency}
        />
      ) : (
        t('sales.auction.in-progress.offer')
      ),
    [bestAuctionBid, t],
  )

  return (
    <Flex wrap="wrap" gap={8}>
      <Flex direction="column" gap={3}>
        <Heading as="h5" variant="heading3" color="gray.500">
          {bidTitle}
        </Heading>
        <Flex gap={2}>
          <Flex
            position="relative"
            as="span"
            h={8}
            w={8}
            align="center"
            justify="center"
            rounded="full"
            borderWidth="1px"
            borderColor="gray.200"
          >
            {currency.image && (
              <Image
                src={currency.image}
                alt={currency.symbol}
                fill
                sizes="30px"
                objectFit="cover"
              />
            )}
          </Flex>
          <Heading as="h2" variant="subtitle" color="brand.black">
            {bidChildren}
          </Heading>
        </Flex>
      </Flex>

      <Flex direction="column" gap={3}>
        <Heading as="h5" variant="heading3" color="gray.500">
          {t('sales.auction.in-progress.ending')}
        </Heading>
        <Flex align="center" gap={3}>
          <Flex
            as="span"
            bg="brand.500"
            h={8}
            w={8}
            align="center"
            justify="center"
            rounded="full"
          >
            <Icon as={HiOutlineClock} h={5} w={5} color="white" />
          </Flex>
          <Heading as="h2" variant="subtitle" color="brand.black">
            <Countdown date={auction.endAt} />
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SaleAuctionInProgress
