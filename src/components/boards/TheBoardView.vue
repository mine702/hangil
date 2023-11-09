<template>
  <div class="forms-container">
    <div class="board-form">
      <!-- 폼 내용 -->
    </div>
    <div class="message-form">
      <!-- 폼 내용 -->
    </div>
  </div>
</template>

<script setup>
// 스크립트 로직이 필요한 경우 여기에 추가하세요
</script>

<style scoped>
.forms-container {
  display: flex;
  flex-wrap: wrap; /* 폼이 자리를 찾지 못할 경우 줄바꿈 처리 */
  gap: 50px; /* 폼 사이의 간격 */
  margin-left: 130px; /* sidebar 너비만큼 여백 설정 */
}

.board-form,
.message-form {
  border: 1px solid black;
  border-radius: 15px;
  padding: 20px;
  flex: 1; /* flex-grow를 활용하여 가용 공간을 채움 */
  min-width: 300px; /* 최소 폼 너비 설정 */
  background-color: white;
}

.board-form {
  max-width: calc(70% - 20px); /* 최대 폼 너비 설정 */
}

.message-form {
  max-width: calc(30% - 20px); /* 최대 폼 너비 설정 */
}

@media (max-width: 768px) {
  .forms-container {
    margin-left: 0; /* 더 작은 화면에서 sidebar 여백 제거 */
  }
}

/* 기타 스타일 */
</style>
