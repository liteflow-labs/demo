import { NextIncomingMessage } from 'next/dist/server/request-meta'
import { createContext } from 'react'
import invariant from 'ts-invariant'
import {
  Chain,
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  mainnet as ethereumMainnet,
  sepolia as ethereumSepolia,
  neonDevnet,
  neonMainnet,
  polygon,
} from 'wagmi/chains'

export type Environment = {
  /**
   * Base configuration
   */

  // API Key for the Liteflow API, you can get one at https://dashboard.liteflow.com/developer
  LITEFLOW_API_KEY: string

  // Email address for end users to send reports to
  REPORT_EMAIL: string

  // Number of items per page
  PAGINATION_LIMIT: number

  // Default value for the number of seconds an offer is valid (users can override this) (recommendation: 28 days)
  OFFER_VALIDITY_IN_SECONDS: number

  // Base URL of the website
  BASE_URL: string

  // Maximum percentage of royalties
  MAX_ROYALTIES: number

  // (Optional) Bugsnag API Key, you can get one at https://www.bugsnag.com/
  BUGSNAG_API_KEY?: string

  /**
   * Theme configuration
   */

  // URL of the logo to place in the header
  LOGO: string

  // URL of the favicon
  FAVICON: string

  // Brand color to use for the theme
  BRAND_COLOR: string

  /**
   * Wallet/chain configuration
   */

  // List of supported chains. Liteflow is supporting the following: ethereumMainnet, ethereumSepolia, bscTestnet, bsc, polygon, polygonAmoy, neonMainnet, neonDevnet, arbitrum, arbitrumSepolia, lightlinkPhoenix, lightlinkPegasus, base, baseSepolia
  CHAINS: Chain[]

  // Wallet connect project ID, you can get one at https://cloud.walletconnect.com/
  WALLET_CONNECT_PROJECT_ID: string

  // (Optional) Magic API Key, you can get one at https://magic.link/
  MAGIC_API_KEY?: string

  // (Optional) Alchemy API key to activate fallback if public providers are not responsive
  ALCHEMY_API_KEY?: string

  /**
   * Home page configuration
   */

  // List of banners to be displayed on the homepage
  HOME_BANNERS: {
    // URL of the image to display
    image: string

    // (Optional) Title of the banner
    title?: string

    // (Optional) Content of the banner
    content?: string

    // Text color of the banner. Default is white
    textColor: string

    // (Optional) Button to display on the banner
    button?: {
      // Text of the button
      text: string

      // URL to redirect to when the button is clicked
      href: string

      // (Optional) Whether the URL is external or not (default: false)
      isExternal?: boolean
    }
  }[]

  // Ordered list of tokens to be highlighted on the homepage with the following format: [chainId]-[contractAddress]-[tokenId]
  FEATURED_TOKEN: string[]

  // Ordered list of collections to be featured on the homepage with the following format: [chainId]-[contractAddress]
  HOME_COLLECTIONS: string[]

  // Ordered list of users to be featured on the homepage with the following format: [address]
  HOME_USERS: string[]

  // List of tokens randomized to be featured on the homepage with the following format: [chainId]-[contractAddress]-[tokenId]
  // If empty, the tokens will be the last created ones
  HOME_TOKENS: string[]

  /**
   * SEO Configuration
   */

  // Name of the company to place in the SEO title and in the footer
  META_COMPANY_NAME: string

  // Title of the marketplace to place in the SEO title
  META_TITLE: string

  // Description of the marketplace to place in the SEO description
  META_DESCRIPTION: string

  // Keywords of the marketplace to place in the SEO keywords
  META_KEYWORDS: string

  /**
   * NFT Mint Behavior
   */
  // Enable/disable the lazy minting feature. If enabled, the NFTs will be minted on the first sale
  LAZYMINT: boolean
}

export const EnvironmentContext = createContext<Environment>({} as Environment)

const getEnvironment = async (
  _req: NextIncomingMessage | undefined,
): Promise<Environment> => {
  invariant(process.env.NEXT_PUBLIC_BASE_URL, 'Base url is not defined')
  invariant(process.env.NEXT_PUBLIC_LITEFLOW_API_KEY, 'API key is not defined')
  invariant(
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    'Wallet connect project id is not defined',
  )
  // const host = req
  //   ? `${req.headers['x-forwarded-proto'] || 'https'}://${
  //       req.headers['x-forwarded-host'] || req.headers['host']
  //     }`
  //   : window.location.origin
  // const response = await fetch(`${host}/api/detect`, {
  //   headers: { 'Content-type': 'application/json' },
  // })
  // const {
  //   metadata,
  //   id,
  //   domain,
  //   maxRoyaltiesPerTenThousand,
  //   offerValiditySeconds,
  //   hasLazyMint,
  // } = await response.json()
  const {
    metadata,
    id,
    domain,
    maxRoyaltiesPerTenThousand,
    offerValiditySeconds,
    hasLazyMint,
  } = {
    metadata: {
      LOGO: 'https://marketplace-demo.liteflow.com/logo.svg',
      FAVICON: 'https://marketplace-demo.liteflow.com/favicon.ico',
      POINTFI: {
        FAVICON:
          'https://liteflow.mypinata.cloud/ipfs/QmYue8FWCjgyPguo3y8AH76yFjLZ98CQHA17PLRaWEzN8f',
        META_TITLE: 'PointFi Demo',
        META_KEYWORDS: 'pointfi, blockchain, quest',
        META_DESCRIPTION: 'PointFi Demo by Liteflow',
        LIGHTLINK_API_KEY: 'iHMBRLdxlk8N5eiVRo4NG3QGaRozn0f954QGgkY7',
        META_COMPANY_NAME: 'Liteflow',
        LIGHTLINK_PROJECT_BADGE: '65d2b20decbb1cc9da111148',
        LIGHTLINK_PROJECT_POINT: '668b5851427f49613eec1100',
      },
      HOME_USERS: [
        '0x4b595014f7b45789c3f4e79324ae6d8090a6c8b5',
        '0x4f379eb8bf6c83fa3aabf27a31be94d825e5de06',
        '0x8533f3ffe30c9cf449cc112850e7ec815070509d',
        '0x6da89d36ba7cd6c371629b0724c2e17abf4049ee',
        '0x09ea03548b97aa045043ff55f5bd9505f2f135eb',
      ],
      META_TITLE: 'Acme NFT Marketplace',
      BRAND_COLOR: '#245bff',
      HOME_TOKENS: null,
      HOME_BANNERS: [
        {
          image:
            'https://liteflow.mypinata.cloud/ipfs/QmXGtuDqUSSE29sqVuj2umKhMpysnmGUnWK9Zhe5NpZdWn',
          title: 'Explore Quests',
          button: {
            href: 'https://quests-demo.liteflow.com/',
            text: 'Explore Quests',
            isExternal: true,
          },
          content: "Check out Liteflow's Questing Demo Platform",
          textColor: '#000000',
        },
        {
          image:
            'https://liteflow.mypinata.cloud/ipfs/QmXVDhTYqW4jNuYvngAT1Pp7bNYkiaEzUjguRyrZnNd7YF',
          title: 'Explore NFT Drop',
          button: {
            href: 'https://drop-demo.liteflow.com/',
            text: 'Explore NFT Drop',
            isExternal: true,
          },
          content: "Check out Liteflow's NFT Drop Demo Platform",
          textColor: '',
        },
      ],
      REPORT_EMAIL: 'contact@liteflow.com',
      META_KEYWORDS: 'NFT, marketplace, platform, blockchain, liteflow',
      FEATURED_TOKEN: [
        '8453-0xe5bae830618ff33d4e0d38254708176417326dd4-3316',
        '56-0xd5571e88725270e1a000b39e37070d349318f1c7-79',
        '8453-0x6502820f3f035c7a9fc0ebd3d74a0383306c5137-6573',
        '1-0x59325733eb952a92e069c87f0a6168b29e80627f-8802',
      ],
      HOME_COLLECTIONS: [
        '137-0x9bc1c6b366db1518bd9ccc19a44605479c7c7762',
        '8453-0xe5bae830618ff33d4e0d38254708176417326dd4',
        '56-0xd5571e88725270e1a000b39e37070d349318f1c7',
        '8453-0x6502820f3f035c7a9fc0ebd3d74a0383306c5137',
        '137-0xe3f1464cb51d699b4d357fdb0573cfcfa33e112e',
        '1-0xe1dc516b1486aba548eecd2947a11273518434a4',
        '1890-0x8b53a8565b86a9df708b800b85024166a1960221',
        '1890-0xe9f3682230a7a645812de614bc1f4eb23c3061e5',
        '1-0x59325733eb952a92e069c87f0a6168b29e80627f',
        '137-0x31259803ec8ec2b45a5ec73b172c2dad8ff076bf',
      ],
      META_DESCRIPTION: 'Acme NFT Marketplace',
      META_COMPANY_NAME: 'Acme, Inc.',
    },
    id: 'efffaf7c-42e8-4ed3-a097-7353bcea83a8',
    domain: 'marketplace-demo.liteflow.com',
    maxRoyaltiesPerTenThousand: 3000,
    offerValiditySeconds: 2419200,
    hasLazyMint: true,
  }
  return {
    // Base configuration
    LITEFLOW_API_KEY: id || process.env.NEXT_PUBLIC_LITEFLOW_API_KEY,
    REPORT_EMAIL: metadata?.REPORT_EMAIL || '',
    PAGINATION_LIMIT: 12,
    OFFER_VALIDITY_IN_SECONDS: offerValiditySeconds,
    BASE_URL: domain || process.env.NEXT_PUBLIC_BASE_URL,
    MAX_ROYALTIES: maxRoyaltiesPerTenThousand / 100,
    BUGSNAG_API_KEY: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
    // Theme configuration
    LOGO: metadata?.LOGO || '/logo.svg',
    FAVICON: metadata?.FAVICON || '/favicon.svg',
    BRAND_COLOR: metadata?.BRAND_COLOR || '#245BFF',
    // Wallet/chain configuration
    CHAINS: [
      ethereumMainnet,
      ethereumSepolia,
      {
        ...bsc,
        rpcUrls: {
          ...bsc.rpcUrls,
          default: { http: ['https://bsc-dataseed.binance.org'] },
          public: { http: ['https://bsc-dataseed.binance.org'] },
          alchemy: {
            http: ['https://bnb-mainnet.g.alchemy.com/v2'],
            webSocket: ['wss://bnb-mainnet.g.alchemy.com/v2'],
          },
        },
      },
      {
        ...bscTestnet,
        rpcUrls: {
          ...bscTestnet.rpcUrls,
          alchemy: {
            http: ['https://bnb-testnet.g.alchemy.com/v2'],
            webSocket: ['wss://bnb-testnet.g.alchemy.com/v2'],
          },
        },
      },
      polygon,
      {
        id: 80_002,
        name: 'Polygon Amoy',
        network: 'polygon-amoy',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
        rpcUrls: {
          alchemy: {
            http: ['https://polygon-amoy.g.alchemy.com/v2'],
            webSocket: ['wss://polygon-amoy.g.alchemy.com/v2'],
          },
          default: {
            http: ['https://rpc-amoy.polygon.technology'],
          },
          public: {
            http: ['https://rpc-amoy.polygon.technology'],
          },
        },
        blockExplorers: {
          etherscan: {
            name: 'Etherscan',
            url: 'https://amoy.polygonscan.com',
          },
          default: {
            name: 'Etherscan',
            url: 'https://amoy.polygonscan.com',
          },
        },
        contracts: {
          multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 3127388,
          },
        },
        testnet: true,
      },
      {
        ...neonMainnet,
        blockExplorers: {
          default: {
            name: 'Blockscout',
            url: 'https://neon.blockscout.com',
          },
        },
      },
      {
        ...neonDevnet,
        blockExplorers: {
          default: {
            name: 'Blockscout',
            url: 'https://neon-devnet.blockscout.com',
          },
        },
      },
      arbitrum,
      arbitrumSepolia,
      {
        name: 'Lightlink Phoenix Mainnet',
        network: 'lightlink-phoenix',
        id: 1890,
        nativeCurrency: {
          decimals: 18,
          name: 'Ether',
          symbol: 'ETH',
        },
        rpcUrls: {
          default: {
            http: ['https://replicator.phoenix.lightlink.io/rpc/v1'],
          },
          public: {
            http: ['https://replicator.phoenix.lightlink.io/rpc/v1'],
          },
        },
        blockExplorers: {
          default: {
            name: 'LightLink Phoenix Explorer',
            url: 'https://phoenix.lightlink.io',
          },
        },
      },
      {
        name: 'Lightlink Pegasus Testnet',
        network: 'lightlink-pegasus',
        testnet: true,
        id: 1891,
        nativeCurrency: {
          decimals: 18,
          name: 'Ether',
          symbol: 'ETH',
        },
        rpcUrls: {
          default: {
            http: ['https://replicator.pegasus.lightlink.io/rpc/v1'],
          },
          public: {
            http: ['https://replicator.pegasus.lightlink.io/rpc/v1'],
          },
        },
        blockExplorers: {
          default: {
            name: 'LightLink Pegasus Explorer',
            url: 'https://pegasus.lightlink.io',
          },
        },
      },
      base,
      baseSepolia,
    ],
    WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    MAGIC_API_KEY: process.env.NEXT_PUBLIC_MAGIC_API_KEY,
    ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    // Home page configuration
    HOME_BANNERS: metadata?.HOME_BANNERS || [],
    FEATURED_TOKEN: metadata?.FEATURED_TOKEN || [],
    HOME_COLLECTIONS: metadata?.HOME_COLLECTIONS || [],
    HOME_USERS: metadata?.HOME_USERS || [],
    HOME_TOKENS: metadata?.HOME_TOKENS || [],
    // SEO Configuration
    META_COMPANY_NAME: metadata?.META_COMPANY_NAME || 'Liteflow',
    META_TITLE: metadata?.META_TITLE || 'Acme NFT Marketplace',
    META_DESCRIPTION: metadata?.META_DESCRIPTION || '',
    META_KEYWORDS: metadata?.META_KEYWORDS || '',
    // NFT Mint Behavior
    LAZYMINT: hasLazyMint || false,
  }
}

export default getEnvironment
