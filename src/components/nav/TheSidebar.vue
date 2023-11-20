<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useMemberStore } from "@/stores/member";
import UserInfo from "../mypage/UserInfo.vue";
import { useRouter } from "vue-router";

const isExpanded = ref(false);
const emit = defineEmits(["update:expanded"]);

function toggleSidebar(expand) {
  isExpanded.value = expand;
  emit("update:expanded", isExpanded.value);
}

// 드래그하는 아이템과 드래그 상태를 추적하기 위한 ref를 생성합니다.
const dragItem = ref(null);
const active = ref(false);
const currentX = ref(0);
const currentY = ref(0);
const initialX = ref(0);
const initialY = ref(0);
const xOffset = ref(0);
const yOffset = ref(0);

// 드래그 시작 함수
const dragStart = (e) => {
  if (e.target === dragItem.value) {
    // 드래그 시작 위치를 기록합니다.
    initialX.value = e.clientX - xOffset.value;
    initialY.value = e.clientY - yOffset.value;
    active.value = true; // 활성 상태를 true로 설정합니다.
  }
};

// 드래그 중 함수
const drag = (e) => {
  if (active.value) {
    // 드래그 중 위치 계산
    e.preventDefault();
    currentX.value = e.clientX - initialX.value;
    currentY.value = e.clientY - initialY.value;
    xOffset.value = currentX.value;
    yOffset.value = currentY.value;

    // 실제 요소 위치를 업데이트
    setTranslate(currentX.value, currentY.value, dragItem.value);
  }
};

// 드래그 종료 함수
const dragEnd = () => {
  // 초기 위치를 드래그 끝난 위치로 갱신합니다.
  initialX.value = currentX.value;
  initialY.value = currentY.value;
  active.value = false; // 활성 상태를 false로 설정합니다.
};

// 실제로 요소를 이동시키는 함수
const setTranslate = (xPos, yPos, el) => {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
};

// 마운트 되었을 때 dragItem을 설정하고 이벤트 리스너를 추가합니다.
onMounted(() => {
  dragItem.value = document.querySelector(".fixed-logo");

  // 드래그 이벤트 리스너를 추가합니다.
  dragItem.value.addEventListener("mousedown", dragStart);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("mousemove", drag);
});

const memberStore = useMemberStore();
const { userLogout, userInfo } = memberStore;
const router = useRouter();

const logout = async () => {
  console.log("로그아웃 성공");
  console.log(userInfo);
  await userLogout();
  router.push("/");
};
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
      <router-link :to="'/home'">
        <span class="fa fa-home" aria-hidden="true"></span>Home
      </router-link>
    </li>
    <li>
      <router-link :to="'/mypage'">
        <span class="fa fa-user-o" aria-hidden="true"></span>MyPage
      </router-link>
    </li>

    <li>
      <router-link :to="'/searchpage'">
        <span class="fa fa-search" aria-hidden="true"></span>Search
      </router-link>
    </li>
    <li>
      <router-link :to="'/myPlans'">
        <span class="fa fa-paper-plane" aria-hidden="true"></span>Plans
      </router-link>
    </li>
    <li>
      <a href="#" @click.prevent="logout">
        <span class="fa fa-sign-out" aria-hidden="true"></span>LogOut
      </a>
    </li>
  </ul>
  <div class="fixed-logo"></div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
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
  border: 2px solid #5d5c61; /* 다크 그레이 색상의 테두리 */
  position: fixed;
  top: 40%; /* 로고가 화면의 중앙에 오도록 조정 */
  left: 1%; /* 오른쪽에서부터 10% 떨어진 곳에 위치하도록 조정 */
  width: 150px;
  height: 100px;
  border-radius: 15px; /* 더욱 둥근 모서리 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 효과 */
  z-index: 1000;
  background-image: url("../../assets/img/hangil_logo2.png");
  background-position: center;
  background-size: cover; /* 로고 이미지가 div에 꽉 차도록 설정 */
  background-repeat: no-repeat;
  background-color: #ffffff; /* 배경색은 순백색 */
  transition: box-shadow 0.3s ease-in-out; /* 부드러운 전환 효과 */
}

.fixed-logo:hover {
  transform: scale(1.05); /* 마우스를 올리면 로고가 약간 커지는 효과 */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); /* 마우스를 올리면 그림자가 더 진해지는 효과 */
}

.side-menu:hover {
  width: 200px;
}

.side-menu li {
  width: 200px;
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

.side-menu li a:hover {
  background: #14081d;
  display: block;
}
</style>
