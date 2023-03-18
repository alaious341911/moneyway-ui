export type UserPayloadObject = {
  name: string
  email: string
  avatar: string
}

export type TransactionPayloadObject = {
  pageNumber?: number
  startDate?: string
  endDate?: string
}

export type InternetPayloadObject = {
  serviceId: { [key: string]: any }[];
  // serviceIdV: string;
};

export type TvPayloadObject = {
  serviceId: { [key: string]: any }[];
  // serviceIdV: string;
};

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey =
  | 'white'
  | 'dark'
  | 'light'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'
  | 'lightBlue'

export type BgKey = 'purplePink' | 'pinkRed' | 'lightBlue'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Beneficiary = {
  id: number
  transactionType: string
  name: string
  company: string
  accountNumber: string
  phoneNumber: string
  meterNumber: string
  email: string
  createdAt: string
  updatedAt: string
  bankName: string
}

export type  Client = {
  id: number
  avatar: string
  login: string
  name: string
  company: string
  city: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}

export type  Transactions = {
  status: string
  requestId: string
  currency: string
  amount: number | null
  paymentType: string
  accountName?: string
  date: string
  
}

export type StyleKey = 'white' | 'basic'

export type HomeMenus = 'login' | 'Create an account' | 'forgot-password' | 'verify-link'

export type UserForm = {
  name: string
  email: string
}

export type AirtimeForm = {
  amount: number | null
  serviceId: string
  phoneNumber: string
}

export type InternetForm = {
  serviceID: ''
  variationCode: string
  billersCode: string
  amount: string
  phoneNumber: string
  pin: string
  saveBeneficiary: boolean
  
}

export type ElectricityForm = {
  serviceID: ''
  variationCode: string
  billersCode: string
  amount: string
  phoneNumber: string
  saveBeneficiary: boolean
  
}

export type TvForm = {
  decoderName: ''
  decoderOrSmartCardNumber: string
  subscriptionPackage: string
  amount: string
  pin: string
  phone: string
  subscriptionType: string
  saveBeneficiary: boolean
}

export type LocalTransfer = {
  amount: number | null
  email: string
  pin: string
  description: string
  saveBeneficiary : boolean
}

export type FundWalletForm = {
  amount: ''
  bank: string
  pin: string
  description: string
  
}
export type ThirdPartyTransfer = {
  amount: number | null
  account_bank: string
  pin: string
  description: string
  bankCode: string
  account_number : string
  saveBeneficiary : boolean
}

export type SignupForm = {
  firstName: string
  lastName: string
  middleName?: string
  email: string
  phoneNumber: string
  password: string
  bvn: string
  pin: string
}
