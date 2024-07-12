import http from '../utils/http'

export const reqAddress=(data)=>{
  return http.post('/userAddress/save',data)
}
export const reqAddressList=()=>{
  return http.get('/userAddress/findUserAddress')
}
export const reqAddressInfo=(id)=>{
  return http.get(`/userAddress/${id}`)
}
export const reqUpdateAddress=(data)=>{
  return http.post('/userAddress/update',data)
}
export const reqDelAddress=(id)=>{
  return http.get(`/userAddress/delete/${id}`)
}