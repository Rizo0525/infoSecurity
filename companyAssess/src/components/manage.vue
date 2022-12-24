<template>
  <div class="manage">
    <div><h1>{{proStore.proName}}</h1></div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="资产管理" name="first">
        <assetmanage></assetmanage>

      </el-tab-pane>
      <el-tab-pane label="威胁性管理" name="second">
        <threatenmanage></threatenmanage>
      </el-tab-pane>
      <el-tab-pane label="脆弱性管理" name="third">Role</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import {projectStore} from "../stores/project";
const proStore = projectStore()
import Assetmanage from "./assetmanage.vue";
import Threatenmanage from './threatenmanage.vue'
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs{
  /*margin:10px*/
}
.manage{
  /*text-align: center;*/
  padding: 10px;
}
.manage>div:first-of-type{
  text-align: center;
}
</style>
