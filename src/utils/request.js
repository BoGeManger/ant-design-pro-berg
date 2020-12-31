import axios from 'axios'
import store from '@/store'
import storage from 'store'
// import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import message from 'ant-design-vue/es/message'
import {isNullOrEmpty} from '@/utils/util'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  //baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const result = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 400) {
      message.error(result.data)
    }
    if(error.response.status === 417){
      message.warning(result.data)
    }
    if(error.response.status === 500){
      if(isNullOrEmpty(result.data)){
        message.error('网络繁忙,请稍后重试')
      }else{
        message.error(result.data)
      }
    }
    if(error.response.status === 404){
      message.error('请求路径不存在')
    }
    if (error.response.status === 401) {
      message.warning(result.data)
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authentication'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
