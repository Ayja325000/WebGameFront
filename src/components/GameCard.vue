<template>
  <div class="game-card" @click="openPage">
    <text class="game-title">{{ data.name }}</text>
    <img :src="data.img" class="game-coverage" />
    <div class="game-labels-container">
      <span v-for="label of data.type" class="game-label">
        {{ label }}
      </span>
    </div>
    <text class="game-description">{{ data.description }}</text>
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
  transform: translate(10px, -110%);
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