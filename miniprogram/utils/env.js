const {miniProgram} = wx.getAccountInfoSync()
const { envVersion} = miniProgram
let env = {
  baseURL:'https://gmall-prod.atguigu.cn/mall-api'
}
switch(envVersion){
  case 'develop':
    env.baseURL='https://gmall-prod.atguigu.cn/mall-api'
    break
  case 'trial':
    env.baseURL='https://gmall-prod.atguigu.cn/mall-api'
    break
  case 'release':
    env.baseURL='https://gmall-prod.atguigu.cn/mall-api'
    break
  default:
    env.baseURL='https://gmall-prod.atguigu.cn/mall-api'
    break
}
export {env}