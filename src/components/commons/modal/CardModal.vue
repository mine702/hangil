<script setup>
import ImgSlides from "./imgslide/ImgSlide.vue";

const emits = defineEmits(["closeModal"]);

const closeModal = () => {
  emits("closeModal");
};
</script>

<template>
  <div class="board-card">
    <div class="card-header">
      <img class="profile-pic" src="@/assets/img/profile.png" alt="Profile" />
      <span class="username">username</span>
      <span><button @click="closeModal">close</button></span>
    </div>
    <div class="card-image">
      <img-slides />
    </div>
    <div class="card-body">
      <div class="card-actions"></div>
      <p class="description">
        <span class="username">username</span> Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>
    </div>
  </div>
</template>

<style scoped>
.board-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 40px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.profile-pic {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.username {
  font-weight: bold;
  font-size: 14px;
}

.card-image {
  height: 50vh;
  width: 100%;
  display: block;
}

.card-body {
  padding: 10px;
}

.card-actions {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.icon-heart,
.icon-comment,
.icon-share {
  margin-right: 10px;
}

.description {
  font-size: 14px;
  line-height: 1.5;
}
</style>
