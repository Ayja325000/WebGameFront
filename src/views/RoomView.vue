<template>
  <div>roomId:{{ roomId }}</div>
  <div>userId:{{ userId }}</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const { roomId, userId } = route.params;
</script>

<style scoped></style>