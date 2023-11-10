<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import slide1 from "@/assets/img/slide1.jpg";
import slide2 from "@/assets/img/slide2.jpg";
import slide3 from "@/assets/img/slide3.jpg";

const images = ref([
  { backgroundImage: `url(${slide1})` },
  { backgroundImage: `url(${slide2})` },
  { backgroundImage: `url(${slide3})` },
]);

const currentSlide = ref(0);

const slideStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
}));

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % images.value.length;
}

let intervalId = null;

onMounted(() => {
  intervalId = setInterval(nextSlide, 3000); // 3초마다 슬라이드를 변경합니다.
});

onUnmounted(() => {
  clearInterval(intervalId); // 컴포넌트가 사라질 때 인터벌을 정리합니다.
});
</script>

<template>
  <div class="slider">
    <div class="slides" :style="slideStyle">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :style="image"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 60vh; /* 슬라이더의 높이를 설정하세요 */
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: inherit;
}

.slide {
  flex: 0 0 100%;
  height: inherit;
  background-size: cover;
  background-position: center;
}
</style>
