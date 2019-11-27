import userCenterIndex from '@/views/user-center/'
import mainPage from '@/views/user-center/main-page/'
import userInfo from '@/views/user-center/user-info/'
import settings from '@/views/user-center/settings-page/'
import userAgreement from '@/views/user-center/user-agreement/'

export default {
  path: '/user-center',
  component: userCenterIndex,
  children: [
    {
      path: '/',
      name: 'userCenter',
      meta: {
        title: '我的'
      },
      component: mainPage
    },
    {
      path: 'info',
      name: 'userInfo',
      meta: {
        title: '个人信息'
      },
      component: userInfo
    },
    {
      path: 'settings',
      name: 'settings',
      meta: {
        title: '设置'
      },
      component: settings
    },
    {
      path: 'user-agreement',
      name: 'userAgreement',
      meta: {
        title: '和充电用户使用协议',
        noAuth: true
      },
      component: userAgreement
    },
  ]
}
