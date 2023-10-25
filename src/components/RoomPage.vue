<template>
  <div id="room-page">
    <div class="search-bar">
      <input type="text" class="search-input" @keyup.enter="search" v-model="roomId"
        placeholder="Search room by RoomNo. ......">
      <button class="search-button" @click.prevent="search">Search</button>
    </div>
    <button class="back-button" @click.prevent="back">BACK</button>
    <div class="room-result" v-if="roomInfo.roomId">
      <div class="room-info-id">{{ searchedRoomId }}</div>
      <!-- {{ roomInfo.roomId + roomInfo.members + roomInfo.views + roomInfo.gameId }} -->
      <div class="room-info-content">
        <div class="room-info">
          <div class="room-info-players">{{ roomInfo?.members?.length ?? 0 }} Members</div>
          <div class="room-info-viewers">{{ roomInfo?.views?.length ?? 0 }} Viewing</div>
          <button class="room-button-join" @click="joinGame">Join</button>
          <button class="room-button-view" @click="viewGame">View</button>
        </div>
        <div class="game-info">
          <GameCard :data="gameInfo" :id="gameInfo?.gid ?? ''" />
        </div>
      </div>
    </div>
    <div class="room-result" v-else>
      <div class="room-info-id">{{ searchedRoomId }}</div>
      <span>No Result</span>
      <NoSearchResult />
    </div>
    <Particles class="particles-canvas" />
  </div>
</template>

<script setup lang='ts'>
import { joinRoom, searchRoom } from '@/apis';
import { getGameInfo, type GameDetails } from '@/utils/game';
import { ref, type Ref, watch } from 'vue';
import NoSearchResult from '@/components/svgs/NoSearchResult.vue';
import GameCard from './GameCard.vue';
import Particles from "@/components/canvasBg/Particals1.vue";
import { getUserInfo, setLocalStore } from '@/utils/localStorage';
import { toRoomRouter } from '@/router';
import { useRouter } from 'vue-router';
const router = useRouter();
const roomId = ref('');
const searchedRoomId = ref('');
const roomInfo: Ref<any> = ref({});
const gameInfo: Ref<GameDetails | undefined> = ref();
const userInfo = getUserInfo();
type Props = {
  back: () => void
}
const props = withDefaults(defineProps<Props>(), {
  back: () => (() => { })
})

const search = async () => {
  searchedRoomId.value = roomId.value;
  let res = await searchRoom({ roomId: roomId.value });
  if (res.status === 0) {
    roomInfo.value = res.data;
  } else {
    roomInfo.value = {}
  }
}

watch(() => roomInfo.value.gameId, (value) => {
  gameInfo.value = getGameInfo(value);
})
const joinGame = async () => {
  const res = await joinRoom({ user: JSON.stringify(userInfo), roomId: searchedRoomId.value });
  if (res.status === 0) {

    setLocalStore({ roomId: roomId });
    router.push(toRoomRouter(searchedRoomId.value, userInfo.uid));
  }
}
const viewGame = () => {

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
#room-page {
  height: 100vh;
  width: 100vw;
  background-color: violet;
  position: fixed;
  left: 0;
  top: 0;
}

.search-bar {
  position: relative;
  position: fixed;
  min-width: 40vw;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -40%);
  width: auto;
  display: flex;
  justify-content: space-around;
  z-index: 10;
}

.search-input {
  height: 2em;
  padding: 0 0.2em;
  min-width: 30vw;
  border-radius: 1.5em;
  box-shadow: 2px 2px 3px 3px gray;
  font-size: 1em;
}

button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 1em;
  font-size: 1em;
  box-shadow: 2px 2px 12px 1px gray;
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
  top: 3%;
  right: 3%;
}

.search-input,
.search-button {
  margin: 1%;
}

.room-result {
  position: relative;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
  min-width: 40%;
  min-height: 50%;
  max-width: 80%;
  max-height: 80%;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 2px 2px 12px 1px #007bff;

  .game-info {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, 5%);
    transition-duration: 1s;
  }

  .room-info-id {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3% auto;
    font-size: 1.4em;
    font-weight: bolder;
    color: rgba(50, 50, 147, 0.8);
    text-transform: uppercase;
    text-shadow: #337bff 1px 0 0, #337bff 0 1px 0;
  }

  .room-info-content {
    position: relative;
    width: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
  }

  .room-info {
    position: relative;
    width: 50%;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 80%;

    .room-info-players {
      position: absolute;
      left: 0;
      top: 25%;
      transform: translateY(-50%);
      font-size: 2em;
      color: blue;
      font-weight: bolder;
    }

    .room-info-viewers {
      position: absolute;
      left: 0;
      top: 45%;
      transform: translateY(-50%);
      font-size: 2em;
      color: green;
      font-weight: bolder;
    }

    .room-button-join {
      position: absolute;
      left: 0;
      bottom: 20%;
    }

    .room-button-view {
      position: absolute;
      right: 20%;
      bottom: 20%;
    }
  }
}

.room-result>span {
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%);
  font-size: larger;
  color: #007bff;
  opacity: 0.7;
}

.particles-canvas {
  z-index: -1;
}
</style>