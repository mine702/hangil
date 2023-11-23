<script setup>
import { ref, onMounted, watch } from "vue";
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";

import $ from "jquery";
import CommonCard from "../commons/CommonCard.vue";
import MessageForm from "./forms/MessageForm.vue";
import CommonCardModal from "../commons/modal/CommonCardModal.vue";

const boardStore = useBoardStore();
const { fetchPosts, fetchMorePosts } = boardStore;
const { posts } = storeToRefs(boardStore);

const isLoading = ref(false);

// 활성화된 모달의 데이터를 저장하는 ref
const activeModal = ref(null);

// 모달을 표시하는 함수
const showModal = (event, item) => {
  event.preventDefault();
  activeModal.value = item;
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

window.addEventListener("scroll", async () => {
  // 문서의 전체 높이
  let documentHeight = document.body.scrollHeight;

  // 현재 스크롤 위치 (스크롤된 높이 + 현재 보이는 창의 높이)
  let currentScrollPosition = window.innerHeight + window.scrollY;

  // 스크롤이 맨 아래에 도달했는지 검사
  if (currentScrollPosition >= documentHeight && !isLoading.value) {
    isLoading.value = true;
  }
});

watch(isLoading, (newValue) => {
  if (newValue === true) {
    // isLoading이 true가 되면 실행할 함수
    handleLoadMorePosts();
  }
});

async function handleLoadMorePosts() {
  await fetchMorePosts(); // 추가 게시글 로드
  // 추가 게시글을 로드하는 로직
  // 함수 실행 후 isLoading을 다시 false로 설정하여 다음 스크롤 이벤트를 대비함
  isLoading.value = false;
}
onMounted(async () => {
  await fetchPosts(); // 초기 게시글 로드
});
</script>

<template>
  <div class="forms-container">
    <!-- 폼 내용 -->
    <div class="board-form">
      <!-- 폼 내용 -->
      <CommonCard v-for="post in posts" :key="post.id" :data="post" @click="showModal($event, post)" />
    </div>
    <MessageForm class="message-form" />

    <!-- 모달, isModalVisible이 true일 때만 표시 -->
    <transition name="fade">
      <div class="modal-overlay" v-if="activeModal">
        <CommonCardModal :data="activeModal" @close="activeModal = null" />
      </div>
    </transition>
  </div>
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
  height: 100vh;
  /* 컨테이너에 스크롤을 추가 */
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

/* fade 애니메이션에 대한 스타일 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 나머지 스타일... */
</style>
