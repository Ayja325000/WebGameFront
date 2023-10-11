<template>
  <div id="body-page">
    <input type="text" id="search-input-1" v-model="seacrhStore.searchValue" placeholder="Search games ...">
    <input type="text" id="search-input-2" v-model="seacrhStore.roomid" placeholder="Search games ...">
    <div id="games-area">
      <div v-for="game of gameList">
        {{ JSON.stringify(game) }}
      </div>
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

const router = useRouter();
const seacrhStore = useSearchStore();
const gameList: Ref<GameDetails[]> = ref(gameDetailsList);

watch(() => seacrhStore.searchValue, (val) => {
  gameList.value = gameDetailsList.filter(item => {
    return [item.name, item.type.toString(), item.description].filter(str => str.indexOf(seacrhStore.searchValue) !== -1).length > 0;
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
</style>