<template>
  <div class="contentBox">
    <div class="left">
      <div class="leftFirst">
        <div class="contentTitle">
          <span class="line"></span>
          <span>聊天内容查询</span>
        </div>
        <ul class="treeList">
          <li v-for="(item, index) in treeList" :key="index" :class="firstIndex == index ? 'choosed' : ''" @click="showChild">
            <div class="liBox">
              <div class="imgBOX">
                <img src="../../../../assets/img/flush.png"/>
              </div>
              <span class="firstTitle">{{item.name}}</span>
            </div>
            <div class="childrenList" v-if="item.firstChildren">
              <ul class="children">
                <li v-for="(chItem, chIndex) in item.childrenList" :key="chIndex">
                  <div class="liBox">
                    <div class="imgBOX">
                      <img src="../../../../assets/img/flush.png"/>
                    </div>
                    <span>{{chItem.name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="leftSecond">
        <div class="contentTitle">
          <span class="line"></span>
          <span>好友查询</span>
        </div>
        <ul class="treeList">
          <li v-for="(item, index) in treeList[firstIndex].childrenList[childrenIndex].list" :key="index" :class="childrenIndex == index ? 'choosed' : ''" @click="childrenIndex=index">
            <div class="liBox">
              <img src="../../../../assets/img/flush.png"/>
              <span class="firstTitle">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="rightBox">
      <div class="contentTitle">
          <span class="line"></span>
          <span>聊天内容详情</span>
        </div>
      <div class="note">
        <ul>
          <li v-for="(item, index) in dataList" :key="index" >
            <div v-if="item.isLeft" class="liBox left">
              <div class="imgBox">
                <img :src="item.src"/>
              </div>
              <div class="noteMsg">
                <div class="topOrigin">
                  <!-- 哈哈 2020.02.17 23:09:09 -->
                  {{item.topMsg}}
                </div>
                <div class="bottomMsg">
                  {{item.bottomMsg}}
                  <!-- 你猜我在说什么，嘻嘻嘻嘻嘻，再说两次 -->
                </div>
              </div>
            </div>
            <div v-else class="liBox right">
              <div class="noteMsg">
                <div class="topOrigin">
                  {{item.topMsg}}
                </div>
                <div class="bottomMsg">
                  {{item.bottomMsg}}
                </div>
              </div>
              <div class="imgBox">
                <img :src="item.src"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-form :model="dataForm" label-width="45%" label-position="right">
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
          <el-form-item label="添加人" prop="sendPerson">
            <el-input v-model="dataForm.sendPerson" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <el-button type="primary" @click="getDataList()">查询</el-button>
    <div style="margin: 10px;"></div>
     <el-table ref="multipleTable" :data="formList" border tooltip-effect="dark" style="width: 100%" v-loading="dataListLoading">
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
      <el-table-column prop="sendPerson" label="添加人" header-align="center" align="center"
                       :show-overflow-tooltip='true'>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                   :page-sizes="[5,10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {},
      firstIndex: 0,
      childrenIndex: 0,
      formList:[],
      pageIndex: 1,
      pageSize: 5,
      totalPage: 0,
      dataListLoading: false,
      treeList: [
        {
          name: 'xxx事业工作部1',
          firstChildren: false,
          childrenList: [
            {
              name: '李小二',
              list: [
                {
                  name: '李小二'
                },
                {
                  name: '张三'
                },
                {
                  name: '李四'
                }
              ]
            },
            {
              name: '李小三',
              list: [
                {
                  name: '李小三'
                },
                {
                  name: '张四'
                },
                {
                  name: '李五'
                }
              ]
            }
          ]
        },
        {
          name: 'xxx事业工作部2',
          firstChildren: false,
          childrenList: [
            {
              name: '李小二',
              list: [
                {
                  name: '李小二'
                },
                {
                  name: '张三'
                },
                {
                  name: '李四'
                }
              ]
            },
            {
              name: '李小三',
              list: [
                {
                  name: '李小三'
                },
                {
                  name: '张四'
                },
                {
                  name: '李五'
                }
              ]
            }
          ]
        }
      ],
      dataList: [
        {
          isLeft: true,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        },
        {
          isLeft: true,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        },
        {
          isLeft: false,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        },
        {
          isLeft: true,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        },
        {
          isLeft: false,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        },
        {
          isLeft: true,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        },
        {
          isLeft: false,
          topMsg: '哈哈 2020.09.09 12:09:09',
          bottomMsg: '嘻嘻嘻，咚咚锵咚咚锵',
          src: require('../../../../assets/img/avatar.png')
        }
      ]
    }
  },
  methods: {
    showChild (index) {
      this.firstIndex = index
      this.childrenIndex = 0
      this.treeList.map((v,i) => {
        if (i == index) {
          v.firstChildren = true
        } else {
          v.firstChildren = false
        }
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
        this.formList = [
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
.contentBox {
  display: flex;
  width: 100%;
  height: 100%;
  .contentTitle {
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      color: #666;
      font-size: 14px;
      &.line {
        width: 3px;
        height: 15px;
        margin-right: 5px;
        background: #1061a1;
      }
    }
  }
  .left {
    width: auto;
    display: flex;
    // align-items: flex-start;
    height: 100%;
    overflow-y: auto;
    .treeList {
      text-align: left;
      margin: 0;
      padding: 0;
      padding: 5px;
      list-style: none;
      li {
        width: 100%;
        padding: 5px;
        text-align: center;
        cover: pointer;
        &:hover {
          background: rgba(6, 33, 73, .4);
        }
        &.choosed {
          background: #1062a156;
        }
        .liBox {
          display: flex;
          align-items: center;
          .imgBOX {
            width: 18px;
            margin-right: 5px; 
            img {
              width: 100%;
            }
          }
          .firstTitle {
            color: #333;
            font-size: 16px;
          }
        }
        .childrenList {
          width: 100%;
          padding: 5px;
        }
      }
    }
    .leftFirst {
      width: 200px;
      height: 100%;
      display: inline-block;
    }
    .leftSecond {
      width: 250px;
      display: inline-block;
    }
  }
  .rightBox {
    flex: 1;
    border-left: 1px solid #eee;
    height: 600px;
    overflow: auto;
    .note {
    border-bottom: 1px solid #eee;
    width: 100%;
    // height: 100%;
    height: 75%;
    overflow-y: auto;
    ul {
      list-style: none;
      padding: 10px;
      li {
        padding: 5px;
        width: 100%;
        .liBox {
          width: 100%;
          display: flex;
          &.left {
            width: 70%;
            padding-right: 30%;
            box-sizing: border-box;
            text-align: left;
            justify-content: flex-start;
          }
          &.right {
            max-width: 70%;
            box-sizing: border-box;
            margin-left: 30%;
            text-align: right;
            justify-content: flex-end;
            .noteMsg {
              margin-right: 10px;
              margin-left: 0;
            }
            .bottomMsg {
              text-align: right;
            }
          }
          
        }
        .imgBox {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .noteMsg {
          max-width: 80%;
          margin-left: 10px;
          .topOrigin {
            color: #cac8c8;
            font-size: 13px;
            margin-bottom: 8px;
          }
          .bottomMsg {
            color: #666;
            font-size: 16px;
            text-align: left;
          }
        }
      }
    }
  }
  }
}
</style>