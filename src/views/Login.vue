<template>
  <div>
  <div class="login">
    <div class="center">
      <div class="login-form">
        <img src="../assets/img/login.png" alt="">
        <div class="r">
          <div class="txt">
            <h1>登录</h1>
            <p>LOGIN IN</p>
          </div>
          <div class="form">
            <input v-model="uphone" @blur="checkPhone" type="text" placeholder="请输入手机号/用户名/邮箱" name="uphone"><span id="msg1">{{uphoneState}}</span>
            <input v-model="upwd" @blur="checkPwd" type="password" placeholder="输入密码" name="upwd"><span id="msg2">{{upwdState}}</span>
          </div>
          <div class="pwd">
            <input type="checkbox" name="" id="yes">
            <label for="yes">&nbsp;记住密码</label>
            <a href="#">忘记密码?</a>
          </div>
          <button @click="checkForm">立即登录</button>
          <router-link to="/reg" class="reg">没有账号？点我注册</router-link>
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
        upwd: '',
        upwdState: '',
        name: '',
        avatar: '',
      }
    },
    methods: {
      checkPhone() {
        console.log(this.uphone);
        if(!this.uphone) {
          this.uphoneState = '手机号不能为空'
          return false
        } else {
          if(/^1[3-9]\d{9}$/.test(this.uphone)) {
            this.uphoneState = ''
            return true
          } else {
            this.uphoneState = '手机号码格式错误'
            return false
          }
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
      checkForm() {
        let body = `uphone=${this.uphone}&upwd=${this.upwd}`
        this.axios.post('/user/login',body).then(res=>{
          if(res.data.code == 200) {
            alert('登录成功')
            this.name = res.data.data[0].uname
            this.avatar = res.data.data[0].avatar
            console.log(res);
            // console.log(this.avatar);
            this.$store.commit('loginOK',res.data.data[0])
            console.log(this.$store.state);
            this.$router.push('/')
          // 注册失败
          }else if(res.data.code == 401) {
            alert('登录失败')
          }
        })
      }
    },
  }
</script>
<style src="../assets/css/userlogin.css" scoped></style>
<style lang="scss" scoped>

</style>