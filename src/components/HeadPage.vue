<template>
  <div id='head-page'>
    <button @click.prevent="logout" id="logout">Logout</button>

    <button id="search-button" @click="toSearchGamePage">Search Games</button>
    <button id="roomid-button" @click="toSearchRoomPage">Search Room</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { clearUserInfo } from '@/utils/localStorage'
import { useRouter } from 'vue-router';
import { ROUTERS } from '@/router';
import { debounce } from '@/utils';

const router = useRouter();

type Props = {
  toSearchGamePage: () => void,
  toSearchRoomPage: () => void
}
const props = withDefaults(defineProps<Props>(), {
  toSearchGamePage: () => (() => { }),
  toSearchRoomPage: () => (() => { })
})

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

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid #fff;
}

button:hover {
  color: cadetblue;
  background-color: aqua;
}

button:active {
  transform: scale(0.8, 0.8);
  transition-duration: 0.4s;
}
</style>