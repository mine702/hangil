<script setup>
import { ref } from "vue";
import UserInfo from "./UserInfo.vue";
import CardForm from "../commons/CardForm.vue";

// 유저 정보 수정 모달
const showModalProfile = ref(false);
const handleToggleModal = () => {
  showModalProfile.value = !showModalProfile.value;
};
</script>

<template>
  <div class="my-page">
    <div class="user-info">
      <UserInfo @toggle-modal="handleToggleModal" />
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
  gap: 30px; /* 필요에 따라 게시물 사이의 간격 조정 */
  height: 50%;
}

/* 내 게시물 슬라이드 */

.user-picks {
  display: block;
  white-space: nowrap;
  height: 30%;
}
</style>
