<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <div class="login-title"><h2>Register</h2></div>
      <el-form
        class="login-form"
        ref="login-form"
        :model="user"
        :rules="formRules"
        label-position="left"
        label-width="90px"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Code" prop="code">
          <el-input
            v-model="user.code"
            placeholder="Code"
            class="code"
          ></el-input>
          <el-tooltip
            class="item"
            effect="dark"
            content="The code will be sent to email above by clicking get code button."
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-button
            type="primary"
            :disabled="isDisabled"
            aria-autocomplete="false"
            class="codebutton"
          >
            Get Code
          </el-button>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="user.password"
            placeholder="Password"
            auto-complete="false"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="cpassword">
          <el-input
            type="password"
            v-model="user.cpassword"
            placeholder="Confrim Password"
            auto-complete="false"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >Check to accept Terms of Use.</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            :loading="loginLoading"
            type="primary"
            @click="onLogin"
            >Register Now</el-button
          >
        </el-form-item>

        <el-form-item>
          <div><a class="login-title" href="#">Forgot password ?</a></div>
          <div>
            <a class="login-title" href="#"> Aready had account, Login?</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { validEmail } from '@/utils/validate'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('Passwor should be at least 8 characters'))
      } else if (value.length > 32) {
        callback(new Error('Passwor should be less than 32 characters'))
      } else {
        callback()
      }
    }
    const validatecPassword = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error('Two passwords are not same'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value) || value.length > 128) {
        callback(new Error('Email is not in correct format'))
      } else {
        callback()
      }
    }
    return {
      user: {
        email: '',
        password: '',
        cpassword: '',
        agree: false,
        code: ''
      },
      loginLoading: false,
      formRules: {
        email: [{ trigger: 'blur', validator: validateEmail }],
        password: [{ trigger: 'blur', validator: validatePassword }],
        cpassword: [{ trigger: 'blur', validator: validatecPassword }],
        code: [{ min: 6, max: 6, message: 'The code shoul be a 6 digits number', trigger: 'blur' }],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(
                  new Error('You need accept term of use before proceed.')
                )
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }

        // 验证通过，请求登录
        this.login()
      })
    },

    login () {
      // 开启登陆中 loading...
      this.loginLoading = true

      // 对于代码中的请求操作
      // 1、接口请求可能需要重用
      // 2、实际工作中，接口非常容易变动，改起来麻烦
      // 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
      // 这样做的好处就是：管理维护更方便，也好重用
      login(this.user)
        .then(res => {
          // console.log(res)

          // 登录成功
          this.$message({
            message: 'Login Success',
            type: 'success'
          })

          // 关闭 loading
          this.loginLoading = true

          this.$router.push({
            name: 'home'
          })
        })
        .catch(err => {
          // 登录失败
          console.log('Login failed', err)
          this.$message.error('Login failed due to wrong email or password.')

          // 关闭 loading
          this.loginLoading = true
        })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 360px;
    padding: 30px 50px 30px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("./logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-title {
      display: flex;
      justify-content: center;
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
.code {
  float: left;
  //display: inline-block;
  width: 100px;
  margin: auto;
}
.codebutton {
  float: right;
  //display: inline-block;
  width: 100px;
  margin: auto;
  //justify-content: center;
}
.item {
  font-size: 1.5rem;
}
</style>
