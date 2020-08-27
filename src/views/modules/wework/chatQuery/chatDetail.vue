<template>
  <div class="chatDetailBox">
    <el-dialog title="聊天内容详情" width="80%" :close-on-click-modal="false" :visible.sync="visible" :before-close="clear"
             v-dialogDrag>
      <div style="height: 80%;">
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部消息" name="first">
            <div class="note">
              <ul>
                <li v-for="(item, index) in dataList" :key="index">
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
          </el-tab-pane>
          <el-tab-pane label="文件" name="second"></el-tab-pane>
          <el-tab-pane label="图片/视频" name="third"></el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini" @click="clear">取消</el-button>
		  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      visible: false,
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
    init () {
      this.visible = true
    },
    clear () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.chatDetailBox {
  /deep/ .el-dialog {
    height: 80%;
  }
  /deep/ .el-dialog__body {
    height: 80%;
  }
}
  .note {
    width: 100%;
    // height: 100%;
    height: auto;
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
</style>