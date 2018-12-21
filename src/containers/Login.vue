<template>
  <div class="container">
    <div class="header">
      <span :class="{'current': current === 'login'}" @click="setCur('login')">登陆</span>
      |
      <span :class="{'current': current === 'register'}" @click="setCur('register')">注册</span>
    </div>
    <div class="main">
      <el-form ref="ruleForm" label-width="80px" :rules="rules" :model="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandler('ruleForm')" :class="{'hide': current !== 'login'}">登陆</el-button>
          <el-button type="primary" @click="registerHandler('ruleForm')" :class="{'hide': current !== 'register', 'nomargin': true}">注册</el-button>
          <el-button @click="resetHandler('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      current: 'login'
    }
  },
  methods: {
    loginHandler: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送用户信息到后台
          this.$http.post('/login', {...this.ruleForm})
            .then(res => {
              let token = res.token
              // 设置token
              this.$http.defaults.headers.common['Authorization'] = token
              // 本地保存token
              this.saveToken(token)
              this.$router.push({path: 'home'})
            })
        } else {
          this.$message({
            message: '必填项不能为空',
            type: 'warning'
          })
        }
      })
    },
    registerHandler: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送注册信息到后台
          this.$http.post('/register', {...this.ruleForm})
            .then(res => {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.setCur('login')
            })
        } else {
          this.$message({
            message: '必填项不能为空',
            type: 'warning'
          })
        }
      })
    },
    saveToken: function (token) {
      if (window.sessionStorage) {
        sessionStorage.setItem('token', token)
      }
    },
    resetHandler: function (formName) {
      this.$refs[formName].resetFields()
    },
    setCur: function (cur) {
      this.current = cur
      this.resetHandler('ruleForm')
    }
  }
}
</script>

<style scoped>
.header{
  padding: 10px 20px;
  text-align: right;
}
.header span:hover{
  cursor: pointer;
}
.main{
  width: 300px;
  margin: 200px auto 0 auto;
}
.hide{
  display: none;
}
.current{
  color: #409EFF;
}
.nomargin{
  margin: 0;
}
</style>
