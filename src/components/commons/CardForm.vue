<script setup>
import { ref } from "vue";
import ModalForm from "./ModalForm.vue";
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

let showModalPost = ref(false); // 모달 상태 관리
let selectedImage = ref("");

const openModalPost = (image) => {
  selectedImage.value = image;
  showModalPost.value = true; // 모달 열기
};

const closeModalPost = () => {
  showModalPost.value = false;
  selectedImage.value = null;
};
</script>

<template>
  <!-- 게시물 div -->
  <span>My Post</span>
  <div class="user-post">
    <!-- 게시물 카드 반복 -->
    <div v-for="post in posts" :key="post.id" class="post-card">
      <!-- 카드 제목-->
      <div class="post-title">{{ post.title }}</div>
      <!-- 카드 사진부분 -->
      <div class="post-picture">
        <img :src="post.image" alt="" @click="openModalPost(post.image)" />
      </div>
    </div>
    <!-- 모달 창 -->
    <div v-if="showModalPost" class="modal" @click="closeModalPost">
      <div class="modal-wrap" @click.stop>
        <!-- 모달 내용 -->
        <ModalForm
          class="modal-post"
          v-if="showModalPost"
          :selected-image="selectedImage"
          @close-modal="closeModalPost"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-post {
  width: 100vw;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px; /* 필요에 따라 게시물 사이의 간격 조정 */
  height: 45vh;
}

.post-card {
  width: 400px;
  height: 330px;
  margin-top: 20px;
  color: white;
  background-color: rgb(0, 0, 0);
}

.post-title {
  width: 100%;
  height: 10%;
  padding-top: 5%;
  text-align: center;
}

.user-post img {
  width: 100%;
  /* %로 하면 넣은 사진 크기에 따라 높이 안맞음 */
  height: 250px;
}

.modal-post {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-btn:click ~ .modal {
  pointer-events: auto;
  opacity: 1;
  transition: all 300ms ease-in-out;
}

.modal-btn:click ~ .modal .modal-wrap {
  opacity: 1;
  transform: scale(1);
  transition: opacity 250ms 500ms ease, transform 350ms 500ms ease;
}
</style>
