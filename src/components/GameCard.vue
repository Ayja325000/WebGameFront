<template>
  <div class="game-card">
    <text class="game-title">{{ data.name }}</text>
    <img :src="data.img" class="game-coverage" />
    <div class="game-labels-container">
      <span v-for="label of data.type" class="game-label">
        {{ label }}
      </span>
    </div>
    <text class="game-description">{{ data.description }}</text>
    <button class="create-room-button" @click="openPage">Play</button>
  </div>
</template>

<script setup lang='ts'>
import type { GameDetails } from '@/utils/game';
import { ref, reactive } from 'vue';
type Props = {
  data: GameDetails
}
const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    gid: '',
    name: '',
    img: '',
    urlPath: '',
    type: [],
    description: '',
  } as GameDetails)
})
const openPage = () => {
  window.open(props.data.urlPath, '_blank');
}
</script>

<style scoped>
.game-card {
  --card-size: 200px;
  --card-height: calc(var(--card-size)*1);
  --card-width: calc(var(--card-size)*0.8);
  height: var(--card-height);
  width: var(--card-width);
  position: relative;
  background-color: rgba(255, 255, 255, 0.9);
  animation: appear 0.4s;
  border-radius: 10px;
  border: 1px solid gray;
  overflow: hidden;
  box-shadow: 3px 3px 10px 3px black;
  transition-duration: 0.5s;
}

.game-card:hover {
  transform: scale(1.03, 1.03);
}

.game-coverage {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--card-width);
  height: calc(var(--card-height)*0.5);
}

.game-title {
  position: absolute;
  top: calc(var(--card-height)*0.5);
  transform: translate(0, -100%);
  width: 100%;
  padding: 0 8px;
  background: linear-gradient(rgba(0, 0, 0, 0), black);
  ;
  color: whitesmoke;
  z-index: 50;
}

.game-description {
  position: absolute;
  top: calc(var(--card-height)*0.5);
  transform: translate(0, 10%);
  z-index: 50;
  width: var(--card-width);
  height: calc(var(--card-height)*0.3);
  padding: 10px;
  color: black;
  white-space: nowrap;
  /* 防止文字换行 */
  text-overflow: ellipsis;
  /* 超出部分显示省略号 */
  overflow: hidden;
  /* 隐藏溢出的文本 */
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

.create-room-button {
  position: absolute;
  bottom: calc(var(--card-height)*0.05);
  right: 10px;
  z-index: 50;
}

@keyframes appear {
  0% {
    transform: scale(0.3, 0.3) translateY(400px);
    opacity: 0;
  }

  50% {
    transform: scale(1.2, 1.2) translateY(0);
  }

  70% {
    transform: scale(1, 1);
    opacity: 1;
  }

  85% {
    transform: scale(0.9, 0.9);
  }

  100% {
    transform: scale(1, 1);
  }
}
</style>