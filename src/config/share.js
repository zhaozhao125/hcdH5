let url = 'https://h5.1byongche.com/app/invite-share/'
let useChargeUrl
let signinShareURL
export let logo = 'https://h5.1byongche.com/static/img/logo.png'

// if (process.env.BUILD_ENV) {
//   if (process.env.BUILD_ENV == 'test') {
//     url = 'http://test.1byongche.cn/h5/app/invite-share/' // 测试地址
//     useChargeUrl = 'http://test.1byongche.cn/h5/app/charge-share/'
//     signinShareURL = 'http://test.1byongche.cn/h5/app/signin-share/'
//   } else if (process.env.BUILD_ENV == 'production') {
//     url = 'https://h5.1byongche.com/app/invite-share/' // 正式地址
//     useChargeUrl = 'https://h5.1byongche.com/app/charge-share/'
//     signinShareURL = 'https://h5.1byongche.com/app/signin-share/'
//   }
// }
if (process.env.BUILD_ENV) {
  if (process.env.BUILD_ENV == 'test') {
    url = 'http://47.104.149.175:8090/h5/app/invite-share/' // 测试地址
    useChargeUrl = 'http://47.104.149.175:8090/h5/app/charge-share/'
    signinShareURL = 'http://47.104.149.175:8090/h5/app/signin-share/'
  } else if (process.env.BUILD_ENV == 'production') {
    url = 'https://app.hechongdian.cn:543/app/invite-share/' // 正式地址
    useChargeUrl = 'https://app.hechongdian.cn:543/app/charge-share/'
    signinShareURL = 'https://app.hechongdian.cn:543/app/signin-share/'
  }
}
export const useChargeShare = {
  url: useChargeUrl,
  shareContent: '还车后帮充电，即可领取现金红包',
  shareImg: logo
}
export const inviteShareConfig = {
  url: url,
  shareTitle: '您的好友送您66元优惠券，首次用车低至0元',
  shareContent: '来不及解释了，请你开车就是这么任性，快来注册领券吧',
  shareImg: logo
}

export const signinShareConfig = {
  url: signinShareURL,
  shareTitle: '天天签到，周周有礼',
  shareContent: '每日签到，每周送券，签到好礼，就问你要不要？',
  shareImg: logo
}
