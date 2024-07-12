import http from '../utils/http'

export const reqLogin=(code)=>{
  return http.get(`/weixin/wxLogin/${code}`)
}

export const reqUserInfo=()=>{
  return http.get('/weixin/getuserInfo')
}

export const reqUploadFile = (filePath,name)=>{
  return http.upload('/fileUpload',filePath,name)
}

export const reqUpdateUserInfo=(userInfo)=>{
  return http.post('/weixin/updateUser',userInfo)
}