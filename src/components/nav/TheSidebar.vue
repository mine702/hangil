<script>
import { RouterLink, useRouter } from "vue-router";

// icons
import IconHome from "@/components/icons/IconHome.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconBookmark from "@/components/icons/IconBookmark.vue";
export default {
  name: "Sidebar",
  components: {
    IconHome,
    IconSearch,
    IconUser,
    IconBookmark,
    RouterLink,
  },
};
</script>

<template>
  <aside class="sidebar">
    <div class="logo">Workspace</div>
    <nav class="navigation">
      <ul>
        <li><icon-home /></li>
        <li><icon-search /></li>
        <li><icon-user /></li>
        <li><icon-bookmark /></li>
        <!-- 기타 링크 추가 -->
      </ul>
    </nav>
    <!-- 여기에 추가적인 사이드바 콘텐츠가 있을 수 있습니다 -->
  </aside>
</template>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 120px;
  height: 100vh;
  background-color: #363c5a;
  color: #fff;
  z-index: 1000; /* 다른 요소들 위에 렌더링되도록 설정 */
}

.logo {
  /* 로고 스타일링 */
}

.navigation {
  /* 네비게이션 스타일링 */
}

.navigation ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex; /* Flexbox 레이아웃 적용 */
  flex-direction: column; /* 요소들을 세로로 배치 */
  align-items: center; /* 수평 중앙 정렬 */
  height: 100%; /* 사이드바의 전체 높이 */
  justify-content: center; /* 수직 중앙 정렬 */
}

.navigation li {
  width: 100%; /* 전체 너비 */
  display: flex; /* Flexbox 레이아웃 적용 */
  justify-content: center; /* 수평 중앙 정렬 */
  margin: 20px 0; /* 아이콘 사이의 상하 간격을 10px로 설정 */
}
</style>
