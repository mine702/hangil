// HomeView.vue
<script setup>
import { ref } from "vue";
import TheSidebar from "../components/nav/TheSidebar.vue";

const isSidebarExpanded = ref(false);

function handleSidebarToggle(expanded) {
  isSidebarExpanded.value = expanded;
}
</script>

<template>
  <TheSidebar @update:expanded="handleSidebarToggle"></TheSidebar>
  <div :class="{ 'expanded-sidebar': isSidebarExpanded }">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.expanded-sidebar {
  margin-left: 300px;
  /* 사이드바 확장 너비에 맞춰 조정 */
  transition: 0.3s;
  /* 부드러운 전환 효과 */
}

div {
  margin-left: 0px;
  transition: 0.3s;
}

/* 더 작은 화면에서는 다른 스타일을 적용할 수 있습니다 */
@media (max-width: 768px) {
  .expanded-sidebar {
    margin-left: 0;
  }
}
</style>
