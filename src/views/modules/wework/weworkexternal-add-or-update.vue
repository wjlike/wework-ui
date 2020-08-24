<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="添加人" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="添加人"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createtime">
      <el-input v-model="dataForm.createtime" placeholder=""></el-input>
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
          externalUserid: 0,
          name: '',
          userid: '',
          gender: '',
          createtime: ''
        },
        dataRule: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          userid: [
            { required: true, message: '添加人不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.externalUserid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.externalUserid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/weworkexternal/info/${this.dataForm.externalUserid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.weworkExternal.name
                this.dataForm.userid = data.weworkExternal.userid
                this.dataForm.gender = data.weworkExternal.gender
                this.dataForm.createtime = data.weworkExternal.createtime
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
              url: this.$http.adornUrl(`/sys/weworkexternal/${!this.dataForm.externalUserid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'externalUserid': this.dataForm.externalUserid || undefined,
                'name': this.dataForm.name,
                'userid': this.dataForm.userid,
                'gender': this.dataForm.gender,
                'createtime': this.dataForm.createtime
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
