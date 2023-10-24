import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCatchGameStore = defineStore('counter', () => {
  const klee = {
    name: 'klee',
    currentUser: '',
    x: 0,
    y: 0
  };
  const nahida = {
    name: 'nahida',
    currentUser: '',
    x: 0,
    y: 0
  };
  function useKlee(uid: string) {
    if (klee.currentUser === '') {
      klee.currentUser = uid;
      return true;
    }
    return false;
  }

  function useNahida(uid: string) {
    if (nahida.currentUser === '') {
      nahida.currentUser = uid;
      return true;
    }
    return false;
  }
  function freeTheUsage(uid: string) {
    if (klee.currentUser === uid) {
      klee.currentUser = '';
    }
    if (nahida.currentUser === uid) {
      nahida.currentUser = '';
    }
  }
  function setKlee(x: number, y: number) {
    klee.x = x;
    klee.y = y;
  }
  function setNahida(x: number, y: number) {
    nahida.x = x;
    nahida.y = y;
  }
  function moveKlee(dx: number, dy: number) {
    klee.x += dx;
    klee.y += dy;
  }
  function moveNahida(dx: number, dy: number) {
    nahida.x += dx;
    nahida.y += dy;
  }

  return {
    klee, nahida,
    useKlee, useNahida,
    freeTheUsage,
    setKlee, setNahida,
    moveKlee, moveNahida
  }
})
