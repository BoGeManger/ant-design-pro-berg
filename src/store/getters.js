const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  realname: state => state.user.info.realname,
  username: state => state.user.info.username,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  multiTab: state => state.app.multiTab
}

export default getters
