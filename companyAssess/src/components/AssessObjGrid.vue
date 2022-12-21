<template>
<div ref="tableObj">
  <el-button type="primary">添加评估对象</el-button>
  <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width:100%"
  >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column label="Name" property="name" width="120"></el-table-column>
    <el-table-column label="Address" property="address" show-overflow-tooltip></el-table-column>
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
const tableData:User[] = [
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
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
let url = `http://localhost:3000/permission/queryAll`
fetch(url,{
  method:'get'
}).then((res)=>{
  if(res.status===200){
    console.log(res.text());
  }
})
</script>

<style scoped>
.el-pagination{
  position: absolute;
  left: 50%;
}

</style>
