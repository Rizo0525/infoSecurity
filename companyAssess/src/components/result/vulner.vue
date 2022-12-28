<template>
<div>
  <h2>脆弱性识别表</h2>
  <el-table :data="tableData" style="width: 100%" border height="200">
    <el-table-column prop="id" label="脆弱性序号"/>
    <el-table-column  label="资产名">
      <template #default="scope">
        <span>{{scope.row.assets.name}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="威胁类型">
      <template #default="scope">
        <span>{{scope.row.threaten.type}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="脆弱性类型">
      <template #default="scope">
        <span>{{scope.row.type}}</span>
      </template>
    </el-table-column>
    <el-table-column label="脆弱值">
      <template #default="scope">
        <span>{{scope.row.value}}</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import {projectStore} from "../../stores/project";
const proStore = projectStore()
const tableData = ref()

onMounted(()=>{
  fetch(`/api/vulnerable/queryAll?proid=${proStore.proId}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    return res.json()
  }).then((res)=>{
    tableData.value = res.message
    // len.value = tableData.value.length
    // console.log(tableData.value);
  })
})
</script>

<style scoped>
div{
  text-align: center;
  margin: 10px;
}
</style>
