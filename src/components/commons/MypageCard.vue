<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const PINA = ref(import.meta.env.VITE_PINATA_IPFS);

const props = defineProps({
  post: Object,
  form: String,
});

const emits = defineEmits(["openModal", "deleteConfirmed"]);

const handleCardClick = () => {
  emits("openModal");
};

const emitDelete = () => {
  Swal.fire({
    title: "정말 삭제하시겠습니까?",
    text: "이 작업은 되돌릴 수 없습니다!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네, 삭제합니다!",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      emits("deleteConfirmed", props);
    }
  });
};
</script>

<template>
  <div class="common-card">
    <button class="modal-close-button" @click="emitDelete">
      <i class="fa fa-times"></i>
    </button>
    <div class="card-image" @click="handleCardClick">
      <img :src="PINA + post.boardFileCid[0]" />
    </div>
    <div class="card-title">{{ post.boardTitle }}</div>
  </div>
</template>

<style scoped>
.common-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #fff;
  cursor: pointer;
}
.common-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
/* 닫기 버튼 스타일 */
.modal-close-button {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute; /* 버튼을 카드 내에서 절대 위치로 설정 */
  top: 10px; /* 상단에서부터의 위치 */
  right: 10px; /* 오른쪽에서부터의 위치 */
  transition: transform 0.3s ease; /* 변환 효과의 지속 시간과 타이밍 함수 */
}

.modal-close-button:hover {
  transform: scale(1.2); /* 원래 크기의 1.2배로 확대 */
}

.modal-close-button i {
  font-size: 1.2em;
  color: #333;
}

.card-image img {
  height: auto; /* 이미지의 원래 비율을 유지 */
  object-fit: cover;
}

.card-title {
  padding: 15px;
  font-size: 1em;
  text-align: center;
  color: #333;
  background-color: #f8f8f8;
  border-top: 1px solid #eaeaea;
}
</style>
