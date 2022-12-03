<template>

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
      <template #default></template>

    </el-table-column>
  </el-table>
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

</script>

<style scoped>

</style>