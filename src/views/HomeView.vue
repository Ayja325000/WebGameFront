<template>
  <main>
    <div id="main">

      <Head :class="currentView === 'head' ? 'currentView' : 'backView'" v-if="show.head.value"
        :toSearchGamePage="toSearchGamePage" :toSearchRoomPage="toSearchRoomPage" />

      <Body :class="currentView === 'body' ? 'currentView' : 'backView'" v-if="show.body.value" :back="back" />
      <Room :class="currentView === 'room' ? 'currentView' : 'backView'" v-if="show.room.value" :back="back" />

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
const show: any = {};
show.head = ref(true);
show.body = ref(false);
show.room = ref(false);

watch(() => currentView.value, (value, oldValue) => {
  console.log('add', value);
  show[value].value = true;
  setTimeout(() => {
    console.log('remove', oldValue);
    show[oldValue].value = false;
  }, 1000);
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

.currentView {
  animation: 1.5s slidein;
  position: absolute;
  z-index: 10;
}

.backView {
  animation: 1.5s slideout;
  position: absolute;
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
    transform: translate3d(0, -100%, 0);
    opacity: 1;
  }

  50% {
    transform: rotate(150deg) scale(80%, 80%) translate3d(0, -100%, 0);
    opacity: 0.9;
  }

  100% {
    transform: rotate(0) scale(50%, 50%) translate3d(0, 0, 0);
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
