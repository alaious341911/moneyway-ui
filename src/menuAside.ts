import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
  mdiMenu,
  mdiPhone,
  mdiAndroid,
  mdiCellphone,
  mdiCashMinus,
  mdiBankTransfer,
  mdiWallet,
  mdiBloodBag,
  mdiBlockHelper,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: 'dashboard',
    icon: mdiMenu,
    label: 'Dashboard',
  },
  {
    href: 'buy-airtime',
    icon: mdiCellphone,
    label: 'Buy Airtime',
  },
  {
    href: 'pay-bill',
    icon: mdiCashMinus,
    label: 'Pay Bill',
  },
  {
    href: 'transfer',
    icon: mdiBankTransfer,
    label: 'Transfer',
  },
  {
    href: 'fund-wallet',
    icon: mdiWallet,
    label: 'Fund Wallet',
  },

  // {
  //   href: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   href: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   href: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   href: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   href: '/',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  // {
  //   href: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   href: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
   // ],
   //},
]

export default menuAside
