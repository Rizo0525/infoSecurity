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
            <el-button size="small" @click="handleEdit(scope)" v-show="scope.row.level===1?false:true"
            >Edit</el-button
            >
            <el-button v-show="scope.row.level==3?true:false"
                size="small"
                type="danger"
                @click="handleDelete(scope)"
            >Delete</el-button
            >
            <el-button size="small" @click="addUser(scope)" v-show="scope.row.level==3?true:false"
            >协作人管理</el-button
            >
            <span v-show="scope.row.level==1?true:false">不能进行任何操作</span>
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
  <el-dialog v-model="dialogFormVisible1" title="协作人管理">
    <el-form :model="colborateForm">
      <el-form-item label="评估对象名称" :label-width="formLabelWidth">
<!--        <el-input v-model="colborateForm.name" autocomplete="off" clearable/>-->
        <span>{{colborateForm.assessment.name}}</span>
      </el-form-item>
      <el-form-item label="当前已有协作人" :label-width="formLabelWidth">
        <el-table :data="colborator" style="width: 100%" border height="150">
<!--          <el-table-column prop="user.id" label="用户序号"/>-->
          <el-table-column  label="用户等级">
            <template #default="scope">
              <span v-show="scope.row.showinput1">
                <el-input v-model="scope.row.level"></el-input>
              </span>
              <span v-show="!scope.row.showinput1">
                <span>{{scope.row.level}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column  label="用户名">
            <template #default="scope">
              <span>{{scope.row.user.username}}</span>
            </template>
          </el-table-column>
          <el-table-column width="180">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <div v-show="!scope.row.showbtn1">
                <el-button size="small" @click="handleEdit1(scope)" v-show="scope.row.level===3?false:true"
                >Edit</el-button
                >
                <el-button
                           size="small"
                           type="danger"
                           @click="handleDelete1(scope)"
                           v-show="scope.row.level===3?false:true"
                >Delete</el-button
                >
                <span v-show="scope.row.level===3?true:false">无法操作</span>
              </div>
              <div v-show="scope.row.showbtn1">
                <el-button size="small" type="danger" @click="handleSave1(scope)">save</el-button>
                <el-button size="small" type="warning" @click="handleCancel1(scope)">cancel</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="添加用户" :label-width="formLabelWidth">
        <el-row :gutter="24">
          <el-col span="8">
            <el-input v-model="colborateForm.level" autocomplete="off" clearable placeholder="输入添加用户等级<3"/>
          </el-col>
          <el-col span="8">
            <el-input v-model="colborateForm.user.username" autocomplete="off" clearable placeholder="输入添加用户名"/>
          </el-col>
          <el-col span="8">
            <el-button type="primary" @click="addUserLevel()">
              添加
            </el-button>
          </el-col>
        </el-row>

<!--        <span>{{colborateForm.name}}</span>-->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {projectStore} from "../stores/project";
import {useRouter} from "vue-router";

const proStore = projectStore()
const router = useRouter()
const tableData = ref([])
const colborator = ref()
const len = ref()
const search = ref('')
const dialogFormVisible = ref(false)
const dialogFormVisible1 = ref(false)
const formLabelWidth = '140px'


const JumpTo = (scope)=>{
  proStore.alterProjectId(scope.row.assessment.id)
  proStore.alterProjectname(scope.row.assessment.name)
  proStore.alterProjectLevel(scope.row.level)
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
const colborateForm = reactive({
  id:'',
  cob:'',
  level:null,
  status:0,
  user:{
    id:null,
    username:''
  },
  assessment:{
    name:''
  }
})
const addUserLevel = ()=>{
  // console.log(colborateForm.assessment.name);
  // console.log(colborateForm.level);
  // console.log(colborateForm.user.username);
  fetch(`/api/assessment/addMembers?name=${colborateForm.assessment.name}
  &username=${colborateForm.user.username}&memberlevel=${colborateForm.level}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      //提示添加成功
      colborator.value.push({
        id:'',
        cob:'',
        level:colborateForm.level,
        status:0,
        user:{
          id:null,
          username:colborateForm.user.username
        },
        assessment:{
          name:colborateForm.assessment.name
        }
      })
      colborateForm.level = null
      colborateForm.user.username = ''
    }
  })
}
const addUser = (scope)=>{
  // console.log(scope.row.assessment.name);
  colborateForm.assessment.name = scope.row.assessment.name
  // console.log(scope.row.assessment.id);
  dialogFormVisible1.value = true
  fetch(`/api/permission/queryAllHelper?proid=${scope.row.assessment.id}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    return res.json()
  }).then((res)=>{
    if(res.result==="请求成功"){
      // console.log(res.message);
      colborator.value = res.message
    }
  })
}
const handleAddComfirm = ()=>{
  // console.log(form.name);
  console.log(tableData.value);
  console.log(tableData.value.length);
  if(tableData.value.length===0){
    tableData.value.push({
      assessment:{
        id:1,
        name:form.name,
        note:form.note,
        state:form.state,
        status:0
      },
      id:1,
      level:3,
      status:0,
      user:{
        id:3,
        username:"lan"
      }
    })
  }else{
    tableData.value.push({
      assessment:{
        id:tableData.value[tableData.value.length-1].assessment.id+1,
        name:form.name,
        note:form.note,
        state:form.state,
        status:0
      },
      id:tableData.value[tableData.value.length-1].id+1,
      level:3,
      status:0,
      user:{
        id:3,
        username:"lan"
      }
    })
  }


  fetch(`/api/assessment/add?name=${form.name}&note=${form.note}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    console.log(res);
    if(res.status===200){
      //提示添加成功
      form.name = ''
      form.note = ''
      console.log("添加成功");
    }
  })

}
const handleEdit1 = (scope) => {
  scope.row.showinput1 = true
  scope.row.showbtn1 = true
}
const handleEdit = (scope) => {
  //出现input框
  scope.row.showinput = true
  scope.row.showbtn = true
}
const handleSave = (scope)=>{
  // console.log(scope.row.assessment.name);
  // console.log(scope.row.assessment.id);

  //存数据库
  fetch(`/api/assessment/alter?proid=${scope.row.assessment.id}&name=${scope.row.assessment.name}&note=${scope.row.assessment.note}`,{
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
const handleSave1 = (scope)=>{
  console.log(scope.row.assessment.id);
  console.log(scope.row.id);
  console.log(scope.row.level);
  fetch(`/api/permission/alter?proid=${scope.row.assessment.id}&id=${scope.row.id}
  &memberlevel=${scope.row.level}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      //提示保存成功
      scope.row.showinput1 = false
      scope.row.showbtn1 = false
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
const handleDelete1 = (scope) => {
  console.log(scope.row.assessment.id);
  console.log(scope.row.id);
  //tableD
  fetch(`/api/permission/delete?proid=${scope.row.assessment.id}&id=${scope.row.id}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      //提示删除成功
      colborator.value.splice(scope.$index,1)
    }
  })
  //删除
}
const handleCancel = (scope)=>{
  scope.row.showinput = false
  scope.row.showbtn = false
}
const handleCancel1 = (scope)=>{
  scope.row.showinput1 = false
  scope.row.showbtn1 = false
}
const handleAdd = ()=>{
  dialogFormVisible.value = true
}
onMounted(()=>{
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
    if(res.result==="请求成功"){
      // alert("请求成功")
      if(res.message.length!=0){
        tableData.value = res.message
        len.value = tableData.value.length
      }
    }else if(res.result==="网络错误"){
      alert("网络错误")
    }
    console.log(res);

  })
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
