import {reqGoodsInfo} from '../../../../../api/goods'
import {userBehavior} from '@/behaviors/userBehavior'
import {reqAddCart,reqCartList} from '@/api/cart'
import { toast } from '@/utils/extendApi'

Page({
  behaviors:[userBehavior],
  // 页面的初始数据
  data: {
	  goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    buyNow:0,
    allCount:''
  },
  async handlerSubmit(){
    const {token,count,blessing,buyNow} = this.data
    const goodsId =this.goodsId
    if(!token){
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return 
    }
    if(buyNow===0){
      const res = await reqAddCart({goodsId,count,blessing})
      if(res.code===200){
        toast({title:'加入购物车成功'})
        this.getCartCount()
        this.setData({
          show:false
        })
      }
    }else{
      wx.navigateTo({
        url: `/modules/orderPayModule/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
      })
    }
  },
  previewImage(){
    wx.previewImage({
      urls: this.data.goodsInfo.detailList
    })
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buyNow:0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buyNow:1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    this.setData({
      count:Number(event.detail)
    })
  },

  async getGoodsInfo(){
    const {data:goodsInfo} = await reqGoodsInfo(this.goodsId)
    this.setData({
      goodsInfo
    })

  },
  onLoad(options){
    
    this.goodsId = options.goodsId 
    this.getGoodsInfo()
    this.getCartCount()
  },
  async getCartCount(){
    if(!this.data.token) return
    const res = await reqCartList()
    if(res.data.length!==0){
      let allCount =0
      res.data.forEach((item)=>{
        allCount+=item.count
      })
      this.setData({
        allCount:(allCount>99?'99+':allCount)+''
      })
    }
  }
  

})
