<template>
  <div class="home_content">
    <div class="login" style="">
      <div class="bxs-row" style="text-align:center;">
        <span class="tips">登陆</span>
      </div>
      <div class="bxs-row">
        <input type="text" class="username" placeholder="用户名" value="lan">
        <p class="err err-username"></p>
      </div>
      <div class="bxs-row">
        <input type="password" class="password" placeholder="密码" value="123456">
        <p class="err err-password"></p>
      </div>
      <div class="bxs-row remember-tool">
        <label for="" @click="RemPas">
          <label for="" class="remember-check check-active">
            <input type="checkbox">
          </label>
          记住密码
        </label>
        <div>
          <a href="javascript:" class="forget-password"> 忘记密码? </a>
        </div>
      </div>
      <div class="bxs-row">
        <input type="submit" class="submit-btn btn" value="登录" @click="Login">
        <input type="submit" class="register-btn btn" value="注册" @click="Register">
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute,useRouter} from "vue-router"
import {accountStore} from "../stores/account";


export default {
  name: "LoginView",
  setup(){
    const store = accountStore()
    const router = useRouter()
    // console.log(document.cookie.trim().split(';').toString().search("username") !== 0);
    if(document.cookie!=""){
      /*
      清理
      let date = new Date()
        date.setDate(date.getDate()-1)
        let value = ''
        document.cookie = `username=${escape(value)};expires=${date.toGMTString()};path=/`
        document.cookie = `password=${escape(value)};expires=${date.toGMTString()};path=/`
        console.log(document.cookie);
       */
      document.cookie.trim().split(";").forEach((value,index)=>{
        console.log(value.trim().split("="));
        if(value.trim().split("=")[0]==='username'){
          console.log(value.trim().split("=")[1]);
          store.alterUserName(value.trim().split("=")[1])
        }
      })
      // console.log();
      // console.log(document.cookie.trim().split(';')[1].trim().split("=")[1]);

      // (document.cookie.trim().split(';')[1].trim().split("=")[1])

      router.push("/content")
      // console.log(document.cookie.trim().split(';')[0].split('=')[1]);
      // console.log(document.cookie.trim().split(';')[1].trim().split('=')[1]);
    }
    return {store}
  },
  methods:{
    RemPas(){
      let remCheck = document.querySelector('.remember-check')
      if(remCheck.classList.contains('check-inactive')){
        remCheck.classList.add('check-active')
        remCheck.classList.remove('check-inactive')
      }else if(remCheck.classList.contains('check-active')){
        remCheck.classList.add('check-inactive')
        remCheck.classList.remove('check-active')
      }
    },
    Register(){
      console.log(this.$router);
      this.$router.push("/register")
    },
    Login(){
      let username = document.querySelector('.username').value;
      let pass = document.querySelector('.password').value
      if(username===''){
        document.querySelector('.err-username').innerHTML = '用户名不能为空'

      }else if(pass===''){
        document.querySelector('.err-password').innerHTML = '密码不能为空'
        document.querySelector('.err-username').innerHTML = ''
      }else{
        document.querySelector('.err-password').innerHTML = ''
        document.querySelector('.err-username').innerHTML = ''
        let url = `/api/user/login?account=${username}&password=${pass}`
        fetch(url,{
          method:'get'
        }).then((res)=>{
          if(res.status===200){
            let date = new Date()
            date.setDate(date.getDate()+7)
            document.cookie = `username=${username};expires=${date.toGMTString()};path=/`
            document.cookie = `password=${pass};expires=${date.toGMTString()};path=/`
            console.log(document.cookie.trim().split(';')[0].split('=')[1]);
            console.log(document.cookie.trim().split(';')[1].trim().split('=')[1]);
            this.store.alterUserName(username)
            // console.log(this.store.username);
            this.$router.push("/content")
          }
        })
        // let promise = fetch(url).then((response)=>{
        //   console.log(response);
        // })
        //登录成功
        // this.$router.push("/content")
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
.login{
  position: absolute;
  width: 320px;
  left: 0;
  top: 0;
  padding: 42px 42px 36px;
  transition: all 0.8s;
}
.login .bxs-row{
  position: relative;
}
.login .bxs-row .username,
.login .bxs-row .password,
.login .bxs-row .btn {
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
.login .bxs-row .btn {
  width: 48%;
}
.login .bxs-row:nth-child(1) {
  border-bottom: 1px solid #ddd;
  height: 25px;
  margin-bottom: 24px;
  font-weight: bold;
}
.login .bxs-row:nth-child(1) span {
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  padding: 0 20px;
  font-size: 24px;
}
.login .bxs-row:nth-child(2) .err,
.login .bxs-row:nth-child(3) .err {
  margin: 12px 0 12px 0;
  line-height: 12px;
  height: 12px;
  font-size: 12px;
  color: red;
}
.login .bxs-row:nth-child(5) .submit-btn {
  background-color: #0070ba;
  color: #fff;
  border: 1px solid #0070ba;
}
.login .bxs-row:nth-child(5) .submit-btn:hover {
  background-color: #005ea6;
}
.login .bxs-row:nth-child(5) .register-btn {
  position: absolute;
  right: 0;
}
.login .remember-tool {
  display: flex;
  font-size: 12px;
  color: #717171;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
}
.login .remember-tool > label {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.login .remember-tool > label .remember-check {
  display: inline-block;
  margin-right: 8px;
  width: 14px;
  height: 14px;
  background-image: url("../assets/checkno.svg");
  background-repeat: no-repeat;
  background-size: 14px 14px;
  background-position: 50%;
  cursor: pointer;
}
.login .remember-tool > label .remember-check input {
  outline: none;
  box-sizing: border-box;
  display: none;
}
.login .remember-tool > label .check-active {
  background-image: url("../assets/checkyes.svg");
}
.login .remember-tool > label .check-inactive {
  background-image: url("../assets/checkno.svg");
}
.login .remember-tool .forget-password {
  text-decoration: none;
  float: right;
  border: none;
  color: #00a1d6;
  margin-right: 10px;
}
</style>
