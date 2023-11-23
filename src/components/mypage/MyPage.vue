<script setup>
import { onMounted } from "vue";
import UserInfo from "./UserInfo.vue";
import MypageSlide from "../commons/MypageSlide.vue";

import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const boardStore = useBoardStore();
const { userInfo } = storeToRefs(memberStore);
const { boardStorageContent, myPosts } = storeToRefs(boardStore);
const { myBoard, boardStorage } = boardStore;

onMounted(async () => {
  await myBoard(userInfo.value.userId);
  await boardStorage(userInfo.value.userId);
});
</script>

<template>
  <div class="my-page">
    <div class="user-info">
      <UserInfo />
    </div>
    <div class="card-form">
      my post
      <MypageSlide :data="myPosts" />
    </div>
    <div class="user-picks">
      save post
      <MypageSlide :data="boardStorageContent" />
    </div>
  </div>
</template>

<style scoped>
.my-page {
  height: 100vh;
  width: 92vw;
  margin-left: 8vw;
  font-size: 20px;
}

.user-info {
  display: block;
  height: 20%;
}

.card-form {
  width: 100%;
  height: 60%;
  display: block;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 내 게시물 슬라이드 */

.user-picks {
  display: block;
  white-space: nowrap;
  height: 30%;
}
</style>
