import {defineStore} from "pinia/dist/pinia";
export const accountStore = defineStore('main',{
    state:()=>({username:""}),
    getters:{
        string:(state)=>state.username
    },
    actions:{
        alterUserName(name){
            this.username = name
        }
    }
})