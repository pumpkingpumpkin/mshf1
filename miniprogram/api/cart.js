import http from '@/utils/http'

export const reqAddCart = ({goodsId,count,...data})=>{
  return http.get(`/cart/addToCart/${goodsId}/${count}`,data)
}

export const reqCartList=()=>{
  return http.get('/cart/getCartList')
}
export const reqUpdateChecked=(goodsId,isChecked)=>{
  return http.get(`/cart/checkCart/${goodsId}/${isChecked}`)
}
export const reqCheckAllStatus = (isChecked)=>{
  return http.get(`/cart/checkAllCart/${isChecked}`)
}
export const reqDelCartGoods=(goodsId)=>{
  return http.get(`/cart/delete/${goodsId}`)
}