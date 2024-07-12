import http from '@/utils/http'

export const reqOrderInfo=()=>{
  return http.get('/order/trade')
}

export const reqOrderAddress=()=>{
  return http.get('/userAddress/getOrderAddress')
}

export const reqBuyNowGoods = ({goodsId,...data})=>{
  return http.get(`/order/buy/${goodsId}`,data)
}

export const reqSubmitOrder=(data)=>{
  return http.post('/order/submitOrder',data)
}
export const reqPrePayInfo=(orderNo)=>{
  return http.get(`/webChat/createJsapi/${orderNo}`)
}
export const reqPayStatus = (rederNo)=>{
  return http.get(`/webChat/queryPayStatus/${orderNo}`)
}