<template>
  <div id='head-page'>
    <div id="head-page-body">

      <div class="background-decoration"></div>
      <div class="background"> </div>
      <button @click.prevent="logout" id="logout">Logout</button>
      <div class="greet-message">{{ hello }}, {{ userInfo.nickname }}.</div>

      <button id="search-button" @click="toSearchGamePage">Search Games</button>
      <button id="roomid-button" @click="toSearchRoomPage">Search Room</button>
      <div class="about">
        <div>Powered by Vue3 & Node18 & WebSocket</div>
        <div>Frontend: Vue3, Pinia, VueRouter, Canvas... | Backend: NodeJS, Express, Redis...</div>
      </div>
    </div>
    <StarRain />
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { clearUserInfo, getUserInfo } from '@/utils/localStorage'
import { useRouter } from 'vue-router';
import { ROUTERS } from '@/router';
import { debounce } from '@/utils';
import StarRain from './canvasBg/StarRain.vue';

const router = useRouter();
type Props = {
  toSearchGamePage: () => void,
  toSearchRoomPage: () => void
}
const props = withDefaults(defineProps<Props>(), {
  toSearchGamePage: () => (() => { }),
  toSearchRoomPage: () => (() => { })
})

const userInfo = getUserInfo();

function logout() {
  clearUserInfo();
  router.replace(ROUTERS.LOGIN);
}

const getGreetMessage = () => {
  let hour = new Date().getHours();
  if (hour < 4) {
    return 'Good Night';
  } else if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 18) {
    return 'Good Afternoon';
  } else if (hour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}
const hello = getGreetMessage();
onMounted(() => {
  const div = document.querySelector('.greet-message');
  if (!div) {
    return;
  }
  const str = div.textContent;
  console.log(str);
  div.innerHTML = '';
  str?.split('').forEach((cur) => {
    let span = document.createElement('span');
    span.innerHTML = cur;
    span.addEventListener('mouseenter', function () {
      span.className = 'color';
    });
    span.addEventListener('animationend', function () {
      span.className = '';
    });
    span.addEventListener('click', function () {
      span.className = 'fly';
    });
    div.appendChild(span);
  }, 0)
})
</script>

<style scoped>
#head-page {
  height: 100vh;
  width: 100vw;
  background-color: aqua;
}

#head-page-body {
  height: 100%;
  width: 100%;
  position: relative;

  .background {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-image: url('../assets/imgs/yarn-hero.webp');
    background-size: 100% 110%;
    overflow: visible;
    pointer-events: unset;
    z-index: -1;
  }

  .background-decoration {
    position: absolute;
    left: -10%;
    top: -10%;
    width: 60%;
    height: 120%;
    background-image: url('../assets/imgs/helloween.png');
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(3px);
  }
}

button {
  font-size: larger;
  font-weight: bolder;
  padding: 10px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  border: 2px solid #fff;
  text-shadow: gold 1px 0 0, red 0 1px 0, green -1px 0 0, blue 0 -1px 0;
  box-shadow: 2px 2px 5px 1px pink;
}

button:hover {
  color: cadetblue;
  background-color: aqua;
}

button:active {
  transform: scale(0.8, 0.8);
  transition-duration: 0.4s;
}

#logout {
  background-color: red;
  position: absolute;
  right: 2%;
  top: 2%;
}

#logout:hover {
  color: cadetblue;
  background-color: aqua;
}

#search-button {
  position: absolute;
  bottom: 40%;
  left: 20%;

}

#roomid-button {
  position: fixed;
  bottom: 40%;
  left: 40%;
}

.greet-message {
  position: fixed;
  left: 10%;
  top: 10%;
  z-index: 50;
}

.about {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-size: xx-small;
    color: #ccc;
  }
}
</style>


<style>
.greet-message>span {
  position: relative;
  display: inline-block;
  font-size: 80px;
  font-weight: bold;
  margin: 2px;
  color: aqua;
  text-shadow: gold 2px 0 0, red 0 2px 0, green -2px 0 0, blue 0 -2px 0;
  cursor: default;
}

.color {
  animation-name: color;
  animation-duration: 1s;
  animation-iteration-count: 2;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes color {
  0% {
    color: violet;
  }

  50% {
    color: yellow;
    transform: scale(2);
  }

  to {
    color: blueviolet;
    transform: scale(0.5);
  }
}

.fly {
  animation-name: fly;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes fly {
  to {
    color: red;
    transform: translateY(-10vh) rotateZ(3turn);
    opacity: 0.3;
  }
}
</style>