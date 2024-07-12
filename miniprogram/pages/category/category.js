import {reqCategoryData} from '../../api/category'
Page({
  data:{
    categoryList:[],
    activeIndex:0
  },
  updateActive(event){
    //console.log(event)
    const {index} = event.currentTarget.dataset
    this.setData({
      activeIndex:index
    })
  },
  async getCategoryData(){
    const res = await reqCategoryData()
    //console.log(res)
    if(res.code===200){
      this.setData({
        categoryList:res.data
      })
    }
  },
  onLoad(){
    this.getCategoryData()
  }
})
