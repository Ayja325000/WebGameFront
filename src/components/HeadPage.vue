<template>
  <div id='head-page'>
    <button @click.prevent="logout" id="logout">Logout</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { clearUserInfo } from '@/utils/localStorage'
import { useRouter } from 'vue-router';
import { ROUTERS } from '@/router';
import { debounce } from '@/utils';

const router = useRouter();


function logout() {
  clearUserInfo();
  router.replace(ROUTERS.LOGIN);
}
</script>

<style scoped>
#head-page {
  height: 100vh;
  width: 100vw;
  background-color: aqua;
}
</style>