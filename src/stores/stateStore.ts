import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { gameDetailsList } from '@/utils/game'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useSearchStore = defineStore('searchContent', () => {
  const searchValue = ref('');
  const roomid = ref('');
  return {
    searchValue,
    roomid
  }
})