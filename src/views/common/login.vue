<template>
  <div id="body">
    <el-main>
      <el-form ref="form" :model="form" :rules="dataRule" @keyup.enter.native="onSubmit()" label-width="80px" class="login-box" status-icon>
        <h3 class="login-title">欢迎登录</h3>

        <el-form-item label="用户名">
          <el-input v-model="form.username"  placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item label="验证码">
          <el-row>
            <el-col :span="14">
              <el-input  v-model="form.captcha"> </el-input>
            </el-col>
            <el-col :span="10" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>

import { getUUID } from '@/utils';

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        captcha:"",
        uuid: ""
      },
      captchaPath:""
    };
  },
  created() {
    this.form.uuid = getUUID();
    this.getCaptcha(); //验证码
  },
  mounted () {
    this.getCaptcha()
  },
  computed: {
  			dataRule() {
  				return {
  					username: [{
  						required: true,
  						message: this.$t('validate.required'),
  						trigger: 'blur'
  					}],
  					password: [{
  						required: true,
  						message: this.$t('validate.required'),
  						trigger: 'blur'
  					}],
  					captcha: [{
  						required: true,
  						message: this.$t('validate.required'),
  						trigger: 'blur'
  					}]
  				}
  			}
  		},

  methods: {
    onSubmit() {
     this.$refs['form'].validate((valid) => {
     					if(valid) {
     						this.$http({
     							url: this.$http.adornUrl('/sys/login'),
     							method: 'post',
     							data: {
     								'username': this.form.username,
     								'password': this.form.password,
     								'uuid': this.form.uuid,
     								'captcha': this.form.captcha
     							}
     						}).then(({
     							data
     						}) => {
     							if(data && data.code === 0) {
     								sessionStorage.setItem("operator", this.form.username);
     								this.$cookie.set('token', data.token)
     								this.$router.replace({
     									name: 'home'
     								})
     							} else {
     								this.getCaptcha()
     								this.$message.error(data.msg)
     							}
     						})
     					}
     				})
    },
    // 获取验证码
    getCaptcha() {
      this.$http({
        url: this.$http.adornUrl(`/sys/validate/code/${this.form.uuid}`),
        method: "get"
      }).then(({ data }) => {
        if (data) {
          this.captchaPath = data;
        }
      });

    }
  }
};
</script>

<style>
#body {
  background: url(../../assets/img/backgroudimg.jpg) no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.login-box {
  border: 1px solid #dcdfe6;
  width: 450px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color: #f0f3fa;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
.login-captcha {
  overflow: hidden;
  > img {
    width: 100%;
    cursor: pointer;
  }
}
</style>
