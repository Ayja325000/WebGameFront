<template>
  <CatchGame v-if="gameId === 'klee_catch_nahida_0'" :ws="ws" :wsHandlers="wsHandlers" :playerNo="playerNo" />
  <CatchGame v-else-if="gameId === 'snack_game_0'" :ws="ws" :wsHandlers="wsHandlers" :playerNo="playerNo" />
  <div v-else class="tips">TEST_EXAMPLE...</div>
</template>

<script setup lang='ts'>
import CatchGame from './CatchGame.vue';
type Props = {
  gameId: string,
  playerNo: number,
  ws: {
    this: WebSocket;
    send: (data: {}) => void;
  }
  wsHandlers: ((data: any) => void)[]
}
const props = withDefaults(defineProps<Props>(), {
  gameId: '',
  playerNo: -1
})
</script>

<style scoped>
.tips {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  font-weight: bolder;
}
</style>