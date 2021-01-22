<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button @click="add" type="primary" icon="plus">新增</a-button>
      </div>
      <a-table ref="table" size="default" :rowKey="(record) => record.id" :columns="columns" :dataSource="dataSource" :pagination=false>
        <span slot="actionColumn" slot-scope="text, record">
          <a @click="detail(record)">详情</a>
          <a class='button-margin-left' @click="edit(record)">编辑</a>
          <a class='button-margin-left' @click="del(record)">删除</a>
        </span>
      </a-table>
    </a-card>
    <a-drawer title="Basic Drawer" placement="right" :closable="true" :visible="drawerVisible" :width="800">
      <component-edit ref="edit"></component-edit>
    </a-drawer>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getComTree } from '@/api/component'
import ComponentEdit from './ComponentEdit'

export default {
  components: {
    STable,
    ComponentEdit
  },
  data() {
    return {
      drawerVisible: false,
      columns: [
        {
          title: '组件id',
          dataIndex: 'id'
        },
        {
          title: '组件名称',
          dataIndex: 'name'
        },
        {
          title: '权限标识',
          dataIndex: 'perms'
        },
        {
          title: '组件类型',
          dataIndex: 'type',
          customRender: text => {
            if (text === 0) {
              return '路由'
            } else {
              return '按钮'
            }
          }
        },
        {
          title: '组件描述',
          dataIndex: 'remark'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '10%',
          scopedSlots: { customRender: 'actionColumn' }
        }
      ],
      // 查询条件参数
      queryParam: {},
      dataSource: []
    }
  },
  methods: {
    add() {
      this.drawerVisible = true
    },
    edit() {
      this.drawerVisible = true
    },
    del() {},
    detail() {
      this.drawerVisible = true
    },
  },
  created() {
    getComTree().then(res => {
      this.dataSource = res.data.list
    })
  }
}
</script>

<style lang="less" scoped>
.button-margin-left {
  margin-left: 10px;
}
</style>
