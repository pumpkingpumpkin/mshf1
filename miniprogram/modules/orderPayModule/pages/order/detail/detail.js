import {reqOrderAddress,reqOrderInfo,reqBuyNowGoods,reqSubmitOrder,reqPrePayInfo,reqPayStatus} from '@/api/orderpay'
import {formatTime} from '@/utils/formatTime'
import Schema from 'async-validator'
import {toast} from '@/utils/extendApi'

const app = getApp()

Page({
  data: {
    buyName: '', // 订购人姓名
    buyPhone: '', // 订购人手机号
    deliveryDate: '', // 期望送达日期
    blessing: '', // 祝福语
    show: false, // 期望送达日期弹框
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    orderAddress:[],
    orderInfo:{}
  },
  async getOrderInfo(){
    const {goodsId,blessing} = this.data
    const {data:orderInfo} =goodsId?await reqBuyNowGoods({goodsId,blessing}) : await reqOrderInfo()
    const orderGoods = orderInfo.cartVoList.find((item)=>item.blessing!='')
    this.setData({
      orderInfo,
      blessing:!orderGoods?'': orderGoods.blessing
    })
  },

  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {

    const timeRes = formatTime(new Date(event.detail))
    this.setData({
      show: false,
      deliveryDate : timeRes
    })
  },

  // 期望送达日期取消按钮 以及 关闭弹框时触发
  onCancelTimePicker() {
    this.setData({
      show: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime()
    })
  },

  // 跳转到收货地址
  toAddress() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/list/index'
    })
  },

  onShow(){
    this.getAddress()
    this.getOrderInfo()
  },
  async getAddress(){
    const addressId = app.globalData.address.id
    if(addressId){
      this.setData({
        orderAddress:app.globalData.address
      })
      return
    }

    const {data:orderAddress} = await reqOrderAddress()
    this.setData({
      orderAddress
    })
  },
  onUnload(){
    app.globalData.address={}
  },
  onLoad(options){
    this.setData({
      ...options
    })
  },
  async submitOrder(){
    const {buyName,buyPhone,deliveryDate,blessing,orderAddress,orderInfo} =this.data
    const params = {
      buyName,buyPhone,cartList:orderInfo.cartVoList,deliveryDate,remarks:blessing,userAddressId:orderAddress.id
    }
    const {valid} = await this.validatorPerson(params)
    if(!valid)return
    const res =await reqSubmitOrder(params)
    //console.log(res)
    if(res.code===200){
      this.orderNo = res.data
      this.advancePay()

    }
  },
  async advancePay(){
    try{
      const payParams =await reqPrePayInfo(this.orderNo)
      if(payParams.code===200){
        //console.log(payParams.data)
        const payInfo = await wx.requestPayment(payParams.data)
        //console.log(payInfo)
        if(payInfo.errMsg==='requestPayment:ok'){
          const payStatus=await reqPayStatus(this.orderNo)
          if(payStatus.code===200){
            wx.redirectTo({
              url: '/modules/orderPayModule/pages/order/list/list',
              success:()=>{
                toast({title:'支付成功',icon:'success'})
              }
            })
          }
        }
      }
    }catch(error){
      toast({
        title:'支付失败!',
        icon:'error'
      })
    }
  },
  validatorPerson(params){
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
    const phoneReg = '^1(?:3\\d|[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    const rules={
      userAddressId:{
        required:true,message:'请选择收货地址'
      },
      buyName:[
        {required:true,message:'请输入订购人姓名'},
        {pattern:nameRegExp,message:'收货人姓名不合法'}
      ],
      buyPhone:[
        {required:true,message:'请输入订购人手机号'},
        {pattern:phoneReg,message:'收货人手机号不合法'}
      ],
      deliveryDate:{required:true,message:'请选择送达日期'}
    }

    const validator = new Schema(rules)
    return new Promise((resolve)=>{
      validator.validate(params,(errors)=>{
        if(errors){
          toast({title:errors[0].message})
          resolve({valid:false})
        }else{
          resolve({valid:true})
        }
      })
    })

  }
  

})
