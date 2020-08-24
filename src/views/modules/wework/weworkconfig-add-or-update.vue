<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
     <el-form-item label="公司名称"  prop="cropName">
       <el-col :span="20">
        <el-input v-model="dataForm.cropName" placeholder="公司名称"></el-input>
       </el-col>
     </el-form-item>

    <el-form-item label="企业Id" prop="cropId">
      <el-col :span="20">
        <el-input v-model="dataForm.cropId" placeholder="企业Id"></el-input>
       </el-col>
    </el-form-item>

    <el-form-item label="内部secret" prop="secret">
       <el-col :span="20">
        <el-input v-model="dataForm.secret" placeholder="secret"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="秘钥" prop="primKey">
      <el-col :span="20">
        <el-input v-model="dataForm.primKey" type="textarea" autosize placeholder="AES秘钥"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="外部secret" prop="externalSecret">
       <el-col :span="20">
        <el-input v-model="dataForm.externalSecret" placeholder="外部secret"></el-input>
        </el-col>
    </el-form-item>

    <el-form-item label="是否启用" prop="enable">
       <el-switch
         v-model="dataForm.enable"
         active-color="#55aaff"
         inactive-color="#ff5500">
       </el-switch>
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
          cropId: '',
          cropName: '',
          secret: '',
          primKey: '',
          externalSecret: '',
          enable: true
        },
        dataRule: {
          userid: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cropId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cropName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          secret: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          primKey: [
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
              url: this.$http.adornUrl(`/sys/weworkuser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userid = data.weworkUser.userid
                this.dataForm.cropId = data.weworkUser.cropId
                this.dataForm.cropName = data.weworkUser.cropName
                this.dataForm.secret = data.weworkUser.secret
                this.dataForm.primKey = data.weworkUser.primKey
                this.dataForm.externalSecret = data.weworkUser.externalSecret
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
                'cropId': this.dataForm.cropId,
                'cropName': this.dataForm.cropName,
                'secret': this.dataForm.secret,
                'primKey': this.dataForm.primKey,
                'externalSecret': this.dataForm.externalSecret
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
<style>

</style>
