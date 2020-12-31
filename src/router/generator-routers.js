// eslint-disable-next-line
import {getComTreeByUser} from '@/api/component'
// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
import { ROUTERS} from '@/store/mutation-types'
import storage from 'store'
import {isNullOrEmpty} from '@/utils/util'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

  // 你需要动态引入的页面组件
  'Home': () => import('@/views/Home'),
  'ComponentList': () => import('@/views/system/component/ComponentList'),
  
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// 根级菜单
const rootRouter = {
  name: "menu.home",
  perms: "index",
  type: 0,
  router: {
    icon:"home",
    component: "BasicLayout",
    path: "/",
    redirect: "/home",
    hidden: 0,
    hideChildreninMenu: 0,
    keepAlive: 0,
    hiddenHeaderContent: 0,
    target: null
  },
  children: []
}

const homeRouter = {
    name: "首页",
    perms: "home",
    type: 0,
    router: {
      component: "PageView",
      path: "",
      icon: "setting",
      redirect: "",
      hidden: 0,
      hideChildreninMenu: 0,
      keepAlive: 0,
      hiddenHeaderContent: 0,
      target: null
    },
    children: []
}


/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  if(isNullOrEmpty(storage.get(ROUTERS))){
    return new Promise((resolve, reject) => {
      getComTreeByUser().then(res => {
        const menuNav = []
        const childrenNav = []
        childrenNav.push(homeRouter)
        childrenNav.push(...res.data.list)
        rootRouter.children = childrenNav
        menuNav.push(rootRouter)
        const routers = generator(menuNav)
        routers.push(notFoundRouter)
        storage.set(ROUTERS,JSON.stringify(res))
        resolve(routers)
      }).catch(err => {
        reject(err)
      })
    })
  }else{
    return new Promise((resolve, reject) => {
      let res = JSON.parse(storage.get(ROUTERS))
      const menuNav = []
      const childrenNav = []
      childrenNav.push(homeRouter)
      childrenNav.push(...res.data.list)
      rootRouter.children = childrenNav
      menuNav.push(rootRouter)
      const routers = generator(menuNav)
      routers.push(notFoundRouter)
      resolve(routers)
    })
  }
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const router = item.router || {}
    const currentRouter = {
      path: router.path,
      redirect: router.redirect,
      name: item.perms,
      key: item.perms,
      component: (constantRouterComponents[router.component]) || (() => import(`@/views/${router.component}`)),
      meta: {
        title: item.name,
        icon: router.icon,
        hiddenHeaderContent: router.hiddenHeaderContent==0?true:false,
        target: router.target,
        permission: item.perms
      }
    }
    // 是否设置了隐藏菜单
    if (router.hidden === 1) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (router.hideChildrenInMenu === 1) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if(currentRouter.path){
      if (!currentRouter.path.startsWith('http')) {
        currentRouter.path = currentRouter.path.replace('//', '/')
      }
    }
    // 重定向
    router.redirect && (currentRouter.redirect = router.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}