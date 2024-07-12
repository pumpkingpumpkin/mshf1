import {reqIndexData} from '../../api/index'  
Page({
  data:{
    bannerList:[],
    categoryList:[],
    activeList:[],
    hotList:[],
    guessList:[],
    loading:true
  },
  async getIndexData(){
    const res = await reqIndexData()
    //console.log(res)
    this.setData({
      bannerList:res[0].data,
      categoryList:res[1].data,
      activeList:res[2].data,
      hotList:res[3].data,
      guessList:res[4].data,
      loading:false
    })
  },
  onLoad(){
    this.getIndexData()
  }
})
