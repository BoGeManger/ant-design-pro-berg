import request from '@/utils/request'

const loginApi = {
  Login: '/system/login/login',
  Logout: '/system/login/logout'
}

/**
 * 用户登录
 * @param {*} parameter 
 */
export function login (parameter) {
  return request({
    url: loginApi.Login,
    method: 'post',
    data: parameter
  })
}

/**
 * 退出登录
 */
export function logout () {
  return request({
    url: loginApi.Logout,
    method: 'post'
  })
}
