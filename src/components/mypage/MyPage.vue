<script setup>
import UserInfo from "./UserInfo.vue";
import CardForm from "../commons/CardForm.vue";
</script>

<template>
  <div class="my-page">
    <div class="user-info">
      <UserInfo />
    </div>
    <div class="card-form">
      내 게시물
      <CardForm />
    </div>
    <div class="user-picks">
      저장하고 싶은 게시물
      <CardForm />
    </div>
  </div>
</template>

<style scoped>
.my-page {
  height: 100vh;
  width: 92vw;
  margin-left: 8vw;
  font-size: 20px;
}

.user-info {
  display: block;
  height: 20%;
}

.card-form {
  width: 100%;
  display: block;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 60%;
}

/* 내 게시물 슬라이드 */

.user-picks {
  display: block;
  white-space: nowrap;
  height: 30%;
}
</style>
