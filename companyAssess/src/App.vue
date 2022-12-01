<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <nav_menu></nav_menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
export default {
  name: 'app',
  components: {
      nav_menu:Menu
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-aside{
  background: skyblue;
  height: 100vh;
}
.el-header{
  background: blueviolet;
  padding: 0;
}
.el-main{
  background: red;
  padding: 0;
}
</style>
