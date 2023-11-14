<script setup>
import BoardCard from "../components/boards/cards/BoardCard.vue";
</script>

<template>
  <div class="forms-container">
    <div class="board-form">
      <!-- 폼 내용 -->
      <board-card />
      <board-card />
      <board-card />
    </div>
    <div class="message-form">
      <!-- 폼 내용 -->
    </div>
  </div>
</template>

<style scoped>
.forms-container {
  display: flex;
  flex-wrap: wrap; /* 폼이 자리를 찾지 못할 경우 줄바꿈 처리 */
  gap: 5%; /* 폼 사이의 간격 */
  align-items: flex-start;
  margin-top: 3%;
  margin-left: 15%; /* sidebar 너비만큼 여백 설정 */
  margin-right: 5%;
}

.board-form,
.message-form {
  border-radius: 15px;
  padding: 20px;
  flex: 1; /* flex-grow를 활용하여 가용 공간을 채움 */
  min-width: 200px; /* 최소 폼 너비 설정 */
  max-width: 200px;
  background-color: white;
}

.board-form {
  max-width: calc(50% - 20px); /* 최대 폼 너비 설정 */
}

.message-form {
  position: sticky;
  top: 40px;
  max-width: calc(30% - 20px); /* 최대 폼 너비 설정 */
}

@media (max-width: 768px) {
  .forms-container {
    margin-left: 0; /* 더 작은 화면에서 sidebar 여백 제거 */
  }
}

/* 기타 스타일 */
</style>
