<template>
  <div class="game-card">
    <text class="game-title">{{ data.name }}</text>
    <img :src="data.img" class="game-coverage" />
    <text :title="data.description" class="game-description">{{ data.description }}</text>
    <button class="create-room-button" @click="play">Play</button>
    <div class="tags">
      <span class="tag" v-for="tag of data.tags.slice(0, 3)">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { GameDetails } from '@/utils/game';
import { ref, reactive } from 'vue';
type Props = {
  data: GameDetails,
  play: () => void
}
const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    gid: '',
    name: '',
    img: '',
    urlPath: '',
    type: '',
    tags: [],
    description: '',
  } as unknown as GameDetails),
  play: () => {
    window.open('', '_blank');
  }
})
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
  cursor: default;
}

.tags {
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
  z-index: 50;

  .tag {
    margin: 3px;
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    font-size: smaller;
    padding: 0 3px 3px 3px;
    border-radius: 4px;
    border: 1px solid gold;
    box-shadow: 0 0 3px 1px pink;
    cursor: default;
  }
}

.game-description {
  position: absolute;
  top: calc(var(--card-height)*0.5);
  z-index: 50;
  width: var(--card-width);
  --height: calc(var(--card-height)*0.3);
  font-size: calc(var(--height)/4);
  height: var(--height);
  padding: 5px 10px;
  color: black;
  word-break: keep-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: default;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 16px;
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
  right: 10%;
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