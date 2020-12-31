import request from '@/utils/request'

const componentApi = {
    GetComTree: '/system/com/getComTree',
    GetComTreeByUser: '/system/com/getComTreeByUser',
    GetComPage: '/system/com/getComPage',
    GetCom: '/system/com/getCom',
    AddCom: '/system/com/addCom',
    UpdateCom: '/system/com/updateCom',
    OperatorBatchCom: '/system/com/operatorBatchCom',
  }
  
 /**
  * 获取组件树形列表
  */
  export function getComTree () {
    return request({
      url: componentApi.GetComTree,
      method: 'get'
    })
  }

   /**
  * 根据用户获取组件树形列表
  */
  export function getComTreeByUser () {
    return request({
      url: componentApi.GetComTreeByUser,
      method: 'get'
    })
  }

  /**
   * 获取组件分页列表
   * @param {*} parameter 
   */
  export function getComPage (parameter) {
    return request({
      url: componentApi.GetComPage,
      method: 'get',
      params: parameter
    })
  }


  /**
   * 获取组件
   * @param {*} parameter 
   */
  export function getCom (parameter) {
    return request({
      url: componentApi.GetCom,
      method: 'get',
      data: parameter
    })
  }

  /**
   * 新增组件
   * @param {*} parameter 
   */
  export function addCom (parameter) {
    return request({
      url: componentApi.AddCom,
      method: 'post',
      data: parameter
    })
  }

  /**
   * 修改组件
   * @param {*} parameter 
   */
  export function updateCom (parameter) {
    return request({
      url: componentApi.UpdateCom,
      method: 'put',
      data: parameter
    })
  }

  /**
   * 批量操作组件(新增,修改,删除)
   * @param {*} parameter 
   */
  export function operatorBatchCom (parameter) {
    return request({
      url: componentApi.OperatorBatchCom,
      method: 'post',
      data: parameter
    })
  }
  