import {userBehavior} from './behavior'
import {getStorage,setStorage} from '../../../../utils/storage'
import {reqUploadFile,reqUpdateUserInfo} from '../../../../api/user'
import{toast} from '../../../../utils/extendApi'
Page({
  behaviors:[userBehavior],
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },
  async updateUserInfo(){
    const res=await reqUpdateUserInfo(this.data.userInfo)
    if(res.code===200){
      setStorage('userInfo',this.data.userInfo)
      this.setUserInfo(this.data.userInfo)
      toast({title:'用户信息更新成功'})
    }
  },
  async chooseAvatar(event){
    //console.log(event)
    const {avatarUrl} = event.detail
    const res =await reqUploadFile(avatarUrl,'file')
    this.setData({
        'userInfo.headimgurl':res.data
    })
    //console.log(res)
    // wx.uploadFile({
    //   filePath: avatarUrl,
    //   name: 'file',
    //   url: 'https://gmall-prod.atguigu.cn/mall-api/fileUpload',
    //   header:{
    //     token:getStorage('token')
    //   },
    //   success:(res)=>{
    //     const uploadRes = JSON.parse(res.data)
    //     this.setData({
    //       'userInfo.headimgurl':uploadRes.data
    //     })
    //   }
    // })
  },
  getNickName(event){
    //console.log(event)
    const {nickname} = event.detail.value
    this.setData({
      'userInfo.nickname':nickname,
      isShowPopup:false
    })
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true,
      'userInfo.nickname':this.data.userInfo.nickname
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  }
})
