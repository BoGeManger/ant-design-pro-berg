<template>
  <a-form @submit="submit" :form="form" :label-col=labelCol :wrapper-col="wrapperCol">
    <a-form-item label="组件名称" :labelCol=labelCol :wrapperCol=wrapperCol>
      <a-input v-decorator="['name',validator.name]" name="name" placeholder="组件名称" />
    </a-form-item>
    <a-form-item label="绑定父组件" :labelCol=labelCol :wrapperCol=wrapperCol>
      <a-select v-decorator="['parentId']" placeholder="请选择" default-value="" :value="componentList">
        <a-select-option value=0>无</a-select-option>
        <a-select-option v-for="item in group" :key="item" :value="item">
          {{item}}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="权限标识" :labelCol=labelCol :wrapperCol=wrapperCol>
      <a-input v-decorator="['perms',validator.perms]" name="perms" placeholder="权限标识" />
    </a-form-item>
    <a-form-item label="组件描述" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
      <a-input v-decorator="['remark']" name="remark" placeholder="组件描述" />
    </a-form-item>
    <a-form-item label="排序" :labelCol=labelCol :wrapperCol=wrapperCol>
      <a-input-number v-decorator="['no',validator.no  ]" :min="0" name="no" placeholder="排序" />
    </a-form-item>
    <a-form-item label="组件类型" :labelCol=labelCol :wrapperCol=wrapperCol>
      <a-select v-model="type" v-decorator="['type']" placeholder="请选择" default-value="0">
        <a-select-option :value=0>路由</a-select-option>
        <a-select-option :value=1>按钮</a-select-option>
      </a-select>
    </a-form-item>

    <template v-if="type===0">
      <a-form-item label="前端绑定组件" :labelCol=labelCol :wrapperCol=wrapperCol>
        <a-input v-decorator="['component']" name="component" placeholder="前端绑定组件" />
      </a-form-item>
      <a-form-item label="对应路由地址" :labelCol=labelCol :wrapperCol=wrapperCol>
        <a-input v-decorator="['path']" name="path" placeholder="对应路由地址" />
      </a-form-item>
      <a-form-item label="图标" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-input v-decorator="['icon']" name="icon" placeholder="图标" />
      </a-form-item>
      <a-form-item label="重定向地址" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-input v-decorator="['redirect']" name="redirect" placeholder="重定向地址" />
      </a-form-item>
      <a-form-item label="路由和子路由显示在Sidebar" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-select v-decorator="['hidden']" placeholder="请选择" default-value=0>
          <a-select-option value=0>否</a-select-option>
          <a-select-option value=1>是</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="菜单显示为Item" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-select v-decorator="['hideChildreninMenu']" placeholder="请选择" default-value=0>
          <a-select-option value=0>否</a-select-option>
          <a-select-option value=1>是</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="缓存该路由" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-select v-decorator="['keepAlive']" placeholder="请选择" default-value=0>
          <a-select-option value=0>否</a-select-option>
          <a-select-option value=1>是</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="隐藏面包屑和页面标题栏" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-select v-decorator="['hiddenHeaderContent']" placeholder="请选择" default-value=0>
          <a-select-option value=0>否</a-select-option>
          <a-select-option value=1>是</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="菜单链接跳转目标" :labelCol=labelCol :wrapperCol=wrapperCol :required=false>
        <a-input v-decorator="['target']" name="target" placeholder="菜单链接跳转目标" />
      </a-form-item>
    </template>

    <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
      <a-button htmlType="submit" type="primary">确定</a-button>
      <a-button style="margin-left: 8px">关闭</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { getComPage } from '@/api/component'

export default {
  name: 'ComponentEdit',
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { lg: { span: 4 }, sm: { span: 4 } },
      wrapperCol: { lg: { span: 8 }, sm: { span: 8 } },
      validator: {
        name: {
          rules: [{ required: true, message: '请输入组件名称' }]
        },
        perms: {
          rules: [{ required: true, message: '请输入权限标识' }]
        },
        no: {
          initialValue: 0,
          rules: [{ required: true, message: '请输入排序' }]
        },
        name: {
          rules: [{ required: true, message: '请输入组件名称' }]
        },
        name: {
          rules: [{ required: true, message: '请输入组件名称' }]
        }
      },
      type: 0,
      componentList: []
    }
  },
  methods: {
    // handler
    submit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    }
  },
  created() {}
}
</script>