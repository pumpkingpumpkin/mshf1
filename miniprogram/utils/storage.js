export const setStorage = (key,value)=>{
  try{
    wx.setStorageSync(key, value)
  }catch(error){
    console.error(`储存指定${key}数据发送了异常`,error)
  }
}
export const getStorage=(key)=>{
  try{
    const value = wx.getStorageSync(key)
    if(value){
      return value
    }
  }catch(error){
    console.error(`读取指定${key}数据发送了异常`,error)
  }
}
export const removeStorage = (key)=>{
  try{
    wx.removeStorageSync(key)
  }catch(error){
    console.error(`移除指定${key}数据发送了异常`,error)
  }
}
export const clearStorage =()=>{
  try{
    wx.clearStorageSync()
  }catch(error){
    console.error(`清除本地数据时发送了异常`,error)
  }
}

