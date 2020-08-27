<template>
  <div class="chatBox">
    <el-form :model="dataForm" label-width="30%" label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="起始时间" prop="startDate">
            <el-date-picker
              v-model="dataForm.startDate"
              type="datetime"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="截止时间" prop="endDate">
            <el-date-picker
              v-model="dataForm.endDate"
              type="datetime"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发件人" prop="sendPerson">
            <el-input v-model="dataForm.sendPerson" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        

        <el-col :span="8">
          <el-form-item label="收件人" prop="recievePerson">
            <el-input v-model="dataForm.recievePerson" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="敏感词" prop="word">
            <el-input v-model="dataForm.word" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>

       </el-row>
       
    </el-form>
    <el-button type="primary" @click="getDataList()">查询</el-button>
    <div style="margin: 10px;"></div>
     <el-table ref="multipleTable" :data="dataList" border tooltip-effect="dark" style="width: 100%" v-loading="dataListLoading">
      <el-table-column prop="idno" label="序号" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+1+((pageIndex-1)*pageSize)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startDate" label="起始时间" header-align="center" align="center"
                       :show-overflow-tooltip='true'>
      </el-table-column>
      <el-table-column prop="endDate" label="截止时间" header-align="center" align="center"
                       :show-overflow-tooltip='true'>
      </el-table-column>
      <el-table-column prop="sendPerson" label="发件人" header-align="center" align="center"
                       :show-overflow-tooltip='true'>
      </el-table-column>
      <el-table-column prop="recievePerson" label="收件人" header-align="center" align="center"
                       :show-overflow-tooltip='true'>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                   :page-sizes="[5,10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- detail -->
    <detail v-if="addOrUpdateVisible" ref="addOrUpdate"></detail>
  </div>
</template>

<script>
import Detail from './chatDetail'
export default {
  components: {
    Detail
  },
  data () {
    return {
      dataForm: {
        startDate: '',
        endDate: '',
        sendPerson: '',
        recievePerson: '',
        word: ''
      },
      addOrUpdateVisible: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 5,
      totalPage: 0,
      dataListLoading: false,
    }
  },
  methods: {
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    getDataList () {
      this.dataListLoading = true
      setTimeout(() => {
        this.dataListLoading = false
        this.dataList = [
          {
            startDate: '2020.06.30 21:59:16',
            endDate: '2020.06.30 22:06:29',
            sendPerson: '李科',
            recievePerson: '蓝瑞金'
          },
          {
            startDate: '2020.06.30 21:59:16',
            endDate: '2020.06.30 22:06:29',
            sendPerson: '李科',
            recievePerson: '蓝瑞金'
          },
          {
            startDate: '2020.06.30 21:59:16',
            endDate: '2020.06.30 22:06:29',
            sendPerson: '李科',
            recievePerson: '蓝瑞金'
          },
          {
            startDate: '2020.06.30 21:59:16',
            endDate: '2020.06.30 22:06:29',
            sendPerson: '李科',
            recievePerson: '蓝瑞金'
          },
          {
            startDate: '2020.06.30 21:59:16',
            endDate: '2020.06.30 22:06:29',
            sendPerson: '李科',
            recievePerson: '蓝瑞金'
          }
        ]
        this.totalPage = 5
      }, 1500)
        // this.$http({
        //   url: this.$http.adornUrl('/nw/agentAdd/queryInfo'),
        //   method: 'post',
        //   params: this.$http.adornParams({
        //     'page': this.pageIndex,
        //     'limit': this.pageSize
        //   }),
        //   data: this.$http.adornData({
        //     'branchManageCom': this.$attrs.branchManageCom,
        //     'branchLevel': this.$attrs.branchLevel,
        //     'branchAttr': this.$attrs.branchAttr,
        //     'agentCode': this.$attrs.agentCode,
        //     'agentName': this.$attrs.agentName,
        //     'phone': this.$attrs.phone,
        //     'idNo': this.$attrs.idNo,
        //     'preDate': this.$attrs.preDate,
        //     'makeDate': this.$attrs.makeDate,
        //     'approvalStatus': this.$attrs.approvalStatus,
        //     'selfCheckFlag': this.$attrs.selfCheckFlag,
        //     'trainFlag': this.$attrs.trainFlag
        //   })
        // }).then(({
        //            data
        //          }) => {
        //   if (data && data.code === 0) {
        //     this.dataList = data.page.list
        //     this.totalPage = data.page.totalCount
        //   } else {
        //     this.dataList = []
        //     this.totalPage = 0
        //   }
        //   this.dataListLoading = false
        // })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>