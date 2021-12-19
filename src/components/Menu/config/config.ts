import { MenuItemsType, DropdownMenuItemType, menuStatus } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
        parentHref: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
        parentHref: '/swap',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    items: [
      {
        label: t('Farms'),
        href: '/farms',
        parentHref: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
        parentHref: '/farms',
      },
    ],
  },
  {
    label: t('Win'),
    href: '/prediction',
    icon: 'Trophy',
    items: [
      {
        label: t('Trading Competition'),
        href: '/competition',
        status: menuStatus.SOON,
        parentHref: '/prediction',
      },
      {
        label: t('Prediction (BETA)'),
        href: '/prediction',
        parentHref: '/prediction',
      },
      {
        label: t('Lottery'),
        href: '/lottery',
        parentHref: '/prediction',
      },
    ],
  },
  {
    label: t('NFT'),
    href: `${nftsBaseUrl}`,
    icon: 'Nft',
    items: [
      {
        label: t('Overview'),
        href: `${nftsBaseUrl}`,
        parentHref: `${nftsBaseUrl}`,
      },
      {
        label: t('Collections'),
        href: `${nftsBaseUrl}/collections`,
        parentHref: `${nftsBaseUrl}`,
      },
    ],
  },
  {
    label: 'More',
    href: '/info',
    icon: 'More',
    hideSubNav: true,
    items: [
      {
        label: t('Info'),
        href: '/info',
        parentHref: '/info',
      },
      {
        label: t('IFO'),
        href: '/ifo',
        parentHref: '/info',
      },
      {
        label: t('Voting'),
        href: '/voting',
        parentHref: '/info',
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Leaderboard'),
        href: '/teams',
        parentHref: '/info',
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/pancakeswap',
        type: DropdownMenuItemType.EXTERNAL_LINK,
        parentHref: '/info',
      },
      {
        label: t('Docs'),
        href: 'https://docs.pancakeswap.finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
        parentHref: '/info',
      },
    ],
  },
]

export default config
