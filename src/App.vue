<script setup></script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");

/* 스크롤바 트랙(배경) 스타일 */
::-webkit-scrollbar {
  width: 12px; /* 스크롤바 너비 조정 */
}

/* 스크롤바 트랙 */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 트랙 배경 색상 */
}

/* 스크롤바 핸들 */
::-webkit-scrollbar-thumb {
  background: #a9a9a9; /* 스크롤 핸들 색상 */
  border-radius: 6px; /* 스크롤 핸들 둥근 모서리 */
}

/* 스크롤바 핸들 호버 시 */
::-webkit-scrollbar-thumb:hover {
  background: #8d8d8d; /* 호버 시 스크롤 핸들 색상 */
}
</style>
