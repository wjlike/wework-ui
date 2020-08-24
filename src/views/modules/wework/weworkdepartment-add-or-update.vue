<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="部门名称"></el-input>
    </el-form-item>
    <el-form-item label="英文名称" prop="nameEn">
      <el-input v-model="dataForm.nameEn" placeholder="英文名称"></el-input>
    </el-form-item>
    <el-form-item label="上级部门" prop="parentid">
      <el-input v-model="dataForm.parentid" placeholder="父节点"></el-input>
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
          name: '',
          nameEn: '',
          parentid: ''
        },
        dataRule: {
          name: [
            { required: true, message: '部门名称不能为空', trigger: 'blur' }
          ],
          nameEn: [
            { required: true, message: '英文名称不能为空', trigger: 'blur' }
          ],
          parentid: [
            { required: true, message: '父节点不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sys/weworkdepartment/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.weworkDepartment.name
                this.dataForm.nameEn = data.weworkDepartment.nameEn
                this.dataForm.parentid = data.weworkDepartment.parentid
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
              url: this.$http.adornUrl(`/sys/weworkdepartment/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'nameEn': this.dataForm.nameEn,
                'parentid': this.dataForm.parentid
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
