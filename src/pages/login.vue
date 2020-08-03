<template>
  <div class="login">
    <div class="login-header">
      <div class="container">
        <img src="/imgs/login-logo.png" alt @click="goHome" />
      </div>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="login-form">
          <h3>
            <span :class="{'active-span': (loginMode === 1)}" @click="loginMode=1">账号登陆</span>
            <span :class="{'active-span': (loginMode === 2)}" @click="loginMode=2">扫码登陆</span>
          </h3>
          <div class="tab-1" v-if="loginMode === 1">
            <div class="input">
              <input type="text" name id placeholder="请输入账号" v-model="username" />
            </div>
            <div class="input">
              <input type="password" name id placeholder="请输入密码" v-model="password" />
            </div>
            <div class="btn-box" @click="login">
              <a href="javascipt:;" class="btn btn-large">登陆</a>
            </div>
            <div class="tips">
              <div class="tips-right" @click="register">手机登陆/注册</div>
              <div class="tips-left">
                <span>立即注册</span>
                <span>忘记密码?</span>
              </div>
            </div>
          </div>
          <div class="tab-2" v-else>
            <div class="code">
              <img src="/imgs/QR-code.png" alt />
            </div>
            <div class="msg">
              使用
              <span>小米商城APP</span>扫一扫
            </div>
            <div class="msg">小米手机可打开「设置」>「小米帐号」扫码登录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div class="container">
        <div class="footer-link">
          <span>河畔一角主页</span>
          <span>Vue全栈课程</span>
          <span>React全家桶课程</span>
          <span>微信支付专项课程（H5+小程序/云+Node+MongoDB）</span>
        </div>
        <div class="footer-copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 1.代表账号登陆 2.扫码登陆
      loginMode: 1,
      username: '',
      password: ''
    }
  },
  computed: {

  },
  components: {

  },
  methods: {
    goHome () {
      this.$router.push('/index')
    },
    login () {
      let { username, password } = this
      this.axios.post('api/user/login', {
        username,
        password
      }).then((res) => {
        this.$cookie.set('userid', res.id, '7d')
        this.$store.dispatch('saveUsername', res.username)
        this.$router.push({
          name: 'index',
          params: {
            from: 'login'
          }
        })
      })
    },
    register () {
      let { username, password } = this
      this.axios.post('api/user/register', {
        username,
        password,
        email: `${this.username}@163.com`
      }).then(() => {
        this.$message.success('注册成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/button.scss';

.login {
  .login-header {
    height: 113px;
    .container {
      img {
        cursor: pointer;
        height: 113px;
      }
    }
  }
  .login-body {
    width: 100%;
    height: 576px;
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      .login-form {
        position: absolute;
        top: 40px;
        right: 0;
        width: 410px;
        height: 510px;
        padding: 0 31px;
        box-sizing: border-box;
        background-color: #fff;
        h3 {
          margin: 40px 0 49px;
          text-align: center;
          cursor: pointer;
          span {
            font-size: $fontE;
            &:first-child::after {
              content: ' ';
              width: 1px;
              font-size: 20px;
              vertical-align: middle;
              border-right: 3px solid $colorI;
              margin: 0 32px;
            }
            &.active-span {
              color: $colorA;
            }
          }
        }
        .tab-1 {
          .input {
            width: 348px;
            height: 50px;
            border: 1px solid $colorH;
            text-align: center;
            line-height: 50px;
            margin-bottom: 20px;
            input {
              width: 312px;
              height: 14px;
              font-size: 14px;
              border: none;
            }
          }
          .btn-box {
            a {
              font-size: $fontI;
              text-align: center;
              line-height: 49px;
            }
          }
          .tips {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            font-size: $fontJ;
            cursor: pointer;
            .tips-right {
              color: $colorA;
            }
            .tips-left {
              color: $colorD;
              span {
                &:first-child::after {
                  content: ' ';
                  width: 1px;
                  margin: 0 10px;
                  border-right: 2px solid $colorD;
                }
              }
            }
          }
        }
        .tab-2 {
          text-align: center;
          .code {
            margin-bottom: 20px;
          }
          .msg {
            margin-top: 8px;
            span {
              color: $colorA;
            }
          }
        }
      }
    }
  }
  .login-footer {
    height: 160px;
    text-align: center;
    font-size: $fontI;
    padding-top: 60px;
    box-sizing: border-box;
    color: $colorD;
    .container {
      .footer-link {
        span {
          &::after {
            content: ' ';
            width: 1px;
            margin: 0 15px;
            border-right: 2px solid $colorD;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
      .footer-copyright {
        margin-top: 13px;
      }
    }
  }
}
</style>
