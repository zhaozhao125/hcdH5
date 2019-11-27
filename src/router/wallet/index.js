import recharge from './children/recharge'
import walletIndex from '@/views/wallet/'
import wallet from '@/views/wallet/wallet'

export default {
  path: '/wallet',
  component: walletIndex,
  children: [
    {
      path: '/',
      name: 'wallet',
      meta: {
        title: '我的钱包'
      },
      component: wallet
    },
    ...recharge,
  ]
}
