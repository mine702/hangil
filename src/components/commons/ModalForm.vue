<script setup>
import { ref, watch } from "vue";

// 부모 컴포넌트로부터 prop으로 이미지 URL을 받음
const props = defineProps({
  selectedImage: String,
});

const showModalPost = ref(false);

// 이미지 URL이 변경될 때 모달 상태를 업데이트
watch(
  () => props.selectedImage,
  (newVal) => {
    if (newVal) {
      showModalPost.value = true;
    }
  }
);

const emit = defineEmits(["closeModal"]);
</script>

<template>
  <div>
    <div class="modal-content-post">
      <!-- post 모달 제목 -->
      <div class="modal-title">제목을 입력해 주세요</div>
      <!-- post 모달 사진 -->
      <div class="modal-img">
        <img :src="props.selectedImage" alt="Selected Image" />
      </div>
      <!-- post 모달 버튼 -->
      <div class="modal-btn" @click="emit('closeModal')">
        <button>닫기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrap {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
  padding-bottom: 20px;
  background-color: #fff;
  align-self: center;
  box-shadow: 0 12px 25px 0 rgba(199, 175, 189, 0.25);
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 250ms 250ms ease, transform 300ms 250ms ease;
}

.modal-wrap img {
  width: 100%;
  height: auto;
}

.modal-content-post {
  background-color: white;
  text-align: center;
  padding: 25px;
  border-radius: 10px;
  height: 750px;
  width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-title {
  height: 5%;
}

.modal-content-post .modal-img img {
  width: 400px;
  height: 600px;
  border-radius: 30px;
}

.modal-content-post .modal-btn {
  display: flex;
  flex-direction: row-reverse;
  width: 70px;
  height: 30px;
  padding: 8px 20px;
  margin-left: 80%;
  border-radius: 20px;
  background-color: rgb(204, 200, 200);
}
.modal-btn {
  cursor: pointer;
}
</style>
