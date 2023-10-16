<template>
  <main>
    <div id="main">

      <Head :class="currentView === 'head' ? 'currentView' : 'backView'" :toSearchGamePage="toSearchGamePage"
        :toSearchRoomPage="toSearchRoomPage" />

      <Body :class="currentView === 'body' ? 'currentView' : 'backView'" :back="back" />
      <Room :class="currentView === 'room' ? 'currentView' : 'backView'" :back="back" />

      <!-- <input type="text" id="search-input" v-model="seacrhStore.searchValue" placeholder="Search games ..."> -->
      <!-- <input type="text" id="roomid-input" v-model="seacrhStore.roomid" placeholder="Search room (by room No.) ..."> -->

      <!-- <button class="back-button" @click.prevent="back">BACK</button> -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Head from '@/components/HeadPage.vue';
import Body from '@/components/BodyPage.vue';
import Room from '@/components/RoomPage.vue';
import { useSearchStore } from '@/stores/stateStore';

const currentView = ref('head');
const seacrhStore = useSearchStore();

watch(() => seacrhStore.searchValue, (val) => {
  if (val !== '') {
    currentView.value = 'body';
  }
})

watch(() => seacrhStore.roomid, (val) => {
  if (val !== '') {
    currentView.value = 'room';
  }
})

function back() {
  currentView.value = 'head';
}
function toSearchGamePage() {
  currentView.value = 'body';
}
function toSearchRoomPage() {
  currentView.value = 'room';
}
</script>

<style scoped>
#main {
  position: relative;
  left: 0;
  top: 0;
  width: 100vw;
  min-height: 100vh;
}

#changeView {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
}

.currentView {
  animation: 1.2s slidein;
  position: fixed;
  z-index: 10;
}

.backView {
  animation: 1.2s slideout;
  position: fixed;
  z-index: -10;
  top: 100vh;
}

#head-page {
  height: 100%;
  width: 100%;
  background-color: aqua;
}

#body-page {
  width: 100%;
  height: 100%;
}

#room-page {
  width: 100%;
  height: 100%;
}

@keyframes slidein {
  0% {
    transform: translate3d(0, 0%, -30) scale(50%, 50%);
    opacity: 0;
  }

  5% {
    opacity: 0;
  }

  33% {
    transform: rotate(120deg) translate3d(0, 100%, 0) scale(80%, 80%);
    opacity: 0.6;
  }

  66% {
    transform: rotate(360deg) translate3d(0, -100%, 30);
    opacity: 1;
  }

  100% {
    transform: rotate(360deg) translate3d(0, -100%, 30);
    opacity: 1;
  }
}

@keyframes slideout {
  0% {
    transform: translate3d(0, 0%, 30);
    opacity: 1;
  }

  50% {
    transform: rotate(150deg) translate3d(0, -100%, 0) scale(80%, 80%);
    opacity: 0.9;
  }

  90% {
    transform: rotate(360deg) translate3d(0, 100%, -30) scale(50%, 50%);
    opacity: 0.6;
  }
}

#search-input {
  position: fixed;
  left: 100px;
  top: 20px;
  z-index: 100;
}

#roomid-input {
  position: fixed;
  left: 100px;
  top: 40px;
  z-index: 100;
}
</style>
