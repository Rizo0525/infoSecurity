<template>
  <div class="assetmg">
    <div class="leftBtn">
      <el-button
          type="primary"
          @click="handleAdd()"
          style="margin-bottom: 10px"
      >添加单个资产</el-button
      >
    </div>
    <div class="rightBtn">
<!--      <el-button :icon="UploadFilled" @click="importExcel()">上传文件</el-button>-->
<!--      <el-upload-->
<!--          class="upload-demo"-->
<!--          :on-change="handleChange"-->
<!--          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"-->
<!--      >-->
<!--      <el-button type="primary">Click to upload</el-button>-->
<!--      </el-upload>-->
      <form>
        <input type="file" name="file"/>
        <input type="submit" id="submit" value="上传" @click="importExcel()">
      </form>
      <el-button :icon="EditPen" @click="Compute()">计算</el-button>
<!--      disabled="vStore.vullen===0||thrStore.threatenlen===0?true:false"-->
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="资产序号"/>
      <el-table-column  label="资产类型">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.type"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.type}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column label="资产名">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.name"></el-input>
              </span>
          <span v-show="!scope.row.showinput">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="资产拥有人">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.person"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.person}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="secrety">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.secrety"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.secrety}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="wholeness">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.wholeness"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.wholeness}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="availability">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.availability"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.availability}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="importance">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.importance"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.importance}}</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column  label="note">
        <template #default="scope">
              <span v-show="scope.row.showinput">
                <el-input v-model="scope.row.note"></el-input>
              </span>
          <span v-show="!scope.row.showinput">
                <span>{{scope.row.note}}</span>
              </span>
        </template>
      </el-table-column>

      <el-table-column width="180">
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
                v-show="proStore.level==1?false:true"
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
  <el-dialog v-model="dialogFormVisible" title="添加单个资产对象">
    <el-form :model="form" ref="assetform">
      <el-form-item label="资产类型" :label-width="formLabelWidth" prop="type">
        <el-input v-model="form.type" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产责任人" :label-width="formLabelWidth" prop="person">
        <el-input v-model="form.person" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产保密性" :label-width="formLabelWidth" prop="secrety">
        <el-input v-model="form.secrety" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产完整性" :label-width="formLabelWidth" prop="wholeness">
        <el-input v-model="form.wholeness" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产可用性" :label-width="formLabelWidth" prop="availability">
        <el-input v-model="form.availability" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产重要性" :label-width="formLabelWidth" prop="importance">
        <el-input v-model="form.importance" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="资产备注" :label-width="formLabelWidth" prop="note">
        <el-input v-model="form.note" autocomplete="off" clearable/>
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

<script setup lang="ts">

import {ref, reactive, onMounted, nextTick} from "vue";
import {projectStore} from "../stores/project";
import {vulStore} from "../stores/vul";
import {threatenStore} from "../stores/threaten";
import {EditPen,UploadFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import * as d3 from 'd3'
import * as XLSX from 'xlsx'

import type { UploadProps, UploadUserFile } from 'element-plus'
const router = useRouter()
const proStore = projectStore()
const vStore = vulStore()
const thrStore = threatenStore()
console.log(vStore.vullen);
console.log(thrStore.threatenlen);
const dialogFormVisible = ref(false)
const tableData = ref([])
const len = ref()
// const actionUrl: string = `https://localhost:3000/assets/Upload/proid=${proStore.proId}`
// console.log(actionUrl);
const assetform = ref(null)
const form = reactive({
  id: null,
  type:'',
  name: '',
  person:'',
  note: '',
  secrety:null,
  wholeness:null,
  availability:null,
  importance:null,
  status: 0,
  assessment:{}
})

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // console.log(document.getElementsByClassName("el-upload__input")[0].value);
  console.log(uploadFile, uploadFiles);
  // const fileReader = new FileReader()
  // fileReader.onload = ev => {
  //   const workbook = XLSX.read(ev.target.result, {
  //     type: "binary"
  //   })
  //   const wsname = workbook.SheetNames[0]
  //   const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
  //   console.log('ws:',ws) // 转换成json的数据
  //   //  dealExcel(ws) ...对数据进行自己需要的操作
  //   tableData.value = ws
  // }
  // fileReader.readAsBinaryString(uploadFile)

  // importExcel(uploadFile)
}

const handleEdit = (scope) => {
  //出现input框
  scope.row.showinput = true
  scope.row.showbtn = true
}
const Compute = ()=>{
  router.push('/result')
}
const handleAdd = ()=>{
  if(proStore.level==1){
    alert("没有权限添加")
  }else{
    dialogFormVisible.value = true
  }
}
const importExcel = ()=>{
  let xhr = new XMLHttpRequest();
  let formData= new FormData(document.querySelector('form'));
  xhr.open("POST",`/api/assets/Upload?proid=${proStore.proId}`);
  xhr.send(formData);
}
const handleAddComfirm = ()=>{
    if(tableData.value.length===0){
      tableData.value.push({
        id: 1,
        type:form.type,
        name: form.name,
        person:form.person,
        note: form.note,
        secrety:form.secrety,
        wholeness:form.wholeness,
        availability:form.availability,
        importance:form.importance,
        status: 0,
        assessment:{}
      })
    }else{
      tableData.value.push({
        id: tableData.value[tableData.value.length-1].id+1,
        type:form.type,
        name: form.name,
        person:form.person,
        note: form.note,
        secrety:form.secrety,
        wholeness:form.wholeness,
        availability:form.availability,
        importance:form.importance,
        status: 0,
        assessment:{}
      })
    }

    fetch(`/api/assets/add?type=${form.type}&name=${form.name}&person=${form.person}
  &secrety=${form.secrety}&wholeness=${form.wholeness}&availability=${form.availability}
  &importance=${form.importance}&note=${form.note}&proid=${proStore.proId}`,{
      method:'get',
      credentials: 'include',
    }).then((res)=>{
      if(res.status===200){
        // assetform.value.resetFields()
        //提示添加成功
        form.name = ''
        form.note = ''
        form.type = ''
        form.person = ''
        form.secrety = null
        form.wholeness = null
        form.availability = null
        form.importance = null
      }
    })


}
const handleSave = (scope)=>{
  // console.log(scope.row);
  //存数据库
  fetch(`/api/assets/alter?type=${scope.row.type}&name=${scope.row.name}&person=${scope.row.person}
  &secrety=${scope.row.secrety}&wholeness=${scope.row.wholeness}&availability=${scope.row.availability}
  &importance=${scope.row.importance}&note=${scope.row.note}&proid=${proStore.proId}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    // console.log(res);
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
  // console.log(scope.row.id);
  // console.log(proStore.proId);
  fetch(`/api/assets/delete?id=${scope.row.id}&proid=${proStore.proId}`,{
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
onMounted(()=>{})
fetch(`/api/assets/queryAll?proid=${proStore.proId}`,{
  method:'get',
  credentials: 'include',
}).then((res)=>{
  return res.json()
}).then((res)=>{
  if(res.message.length != 0){
    tableData.value = res.message
    len.value = tableData.value.length
  }
  // console.log(tableData.value);
})
</script>

<style scoped>
.leftBtn{
  float: left;
}
.rightBtn{
  float: right;
  display: flex;
  width: 440px;
  align-items: center;
  justify-content: space-between;
}
.el-pagination{
  float: right;
}
.el-upload{
  float: right;
}
</style>
