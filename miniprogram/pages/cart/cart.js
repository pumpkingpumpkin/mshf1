import {ComponentWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '@/stores/userstores'
import {reqCartList,reqUpdateChecked,reqCheckAllStatus,reqAddCart,reqDelCartGoods} from '@/api/cart'
import {debounce} from 'miniprogram-licia'
import {swiperCellBehavior} from '@/behaviors/swipeCell'
import {modal,toast} from '@/utils/extendApi'

const computedBehavior = require('miniprogram-computed').behavior
ComponentWithStore({
  behaviors:[computedBehavior,swiperCellBehavior],
  // 组件的属性列
  storeBindings:{
    store:userStore,
    fields:['token']
  },
  computed:{
    selectAllStatus(data){
      return data.cartList.length!==0 && data.cartList.every(item=>item.isChecked===1)
    },
    totalPrice(data){
      let totalPrice = 0
      data.cartList.forEach((item)=>{
        if(item.isChecked===1){
          totalPrice+= item.price*item.count
        }
      })
      return totalPrice
    }
  },
  // 组件的初始数据
  data: {
    cartList: [],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    toOrder(){
      if(this.data.totalPrice===0){
        toast({
          title:'请选择需要购买的商品'
        })
        return
      }
      wx.navigateTo({
        url: '/modules/orderPayModule/pages/order/detail/detail'
      })
    },

    async showTipGetList(){
      const {token} = this.data
      if(!token){
        this.setData({
          emptyDes:'您尚未登录，点击登录获取更多权益',
          cartList:[]
        })
        return
      }
      const {code,data:cartList} = await reqCartList()
      if(code===200){
        this.setData({
          cartList,
          emptyDes:cartList.length===0 && '还没有添加商品，快去添加吧～'
        })
      }
      //console.log(res)
    },
    onShow(){
      this.showTipGetList()
    },
    async updateChecked(event){
      const {detail} =event
      const{id,index} = event.target.dataset
      const isChecked = detail?1:0
      const res=await reqUpdateChecked(id,isChecked)
      //console.log(res)
      if(res.code===200){
        this.setData({
          [`cartList[${index}].isChecked`]:isChecked
        })
      }
    },
    async selectAllStatus(event){
      const {detail} = event
      const isChecked = detail?1:0
      const res=await reqCheckAllStatus(isChecked)
      //console.log(res)
      if(res.code===200){
        //this.showTipGetList()
        const newCartList=JSON.parse(JSON.stringify(this.data.cartList))
        newCartList.forEach((item)=>(item.isChecked=isChecked))
        this.setData({
          cartList:newCartList
        })
      }
    },
    changeBuyNum:debounce(async function(event){
      //console.log(event)
      const newBuyNum = event.detail>200?200:event.detail
      const {id,index,oldbuynum} =event.target.dataset
      const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/
      const regRes = reg.test(newBuyNum)
      if(!regRes){
        this.setData({
          [`cartList[${index}].count`]:oldbuynum
        })
        return
      }
      const disCount = newBuyNum - oldbuynum
      if(disCount===0) return
      const res = await reqAddCart({ goodsId:id,count:disCount })
      //console.log(res)
      if(res.code===200){
        this.setData({
          [`cartList[${index}].count`]:newBuyNum,
          [`cartList[${index}].isChecked`]:1
        })
      }
    },500),
    

    async delCartGoods(event){
      //console.log(event)
      const {id} = event.currentTarget.dataset
      const modalRes = await modal({
        content:'您确定删除该商品？'
      })
      if(modalRes){
        await reqDelCartGoods(id)
        this.showTipGetList()
      }
    },

    onHide(){
      this.onSwipeCellCommonClick()
    }


  }



})
