<template>
  <el-row>
    <el-col>
      <h2>网络安全风险评估系统</h2>
      <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          default-active="1-4-1"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>业务管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">风险管理</el-menu-item>
          <el-menu-item index="1-3">评估对象管理</el-menu-item>
          <el-menu-item index="1-4">资产管理</el-menu-item>
          <el-menu-item index="1-5">威胁性管理</el-menu-item>
          <el-menu-item index="1-6">脆弱性管理</el-menu-item>
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
</style>