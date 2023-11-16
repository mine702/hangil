<script setup>
import CardForm from "../commons/CardForm.vue";
</script>

<template>
  <div class="my-page">
    <div class="user-info"></div>
    <CardForm />
    <div class="user-picks"></div>
  </div>
</template>

<style scoped>
.my-page {
  height: 100vh;
  width: 92vw;
  margin-left: 10vw;
}

.user-info {
  display: block;
  height: 20vh;
}

.CardForm {
  width: 100vw;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px; /* 필요에 따라 게시물 사이의 간격 조정 */
  height: 45vh;
}

.user-picks {
  display: block;
  white-space: nowrap;
  height: 30vh;
}
</style>
