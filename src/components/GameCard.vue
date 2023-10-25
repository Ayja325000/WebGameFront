<template>
  <div :class="`game-card ${data.type}`">
    <text class="game-title" :title="data.name">{{ data.name }}</text>
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
  box-shadow: 3px 3px 10px 3px blue;
  transition-duration: 0.5s;
}

.local {
  box-shadow: 3px 3px 10px 3px red;
}

.test {
  box-shadow: 3px 3px 10px 3px black;
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
  color: aqua;
  z-index: 50;
  cursor: default;
  font-weight: bolder;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: gold 0.5px 0 0, gold 0 0.5px 0;
}

.tags {
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
  z-index: 50;
  font-weight: bold;

  .tag {
    margin: 2px;
    background-color: rgba(100, 255, 255, 0.3);
    color: black;
    text-shadow: white 1px 0 0, white 0 1px 0, white -1px 0 0, white 0 -1px 0;
    font-size: smaller;
    padding: 0 2px 2px 2px;
    border-radius: 3px;
    border: 1px solid gold;
    box-shadow: 0 0 4px 2px aqua;
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