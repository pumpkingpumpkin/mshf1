class WxRequest {


  defaults={
    baseURL:'',
    url:'',
    data:null,
    method:'GET',
    header:{
      "Content-type":"application/json"
    },
    timeout:60000
  }

  interceptions={
    request:(config)=>config,
    response:(response)=>response
  }

  queue = []

  constructor(params={}){
    this.defaults = Object.assign({},this.defaults,params)
  }

  request(options){
    this.timmerId&&clearTimeout(this.timmerId)
    options.url = this.defaults.baseURL+options.url
    options={...this.defaults,...options}
    //wx.showLoading()
    this.queue.length===0&&wx.showLoading()
    this.queue.push('request')
    options =this.interceptions.request(options)
    return new Promise((resolve,reject)=>{
      if(options.method==='UPLOAD'){
        wx.uploadFile({
          ...options,
          success:(res)=>{
            res.data = JSON.parse(res.data)
            const mergeRes = Object.assign({},res,{config:options,isSuccess:true})
            resolve(this.interceptions.response(mergeRes))
          },
          fail:(err)=>{
            const mergeErr = Object.assign({},err,{config:options,isSuccess:false})
            reject(this.interceptions.response(mergeErr))
          }
        })
      }else{
        wx.request({
          ...options,
          success:(res)=>{
            const mergeRes=Object.assign({},res,{config:options,isSuccess:true})
            resolve(this.interceptions.response(mergeRes))
          },
          fail:(err)=>{
            const mergeErr=Object.assign({},err,{config:options,isSuccess:false})
            reject(this.interceptions.response(mergeErr))
            
          },
          complete:()=>{
            //wx.hideLoading()
            this.queue.pop()
            this.queue.length===0&&this.queue.push('request')
            this.timmerId = setTimeout(()=>{
              this.queue.pop()
              this.queue.length ===0&&wx.hideLoading()
              clearTimeout(this.timmerId)
            },1)
            this.queue.length===0&&wx.hideLoading()
  
          }
        })
      }
    })
  }
  get(url,data={},config={}){
    return this.request(Object.assign({url,data,method:'GET'},config))
  }
  delete(url,data={},config={}){
    return this.request(Object.assign({url,data,method:'DELETE'},config))
  }
  post(url,data={},config={}){
    return this.request(Object.assign({url,data,method:'POST'},config))
  }
  put(url,data={},config={}){
    return this.request(Object.assign({url,data,method:'PUT'},config))
  }

  all(...primise){
    return Promise.all(primise)
  }

  upload(url,filePath,name='file',config={}){
    return this.request(Object.assign({url,filePath,name,method:'UPLOAD'},config))
  }

}

export default WxRequest