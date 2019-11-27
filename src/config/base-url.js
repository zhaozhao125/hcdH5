// let BASE_URL = 'http://47.104.149.175:8090/' // 正式地址
let BASE_URL = 'https://app.hechongdian.cn:543/' // 正式地址
console.log(process.env.VUE_APP_ENV, 'process.env.VUE_APP_ENV')
console.log(process.env, 'process.env')
if (process.env.VUE_APP_ENV) {
  if (process.env.VUE_APP_ENV === 'dev') {
    BASE_URL = 'http://47.104.149.175:8090/' // 测试地址
    // BASE_URL = 'http://test.1byongche.cn:8520/'
  } else if (process.env.VUE_APP_ENV === 'prod') {
    // BASE_URL = 'https://api.1byongche.com:7101/' // 正式地址
    BASE_URL = 'https://app.hechongdian.cn:543/' // 正式地址
  }
}

export default BASE_URL
