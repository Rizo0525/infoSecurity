<template>
  <div class="filre">
    <div class="risktable">
      <h2>资产风险值表</h2>
      <el-table :data="tableData" style="width: 100%" border height="200">
        <!--      <el-table-column prop="id" label="序号"/>-->
        <el-table-column  label="资产名称">
          <template #default="scope">
            <span>{{scope.row.vul.assets.name}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="重要性赋值">
          <template #default="scope">
            <span>{{scope.row.vul.assets.importance}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="威胁">
          <template #default="scope">
            <span>{{scope.row.vul.threaten.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="威胁赋值">
          <template #default="scope">
            <span>{{scope.row.vul.threaten.value}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="脆弱性">
          <template #default="scope">
            <span>{{scope.row.vul.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="脆弱性赋值">
          <template #default="scope">
            <span>{{scope.row.vul.value}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="可能性">
          <template #default="scope">
            <span>{{scope.row.possibility}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="损失">
          <template #default="scope">
            <span>{{scope.row.los}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="风险值">
          <template #default="scope">
            <span>{{scope.row.risk}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="myChart"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive,onMounted} from "vue";
import {projectStore} from "../../stores/project";
import * as echarts from 'echarts'
const proStore = projectStore()
const tableData = ref()

onMounted(()=>{
  fetch(`/api/calculate/getResult?proid=${proStore.proId}`,{
    method:'get',
    credentials: 'include',
  }).then((res)=>{
    return res.json()
  }).then((res)=>{
    tableData.value = res.message
    console.log(tableData.value);
    let riskdata = [
      { value: 0, name: '极低风险' },
      { value: 0, name: '低风险' },
      { value: 0, name: '中风险' },
      { value: 0, name: '高风险' },
      { value: 0, name: '极高风险' },
    ]
    tableData.value.forEach((value,index)=>{
      if(value.grade === 1){
        riskdata[0].value +=1
      }
      else if(value.grade === 2){
        riskdata[1].value +=1
      }
      else if(value.grade === 3){
        riskdata[2].value +=1
      }
      else if(value.grade === 4){
        riskdata[3].value +=1
      }
      else if(value.grade === 5){
        riskdata[4].value +=1
      }
    })
    let myChart = echarts.init(document.querySelector(".myChart"))
    // let myChart = this.$echarts.init(document.getElementById("myChart"))
    var option;
    option = {
      title: {
        text: '风险等级种类',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '风险等级种类',
          type: 'pie',
          radius: '50%',
          data: riskdata,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  })
})



</script>

<style scoped>
.filre{
  text-align: center;
}
.risktable{
  text-align: center;
  margin: 10px;
}
.myChart{
  width: 800px;
  height: 400px;
  margin: 0 auto;
}
</style>
