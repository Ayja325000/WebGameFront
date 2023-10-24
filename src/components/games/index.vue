<template>
  <!-- <div>
    <div>////gameId:{{ gameId }}</div>
    <div>////playerNo:{{ playerNo }}</div>
  </div> -->
  <CatchGame v-if="gameId === 'klee_catch_nahida_0'" :data="data" />
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import CatchGame from './CatchGame.vue';
type Props = {
  gameId: string,
  playerNo: number,
  data: any
}
const props = withDefaults(defineProps<Props>(), {
  gameId: '',
  data: {},
  playerNo: -1,
})
</script>

<style scoped></style>