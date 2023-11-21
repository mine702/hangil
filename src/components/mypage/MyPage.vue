<script setup>
import UserInfo from "./UserInfo.vue";
import MypageSlide from "../commons/MypageSlide.vue";
</script>

<template>
  <div class="my-page">
    <div class="user-info">
      <UserInfo />
    </div>
    <div class="card-form">
      내 게시물
      <MypageSlide />
    </div>
    <div class="user-picks">
      저장하고 싶은 게시물
      <MypageSlide />
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
  height: 60%;
  display: block;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 내 게시물 슬라이드 */

.user-picks {
  display: block;
  white-space: nowrap;
  height: 30%;
}
</style>
