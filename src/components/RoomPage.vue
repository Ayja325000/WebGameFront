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
import { ref, reactive, type Ref, watch } from 'vue';
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
  const res = await joinRoom({ userId: userInfo.uid, roomId: searchedRoomId.value });
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
}

.search-bar {
  position: relative;
  position: fixed;
  min-width: 530px;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -40%);
  width: auto;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  z-index: 10;
}

.search-input {
  height: 30px;
  padding: 0 10px;
  width: 400px;
  border-radius: 15px;
  box-shadow: 2px 2px 3px 3px gray;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;
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
  top: 20px;
  right: 20px;
}

.search-input,
.search-button {
  margin: 10px;
}

.room-result {
  position: relative;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
  width: 500px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 2px 2px 12px 1px #007bff;

  .game-info {
    position: absolute;
    left: 8%;
    top: 55%;
    transform: translate(0, -50%);
    transition-duration: 1s;
  }

  .room-info-id {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    font-weight: bolder;
    color: rgba(50, 50, 147, 0.8);
    text-transform: uppercase;
  }

  .room-info {
    position: absolute;
    right: 8%;
    top: 55%;
    transform: translate(0, -50%);
    width: 45%;
    height: 80%;

    .room-info-players {
      position: absolute;
      left: 16%;
      top: 25%;
      transform: translateY(-50%);
      font-size: 24px;
      color: blue;
    }

    .room-info-viewers {
      position: absolute;
      left: 16%;
      top: 45%;
      transform: translateY(-50%);
      font-size: 24px;
      color: green;
    }

    .room-button-join {
      position: absolute;
      left: 16%;
      bottom: 10%;
    }

    .room-button-view {
      position: absolute;
      right: 16%;
      bottom: 10%;
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