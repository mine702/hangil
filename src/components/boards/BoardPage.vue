<script setup>
import { ref } from "vue";

import $ from "jquery";
import CommonCard from "../commons/CommonCard.vue";
import MessageForm from "./forms/MessageForm.vue";
import CardModal from "../commons/modal/CardModal.vue";

const isModalVisible = ref(false); // 모달 표시 상태

const handleCardClick = () => {
  isModalVisible.value = true; // 모달 표시 상태 토글
};

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
    <!-- 폼 내용 -->
    <div class="board-form">
      <!-- 폼 내용 -->
      <CommonCard @click="handleCardClick" />
      <CommonCard @click="handleCardClick" />
      <CommonCard @click="handleCardClick" />
      <CommonCard @click="handleCardClick" />
    </div>
    <MessageForm class="message-form" />
  </div>
  <!-- 모달, isModalVisible이 true일 때만 표시 -->
  <transition name="modal">
    <div class="modal-overlay" v-if="isModalVisible">
      <CardModal @closeModal="isModalVisible = false" />
    </div>
  </transition>
</template>

<style scoped>
.forms-container {
  display: flex;
  flex-wrap: wrap;
  /* 폼이 자리를 찾지 못할 경우 줄바꿈 처리 */
  gap: 18%;
  /* 폼 사이의 간격 */
  align-items: flex-start;
  margin-top: 3%;
  margin-left: 20%;
  /* sidebar 너비만큼 여백 설정 */
  margin-right: 5%;
  margin-bottom: 3%;
}

.board-form {
  border-radius: 15px;
  padding: 20px;
  flex: 1;
  /* flex-grow를 활용하여 가용 공간을 채움 */
  min-width: 200px;
  /* 최소 폼 너비 설정 */
  max-width: 200px;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.3);
  color: #626567;
}

.board-form {
  max-width: calc(50% - 20px);
  /* 최대 폼 너비 설정 */
}

@media (max-width: 768px) {
  .forms-container {
    margin-left: 0;
    /* 더 작은 화면에서 sidebar 여백 제거 */
  }
}

.board-form:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  /* 약간 위로 떠오르는 듯한 효과 */
  transform: translateY(-3px);
}

.message-form:hover {
  transform: translateY(-3px);
}

/* 기타 스타일 */

.modal {
  position: fixed;
  /* 화면에 고정 */
  top: 50%;
  /* 상단에서 50% 위치 */
  left: 50%;
  /* 좌측에서 50% 위치 */
  transform: translate(-50%, -50%);
  /* 중앙 정렬을 위해 자신의 크기의 반만큼 이동 */
  z-index: 1001;
  /* 다른 요소들보다 위에 표시되도록 z-index 설정 */
  /* 모달의 너비, 높이, 백그라운드, 패딩 등 추가 스타일 */
}

/* 활성화 되는 동안 유지될 스타일 */

.modal-overlay {
  /* 기존 스타일 유지 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* 충분히 높은 값으로 다른 요소 위에 오게 합니다 */
  transition: background-color 0.3s ease;
  /* 배경색이 변화할 때 부드럽게 전환 */
}

/* 모달이 나타나는 동안과 사라지는 동안의 배경색 전환을 위한 스타일 추가 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, background-color 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0);
  /* 모달이 처음에 작게 시작합니다 */
  background-color: rgba(0, 0, 0, 0);
  /* 배경색을 투명하게 시작 */
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
  /* 모달이 확대되면서 완전히 나타납니다 */
  background-color: rgba(0, 0, 0, 0.5);
  /* 배경색을 투명 검은색으로 전환 */
}

/* 나머지 스타일... */
</style>
