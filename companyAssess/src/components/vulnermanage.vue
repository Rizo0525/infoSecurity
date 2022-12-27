<template>
  <div class="threatenmg">
    <div class="leftBtn">
      <el-button
          type="primary"
          @click="handleAdd()"
          style="margin-bottom: 10px"
      >添加单个威胁</el-button
      >
    </div>
    <div class="rightBtn">
      <el-button :icon="UploadFilled">上传文件</el-button>
      <el-button :icon="EditPen" disabled>计算</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="脆弱性序号"/>
      <el-table-column  label="资产序号">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.assets.id"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.assets.id}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="威胁序号">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.threaten.id"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.threaten.id}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="脆弱性类型">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.type"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.type}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column label="脆弱值">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.value"></el-input>
              </span>
          <span v-show="!scope.row.showinput">{{scope.row.value}}</span>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <div v-show="!scope.row.showbtn">
            <el-button size="small" @click="handleEdit(scope)" v-show="proStore.level===1?false:true"
            >Edit</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope)"
                v-show="proStore.level==3?true:false"
            >Delete</el-button
            >
            <span v-show="proStore.level==1?true:false">不能进行任何操作</span>
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
  <el-dialog v-model="dialogFormVisible" title="添加单个脆弱性对象">
    <el-form :model="form" ref="threatenform">
      <el-form-item label="资产序号" :label-width="formLabelWidth" prop="assets.id">
        <el-input v-model="form.assets.id" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="威胁序号" :label-width="formLabelWidth" prop="assets.id">
        <el-input v-model="form.threaten.id" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="威胁类型" :label-width="formLabelWidth" prop="type">
        <el-input v-model="form.type" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="威胁值" :label-width="formLabelWidth" prop="value">
        <el-input v-model="form.value" autocomplete="off" clearable/>
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
</template>

<script setup>
import {ref, reactive, onMounted, nextTick} from "vue";
import {projectStore} from "../stores/project";
import {vulStore} from "../stores/vul";

import {EditPen,UploadFilled} from "@element-plus/icons-vue"
import {useRouter} from "vue-router";
const router = useRouter()
const proStore = projectStore()
const vStore = vulStore()
const dialogFormVisible = ref(false)
const tableData = ref()
const len = ref()
const assetform = ref(null)
const form = reactive({
  id: null,
  type: '',
  value:null,
  status: 0,
  assessment:{},
  assets:{
    id:null
  },
  threaten:{
    id:null
  }
})
const handleEdit = (scope) => {
  //出现input框
  scope.row.showinput = true
  scope.row.showbtn = true
}

const handleAdd = ()=>{
  if(proStore.level==1){
    alert("没有权限添加")
  }else{
    dialogFormVisible.value = true
  }
}
const handleAddComfirm = ()=>{
  if(tableData.value.length===0){
    tableData.value.push({
      id: 1,
      type:form.type,
      value: form.value,
      status: 0,
      assessment:{},
      assets:{
        id:form.assets.id
      },
      threaten: {
        id:form.threaten.id
      }
    })
  }else{
    tableData.value.push({
      id: tableData.value[tableData.value.length-1].id+1,
      type:form.type,
      value: form.value,
      status: 0,
      assessment:{},
      assets:{
        id:form.assets.id
      },
      threaten: {
        id:form.threaten.id
      }
    })
  }
  console.log("form",form);
  // form.id = tableData.value[tableData.value.length-1].id+1
  // console.log(form.id);
  // console.log("tableData",tableData.value);

  fetch(`/api/vulnerable/add?assetsid=${form.assets.id}&type=${form.type}&value=${form.value}&proid=${proStore.proId}
  &threatenid=${form.threaten.id}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    if(res.status===200){
      // assetform.value.resetFields()
      //提示添加成功
      form.assets.id = null
      form.threaten.id = null
      form.type = ''
      form.value = null
    }
  })

}
const handleSave = (scope)=>{
  // console.log(scope.row.id);
  // console.log(proStore.proId);
  //存数据库
  fetch(`/api/vulnerable/alter?vulid=${scope.row.id}&type=${scope.row.type}&value=${scope.row.value}
  &proid=${proStore.proId}`,{
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
  console.log(scope.row.id);
  console.log(proStore.proId);
  //tableD
  console.log(scope.row.id);
  console.log(proStore.proId);
  fetch(`/api/vulnerable/delete?vulid=${scope.row.id}&proid=${proStore.proId}`,{
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
fetch(`/api/vulnerable/queryAll?proid=${proStore.proId}`,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  return res.json()
}).then((res)=>{
  tableData.value = res.message
  len.value = tableData.value.length
  vStore.altervullen(tableData.value.length)
  // console.log(vStore.vullen);
  console.log(tableData.value);
})
</script>

<style scoped>
.leftBtn{
  float: left;
}
.rightBtn{
  float: right;
}
.el-pagination{
  float: right;
}
</style>
