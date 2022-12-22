import {defineStore} from "pinia/dist/pinia";
export const projectStore = defineStore('pro',{
    state:()=>({proId:0,proName:""}),
    getters:{
        number:(state)=>state.proId,
        string:(state)=>state.proName
    },
    actions:{
        alterProjectId(id){
            this.proId = id
        },
        alterProjectname(name){
            this.proName = name
        }
    }
})
