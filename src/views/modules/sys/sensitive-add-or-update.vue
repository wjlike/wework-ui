<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">

    <el-form-item label="类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型"></el-input>
    </el-form-item>
    <el-form-item label="敏感词" prop="words">
      <el-input v-model="dataForm.words" placeholder="支持多个规则配置,中间用英文','分割"></el-input>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="dataForm.enable" label="1">开启</el-radio>
      <el-radio v-model="dataForm.enable" label="2">关闭</el-radio>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          type: '',
          words: '',
          enable:'1',
          createTime: '',
          updateTime: '',
          operator: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          words: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          operator: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sensitive/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.weworkSensitiveWords.userId
                this.dataForm.type = data.weworkSensitiveWords.type
                this.dataForm.words = data.weworkSensitiveWords.words
                this.dataForm.createTime = data.weworkSensitiveWords.createTime
                this.dataForm.updateTime = data.weworkSensitiveWords.updateTime
                this.dataForm.operator = data.weworkSensitiveWords.operator
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sensitive/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'type': this.dataForm.type,
                'words': this.dataForm.words,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'operator': this.dataForm.operator
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
