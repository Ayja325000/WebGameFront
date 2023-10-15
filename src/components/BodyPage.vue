<template>
  <div id="body-page">
    <input type="text" id="search-input-1" v-model="seacrhStore.searchValue" placeholder="Search games ...">
    <input type="text" id="search-input-2" v-model="seacrhStore.roomid" placeholder="Search games ...">
    <div id="games-area">
      <GameCard class="game-item" v-for="game of gameList" :data="game" :id="game.name" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, type Ref } from 'vue';
import { clearUserInfo } from '@/utils/localStorage'
import { useRouter } from 'vue-router';
import { ROUTERS } from '@/router';
import { debounce } from '@/utils';
import { useSearchStore } from '@/stores/stateStore';
import { gameDetailsList, type GameDetails } from '@/utils/game';
import GameCard from './GameCard.vue';

const router = useRouter();
const seacrhStore = useSearchStore();
const gameList: Ref<GameDetails[]> = ref(gameDetailsList);

watch(() => seacrhStore.searchValue, (val) => {
  const filterList = gameList.value.filter(item => {
    return [item.name, item.type.toString(), item.description].filter(str => str.indexOf(seacrhStore.searchValue) !== -1).length > 0;
  })
  gameList.value = filterList;
  const existGames = filterList.map(item => item.name);
  const newList = gameDetailsList.filter(item => {
    if (existGames.indexOf(item.name) !== -1) {
      return false;
    }
    return [item.name, item.type.toString(), item.description].filter(str => str.indexOf(seacrhStore.searchValue) !== -1).length > 0;
  })
  newList.forEach((item, index) => {
    setTimeout(() => {
      gameList.value.push(item);
    }, (index + 1) * 100);
  })
})

</script>

<style scoped>
#body-page {
  width: 100vw;
  background-color: darkblue;
  height: 100vh;
  padding: 100px;
}

#games-area {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  padding: auto;
  /* 设置为wrap，使项目自动换行 */
  justify-content: flex-start;
  /* 项目水平靠左对齐 */
  align-items: flex-start;
  /* 项目垂直靠上对齐 *
  /* 容器的宽度，可以根据需要进行调整 */
  border: 1px solid #000;
  height: 85vh;
  overflow-y: scroll;
  scrollbar-width: none;
  /* 隐藏滚动条（Firefox） */
  -ms-overflow-style: none;
  /* 隐藏滚动条（IE） */
}

#games-area::-webkit-scrollbar {
  width: 0;
  /* 隐藏滚动条（WebKit，Chrome，Safari等） */
}

.game-item {
  margin: 20px;
}
</style>