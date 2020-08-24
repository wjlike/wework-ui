<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户id" prop="userid">
      <el-input v-model="dataForm.userid" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="department">
      <el-input v-model="dataForm.department" placeholder="部门"></el-input>
    </el-form-item>
    <el-form-item label="职位" prop="position">
      <el-input v-model="dataForm.position" placeholder="职位"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="dataForm.email" placeholder="Email"></el-input>
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
          userid: '',
          name: '',
          department: '',
          position: '',
          mobile: '',
          gender: '',
          email: ''
        },
        dataRule: {
          userid: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '部门不能为空', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '职位不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '电话不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Email不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/weworkuser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userid = data.weworkUser.userid
                this.dataForm.name = data.weworkUser.name
                this.dataForm.department = data.weworkUser.department
                this.dataForm.position = data.weworkUser.position
                this.dataForm.mobile = data.weworkUser.mobile
                this.dataForm.gender = data.weworkUser.gender
                this.dataForm.email = data.weworkUser.email
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
              url: this.$http.adornUrl(`/sys/weworkuser/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userid': this.dataForm.userid,
                'name': this.dataForm.name,
                'department': this.dataForm.department,
                'position': this.dataForm.position,
                'mobile': this.dataForm.mobile,
                'gender': this.dataForm.gender,
                'email': this.dataForm.email
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
