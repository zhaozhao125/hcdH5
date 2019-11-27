import recharge from '@/views/wallet/recharge/recharge'
import rechargeAgreement from '@/views/wallet/recharge/children/recharge-agreement'

export default [{
  path: 'recharge',
  name: 'recharge',
  meta: {
    title: '支付'
  },
  component: recharge
},
{
  path: 'recharge/agreement',
  name: 'rechargeAgreement',
  meta: {
    title: '和充电充值协议'
  },
  component: rechargeAgreement
}]
