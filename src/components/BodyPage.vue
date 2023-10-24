<template>
  <div id="body-page">
    <input type="text" class="search-input" v-model="seacrhStore.searchValue" placeholder="Search games ...">
    <button class="back-button" @click.prevent="back">BACK</button>
    <div id="games-area">
      <GameCard class="game-item" v-for="game of gameList" :data="game" :id="game.gid" :play="startPlay(game)" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, type Ref } from 'vue';
import { clearUserInfo, getUserInfo, setLocalStore } from '@/utils/localStorage'
import { useRouter } from 'vue-router';
import { ROUTERS, toRoomRouter } from '@/router';
import { debounce } from '@/utils';
import { useSearchStore } from '@/stores/stateStore';
import { gameDetailsList, type GameDetails } from '@/utils/game';
import GameCard from './GameCard.vue';
import { createRoom } from '@/apis';

const router = useRouter();
const seacrhStore = useSearchStore();
const gameList: Ref<GameDetails[]> = ref([]);
type Props = {
  back: () => void
}
const props = withDefaults(defineProps<Props>(), {
  back: () => (() => { })
})
gameDetailsList.forEach((item, index) => {
  setTimeout(() => {
    gameList.value.push(item);
  }, (index + 1) * 100);
})
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
      if (!gameList.value.find(game => game.gid === item.gid)) {
        gameList.value.push(item);
      }
    }, (index + 1) * 100);
  })
})
const startPlay = (game: GameDetails) => {
  return async () => {
    const userInfo = getUserInfo();
    const res = await createRoom({ userId: userInfo.uid, gameId: game.gid });
    if (res.status === 0) {
      const roomId = res.data.roomId;
      setLocalStore({ roomId: roomId });
      router.push(toRoomRouter(roomId, userInfo.uid));
    } else {
      console.log(res);
    }
  };
}

setTimeout(() => {
  const searchInput = document.querySelector('.search-input') as HTMLInputElement;
  if (searchInput) {
    searchInput.focus();
  } else {
    setTimeout(() => {
      const searchInput = document.querySelector('.search-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 1000)
  }
}, 300);
</script>

<style scoped>
#body-page {
  width: 100vw;
  background-color: darkblue;
  height: 100vh;
  padding: 100px;
}

.search-input {
  position: absolute;
  top: 30px;
  left: 30px;
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

#games-area {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
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