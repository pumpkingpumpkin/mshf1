import Schema from 'async-validator'
import {toast} from '../../../../../utils/extendApi'
import {reqAddress,reqAddressInfo,reqUpdateAddress} from '../../../../../api/address'
Page({
  // 页面的初始数据
  data: {
    name:'',
    phone:'',
    provinceName:'',
    provinceCode:'',
    cityName:'',
    cityCode:'',
    districtName:'',
    districtCode:'',
    address:'',
    fullAddress:'',
    isDefault:false
  },

  // 保存收货地址
  async saveAddrssForm(event) {
    const {provinceName,cityName,districtName,address,isDefault}=this.data
    const params = {
      ...this.data,
      fullAddress:provinceName+cityName+districtName+address,
      isDefault:isDefault?1:0
    }
    //console.log(params)
    const {valid} =  await this.validatorAddress(params)
    if(!valid)return
    // console.log(params)
    const res = this.addressId? await reqUpdateAddress(params): await reqAddress(params)
    if(res.code===200){
      wx.navigateBack({
        success:()=>{
          toast({title:this.addressId?'更新收货地址成功':'新增收货地址成功'})
        }
      })
      
    }
  },
  validatorAddress(params){
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
    const phoneReg = '^1(?:3\\d|[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    const rules={
      name:[
        {required:true,message:'请输入收货人姓名'},
        {pattern:nameRegExp,message:'收货人姓名不合法'}
      ],
      phone:[
        {required:true,message:'请输入收获人手机号'},
        {pattern:phoneReg,message:'收货人手机号不合法'}
      ],
      provinceName:{required:true,message:'请输入收货人所在的地区'},
      address:{required:true,message:'请输入详细地址'}
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

  },
  // 省市区选择
  onAddressChange(event) {
    //console.log(event)
    const [provinceName,cityName,districtName] = event.detail.value
    const [provinceCode,cityCode,districtCode] = event.detail.code
    this.setData({
      provinceName,
      cityName,
      districtName,
      provinceCode,
      cityCode,
      districtCode
    })
  },
  onLoad(options){
    //console.log(options.id)
    this.showAddressInfo(options.id)
  },
  async showAddressInfo(id){
    if(!id) return
    this.addressId=id
    wx.setNavigationBarTitle({
      title: '更新收货地址',
    })
    const {data}=await reqAddressInfo(id)
    this.setData(data)
    
  }
})
