<script setup>
import TheSidebar from "../components/nav/TheSidebar.vue";

import { ref } from "vue";

const showModalProfile = ref(false);

function closeModalProfile(event) {
  if (event.target.classList.contains("modal-profile")) {
    showModalProfile.value = false;
  }
}

const showModalPost = ref(false);
const selectedImage = ref(null);

function openModalPost(image) {
  selectedImage.value = image;
  console.log(selectedImage.value);
  showModalPost.value = true;
}

function closeModalPost(event) {
  if (event.target.classList.contains("modal-post")) {
    showModalPost.value = false;
  }
}
</script>

<template>
  <TheSidebar></TheSidebar>
  <div class="my-page">
    <!-- 개인 정보 div -->
    <div class="user-info">
      <div class="user-profile">
        <div class="profile-container" @click="showModalProfile = true">
          <img src="../assets/img/profile.png" alt="" />
          <div class="profile-text" style="font-size: 25px">Account</div>
        </div>
        <div class="test">
          아이디 <br />
          닉네임
        </div>
      </div>
      <!-- 모달 창 -->
      <div v-if="showModalProfile" class="modal-profile" @click="closeModalProfile">
        <div class="modal-content-profile">
          <h2 class="modal-header">개인 정보 수정</h2>
          <form class="modal-form">
            <div class="form-group">
              <label for="username">이름:</label>
              <input type="text" id="username" name="username" />
            </div>
            <div class="form-group">
              <label for="email">이메일:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div class="form-group">
              <label for="password">새 비밀번호:</label>
              <input type="password" id="password" name="password" />
            </div>
            <div class="form-group">
              <button type="submit" class="submit-btn">저장</button>
            </div>
          </form>
          <!-- <button class="close-btn" @click="showModal = false">닫기</button> -->
        </div>
      </div>
    </div>
    <!-- 게시물 div -->
    <div class="user-board">
      <span>Posts</span>
      <div>
        <img
          src="../assets/img/멋진사진1.jpg"
          alt=""
          @click="openModalPost('@/assets/img/멋진사진1.jpg')"
        />
        <img src="../assets/img/멋진사진2.jpg" alt="" />
        <img src="../assets/img/멋진사진3.jpg" alt="" />
        <img src="../assets/img/멋진사진4.jpg" alt="" />
      </div>
      <!-- 모달 창 -->
      <div v-if="showModalPost" class="modal-post" @click="closeModalPost">
        <div class="modal-content-post">
          <img src="../assets/img/멋진사진1.jpg" alt="Selected Image" />
          <button @click="showModalPost = false">닫기</button>
        </div>
      </div>
    </div>
    <!-- 여행 계획 div -->
    <div class="user-plan">
      <span>Plans</span>
      <div>
        <img src="../assets/img/멋진사진1.jpg" alt="" />
        <img src="../assets/img/멋진사진2.jpg" alt="" />
        <img src="../assets/img/멋진사진3.jpg" alt="" />
        <img src="../assets/img/멋진사진4.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 디자인 */
.my-page {
  height: 100vh;
  width: 92vw;
  margin-left: 10vw;
}

@media (max-width: 1200px) {
  /* 화면 크기가 768px 이하일 때 적용 */
  .sidebar {
    display: none;
  }
}

span {
  font-size: 30px;
}

.test {
  margin-top: 50px;
  margin-left: 20px;
}

/* 프로필 디자인 */
.user-info {
  display: block;
  height: 20vh;
}

.user-profile {
  display: flex;
}

.user-profile img {
  width: 100px;
  height: 100px;
  margin-top: 20px;

  -webkit-filter: blur(0);
  filter: blur(0);
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;

  cursor: pointer; /* 이미지에 마우스 오버 시 커서 변경 */
}

.user-profile img:hover {
  -webkit-filter: blur(3px);
  filter: blur(3px);
}

.profile-container {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.profile-text {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.profile-container:hover .profile-text {
  visibility: visible;
  opacity: 1;
}

.modal-profile,
.modal-post {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 흐림 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-profile,
.modal-content-post {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-header {
  margin-bottom: 20px;
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: BMJUA;
  font-size: large;
}

.submit-btn:hover {
  background-color: #45a049;
}

/* .close-btn {
  background: none;
  border: none;
  color: #555;
  padding: 10px 15px;
  cursor: pointer;
} 

.close-btn:hover {
  color: #333;
} */

.modal-content-profile p {
  height: 100px;
  font-size: 25px;
}

/* 게시물 디자인 */
.user-board {
  width: 100%;
  white-space: nowrap;
  display: block;
  height: 45vh;
}

.user-board img {
  margin-top: 10px;
  width: 250px;
  height: 300px;
  padding: 10px;
}

/* 여행 계획 디자인 */
.user-plan {
  display: block;
  white-space: nowrap;
  height: 30vh;
}

.modal-content-post img {
  width: 80%; /* 이미지 크기 조정 */
  height: 90%;
  margin-bottom: 20px;
}

.user-plan img {
  margin-top: 10px;
  width: 350px;
  height: 200px;
  padding: 10px;
}
</style>
