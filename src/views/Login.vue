<template>
  <div class="login-page">
    <div class="login-view">
      <h1>Login</h1>
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
    <PlayGame class="decoration-bg" />
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
  loginRequest({ username: username.value, password: password.value })
    .then((res) => {
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
        error.value = res.message ?? '';
      }
    });
};

const visitorLogin = async () => {
  let res = await visitorRequest({ nickname: nickname.value });
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
    error.value = res.message ?? '';
  }
}

const changeLoginType = () => {
  error.value = '';
  isVisitor.value = !isVisitor.value;
}
</script>

<style>
.login-page {
  display: flex;
  flex-direction: row-reverse;
  width: 80vw;
  justify-content: center;
}

.login-view {
  background-color: black;
  width: 300px;
  margin: auto 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  opacity: 0.8;
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 3px;
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
</style>
