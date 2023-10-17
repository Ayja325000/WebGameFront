<template>
  <div id='head-page'>
    <div id="head-page-body">

      <div class="background"></div>
      <button @click.prevent="logout" id="logout">Logout</button>

      <button id="search-button" @click="toSearchGamePage">Search Games</button>
      <button id="roomid-button" @click="toSearchRoomPage">Search Room</button>
    </div>
    <StarRain />
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import { clearUserInfo } from '@/utils/localStorage'
import { useRouter } from 'vue-router';
import { ROUTERS } from '@/router';
import { debounce } from '@/utils';
import StarRain from './canvasBg/StarRain.vue';

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

#head-page-body {
  height: 100%;
  width: 100%;
  position: relative;

  .background {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-image: url('../assets/imgs/yarn-hero.webp');
    background-size: 100% 110%;
    overflow: visible;
    pointer-events: unset;
    z-index: -1;
  }
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