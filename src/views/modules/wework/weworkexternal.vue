<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
    <el-form-item label="企业微信" prop="cropNames">
      <el-col :span="24">
          <el-col :span="24">
          <el-select v-model="dataForm.cropName" placeholder="请选择" width="220px" @change="handleChange">
            <el-option
              v-for="item in scapeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-col>
      </el-col>
    </el-form-item>

    <el-form-item label="姓名" prop="">
        <el-col :span="24">
        <el-input v-model="dataForm.name" placeholder="姓名" clearable></el-input>
        </el-col>
     </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="externalUserid"
        header-align="center"
        align="center"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="userid"
        header-align="center"
        align="center"
        label="添加人">
      </el-table-column>
      <el-table-column
        prop="gender"
        header-align="center"
        align="center"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="createtime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.externalUserid)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './weworkexternal-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          cropName:'小鹿斑比'
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        scapeOptions:[
          {
                    value: '123',
                    label: '小鹿斑比'
                  }
        ]
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/weworkexternal/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = [
                                  {externalUserid:"1",time:"2020年8月22日23:18:59",name:"like",userid:"Tony",gender:"M"},
                                  {externalUserid:"2",time:"2020年8月22日23:18:59",name:"张奕欢",userid:"Tony",gender:"F"},
                                  {externalUserid:"3",time:"2020年8月22日23:18:59",name:"琳娜",userid:"Tony",gender:"F"},
                                  {externalUserid:"4",time:"2020年8月22日23:18:59",name:"吴非一",userid:"Tony",gender:"M"},
                                ];
            this.totalPage = 4
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      }
    }
  }
</script>
