import {reqAddressList,reqDelAddress} from '../../../../../api/address'
import { toast,modal } from '../../../../../utils/extendApi'
import instance from '../../../../../utils/http'
import {swiperCellBehavior} from '../../../../../behaviors/swipeCell'

const app = getApp()
Page({

  behaviors:[swiperCellBehavior],
  // 页面的初始数据
  data: {
    addressList: []
    
  },
  changeAddress(event){
    if(this.flag!=='1') return
    const addressId = event.currentTarget.dataset.id
    //console.log(addressId)
    const selectAddress = this.data.addressList.find((item)=>item.id===addressId)
    if(selectAddress){
      app.globalData.address = selectAddress
      wx.navigateBack()
    }
  },
  async delAddress(event){
    console.log(event)
    const {id} = event.currentTarget.dataset
    const modalRes = await modal({
      content:'您确认删除该收货地址吗？'
    })
    if(modalRes){
      await reqDelAddress(id)
      toast({title:'收获地址删除成功'})
      this.getAddressList()
    }
  },

  // 去编辑页面
  toEdit(event) {
    const {id} = event.currentTarget.dataset


    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  },

  async getAddressList(){
    const {data:addressList} = await reqAddressList()
    this.setData({addressList})
  },

  onShow(){
    this.getAddressList()
  },
  onLoad(options){
    this.flag = options.flag
  }

})
