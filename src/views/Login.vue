<template>
  <div class="login-page">
    <div class="login-view">
      <h1 class="title">Login</h1>
      <form @submit.prevent="visitorLogin" v-if="isVisitor" class="login-form">
        <div class="form-group">
          <label for="nickname">Please input a nickname:</label>
          <input type="text" id="nickname" v-model="nickname" required>
        </div>
        <button type="submit">Enter</button>
        <span @click.prevent="changeLoginType">Change to User Login.</span>
      </form>
      <form @submit.prevent="login" v-else class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
        <span @click.prevent="changeLoginType">Change to visitor Login.</span>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <div class="bg-decoration"></div>
  </div>
  <CodeRain />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login as loginRequest, visitorLogin as visitorRequest } from '@/apis';
import { useRouter } from 'vue-router';
import CodeRain from '@/components/canvasBg/CodeRain.vue';
import { KEYS, LOGIN_STATUS, setLocalStore } from '@/utils/localStorage';
import { ROUTERS } from '@/router';
import PlayGame from '@/components/svgs/PlayGame.vue';

const isVisitor = ref(false);
const username = ref('');
const password = ref('');
const nickname = ref('');
const error = ref('');
const router = useRouter();

const login = () => {
  const timer = setTimeout(() => {
    error.value = 'Login Failed.';
  }, 1000);
  loginRequest({ username: username.value, password: password.value })
    .then((res) => {
      clearTimeout(timer);
      if (res.status === 0) {
        console.log(res);
        setLocalStore({
          [KEYS.LOGIN_STATUS]: LOGIN_STATUS.VISITOR,
          [KEYS.UID]: res.data.uid,
          [KEYS.NICK_NAME]: res.data.nickname,
          [KEYS.USER_NAME]: res.data.username
        });
        router.push({ path: ROUTERS.HOME });
      } else {
        error.value = res.message ?? 'Login Failed.';
      }
    });
};

const visitorLogin = async () => {
  const timer = setTimeout(() => {
    error.value = 'Login Failed.';
  }, 1000);
  let res = await visitorRequest({ nickname: nickname.value });
  if (res) {
    clearTimeout(timer);
  }
  if (res.status === 0) {
    console.log(res);
    setLocalStore({
      [KEYS.LOGIN_STATUS]: LOGIN_STATUS.VISITOR,
      [KEYS.UID]: res.data.visitorId,
      [KEYS.NICK_NAME]: res.data.nickname,
      [KEYS.USER_NAME]: res.data.nickname
    });
    router.push({ path: ROUTERS.HOME });
  } else {
    error.value = res.message ?? 'Login Failed.';
  }
}

const changeLoginType = () => {
  error.value = '';
  isVisitor.value = !isVisitor.value;
  setTimeout(() => {
    document.querySelector('input')?.focus();
  }, 200);
}
</script>

<style>
.title {
  color: #007bff;
  font-size: 36px;
  font-weight: bolder;
  text-shadow: gold 2px 0 0, gold 0 2px 0;
}

.login-page {
  display: flex;
  flex-direction: row-reverse;
  width: 80vw;
  justify-content: center;
}

.login-view {
  animation: show 1s linear 0.2s;
  position: absolute;
  left: 0;
  top: 40%;
  transform: translate(30%, -50%);
  background-color: #623a62;
  width: 300px;
  margin: auto 0;
  padding: 20px;
  border: 5px solid #ccc;
  border-radius: 35px;
  text-align: center;
  box-shadow: 2px 2px 10px 2px yellow;
  opacity: 0.8;
}

@keyframes show {
  0% {
    transform: scale(0, 0);
  }

  50% {
    transform: scale(2, 2);
  }
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bolder;
  font-size: larger;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 15px;
  box-shadow: 2px 2px 6px 2px #007bff;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: 2px solid pink;
  cursor: pointer;
  border-radius: 3px;
  font-weight: bolder;
  border-radius: 18px;
  text-shadow: gold 1px 0 0, gold 0 1px 0;
  box-shadow: 2px 2px 4px 2px #ff7b00;
}

.login-form>span {
  font-size: smaller;
  text-decoration: underline;
  margin: 20px;
  cursor: pointer;
}

.error {
  color: red;
}

.decoration-bg {
  mix-blend-mode: lighten;
}

.bg-decoration {
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
</style>
