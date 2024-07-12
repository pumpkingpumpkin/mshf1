import {modal, toast} from './utils/extendApi'
import {setStorage,getStorage,removeStorage,clearStorage} from './utils/storage'
App({
  onShow(){
    const accountInfo = wx.getAccountInfoSync()
    //console.log(accountInfo.miniProgram.envVersion)
    
  },
  globalData:{
    address:{}
  }
})
