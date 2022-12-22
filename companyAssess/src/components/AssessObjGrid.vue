<template>
<div ref="tableObj">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="assessment.id" label="id" width="180" />
    <el-table-column prop="assessment.name" label="Name" width="180" />
    <el-table-column prop="assessment.note" label="Address" width="180"/>
    <el-table-column prop="assessment.status" label="Address" />
  </el-table>
  <div class="example-pagination-block">
    <el-pagination layout="prev, pager, next" :total="tableData.size" />
  </div>
</div>

</template>

<script lang="ts" setup>
import {reactive, toRefs, watch,ref} from "vue";

const tableData = ref()
let url = `/api/permission/queryAll`

fetch(url,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  if(res.status===200){
    // console.log(res.json());
    // console.log(JSON.stringify(res.text()));
    return res.json()
  }
}).then((res)=>{
  // console.log(res);
  // console.log(res.message);
  // tableData.value = reactive(res.message)
  tableData.value = res.message
  console.log(tableData.value);
  console.log(tableData.value.length);
})
</script>

<style scoped>
.el-table{
  max-height: 90%;
  /*height: 100px;*/
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
