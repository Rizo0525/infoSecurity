import {defineStore} from "pinia/dist/pinia";
export const vulStore = defineStore('vul',{
    state:()=>({vullen:0}),
    getters:{
        number:(state)=>state.vullen
    },
    actions:{
        altervullen(vullen){
            this.vullen = vullen
        }
    }
})
