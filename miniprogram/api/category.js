import http from '../utils/http'

export const reqCategoryData=()=>{
  return http.get('/index/findCategoryTree')
}