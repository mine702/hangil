<script setup>
import { ref } from "vue";
import ModalForm from "./ModalForm.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/bundle";
import CardModal from "../commons/modal/CardModal.vue";

const isModalVisible = ref(false); // 모달 표시 상태
const handleCardClick = () => {
  isModalVisible.value = true; // 모달 표시 상태 토글
};

let posts = ref([
  {
    id: 1,
    title: "제목1",
    image:
      "https://img.freepik.com/free-photo/vertical-shot-of-a-wooden-passage-over-a-reflective-small-lake-and-a-mountain-range-on-the-horizon_181624-37099.jpg?size=626&ext=jpg&ga=GA1.1.89001508.1698988307&semt=ais",
  },
  {
    id: 2,
    title: "제목2",
    image:
      "https://img.freepik.com/free-photo/a-digital-painting-of-a-mountain-with-a-colorful-tree-in-the-foreground_1340-25699.jpg?size=626&ext=jpg&ga=GA1.1.89001508.1698988307&semt=ais",
  },
  {
    id: 3,
    title: "제목3",
    image:
      "https://img.freepik.com/free-photo/beautiful-outdoor-view-with-tropical-beach-and-sea_74190-6852.jpg?size=626&ext=jpg&ga=GA1.1.89001508.1698988307&semt=ais",
  },
  {
    id: 4,
    title: "제목4",
    image:
      "https://img.freepik.com/free-photo/aerial-beautiful-shot-of-a-seashore-with-hills-on-the-background-at-sunset_181624-24143.jpg?size=626&ext=jpg&ga=GA1.1.89001508.1698988307&semt=ais",
  },
]);
</script>

<template>
  <div class="user-post">
    <Swiper
      :slides-per-view="3"
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
      <div class="swiper-button-next">&gt;</div>
      <SwiperSlide v-for="post in posts" :key="post.id">
        <div class="post-card">
          <div class="post-title">{{ post.title }}</div>
          <div class="post-picture">
            <img :src="post.image" alt="" @click="handleCardClick" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <transition name="modal">
      <div class="modal-overlay" v-if="isModalVisible">
        <CardModal @closeModal="isModalVisible = false" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.user-post {
  width: 86vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45vh;
  /* position: relative; */
  margin-top: 10px;
}

.my-swiper {
  position: relative;
  display: flex;
  padding-left: 20px;
}

.post-card {
  flex: 0 0 calc(33.3333% - 20px); /* 슬라이드 당 이미지의 너비를 계산 */
  margin: 0 5px; /* 이미지 사이 간격 */
  width: 90%;
  height: 100%;
  text-align: center;
  background-color: rgb(215, 230, 246);
}

.post-title {
  height: 10%;
  padding-top: 2%;
  text-align: center;
  color: #363c5a;
}

.post-picture img {
  width: 300px;
  height: 200px; /* 이미지 비율 유지 */
}

.swiper-button-prev {
  position: absolute;
  left: -1%;
  top: 50%;
  border: none;
  /* background-color: white; */
  padding: 10px 20px;
  cursor: pointer;
  z-index: 100;
}
.swiper-button-next {
  position: absolute;
  right: -1%;
  top: 50%;
  border: none;
  /* background-color: white; */
  padding: 10px 20px;
  cursor: pointer;
  z-index: 100;
}

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
</style>
