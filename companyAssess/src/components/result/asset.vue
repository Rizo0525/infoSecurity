<template>
  <div>
    <h2>资产识别表</h2>
    <el-table :data="tableData" style="width: 100%" border height="200">
      <el-table-column prop="id" label="资产序号"/>
      <el-table-column label="资产名">
        <template #default="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="资产拥有人">
        <template #default="scope">
          <span>{{scope.row.person}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="secrety">
        <template #default="scope">
          <span>{{scope.row.secrety}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="wholeness">
        <template #default="scope">
          <span>{{scope.row.wholeness}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="availability">
        <template #default="scope">
          <span>{{scope.row.availability}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="importance">
        <template #default="scope">
          <span>{{scope.row.importance}}</span>
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

fetch(`/api/assets/queryAll?proid=${proStore.proId}`,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  return res.json()
}).then((res)=>{
  tableData.value = res.message
  // len.value = tableData.value.length
  console.log(tableData.value);
})
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
}
div{
  margin: 10px;
  text-align: center;
  /*border-bottom: 1px solid #000000;*/
}
</style>
