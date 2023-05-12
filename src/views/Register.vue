<template>
  <div>
    <div class="login">
      <div class="center">
        <div class="login-form">
          <img src="../assets/img/login.png" alt="">
          <div class="r">
            <div class="txt">
              <h1>注册</h1>
              <p>REGISTERED</p>
            </div>
            <div class="form">
              <input @blur="checkPhone" v-model="uphone" type="text" placeholder="请输入手机号" name="uphone">
              <span id="msg1">{{uphoneState}}</span>
              <input @blur="checkName" v-model="uname" type="text" placeholder="昵称" name="uname">
              <span id="msg2">{{unameState}}</span>
              <input @blur="checkPwd" v-model="upwd" type="password" placeholder="输入密码" name="upwd">
              <span id="msg3">{{upwdState}}</span>
              <input @blur="checkRepwd" v-model="reupwd" type="password" placeholder="确认密码" name="reupwd">
              <span id="msg4">{{reupwdState}}</span>
            </div>
            <div class="pwd">
              <input type="checkbox" name="" id="yes" :checked="ischeck" v-model="ischeck" @click="!ischeck">
              <label for="yes">&nbsp;我已阅读并同意《用户注册协议》</label>
            </div>
            <button :class="ischeck == true ? '' : 'active'" :disabled="!ischeck" @click="checkForm">立即注册</button>
            <router-link to="/login" class="reg">已有账号？点我登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uphone: '',
        uphoneState: '',
        uname: '',
        unameState: '',
        upwd: '',
        upwdState: '',
        reupwd: '',
        reupwdState: '',
        ischeck: false,   //用户注册协议是否勾选
      }
    },
    methods: {
      checkPhone() {
        console.log(this.uphone);
        if(!this.uphone) {
          this.uphoneState = '手机号不能为空'
          return false
        }
        if(/^1[3-9]\d{9}$/.test(this.uphone)) {
          this.axios.get(`/user/check?uphone=${this.uphone}`).then(res=>{
            console.log(res);
            if(res.data.code == 200) {
              this.uphoneState = '手机号可以使用'
              return true
            } else {
              this.uphoneState = '手机号已被使用'
              return false
            }
          })
        } else {
          this.uphoneState = '手机号码格式错误'
          return false
        }
      },
      checkName() {
        if(!this.uname) {
          this.unameState = '请输入昵称'
          return false
        } else {
          this.unameState = ''
          return true
        }
      },
      checkPwd() {
        if(!this.upwd) {
          this.upwdState = '请输入密码'
          return false
        } else {
          this.upwdState = ''
          return true
        }
      },
      checkRepwd() {
        if(!this.reupwd) {
          this.reupwdState = '请确认密码'
          return false
        } else {
          this.reupwdState = ''
          if(this.upwd!=this.reupwd) {
            this.reupwdState = '两次密码输入不一致'
            return false
          } else {
            this.reupwdState = ''
            return true
          }
        }
      },
      checkForm() {
        let body = `uphone=${this.uphone}&uname=${this.uname}&upwd=${this.upwd}&reupwd=${this.reupwd}`
        this.axios.post('/user/reg',body).then(res => {
          console.log(res);
          // 注册成功
          if(res.data.code == 200) {
            alert('注册成功')
            this.$router.push('/login')
          // 注册失败
          }else if(res.data.code == 401) {
            alert('注册失败')
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  body {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(45deg, #3459ff, #883ffe);
    position: relative;
  }
</style>
<style lang="scss" scoped>
* {
      margin: 0;
      padding: 0;
    }
    body {
      width: 100vw;
      height: 100vh;
      background-image: linear-gradient(45deg, #3459ff, #883ffe);
      position: relative;
    }
    .center {
      width: 1280px;
      margin: 0 auto;
    }
    .login-form {
      width: 1180px;
      height: 756px;
      background: rgba(0,0,0,.3);
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -378px;
      margin-left: -590px;
      border-radius: 10px;
    }
    .login-form img {
      width: 540px;
      float: left;
      border-radius: 10px 0 0 10px;
      /* position: absolute; */
    }
    .login-form .r {
      float: left;
      width: 640px;
      height: 756px;
      background: url('../assets/img/welcome.png') no-repeat 50% 15%;
      padding: 90px;
      padding-top: 170px;
      box-sizing: border-box;
      font-size: 12px;
      color: #fff;
      /* filter: blur(10px); */
    }
    .login-form .r .txt {
      margin-top: 20px;
      margin-bottom: 50px;
      text-align: center;
      color: #ff00a7;
    }
    .login-form .r .txt h1 {
      font-weight: 400;
    }
    .login-form .r .form {
      margin-bottom: 20px;
      position: relative;
    }
    .login-form .r .form #msg1 {
      position: absolute;
      right: 0;
      top: 30px;
      // display: none;
      color: #ff00a7;
    }
    .login-form .r .form #msg2 {
      position: absolute;
      right: 0;
      top: 90px;
      // display: none;
      color: #ff00a7;
    }
    .login-form .r .form #msg3 {
      position: absolute;
      right: 0;
      top: 145px;
      // display: none;
      color: #ff00a7;
    }
    .login-form .r .form #msg4 {
      position: absolute;
      right: 0;
      top: 205px;
      // display: none;
      color: #ff00a7;
    }
    .login-form .r .form input {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      border: 0;
      outline: none;
      padding-left: 40px;
      box-sizing: border-box;
      background: none;
      border-bottom: 1px solid #fff;
      color: #fff;
    }
    .login-form .r .form input:nth-child(1) {
      background: url('../assets/img/phone.png') no-repeat;
      background-size: 6%;
    }
    .login-form .r .form input:nth-child(3) {
      background: url('../assets/img/user.png') no-repeat;
      background-size: 6%;
    }
    .login-form .r .form input:nth-child(5) {
      background: url('../assets/img/pwd.png') no-repeat;
      background-size: 6%;
    }
    .login-form .r .form input:nth-child(7) {
      background: url('../assets/img/pwd.png') no-repeat;
      background-size: 6%;
    }
    .login-form .r .pwd {
      font-size: 14px;
      margin-bottom: 50px;
      /* 指针不可用 */
      user-select: none;
    }
    .login-form .r .pwd input{
      vertical-align: middle;
      margin-top: 3px;
      float: left;
    }
    .login-form .r .pwd a {
      text-decoration: none;
      color: #fff;
      float: right;
    }
    .login-form .r button {
      width: 100%;
      height: 50px;
      border: 0;
      border-radius: 25px;
      background: #ff00a7;
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      margin-bottom: 50px;
    }
    .login-form .r .reg {
      display: block;
      text-decoration: none;
      color: #fff;
      font-size: 16px;
      text-align: center;
      margin: 0 auto;
    }
    .active {
      color: lightgray!important;
      background: #b90079!important;
    }
</style>