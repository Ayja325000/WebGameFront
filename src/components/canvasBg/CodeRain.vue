<template>
  <canvas id="canvas-bg" :height="height" :width="width"></canvas>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { debounce } from '@/utils';
let width = ref(window.innerWidth);
let height = ref(window.innerHeight);
window.addEventListener('resize', debounce(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
}, 50));

let canvas = document.getElementById('canvas-bg') as unknown as HTMLCanvasElement;
function tryStartCodeRain() {
  canvas = document.getElementById('canvas-bg') as unknown as HTMLCanvasElement;
  if (!canvas) {
    setTimeout(tryStartCodeRain, 300);
  } else {

    const ctx = canvas.getContext('2d')!;

    const colWidth = 12;
    const colCount = Math.floor(width.value / colWidth);

    const colNextIndexes = new Array(colCount);
    for (let i = 0; i < colCount; i++) {
      colNextIndexes[i] = -Math.floor(Math.random() * colCount);
    }

    function draw() {
      // console.log("Render CodeRain...");
      drawMask();
      const fz = colWidth;
      ctx.fillStyle = getRandomColor();
      ctx.font = `${fz}px "Roboto Mono"`;
      for (let i = 0; i < colCount; i++) {
        const x = i * colWidth;
        const y = fz * colNextIndexes[i]++;
        ctx.fillText(getRandomChar(), x, y);
        if (y > height.value && Math.random() > 0.8) {
          colNextIndexes[i] = 0;
        }
      }
      if (document.getElementById('canvas-bg') !== null) {
        requestAnimationFrame(draw);
      }
    }

    function drawMask() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, width.value, height.value);
    }

    function getRandomColor() {
      const fontColors = [
        '#33B5E5', '#0099CC', '#AA66CC',
        '#9933CC', '#99CC00', '#669900',
        '#FFBB33', '#FF8800', '#FF4444',
        '#CC0000'
      ];
      return fontColors[Math.floor(Math.random() * fontColors.length)];
    }

    function getRandomChar() {
      const str = '!@#$%^&*()_+-=<>?;:\[]{}￥…“”·qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
      return str[Math.floor(Math.random() * str.length)];
    }

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, width.value, height.value);

    draw();
  }
}
tryStartCodeRain();
</script>

<style scoped>
#canvas-bg {
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: -999;
}
</style>