import {observable,action} from 'mobx-miniprogram'
import {getStorage} from '../utils/storage'
export const userStore = observable({
  token:getStorage('token')||'',
  userInfo:getStorage('userInfo')||{},
  setToken:action(function(token){
    this.token = token
  }),
  setUserInfo:action(function(userInfo){
    this.userInfo=userInfo
  })

})
