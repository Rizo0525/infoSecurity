<template>
  Hi,{{store.username}}
  <el-icon size="16px"><ArrowDown /></el-icon>
</template>

<script>
import {accountStore} from "../stores/account";

export default {
  name: "UserLogout",
  setup(){
    const store = accountStore()

    return {store}
  }
}
</script>

<style scoped>

</style>
