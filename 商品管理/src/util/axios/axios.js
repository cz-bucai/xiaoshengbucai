import axios from 'axios'

let http = axios.create({
    baseURL:'/api'
})

//请求拦截
http.interceptors.request.use((req)=>{
    return req
})
//响应拦截
http.interceptors.response.use((res)=>{
    //只返回数据信息
    return res.data
})

export default http