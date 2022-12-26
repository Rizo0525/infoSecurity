<template>
  <div class="close">
    <el-button @click="exportPDF()" style="float:right;margin-top:.6em">
      导出 <i class="el-icon-download el-ico--left" />
    </el-button>
    <el-icon size="30" @click="closebtn()"><Close /></el-icon>
  </div>
  <div id="result_content_main">
    <asset></asset>
    <threaten></threaten>
    <vulner></vulner>
    <finalresult></finalresult>
  </div>
</template>

<script setup>
import asset from './result/asset.vue'
import threaten from './result/threaten.vue'
import vulner from './result/vulner.vue'
import html2PDF from '../utils/html2PDF.js'
import {projectStore} from "../stores/project";
import {useRouter} from "vue-router";
import finalresult from './result/finalresult.vue'
const router = useRouter()
const proStore = projectStore()
const exportPDF = ()=>{
  html2PDF.downloadPDF(document.getElementById('result_content_main'), 'result.pdf');
}
const closebtn = ()=>{
  // fetch(`/api/calculate/queryAll?proid=${proStore.proId}`,{
  //   method:'get',
  //   credentials: 'include',
  // }).then((res)=>{
  //   return res.json()
  // }).then((res)=>{
  //   tableData.value = res.message
  //   // len.value = tableData.value.length
  //   // console.log(tableData.value);
  // })
  router.push("/content/homepage")
}


</script>

<style scoped>
.close{
  position: relative;
  right: 0;
}
</style>
