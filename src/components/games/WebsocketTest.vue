<template>
  <div id="web-socket-displayer">
    <div v-for="msg of messages">
      {{ msg }}
    </div>
  </div>
  <button @click="send">Send</button>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { getUserInfo } from '@/utils/localStorage'
import { useWebSocket } from '@/utils/websocket';
const messages = ref<string[]>([]);
const userInfo = getUserInfo();

const handleMessage = (data: any) => {
  messages.value.push('Server:', data);
}
const ws = useWebSocket(handleMessage, userInfo);
const send = () => {
  let msg = 'Hello World.';
  messages.value.push('Me: ' + msg);
  ws.send({
    msg: msg
  });
}
</script>

<style scoped></style>