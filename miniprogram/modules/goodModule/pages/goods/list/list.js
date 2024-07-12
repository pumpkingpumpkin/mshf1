import {reqGoodsList} from '@/api/goods'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    total:0,
    isFinish: false, // 判断数据是否加载完毕
    isLoading:false,
  
    requestData:{
      page:1,
      limit:10,
      category1Id:'',
      category2Id:''
    }
  },
  async getGoodsList(){
    this.data.isLoading=true
    const {data} = await reqGoodsList(this.data.requestData)
    this.data.isLoading=false
    //console.log(res)
    this.setData({
      goodsList:[...this.data.goodsList,...data.records],
      total:data.total
    })
  },

  onLoad(options){
    //console.log(options)
    Object.assign(this.data.requestData,options)
    this.getGoodsList()
  },
  onReachBottom(){
    const {goodsList,total,requestData,isLoading} = this.data
    const {page} = requestData
    if(isLoading)return
    if(goodsList.length===total){
      this.setData({
        isFinish:true
      })
      return
    }
    this.setData({
      requestData:{...this.data.requestData,page:page+1}
    })
    this.getGoodsList()
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[],
      total:0,
      isFinish:false,
      requestData:{...this.data.requestData,page:1}
    })
    this.getGoodsList()
    wx.stopPullDownRefresh()
  }
})
