import http from '../utils/http'

export const reqGoodsList = ({page,limit,...data})=>{
  return http.get(`/goods/list/${page}/${limit}`,data)
}
export const reqGoodsInfo=(goodsId)=>{
  return http.get(`/goods/${goodsId}`)
}