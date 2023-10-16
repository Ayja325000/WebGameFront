<template>
  <div id="room-page">
    <input type="text" class="search-input" @keyup.enter="search" v-model="roomId"
      placeholder="Search room by roomID ...">
    <button class="search-button" @click.prevent="search">Search</button>
    <button class="back-button" @click.prevent="back">BACK</button>
    <div class="room-result" v-show="true">
      {{ roomInfo }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import { searchRoom } from '@/apis';
import { ref, reactive } from 'vue';
const roomId = ref('');
const roomInfo = ref({});
type Props = {
  back: () => void
}
const props = withDefaults(defineProps<Props>(), {
  back: () => (() => { })
})

const search = async () => {
  let res = await searchRoom({ roomId: roomId.value });
  if (res.status === 0) {
    roomInfo.value = res.data;
  } else {
    roomInfo.value = {}
  }
}
</script>

<style scoped>
#room-page {
  height: 100vh;
  width: 100vw;
  background-color: violet;
}

.search-input {
  margin: 30px;
  height: 30px;
  padding: 0 10px;
  min-width: 400px;
  max-width: 600px;
  border-radius: 15px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}

button:hover {
  color: cadetblue;
  background-color: aqua;
}

button:active {
  transform: scale(0.8, 0.8);
  transition-duration: 0.4s;
}

.back-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.search-input {
  margin: 20px;
}
</style>