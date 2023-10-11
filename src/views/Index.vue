<script setup lang="ts">
import { ROUTERS } from '@/router';
import { KEYS, LOGIN_STATUS, getLocalStore } from '@/utils/localStorage';
import { useRouter } from 'vue-router';

const router = useRouter();

// check if have login
let loginStatus = getLocalStore(KEYS.LOGIN_STATUS);
console.log('loginStatus:', loginStatus);
if (!loginStatus || loginStatus === LOGIN_STATUS.NOT) {
  router.replace(ROUTERS.LOGIN);
} else {
  router.replace(ROUTERS.HOME);
}
</script>

<template>
  <main>
    HELLO!
  </main>
</template>
