<template>
<div ref="tableObj">
  <el-button type="primary">添加评估对象</el-button>
  <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width:100%"
  >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="id" width="120">
<!--      {{date}}-->
      <template #default="scope">{{ scope.row.date }}</template>
<!--      {{assessment.id}}-->
    </el-table-column>
<!--    <el-table-column label="Name" property="" width="120">{{assessment.name}}</el-table-column>-->
<!--    <el-table-column label="note" property="" show-overflow-tooltip>{{assessment.note}}</el-table-column>-->
    <el-table-column label="Operation">

      <template #default>
        <el-icon @click="edit" size="20"><Edit /></el-icon>
        <el-icon @click="del" size="20" style="margin-left: 10px;margin-right: 10px"><Delete /></el-icon>
        <el-icon @click="addUser" size="20"><User /></el-icon>
      </template>

    </el-table-column>
  </el-table>
  <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000"
  />
</div>

</template>

<script lang="ts" setup>
interface User{
  date:string,
  name:string,
  address:string
}

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
  console.log(res.message);
  // const tableData:User[] = res.message
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  console.log(tableData);
})
</script>

<style scoped>
.el-pagination{
  position: absolute;
  left: 50%;
}

</style>
