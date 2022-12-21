<template>
  <el-row>
    <el-col>
      <h2>网络安全风险评估系统</h2>
      <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          default-active="1"
      >
        <el-menu-item index="1">
          <template #title>
            <router-link to="/content/homepage" exact><el-icon><HomeFilled /></el-icon>首页</router-link>
          </template>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <span><el-icon><Guide /></el-icon>业务管理</span>
          </template>
          <el-menu-item index="1-1"><el-icon><User /></el-icon>用户管理</el-menu-item>
          <el-menu-item index="1-2"><el-icon><Failed /></el-icon>风险管理</el-menu-item>
          <el-menu-item index="1-3">
            <router-link to="/content/assestment"><el-icon><Operation /></el-icon><span>评估对象管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="1-4"><el-icon><Coin /></el-icon>资产管理</el-menu-item>
          <el-menu-item index="1-5"><el-icon><BellFilled /></el-icon>威胁性管理</el-menu-item>
          <el-menu-item index="1-6"><el-icon><Cpu /></el-icon>脆弱性管理</el-menu-item>
<!--          <el-sub-menu index="1-4">-->
<!--            <template #title><span>item-Four</span></template>-->
<!--            <el-menu-item index="1-4-1">item-Four-one</el-menu-item>-->
<!--          </el-sub-menu>-->
        </el-sub-menu>
        <el-menu-item index="2">
          <span>NaviGator Two</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

</template>

<script>

export default {
  name: "Menu"
}
const handleOpen = (key,keyPath)=>{
  console.log(key, keyPath);
}
const handleClose = (key,keyPath)=>{
  console.log(key, keyPath);
}
</script>

<style scoped>
h2{
  padding: 10px;
  text-align: center;
}
.router-link-active{
  text-decoration: none;
  color: #303133;
  /*color: #409eff;*/
  height: 100%;
  width: 100%;
}
a{
  text-decoration: none;
  color: #303133;
  /*color: #409eff;*/
  height: 100%;
  width: 100%;
}

</style>
