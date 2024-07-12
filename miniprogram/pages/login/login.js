// pages/login/login.js
import {toast} from '../../utils/extendApi'
import {reqLogin,reqUserInfo} from '../../api/user'
import {setStorage} from '../../utils/storage'
import {ComponentWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '../../stores/userstores'

ComponentWithStore({

  storeBindings:{
    store:userStore,
    fields:['token','userInfo'],
    actions:['setToken','setUserInfo']
  },

  methods:{
    login(){
      wx.login({
        success:async({code})=>{
          //console.log(res)
          if(code){
            const {data} =await reqLogin(code)
            setStorage('token',data.token)
            this.setToken(data.token)
            this.getUserInfo()
            wx.navigateBack()
          }else{
            toast({title:'授权失败，请重新授权'})
          }
        }
      })
  
    },
    async getUserInfo(){
      const {data} = await reqUserInfo()
      setStorage('userInfo',data)
      this.setUserInfo(data)
    }


  }

})
