<script setup>
import { ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/bundle";
import MypageCard from "./MypageCard.vue";
import CommonCardModal from "./modal/CommonCardModal.vue";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const boardStore = useBoardStore();
const { userInfo } = storeToRefs(memberStore);
const { boardStorageContent, myPosts } = storeToRefs(boardStore);
const { myBoardDelete, boardStorageContentDelete } = boardStore;

// 활성화된 모달의 데이터를 저장하는 ref
const activeModal = ref(null);

// 모달을 표시하는 함수
const showModal = (event, item) => {
  activeModal.value = item;
};

const props = defineProps({
  data: Object, // 게시글 데이터
});

const posts = ref([]);

watch(
  () => props.data,
  (newData) => {
    posts.value = newData;
  }
);

const handleDeleteConfirmed = async (post) => {
  // 삭제 로직 수행
  console.log(post.post);
  if (post.form === "mypost") {
    await myBoardDelete(post.post.boardNo);
    console.log("mypost");
  } else {
    await boardStorageContentDelete(userInfo.value.userId, post.post);
    console.log("savepost");
  }
};
</script>

<template>
  <div class="user-post">
    <!-- 게시물이 3개 이상일 때 Swiper를 사용 -->
    <Swiper
      v-if="posts.length > 3"
      :slides-per-view="4"
      :space-between="10"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="my-swiper"
    >
      <div class="swiper-button-prev">&lt;</div>
      <SwiperSlide v-for="post in posts" :key="post.id">
        <div class="post-card">
          <MypageCard
            :post="post"
            :form="'mypost'"
            @openModal="showModal($event, post)"
            @deleteConfirmed="handleDeleteConfirmed"
          ></MypageCard>
        </div>
      </SwiperSlide>
      <div class="swiper-button-next">&gt;</div>
    </Swiper>
    <!-- 게시물이 3개 미만일 때 Swiper와 유사한 스타일의 카드 레이아웃 사용 -->
    <div v-else class="my-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="post in posts" :key="post.id">
          <div class="post-card">
            <MypageCard
              :post="post"
              :form="'savepost'"
              @openModal="showModal($event, post)"
              @deleteConfirmed="handleDeleteConfirmed"
            ></MypageCard>
          </div>
        </div>
      </div>
    </div>
    <!-- 모달, isModalVisible이 true일 때만 표시 -->
    <transition name="fade">
      <div class="modal-overlay" v-if="activeModal">
        <CommonCardModal :data="activeModal" @close="activeModal = null" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.user-post {
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45vh;
  /* position: relative; */
  margin-top: 10px;
}

.my-swiper {
  overflow: hidden;
  position: relative;
  display: flex;
  padding-left: 20px;
  justify-content: start; /* 카드를 왼쪽부터 정렬 */
}
.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  flex: 0 0 auto; /* 카드의 크기가 내용에 따라 결정되도록 설정 */
  width: 33.3333%; /* 3개가 나란히 표시될 수 있도록 너비 설정 */
  margin-right: 10px; /* 카드 사이의 간격 설정 */
}

.post-card {
  border-radius: 15px;
  padding: 10px;
  flex: 1;
  scale: 0.9;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.3);
  color: #626567;
  margin-top: 20%;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 55%;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 100;
}

.swiper-button-prev {
  left: -1%;
}
.swiper-button-next {
  right: -1%;
}

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
</style>
