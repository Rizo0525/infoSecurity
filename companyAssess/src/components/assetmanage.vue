<template>
  <div class="assetmg">
    <el-button
        type="primary"
        @click="handleAdd()"
        style="margin-bottom: 10px"
    >添加单个资产</el-button
    >
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="资产序号" width="100"/>
      <el-table-column  label="资产类型" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.type"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.type}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column label="资产名" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.name"></el-input>
              </span>
          <span v-show="!scope.row.showinput">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="资产拥有人" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.person"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.person}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="secrety" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.secrety"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.secrety}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="wholeness" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.wholeness"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.wholeness}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="availability" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.availability"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.availability}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="importance" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.importance"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.importance}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="note" width="100">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.note"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.note}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column prop="assessment.status" label="状态" >
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.assessment.status"></el-input>
              </span>
          <span v-show="!scope.row.showinput">{{scope.row.assessment.status}}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <div v-show="!scope.row.showbtn">
            <el-button size="small" @click="handleEdit(scope)"
            >Edit</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope)"
            >Delete</el-button
            >
          </div>
          <div v-show="scope.row.showbtn">
            <el-button size="small" type="danger" @click="handleSave(scope)">save</el-button>
            <el-button size="small" type="warning" @click="handleCancel(scope)">cancel</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination layout="prev, pager, next" :total="len" />
    </div>
  </div>

</template>

<script setup>
// export default {
//   name: "assestmanage"
// }
import {ref} from "vue";
import {projectStore} from "../stores/project";
const proStore = projectStore()

const tableData = ref()
const len = ref()
const handleEdit = (scope) => {
  //出现input框
  scope.row.showinput = true
  scope.row.showbtn = true
}
const handleSave = (scope)=>{
  console.log(scope.row);
  //存数据库
  fetch(`/api/assets/alter?type=${scope.row.type}&name=${scope.row.name}&person=${scope.row.person}
  &secrety=${scope.row.secrety}&wholeness=${scope.row.wholeness}&availability=${scope.row.availability}
  &importance=${scope.row.importance}&note=${scope.row.note}&proid=${proStore.proId}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    console.log(res);
    if(res.status===200){
      //提示保存成功
      scope.row.showinput = false
      scope.row.showbtn = false
      // console.log("保存成功");
    }
  })
}

const handleDelete = (scope) => {
  //tableD
  fetch(`/api/assets/delete?name=${scope.row.assessment.name}&proid=${proStore.proid}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      //提示删除成功
      tableData.value.splice(scope.$index,1)
    }
  })


  //删除
}
const handleCancel = (scope)=>{
  scope.row.showinput = false
  scope.row.showbtn = false
}
fetch(`/api/assets/queryAll?proid=${proStore.proId}`,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  return res.json()
}).then((res)=>{
  tableData.value = res.message
  len.value = tableData.value.length
})
</script>

<style scoped>

</style>
