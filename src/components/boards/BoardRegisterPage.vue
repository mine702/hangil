<script setup>
import { ref } from "vue";
import { usePinataStore } from "@/stores/pinata";

const boardTitle = ref("");
const boardContent = ref("");
const boardFiles = ref([]);
const imageUrls = ref([]);

const currentSlide = ref(0);
const fading = ref(false);

const pinataStore = usePinataStore();

const { submitImages } = pinataStore;

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 캔버스의 크기를 700x900으로 설정
      canvas.width = 600;
      canvas.height = 400;

      // 이미지를 캔버스에 700x900 크기로 강제로 그림
      ctx.drawImage(image, 0, 0, 600, 400);

      canvas.toBlob((blob) => {
        resolve(
          new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          })
        );
      }, "image/jpeg");
    };

    image.onerror = () => {
      reject(new Error("Image load error"));
    };
  });
};

const handleFileChange = async (event) => {
  const files = Array.from(event.target.files);
  console.dir(files);
  try {
    const resizedImages = await Promise.all(
      files.map((file) => resizeImage(file))
    );

    // 여기서 resizedImages는 700x900 크기로 조정된 이미지 파일의 배열입니다.
    boardFiles.value = resizedImages;
    imageUrls.value = resizedImages.map((file) => URL.createObjectURL(file));
  } catch (error) {
    console.error(error);
  }
};

const nextSlide = () => {
  if (currentSlide.value < imageUrls.value.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = imageUrls.value.length - 1;
  }
};
const submitImage = async () => {
  const formData = new FormData();
  for (let i = 0; i < boardFiles.value.length; i++) {
    formData.append("imageFile", boardFiles.value[i]);
  }
  await submitImages(formData);
};
</script>

<template>
  <div class="card">
    <input type="text" placeholder="제목" v-model="boardTitle" />
    <textarea placeholder="내용" v-model="boardContent"></textarea>
    <input
      type="file"
      multiple
      accept=".png, .jpg, .jpeg"
      @change="handleFileChange"
    />

    <div v-if="imageUrls.length" class="slider">
      <button class="slide-btn left" @click="previousSlide">&#10094;</button>
      <img
        :src="imageUrls[currentSlide]"
        class="slide-image"
        :class="{ fading: fading }"
      />
      <button class="slide-btn right" @click="nextSlide">&#10095;</button>
    </div>

    <button @click="submitImage">SUBMIT</button>
  </div>
</template>

<style scoped>
/* 기존 스타일 */
.card {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.slider {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
}

.slide-image {
  width: 100%;
  /* 너비 고정 */
  height: 100%;
  /* 높이 고정 */
  object-fit: cover;
  /* 이미지 비율 유지하면서 컨테이너에 맞춤 */
  transition: opacity 0.5s ease;
}

.fading {
  opacity: 0;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 10;
}

.slide-btn.left {
  left: 10px;
}

.slide-btn.right {
  right: 10px;
}
</style>
