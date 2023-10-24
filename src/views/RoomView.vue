<template>
  <div id="room-container">
    <Game :game-id="gameInfo?.gid ?? ''" :wsData="wsData" :player-no="roomInfo?.members?.indexOf(userId)" />
    <!-- <div> -->
    <div id="roomId">Room No.: {{ roomId }}</div>
    <div id="userId">UID: {{ userId }}</div>
    <div id="network-info" v-show="network?.rtt">
      Delay: {{ network?.rtt }}ms
    </div>
    <!-- <div>____roomInfo:{{ roomInfo }}</div>
      <div>____gameInfo:{{ gameInfo }}</div>
    </div>
    <div>
      <div> ____websocketData:{{ wsData }} </div>
    </div> -->
    <StarRain />
  </div>
</template>

<script setup lang='ts'>
import { searchRoom } from '@/apis';
import { getGameInfo } from '@/utils/game';
import { getUserInfo } from '@/utils/localStorage';
import { useWebSocket } from '@/utils/websocket';
import { ref, reactive, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Game from '@/components/games/index.vue';
import StarRain from '@/components/canvasBg/StarRain.vue';
const route = useRoute();
const { roomId, userId } = route.params;
const roomInfo = ref();
const gameInfo = ref();
const wsData = ref();
const userInfo = getUserInfo();
const network = ref();
(async () => {
  let res = await searchRoom({ roomId: roomId.toString() });
  if (res.status === 0) {
    roomInfo.value = res.data;
  } else {
    roomInfo.value = {}
  }
})();
watch(() => roomInfo?.value?.gameId, (value) => {
  gameInfo.value = getGameInfo(value);
});

// const handleMessage = (data: any) => {
//   wsData.value = data;
// }
// const ws = useWebSocket(handleMessage, userInfo);
// const send = (data: any) => {
//   let msg = 'Hello World.' + Date().valueOf();
//   // wsData.value = msg;
//   ws.send(data);
// }
const getNetConditionInterval = setInterval(() => {
  // @ts-ignore
  network.value = navigator.connection ?? null;
}, 600);
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