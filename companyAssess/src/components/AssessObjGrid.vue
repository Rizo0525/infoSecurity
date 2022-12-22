<template>
<div class="tableObj">
  <el-button
      type="primary"
      @click="handleAdd()"
      style="margin-bottom: 10px"
  >添加评估对象</el-button
  >
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="assessment.id" label="评估对象序号" width="180" />
    <el-table-column  label="评估对象名称" width="180">
      <template #default="scope">
        <span v-show="scope.row.showinput">
          <el-input v-model="scope.row.assessment.name"></el-input>
        </span>
        <span v-show="!scope.row.showinput">
          <span class="jumpname" @click="JumpTo(scope)">{{scope.row.assessment.name}}</span>
<!--          <router-link to="/content/manage"></router-link>-->
        </span>
      </template>
    </el-table-column>
    <el-table-column label="备注" width="180">
      <template #default="scope">
        <span v-show="scope.row.showinput">
          <el-input v-model="scope.row.assessment.note"></el-input>
        </span>
        <span v-show="!scope.row.showinput">{{scope.row.assessment.note}}</span>
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
            <el-button size="small" @click="addUser(scope)"
            >addUser</el-button
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
  <el-dialog v-model="dialogFormVisible" title="添加评估对象">
    <el-form :model="form">
      <el-form-item label="评估对象名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.note" type="textarea" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,handleAddComfirm()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>

</template>

<script lang="ts" setup>
import {reactive,ref} from "vue";
import {projectStore} from "../stores/project";
import {useRouter} from "vue-router";

const proStore = projectStore()
const router = useRouter()
const tableData = ref()
const len = ref()
const search = ref('')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'


const JumpTo = (scope)=>{
  proStore.alterProjectId(scope.row.assessment.id)
  proStore.alterProjectname(scope.row.assessment.name)
  console.log(scope.row.assessment.id);
  router.push('/content/manage')
  // proStore.alterProjectId(scope.row.assessment.id)
}
const form = reactive({
  id: 0,
  name: '',
  note: '',
  state: 0
})
const handleAddComfirm = ()=>{
  console.log(form.name);
  tableData.value.push({
    assessment:{
      id:tableData.value[tableData.value.length-1].assessment.id+1,
      name:form.name,
      note:form.note,
      state:form.state
    },
    id:tableData.value[tableData.value.length-1].id,
    level:3,
    status:0,
    user:{
      id:3,
      username:"lan"
    }
  })


  fetch(`/api/assessment/add?name=${form.name}&note=${form.note}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      //提示添加成功
      form.name = ''
      form.note = ''
    }
  })

}
const handleEdit = (scope) => {
  //出现input框
  scope.row.showinput = true
  scope.row.showbtn = true
}
const handleSave = (scope)=>{
  console.log(scope.row.assessment.name);
  console.log(scope.row.assessment.note);
  //存数据库
  fetch(`/api/assessment/alter?name=${scope.row.assessment.name}&note=${scope.row.assessment.note}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      //提示保存成功
      scope.row.showinput = false
      scope.row.showbtn = false
      console.log("保存成功");
    }
  })
}

const handleDelete = (scope) => {
  //tableD
  fetch(`/api/assessment/delete?name=${scope.row.assessment.name}`,{
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
const handleAdd = ()=>{
  dialogFormVisible.value = true
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
  // console.log(res);
  // console.log(res.message);
  // tableData.value = reactive(res.message)
  tableData.value = res.message
  // console.log(tableData.value);
  // console.log(tableData.value.length);
  len.value = tableData.value.length
  console.log(tableData.value);
})
</script>

<style scoped>
.el-table{
  max-height: 90%;
  /*height: 100px;*/
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
.el-pagination{
  float: right;
}
.tableObj{
  padding: 100px 200px 200px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.router-link{
  color: #606266;
  text-decoration: none;
}
a{
  color: #606266;
  text-decoration: none;

}
.jumpname{
  cursor: pointer;
}
</style>
