<template>

   <div class="mod-config">

   <div id="chartColumn" style="width: 100%; height: 300px;">
   </div>


     <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
       <el-row>
         <el-form-item label="企业微信" prop="cropNames">
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
         </el-form-item>

         <el-form-item label="起始时间" prop="">
             <el-col :span="24">
             <el-input v-model="dataForm.starttime" placeholder="起始时间" clearable></el-input>
             </el-col>
          </el-form-item>

          <el-form-item label="截止时间" prop="">
           <el-col :span="24">
           <el-input v-model="dataForm.endtime" placeholder="截止时间" clearable></el-input>
           </el-col>
         </el-form-item>

          <el-form-item label="发件人" prop="">
             <el-col :span="24">
             <el-input v-model="dataForm.endtime" placeholder="发件人" clearable></el-input>
             </el-col>
          </el-form-item>
        <el-form-item label="敏感词" prop="">
           <el-col :span="24">
           <el-input v-model="dataForm.endtime" placeholder="敏感词" clearable></el-input>
           </el-col>
         </el-form-item>

       </el-row>

       <el-form-item>
         <el-button @click="getDataList()">查询</el-button>
         <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量移除</el-button>
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
         prop="id"
         header-align="center"
         align="center"
         label="id">
       </el-table-column>

       <el-table-column
         prop="time"
         header-align="center"
         align="center"
         label="时间">
       </el-table-column>

       <el-table-column
         prop="senduser"
         header-align="center"
         align="center"
         label="发件人">
       </el-table-column>

       <el-table-column
         prop="words"
         header-align="center"
         align="center"
         label="敏感词">
       </el-table-column>

       <el-table-column
         prop="detail"
         header-align="center"
         align="center"
         label="详情">
       </el-table-column>

       <el-table-column
         fixed="right"
         header-align="center"
         align="center"
         width="150"
         label="操作">
         <template slot-scope="scope">
           <el-button type="text" size="small" @click="detailHandle(scope.row.id)">详情</el-button>
           <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">移除</el-button>
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

   </div>
</template>

<script>
   // import AddOrUpdate from './monitor-detail';
   import echarts from 'echarts';
          export default {
              data(){
                  return {
                      chartColumn: null,
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
                      // detailVisible: false
                      scapeOptions:[
                        {
                                  value: '123',
                                  label: '小鹿斑比'
                                }
                      ]
                  }
              },
              components: {
                // AddOrUpdate
              },
              activated () {
                this.getDataList()
              },
              mounted() {
                  this.drawLine();
                  setInterval(this.drawLine, 10000);
              },
              methods: {
                  drawLine(){
                      this.chartColumn = echarts.init(document.getElementById('chartColumn'));

                      this.chartColumn.setOption({
                        title: { text: '风险监控' },
                        tooltip: {},
                        xAxis: {
                          type: 'category',
                          data: ['1时', '2时', '3时', '4时', '5时', '6时', '7时']
                        },
                        yAxis: {
                          type: 'value'
                        },
                        series: [{
                          data: [0, 0, 0, 1, 1, 2, 2],
                          type: 'line'
                        }]
                  });
                  },
                  getDataList () {
                    this.dataListLoading = true
                    this.$http({
                      url: this.$http.adornUrl('/sys/weworkuser/list'),
                      method: 'get',
                      params: this.$http.adornParams({
                        'page': this.pageIndex,
                        'limit': this.pageSize,
                        'cropName': this.dataForm.cropName
                      })
                    }).then(({data}) => {
                      if (data && data.code === 0) {
                        this.dataList = [
                                  {id:"1",time:"2020年8月22日23:18:59",senduser:"like",words:"政治",detail:"金三胖怎么是这样的人啊"},
                                  {id:"2",time:"2020年8月22日23:18:59",senduser:"like",words:"政治",detail:"金三胖怎么是这样的人啊"},
                                  {id:"3",time:"2020年8月22日23:18:59",senduser:"like",words:"政治",detail:"金三胖怎么是这样的人啊"},
                                  {id:"4",time:"2020年8月22日23:18:59",senduser:"like",words:"政治",detail:"金三胖怎么是这样的人啊"},
                                ];
                        this.totalPage = 4
                      } else {
                        this.dataList = []
                        this.totalPage = 0
                      }
                      this.dataListLoading = false
                    })
                  },
                  // 新增 / 修改
                  detailHandle (id) {
                    this.detailVisible = true
                    this.$nextTick(() => {
                      this.$refs.detail.init(id)
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
                  ViewHandle (id) {
                    this.addOrUpdateVisible = true
                    this.$nextTick(() => {
                      this.$refs.addOrUpdate.init(id)
                    })
                  },
                  // 删除
                  deleteHandle (id) {
                    var ids = id ? [id] : this.dataListSelections.map(item => {
                      return item.id
                    })
                    this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$http({
                        url: this.$http.adornUrl('/sys/weworkuser/delete'),
                        method: 'post',
                        data: this.$http.adornData(ids, false)
                      }).then(({data}) => {
                        if (data && data.code === 0) {
                          this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                              this.getDataList()
                            }
                          })
                        } else {
                          this.$message.error(data.msg)
                        }
                      })
                    })
                  }
              }
          }
</script>

<style>
</style>
