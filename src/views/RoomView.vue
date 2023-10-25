<template>
  <div id="room-container">
    <Game :game-id="gameInfo?.gid ?? ''" :ws="ws" :wsHandlers="messageHandlers" :player-no="playerNo" />
    <!-- <div> -->
    <div id="roomId">Room No.: {{ roomId }}</div>
    <div id="userId">UID: {{ userId }}</div>
    <div id="roomInfo">
      <div v-for="member, index of roomInfo?.members ?? []"
        :class="`player-id${member.uid === userInfo.uid ? ' self-id' : ''}`">
        P{{ index }}: {{ member === userInfo.uid ? '(You)' : '' }} {{ member.nickname }}
      </div>
    </div>
    <div id="network-info">
      Delay: {{ rtt ?? '--' }}ms
    </div>
    <StarRain />
  </div>
</template>

<script setup lang='ts'>
import { searchRoom } from '@/apis';
import { getGameInfo } from '@/utils/game';
import { getUserInfo } from '@/utils/localStorage';
import { useWebSocket } from '@/utils/websocket';
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Game from '@/components/games/index.vue';
import StarRain from '@/components/canvasBg/StarRain.vue';

const route = useRoute();
const { roomId, userId } = route.params;
const roomInfo = ref();
const gameInfo = ref();
const userInfo = getUserInfo();
const rtt = ref();
const playerNo = ref(-1);

watch(() => roomInfo?.value?.gameId, (value) => {
  gameInfo.value = getGameInfo(value);
});
watch(() => roomInfo?.value?.members, (val) => {
  if (!val) {
    return;
  }
  console.log('members', val);
  console.log('user', userInfo.uid);
  playerNo.value = val.map((member: any) => member.uid).indexOf(userInfo.uid);
})
const messageHandlers: ((data: any) => void)[] = [];
const ws = useWebSocket(messageHandlers, { userInfo: JSON.stringify(userInfo) });
const updateRoomInfo = (data: any) => {
  if (data.messageTag !== 'update-room-info') {
    return;
  }
  if (data.uid === userInfo.uid) {
    return;
  }
  roomInfo.value.members = data.roomInfo.members;
}
const chatHandler = (data: any) => {
  if (data.messageTag !== 'chat') {
    return;
  }
}
messageHandlers.push(updateRoomInfo);
const getNetConditionInterval = setInterval(() => {
  // @ts-ignore
  rtt.value = (navigator?.connection?.rtt ?? null);
}, 600);

(async () => {
  let res = await searchRoom({ roomId: roomId.toString() });
  if (res.status === 0) {
    roomInfo.value = res.data;
    ws.send({ roomInfo: res.data, messageTag: 'update-room-info' });
  } else {
    roomInfo.value = {};
  }
})();

onUnmounted(() => { clearInterval(getNetConditionInterval); });
</script>

<style scoped>
#room-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
}

#roomInfo {
  max-width: 25vw;
  height: 100vh;
  z-index: 10;

  .player-id {
    position: sticky;
    max-width: 100%;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    font-weight: bolder;
    color: blueviolet;
    font-size: 1.2em;
    margin: 0.2em 0.5em;
    text-shadow: black 1px 0 0, black -1px 0 0, black 0 1px 0, black 0 -1px 0;
    opacity: 0.8;
  }

  .self-id {
    color: yellow;
  }
}

#roomId {
  position: fixed;
  z-index: 100;
  right: 5px;
  top: 5px;
  color: white;
  opacity: 0.8;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  font-weight: bold;
}

#userId {
  position: fixed;
  z-index: 100;
  right: 5px;
  bottom: 5px;
  color: white;
  opacity: 0.8;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  font-weight: bold;
}

#network-info {
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 2px;
  transform: translateX(-50%);
  color: black;
  background-color: gray;
  opacity: 0.6;
  text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
  padding: 0 5px;
  border-radius: 5px;
  font-weight: bold;
}
</style>