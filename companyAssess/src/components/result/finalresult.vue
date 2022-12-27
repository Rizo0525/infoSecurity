<template>
  <div>
    <h2>资产风险值表</h2>
    <el-table :data="tableData" style="width: 100%" border height="200">
<!--      <el-table-column prop="id" label="序号"/>-->
      <el-table-column  label="资产名称">
        <template #default="scope">
          <span>{{scope.row.vul.assets.name}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="重要性赋值">
        <template #default="scope">
          <span>{{scope.row.vul.assets.importance}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="威胁">
        <template #default="scope">
          <span>{{scope.row.vul.threaten.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="威胁赋值">
        <template #default="scope">
          <span>{{scope.row.vul.threaten.value}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="脆弱性">
        <template #default="scope">
          <span>{{scope.row.vul.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="脆弱性赋值">
        <template #default="scope">
          <span>{{scope.row.vul.value}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="可能性">
        <template #default="scope">
          <span>{{scope.row.possibility}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="损失">
        <template #default="scope">
          <span>{{scope.row.los}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="风险值">
        <template #default="scope">
          <span>{{scope.row.risk}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {projectStore} from "../../stores/project";
const proStore = projectStore()
const tableData = ref()

fetch(`/api/calculate/getResult?proid=${proStore.proId}`,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  return res.json()
}).then((res)=>{
  // res.message.forEach((val,index)=>{
  //   console.log(val, index);
  // })
  tableData.value = res.message
  console.log(tableData.value);
  // fetch(`/api/vulnerable/queryAll?proid=${proStore.proId}`,{
  //   method:'get',
  //   credentials: 'include',
  // }).then((res1)=>{
  //   return res1.json()
  // }).then((res1)=>{
  //
  //
  // })
})


</script>

<style scoped>
div{
  text-align: center;
  margin: 10px;
}
</style>
