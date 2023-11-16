<script setup>
import $ from "jquery";
import CommonCard from "../commons/CommonCard.vue";
$(function () {
  var $sidebar = $(".message-form"),
    $window = $(window),
    offset = $sidebar.offset();
  $window.scroll(function () {
    if ($window.scrollTop() > offset.top) {
      $sidebar.stop().animate({
        marginTop: $window.scrollTop() + 30,
      });
    } else {
      $sidebar.stop().animate({
        marginTop: 0,
      });
    }
  });
});
</script>

<template>
  <div class="forms-container">
    <div class="board-form">
      <!-- 폼 내용 -->
      <CommonCard />
      <CommonCard />
      <CommonCard />
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
  margin-left: 20%; /* sidebar 너비만큼 여백 설정 */
  margin-right: 5%;
  margin-bottom: 3%;
}

.board-form,
.message-form {
  border-radius: 15px;
  padding: 20px;
  flex: 1; /* flex-grow를 활용하여 가용 공간을 채움 */
  min-width: 200px; /* 최소 폼 너비 설정 */
  max-width: 200px;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.3);
  color: #626567;
}

.board-form {
  max-width: calc(50% - 20px); /* 최대 폼 너비 설정 */
}

.message-form {
  top: 40px;
  max-width: calc(30% - 20px); /* 최대 폼 너비 설정 */
}

@media (max-width: 768px) {
  .forms-container {
    margin-left: 0; /* 더 작은 화면에서 sidebar 여백 제거 */
  }
}
.board-form:hover,
.message-form:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  /* 약간 위로 떠오르는 듯한 효과 */
  transform: translateY(-3px);
}

/* 기타 스타일 */
</style>
