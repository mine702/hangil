<script setup>
import { ref, defineEmits } from "vue";

const isExpanded = ref(false);
const emit = defineEmits(["update:expanded"]);

function toggleSidebar(expand) {
  isExpanded.value = expand;
  emit("update:expanded", isExpanded.value);
}
</script>

<template>
  <ul
    class="side-menu"
    @mouseenter="() => toggleSidebar(true)"
    @mouseleave="() => toggleSidebar(false)"
  >
    <li>
      <a href="#"></a>
    </li>
    <li>
      <a href="#"><span class="fa fa-cog"></span>Home</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-font"></span>MyPage</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-caret-square-o-right"></span>Search</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-check-square"></span>Plans</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-check-square"></span>LogOut</a>
    </li>
  </ul>
  <div class="fixed-logo"></div>
</template>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Roboto";
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css");
.side-menu {
  font-family: "Roboto", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 60px;
  list-style-type: none;
  background: #363c5a;
  overflow: hidden;
  transition: width 0.3s;
}

.fixed-logo {
  position: fixed; /* 스크롤해도 항상 같은 위치에 있음 */
  right: 0;
  top: 3%; /* 상단에서의 위치, 필요에 따라 조정 */
  right: 10px; /* 오른쪽에서의 위치, 필요에 따라 조정 */
  width: 150px; /* 로고의 너비, 로고의 실제 크기에 맞게 조정 */
  height: 100px; /* 로고의 높이, 로고의 실제 크기에 맞게 조정 */
  border-radius: 10px; /* 모서리를 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 3D 효과를 위한 그림자 */
  z-index: 1000; /* 다른 요소들 위에 표시됨 */
  background-image: url("../../assets/img/hangil_logo2.png");
  background-position: center;
  background-size: contain;
  background-color: white;
}

.side-menu:hover {
  width: 200px;
}

.side-menu li {
  width: 300px;
}

.side-menu li span {
  font-size: 1.2rem;
  margin: 20px 30px 0 22px;
}

.side-menu li a {
  display: block;
  font-size: 0.9rem;
  text-decoration: none;
  color: #fff;
  height: 60px;
}

.side-menu li a:hover,
.side-menu li:first-child a {
  background: #14081d;
  display: block;
}
</style>
