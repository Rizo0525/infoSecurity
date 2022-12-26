<template>
  <div>
    <h2>资产风险值表</h2>
    <el-table :data="tableData" style="width: 100%" border height="200">
      <el-table-column prop="id" label="序号"/>
      <el-table-column  label="资产名称">
        <template #default="scope">
          <span>{{scope.row.assets.name}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="重要性赋值">
        <template #default="scope">
          <span>{{scope.row.assets.importance}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="威胁">
        <template #default="scope">
          <span>{{scope.row.threaten.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="威胁赋值">
        <template #default="scope">
          <span>{{scope.row.threaten.value}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="脆弱性">
        <template #default="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="脆弱性赋值">
        <template #default="scope">
          <span>{{scope.row.value}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="可能性">
        <template #default="scope">
          <span>{{scope.row.possibility}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="损失">
        <template #default="scope">
          <span>{{scope.row.loss}}</span>
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

<script setup>
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
  fetch(`/api/vulnerable/queryAll?proid=${proStore.proId}`,{
    method:'get',
    credentials: 'include',
  }).then((res1)=>{
    return res1.json()
  }).then((res1)=>{

    tableData.value = res.message

    for(let i=0;i<tableData.value.length;i++){
      // console.log(tableData.value[i]);
      tableData.value[i].threaten = res1.message[i].threaten
      // res.message[i].threaten = res1.message[i].threaten
      // console.log(res1.message[i].type);
      res.message[i].type = res1.message[i].type
      res.message[i].value = res1.message[i].value
    }
    console.log(tableData.value);
  })
})


</script>

<style scoped>
div{
  text-align: center;
  margin: 10px;
}
</style>
