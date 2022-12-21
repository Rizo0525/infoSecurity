<template>
<div>
  <router-view></router-view>
</div>

</template>

<script setup>
import {useRoute,useRouter} from "vue-router"
const route = useRoute()
const router = useRouter()
router.push("/login")
// this.$router.push("/login")
</script>

<style>
</style>
