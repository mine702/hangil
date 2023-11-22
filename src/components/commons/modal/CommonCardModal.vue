<script setup>
import { ref, defineEmits, defineProps, computed } from "vue";

// props와 emits 정의
const props = defineProps({
  data: Object,
});

const emits = defineEmits(["close"]);

const closeModal = () => {
  emits("close");
};

const isLiked = ref(false);
const isShared = ref(false);
const isSaved = ref(false);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

const toggleShare = () => {
  isShared.value = !isShared.value;
};

const toggleSave = () => {
  isSaved.value = !isSaved.value;
};

// 현재 이미지 인덱스를 추적하는 ref 생성
const currentImageIndex = ref(0);

// 이미지를 변경하는 메소드
const selectImage = (index) => {
  currentImageIndex.value = index;
};

// 도트의 활성화 상태를 계산하는 computed 속성
const dots = computed(() =>
  props.data.boardFileCid.map((_, index) => index === currentImageIndex.value)
);
</script>

<template>
  <div class="modal-card">
    <div class="modal-header">
      <div class="modal-header-content">
        <span class="modal-subtitle">작성자 ID: {{ props.data.userId }}</span>
      </div>
      <button class="modal-close-button" @click="closeModal">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="modal-content">
      <h1 class="modal-main-title">{{ props.data.boardTitle }}</h1>

      <div class="slider-container">
        <div class="slides">
          <img
            v-for="(imageCid, index) in props.data.boardFileCid"
            :key="imageCid"
            :src="`https://gateway.pinata.cloud/ipfs/${imageCid}`"
            :class="{ active: index === currentImageIndex }"
          />
        </div>
        <!-- 네비게이션 도트 -->
        <div class="navigation-dots">
          <span
            v-for="(isActive, index) in dots"
            :key="index"
            class="dot"
            :class="{ active: isActive }"
            @click="selectImage(index)"
          ></span>
        </div>
      </div>
      <div class="boardContent">
        <p>{{ props.data.boardContent }}</p>
      </div>
      <div class="modal-footer">
        <span>좋아요: {{ props.data.boardLike }}</span>
        <!-- 아이콘 버튼들 -->
      </div>
      <div class="modal-footer-button">
        <button
          class="icon-button"
          :class="{ active: isLiked }"
          @click="toggleLike"
        >
          <i class="fa-regular fa-heart"></i>
        </button>
        <button
          class="icon-button"
          :class="{ active: isShared }"
          @click="toggleShare"
        >
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        <button
          class="icon-button"
          :class="{ active: isSaved }"
          @click="toggleSave"
        >
          <i class="fa-regular fa-bookmark"></i>
        </button>
      </div>

      <div class="tag-container">
        <span v-for="tag in props.data.hashTagContent" :key="tag" class="tag">
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
.modal-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 25px;
  width: 90%;
  max-width: 500px;
  margin: auto;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.modal-content {
  color: #333;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
}

.modal-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
}

.modal-header-content {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.modal-title,
.modal-subtitle {
  font-size: 0.9rem;
  color: #666;
}

.modal-close-button {
  border: none;
  background: none;
  cursor: pointer;
}

.modal-close-button i {
  font-size: 1.2em;
  color: #333;
}

.modal-main-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 2%;
}

.slider-container {
  position: relative;
  margin-bottom: 20px;
}

.slides img.active {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: opacity 0.5s ease-in-out;
}

/* 기본 이미지 스타일 */
img {
  width: 100%;
  display: none;
  transition: opacity 0.3s ease;
}

.navigation-dots {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -25px;
  left: 0;
  right: 0;
}

.dot {
  height: 12px;
  width: 12px;
  margin: 5px;
  background-color: #ddd;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #333;
}

.boardContent {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
}

.modal-footer-button {
  display: flex;
  justify-content: flex-end;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  font-size: 1.2em;
}

.icon-button i {
  color: #333;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag {
  margin-right: 10px;
  background: #f0f0f0;
  border-radius: 4px;
  padding: 5px 10px;
}

@keyframes shake {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0px);
  }
}

.icon-button:hover {
  animation: shake 0.5s ease-in-out infinite;
}
.icon-button.active i {
  color: #d9534f; /* 또는 원하는 색상 코드 */
}
</style>
