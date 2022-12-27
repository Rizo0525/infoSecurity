import {defineStore} from "pinia/dist/pinia";
export const threatenStore = defineStore('threaten',{
    state:()=>({threatenlen:0}),
    getters:{
        number:(state)=>state.threatenlen,
    },
    actions:{
        alterthreatenlen(threatenlen){
            this.threatenlen = threatenlen
        }
    }
})
