<script setup>
import { ref, onMounted } from "vue";

// 배너의 상단 위치를 반응형 참조로 선언합니다.
const bannerStyle = ref(0);

// 배너 위치를 계산하고 업데이트하는 함수입니다.
function updateBannerPosition() {
  const banner = document.getElementById("right_banner");
  if (!banner) return;

  // 뷰포트와 배너의 크기를 가져옵니다.
  const viewportWidth = document.documentElement.clientWidth;
  const bannerWidth = banner.offsetWidth;

  // 배너의 초기 위치를 설정합니다.
  if (typeof banner.x === "undefined") {
    banner.x = (viewportWidth - bannerWidth) / 2 - bannerWidth;
    banner.y = 0;
  }

  // 스크롤 위치에 따라 배너의 Y 위치를 업데이트합니다.
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  banner.y += (scrollTop - banner.y) / 8;
  bannerStyle.value = banner.y;
}

onMounted(() => {
  // 컴포넌트가 마운트된 후에 주기적으로 배너의 위치를 업데이트합니다.
  setInterval(updateBannerPosition, 15);
});
</script>

<template>
  <div id="right_banner" :style="{ top: bannerStyle + 'px' }">
    <!-- 배너 내용을 여기에 배치 -->
  </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css");

#right_banner {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
