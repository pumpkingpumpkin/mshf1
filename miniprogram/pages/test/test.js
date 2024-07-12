import instance from '../../utils/http'
import {reqSwiperData} from '../../api/index'
import Schema from 'async-validator'
Page({
  data:{
    name:''
  },
  onValidator(){
    const rules={
      name:[
        {required:true,message:'name不能为空'},
        {type:'string',message:'name不是字符串'},
        {min:2,max:3,message:'名字最少两个字，最多三个字'},
        //{pattern:'',message:''}
        //{validator:()=>{}}
      ]
    }
    const validator = new Schema(rules)
    validator.validate(this.data,(errors,fields)=>{
      if(errors){
        console.log('验证失败')
        console.log(errors)
        console.log(fields)
      }else{
        console.log('验证成功')
      }
    })
  },




  async handler(){
    // const res =await instance.get('/cart/getCartList').catch(err=>{
    //   console.log(err)
    // })
    // const res = await instance.get('/index/findBanner')
    // console.log(res)
    const res = await reqSwiperData()
    console.log(res)
    
  },
  async handler1(){
    // wx.request({
    //   url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
    //   method:'GET',
    //   success:(res)=>{
    //     console.log(res)
    //   },
    //   fail:(err)=>{
    //     console.log(err)
    //   }
    // })
    const res = await instance.get('/cart/getCartList')
    console.log(res)
  },
  async allHander(){
    // await instance.get('/index/findBanner')
    // await instance.get('/index/findCategory1')
    // await instance.get('/index/findBanner')
    // await instance.get('/index/findCategory1')
    // await Promise.all([await instance.get('/index/findBanner'),await instance.get('/index/findCategory1'),instance.get('/index/findBanner'),await instance.get('/index/findCategory1')])
    await instance.all([await instance.get('/index/findBanner'),await instance.get('/index/findCategory1'),instance.get('/index/findBanner'),await instance.get('/index/findCategory1')])
  },
  chooseavatar(event){
    const {avatarUrl} = event.detail
    // this.setData({
    //   avatarUrl
    // })
    wx.uploadFile({
      filePath: avatarUrl,
      name: 'file',
      url: 'https://gmall-prod.atguigu.cn/mall-api/fileUpload',
      success:(res)=>{
        res.data = JSON.parse(res.data)
        this.setData({
          avatarUrl:res.data.data
        })
      }
    })
  }




})