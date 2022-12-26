<template>
<div>
  <h2>威胁识别表</h2>
  <el-table :data="tableData" style="width: 100%" border height="200">
    <el-table-column prop="id" label="威胁序号"/>
    <el-table-column  label="资产名">
      <template #default="scope">
        <span>{{scope.row.assets.name}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="威胁类型">
      <template #default="scope">
        <span>{{scope.row.type}}</span>
      </template>
    </el-table-column>
    <el-table-column label="威胁值">
      <template #default="scope">
        <span>{{scope.row.value}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="note">
      <template #default="scope">
        <span>{{scope.row.note}}</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script setup>
import {ref, reactive} from "vue";
import {projectStore} from "../../stores/project";
const proStore = projectStore()
const tableData = ref()

fetch(`/api/threaten/queryAll?proid=${proStore.proId}`,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  return res.json()
}).then((res)=>{
  tableData.value = res.message
  // len.value = tableData.value.length
  // console.log(tableData.value);
})
</script>

<style scoped>
div{
  text-align: center;
  margin: 10px;
}
</style>
