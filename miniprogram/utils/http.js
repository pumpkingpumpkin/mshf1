import { getStorage,clearStorsge, clearStorage } from './storage'
import {toast,modal} from './extendApi'
import {env} from './env'
import WxRequest from 'mina-request'

const instance = new WxRequest({
  baseURL:env.baseURL,
  timeout:15000
})

instance.interceptors.request = (config)=>{
  const token = getStorage('token')
  if(token){
    config.header['token']=token
  }
  return config
}
instance.interceptors.response = async(response)=>{
  const {isSuccess,data} = response
  if(!isSuccess){
    toast({
      title:'网络异常，请重试',
      icon:'error'
    })
    return Promise.reject(response)
  }
  switch(data.code){
    case 200:
      return data
    case 208:
      const res = await modal({
        content:'鉴权失败',
        showCancel:false
      })
      if(res){
        clearStorage()
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
      return Promise.reject(response)
    default:
      toast({
        title:'请连续客服'
      })
      return Promise.reject(response)
  }
  
}




export default instance


// const instance = new WxRequest({

// //   baseURL:env.baseURL,
// //   timeout:15000,
// //   isLoading:false
// // })
// // instance.interceptors.request=(config)=>{
// //   const token = getStorage('token')
// //   if(token){
// //     config.header['token']=token
// //   }
// //   return config
// // }
// // instance.interceptors.response=async(response)=>{
// //   const {isSuccess,data} = response
// //   if(!isSuccess){
// //     toast({
// //       title:'网络异常，请重试',
// //       icon:'error'
// //     })
// //     return Promise.reject(response)
// //   }
// //   switch(data.code){
// //     case 200:
// //       return data
// //     case 208:
// //       const res = await modal({
// //         content:'鉴权失败，请重新登陆',
// //         showCancel:false
// //       })
// //       if(res){
// //         clearStorsge()
// //         wx.navigateTo({
// //           url: '/pages/login/login'
// //         })
// //       }
// //       return Promise.reject(response)
// //     default:
// //       toast({
// //         title:'程序出现异常，请联系客服或者稍后重试',
// //       })
// //       return Promise.reject(response)
// //   }
// //   return response
// // }

// const instance = new WxRequest({
//   baseURL:'https://gmall-prod.atguigu.cn/mall-api',
//   timeout:15000
// })
// instance.interceptions.request=(config)=>{
//   const token = getStorage('token')
//   if(token){
//     config.header['token']=token
//   }
//   return config
// }
// instance.interceptions.response=async(response)=>{
//   const {isSuccess,data} =response
//   if(!isSuccess){
//     wx.showToast({
//       title: '网络异常请重试',
//       icon:'error'
//     })
//     return response
//   }
//   switch(data.code){
//     case 200:
//       return data
//     case 208:
//       const res = await modal({
//         content:'鉴权失败，请重新登陆',
//         showCancel:false
//       })
//       if(res){
//         clearStorage()
//         wx.navigateTo({
//           url: '/pages/login/login'
//         })
//       }
//       return Promise.reject(response)
//     default:
//       toast({
//         title:'程序出现异常，请联系客服或待会重试'
//       })
//       return Promise.reject(response)
//   }
  
// }

// export default instance


