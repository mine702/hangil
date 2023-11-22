<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isToggled = ref(localStorage.getItem("isToggled") === "true");

watch(isToggled, (newValue) => {
  localStorage.setItem("isToggled", newValue); // 토글 상태를 localStorage에 저장
  if (newValue) {
    router.push({ name: "boardRegister" });
  } else {
    router.push({ name: "boardPage" });
  }
});

// 페이지 로드 시 라우터 상태에 따라 토글 상태를 설정할 수 있음
router.afterEach((to) => {
  if (to.name === "boardRegister") {
    isToggled.value = true;
  } else if (to.name === "boardPage") {
    isToggled.value = false;
  }
});
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <label class="toggle-switch">
      <input type="checkbox" class="toggle-input" v-model="isToggled" />
      <span class="toggle-slider"></span>
    </label>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.toggle-switch {
  position: fixed;
  top: 90%;
  left: 8%;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input:checked+.toggle-slider {
  background-color: #7b68ee;
}

input:checked+.toggle-slider:before {
  transform: translateX(26px);
}
</style>
