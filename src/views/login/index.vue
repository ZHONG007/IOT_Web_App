<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <div class="login-title"><h2>Login</h2></div>
      <el-form
        class="login-form"
        ref="login-form"
        :model="user"
        :rules="formRules"
      >
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="user.password"
            placeholder="Password"
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
            >Login</el-button
          >
        </el-form-item>
        <el-form-item>
          <div><a class="login-title" href="#/resetpassword">Forgot Password</a></div>
          <div>
            <a class="login-title" href="#/register"> Register</a>
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
      if (value.length < 8 || value.length > 32) {
        callback(new Error('The password is not in correct format'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value) || value.length > 128) {
        callback(new Error('The password is not in correct format'))
      } else {
        callback()
      }
    }
    return {
      user: {
        email: '',
        password: '',
        agree: false
      },
      loginLoading: false,
      formRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
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
        this.login()
      })
    },

    login () {
      this.loginLoading = true
      login(this.user)
        .then(res => {
          this.$message({
            message: 'Login Success',
            type: 'success'
          })
          this.loginLoading = false

          this.$router.push({
            name: 'home'
          })
        })
        .catch(err => {
          console.log('Login failed', err)
          this.$message.error('Login failed due to wrong email or password.')
          this.loginLoading = false
        })
    }
  }
}
</script>

<style scoped lang="less">
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
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
    min-width: 300px;
    padding: 30px 50px 10px;
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
</style>
