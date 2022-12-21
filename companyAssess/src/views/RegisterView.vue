<template>
  <div class="home_content">
    <div class="register">
      <div class="register-title">
        <span>注册</span>
      </div>
      <div class="register-name">
        <input type="text" class="username" placeholder="请输入用户名(5-12个字符)">
        <p class="err err-username"></p>
      </div>
      <div class="register-pas">
        <input type="password" class="password first-password" placeholder="请输入密码(6-15个字符,区分大小写)">
        <p class="err err-password"></p>
      </div>
      <div class="confirm-pas">
        <input type="password" class="password second-password" placeholder="再次输入密码确认">
        <p class="err err-password"></p>
      </div>
      <div class="">
        <input type="submit" class="return btn" value="返回登陆" @click="ReturnLogin">
        <input type="submit" class="confirm btn" value="确定" @click="SubRegis">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  methods:{
    ReturnLogin(){
      this.$router.push("/login")
    },
    SubRegis(){
      let username = document.querySelector('.username').value
      let pwd1 = document.querySelector('.first-password').value
      let pwd2 = document.querySelector('.second-password').value
      if(username === ''){
        document.querySelector('.err-username').innerHTML = '用户名不能为空'
        document.querySelector('.confirm-pas>p').innerHTML = ''
        document.querySelector('.register-pas>p').innerHTML = ''
      }else if(pwd1 === ''){
        document.querySelector('.register-pas>p').innerHTML = '密码不能为空'
        document.querySelector('.err-username').innerHTML = ''
        document.querySelector('.confirm-pas>p').innerHTML = ''
      }else if(pwd2 === ''){
        document.querySelector('.confirm-pas>p').innerHTML = '密码不能为空'
        document.querySelector('.err-username').innerHTML = ''
        document.querySelector('.register-pas>p').innerHTML = ''
      }else{
        document.querySelector('.err-username').innerHTML = ''
        document.querySelector('.confirm-pas>p').innerHTML = ''
        document.querySelector('.register-pas>p').innerHTML = ''
        let url = `/api/user/register?account=${username}&password1=${pwd1}&password2=${pwd2}`
        fetch(url,{
          method:'get'
        }).then((res)=>{
          if(res.status===200){
            // this.$router.push("/content")
            //注册成功 返回login
            this.$router.push("/login")
          }
        })
        //存入数据库
        // this.$router.push("/login")
      }
    }
  }
}
</script>

<style scoped>
.home_content{
  width: 404px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  height: 400px;
  transition: all 0.8s;
  position: absolute;
  left: 50%;
  margin-left: -202px;
  top: 50%;
  margin-top: -200px;
  z-index: 999;
  background: #ffffff;
}
.register {
  position: absolute;
  width: 320px;
  top: 0;
  padding: 42px 42px 36px;
  transition: all 0.8s;
}
.register .register-title {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 25px;
  font-weight: bold;
  margin-bottom: 24px;
}
.register .register-title span {
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  padding: 0 20px;
  font-size: 24px;
}
.register div:nth-child( 5) {
  margin-bottom: 12px;
}
.register div:nth-child( 4) {
  margin-bottom: 12px;
}
.register div:nth-child( 3) {
  margin-bottom: 12px;
}
.register div:nth-child( 2) {
  margin-bottom: 12px;
}
.register div .password,
.register div .username,
.register div .btn {
  height: 44px;
  width: 100%;
  padding: 0 10px;
  border: 1px solid #9da3a6;
  background: #fff;
  text-overflow: ellipsis;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -khtml-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  color: #000;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  direction: ltr;
  font-size: 13px;
}
.register div:nth-child(2) .err,
.register div:nth-child(3) .err,
.register div:nth-child(4) .err {
  margin: 12px 0 0;
  line-height: 12px;
  height: 12px;
  font-size: 12px;
  color: red;
}
.register div:nth-child(5) .btn {
  width: 48%;
}
.register div:nth-child(5) .confirm {
  float: right;
}
</style>
