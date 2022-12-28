<template>
  <div>
    <p>Hi,{{store.username}}</p>
    <a href="" @click="Quit">退出登录</a>
  </div>
<!--  <el-icon size="16px"><ArrowDown /></el-icon>-->
</template>

<script>
import {accountStore} from "../stores/account";

export default {
  name: "UserLogout",
  setup(){
    const store = accountStore()

    return {store}
  },
  methods:{
    Quit(){
      let date = new Date()
      date.setDate(date.getDate()-1)
      let value = ''
      document.cookie = `username=${escape(value)};expires=${date.toGMTString()};path=/`
      document.cookie = `password=${escape(value)};expires=${date.toGMTString()};path=/`
      document.cookie = `NSESSIONID=${escape(value)};expires=${date.toGMTString()};path=/`
      store.alterUserName("")
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
div{
  display: flex;
  float:right;
  height: 100%;
  margin: 18px;
}
p{
  font-size: 22px;
  height: 100%;
  line-height: 100%;
  margin-right: 16px;
}
</style>
