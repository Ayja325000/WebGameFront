<template>
  <div class="login-page">
    <h1>Visitor Login</h1>
    <form @submit.prevent="visitorLogin" v-if="isVisitor">
      <div class="form-group">
        <label for="nickname">Please input a nickname:</label>
        <input type="text" id="nickname" v-model="nickname" required>
      </div>
      <button type="submit">Enter</button>
      <span @click.prevent="changeLoginType">Change to Login</span>
    </form>
    <form @submit.prevent="login" v-else>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <span @click.prevent="changeLoginType">Enter as a visitor...</span>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login as loginRequest, visitorLogin as visitorRequest } from '@/apis';
import { useRouter } from 'vue-router';
const isVisitor = ref(false);
const username = ref('');
const password = ref('');
const nickname = ref('');
const error = ref('');
const router = useRouter();

const login = () => {
  loginRequest({ username: username.value, password: password.value })
    .then((res) => {
      console.log(res);
      router.push({ path: '/' });
    });
};

const visitorLogin = async () => {
  let res = await visitorRequest({ nickname: nickname.value });
  console.log(res);
  router.push({ path: '/' });
}

const changeLoginType = () => {
  isVisitor.value = !isVisitor.value;
}
</script>

<style>
.login-page {
  background-color: black;
  max-width: 300px;
  margin: 0 auto;
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

span {
  font-size: smaller;
  text-decoration: underline;
  margin: 20px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
