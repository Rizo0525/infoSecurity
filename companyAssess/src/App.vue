<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <nav_menu></nav_menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <assess_obj_grid></assess_obj_grid>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import AssessObjGrid from './components/AssessObjGrid.vue'
export default {
  name: 'app',
  components: {
      nav_menu:Menu,
      assess_obj_grid:AssessObjGrid
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
