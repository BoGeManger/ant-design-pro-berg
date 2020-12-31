import storage from 'store'
import { login, logout } from '@/api/login'
import { ACCESS_TOKEN,ROLES,USER,ROUTERS } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    permissions: [],
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          storage.set(ROLES,JSON.stringify(result.roles), 7 * 24 * 60 * 60 * 1000)
          storage.set(USER, JSON.stringify(result.user), 7 * 24 * 60 * 60 * 1000)

          commit('SET_TOKEN', result.token)
          commit('SET_ROLES', result.roles)
          commit('SET_INFO', result.user)
          commit('SET_NAME', { name: result.user.realname, welcome: welcome() })
          commit('SET_PERMISSIONS', result.permissions)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_INFO', {})
          commit('SET_NAME', {})
          commit('SET_PERMISSIONS', [])
          
          storage.remove(ACCESS_TOKEN)
          storage.remove(ROLES)
          storage.remove(USER)
          storage.remove(ROUTERS)
        })
      })
    }

  }
}

export default user
