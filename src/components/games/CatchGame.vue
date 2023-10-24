<template>
  <!-- <div>KLEE ===> {{ dataStore.klee }}</div>
  <div>NAHIDA => {{ dataStore.nahida }}</div> -->
  <canvas id="game-canvas"></canvas>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue';
import { useCatchGameStore } from '@/stores/gameDataStore/CatchGameStore';
import imgKlee from '@/assets/GameSrc/KleeCatchNahida/images/klee.jpg';
import imgNahida from '@/assets/GameSrc/KleeCatchNahida/images/nahida.jpg';
import imgBg from '@/assets/GameSrc/KleeCatchNahida/images/background.jpg';
import { useWebSocket } from '@/utils/websocket';
import { getUserInfo } from '@/utils/localStorage';
import { debounce } from '@/utils';

const dataStore = useCatchGameStore();
// type Props = {
//   ws: {
//     this: WebSocket|null,
//     send: (data: {}) => void
//   }
// }
// const props = withDefaults(defineProps<Props>(), {
//   ws: {
//     this: null,
//     send: () => void
//   }
// })

const BOARD_WIDTH = 512;
const BOARD_HEIGHT = 512;
const KLEE_WIDTH = 64;
const KLEE_HEIGHT = 64;
const speed = BOARD_WIDTH / 2; // movement in pixels per second
// Handle keyboard controls
let keysDown: any = {};
function handleKeyDown(e: KeyboardEvent) {
  keysDown[e.keyCode] = true;
}
function handleKeyUp(e: KeyboardEvent) {
  delete keysDown[e.keyCode];
}

// WebSocket ..........
const userInfo = getUserInfo();
const handleMessage = (data: any) => {
  if (data.currentUser !== userInfo.uid) {
    if (data.name === 'klee') {
      dataStore.useKlee(data.currentUser);
      dataStore.setKlee(data.x, data.y);
    } else if (data.name === 'nahida') {
      dataStore.useNahida(data.currentUser);
      dataStore.setNahida(data.x, data.y);
    }
  }
}
const ws = useWebSocket(handleMessage, userInfo);
const send = (data: any) => {
  ws.send(data);
}
const wsSendInterval = setInterval(() => {
  let sendData = null;
  if (dataStore.klee.currentUser === userInfo.uid) {
    sendData = dataStore.klee;
  } else {
    sendData = dataStore.nahida;
  }
  if (sendData) {
    send(sendData);
  }
}, 16);

let me = '';
setTimeout(() => {
  if (dataStore.useKlee(userInfo.uid)) {
    me = 'klee';
  } else if (dataStore.useNahida(userInfo.uid)) {
    me = 'nahida';
  }
}, 1000);

onMounted(() => {
  setTimeout(() => {
    // Create the canvas
    // var canvas = document.createElement("canvas");
    const canvas: HTMLCanvasElement = document.getElementById("game-canvas")! as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    canvas.width = BOARD_WIDTH;
    canvas.height = BOARD_HEIGHT;
    // document.body.appendChild(canvas);

    // Background image
    let bgReady = false;
    const bgImage = new Image();
    bgImage.onload = function () {
      bgReady = true;
    };
    bgImage.src = imgBg;

    // klee image
    let kleeReady = false;
    const kleeImage = new Image();
    kleeImage.onload = function () {
      kleeReady = true;
    };
    kleeImage.src = imgKlee;

    // nahida image
    let nahidaReady = false;
    const nahidaImage = new Image();
    nahidaImage.onload = function () {
      nahidaReady = true;
    };
    nahidaImage.src = imgNahida;

    // Game objects
    const klee = dataStore.klee;
    const nahida = dataStore.nahida;
    let nahidasCaught = 0;


    addEventListener("keydown", handleKeyDown, false);

    addEventListener("keyup", handleKeyUp, false);

    // Reset the game when the player catches a nahida
    var reset = function () {
      // Throw the nahida somewhere on the screen randomly
      dataStore.setNahida(32 + (Math.random() * (canvas.width - 64)),
        32 + (Math.random() * (canvas.height - 64)))
    };

    const onCaught = debounce(() => {
      nahidasCaught++;
    }, 100);

    // Update game objects
    const update = function (modifier: number) {
      if (me === 'klee') {
        if (87 in keysDown) { // Player holding up
          klee.y -= speed * modifier;
        }
        if (83 in keysDown) { // Player holding down
          klee.y += speed * modifier;
        }
        if (65 in keysDown) { // Player holding left
          klee.x -= speed * modifier;
        }
        if (68 in keysDown) { // Player holding right
          klee.x += speed * modifier;
        }
        klee.x = Math.min(klee.x, BOARD_WIDTH - KLEE_WIDTH);
        klee.x = Math.max(klee.x, 0);
        klee.y = Math.min(klee.y, BOARD_HEIGHT - KLEE_HEIGHT);
        klee.y = Math.max(klee.y, 0);
      } else if (me === 'nahida') {
        if (87 in keysDown) { // Player holding up
          nahida.y -= speed * modifier * 2;
        }
        if (83 in keysDown) { // Player holding down
          nahida.y += speed * modifier * 2;
        }
        if (65 in keysDown) { // Player holding left
          nahida.x -= speed * modifier * 2;
        }
        if (68 in keysDown) { // Player holding right
          nahida.x += speed * modifier * 2;
        }

        nahida.x = Math.min(nahida.x, BOARD_WIDTH - KLEE_WIDTH);
        nahida.x = Math.max(nahida.x, 0);
        nahida.y = Math.min(nahida.y, BOARD_HEIGHT - KLEE_HEIGHT);
        nahida.y = Math.max(nahida.y, 0);
      }
      // Are they touching?
      if (
        klee.x <= (nahida.x + KLEE_WIDTH / 2)
        && nahida.x <= (klee.x + KLEE_WIDTH / 2)
        && klee.y <= (nahida.y + KLEE_HEIGHT / 2)
        && nahida.y <= (klee.y + KLEE_HEIGHT / 2)
      ) {
        if (me === 'nahida') {
          reset();
        }
        onCaught();
      }
    };

    // Draw everything
    var render = function () {
      if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
      }

      if (nahidaReady) {
        ctx.drawImage(nahidaImage, nahida.x, nahida.y);
      }

      if (kleeReady) {
        ctx.drawImage(kleeImage, klee.x, klee.y);
      }

      // Score
      ctx.fillStyle = "rgb(250, 250, 250)";
      ctx.font = "24px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Klee caught Nahida: " + nahidasCaught, 32, 32);
    };

    // The main game loop
    var main = function () {
      var now = Date.now();
      var delta = now - then;

      update(delta / 1000);
      render();

      then = now;

      // Request to do this again ASAP
      requestAnimationFrame(main);
    };

    // Cross-browser support for requestAnimationFrame
    var w = window;
    const requestAnimationFrame = w.requestAnimationFrame;
    // const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    // Let's play this game!
    var then = Date.now();
    dataStore.setKlee(canvas.width / 2, canvas.height / 2);
    reset();
    main();
  }, 1000);
});
onUnmounted(() => {
  removeEventListener('keydown', handleKeyDown, false);
  removeEventListener('keyup', handleKeyUp, false);
  clearInterval(wsSendInterval);
});
</script>

<style scoped>
#game-canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid wheat;
  border-radius: 10px;
}
</style>