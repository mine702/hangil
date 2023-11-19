<script setup>
import { ref } from "vue";

const showModalProfile = ref(false);

const closeModalProfile = (event) => {
  if (event.target.classList.contains("modal-profile")) {
    showModalProfile.value = false;
  }
};
</script>

<template>
  <div class="user-profile">
    <div class="profile-container" @click="showModalProfile = true">
      <img src="@/assets/img/profile.png" alt="" />
      <div class="profile-text" style="font-size: 25px">Account</div>
      <div class="user-simple-info"></div>
    </div>
  </div>
  <!-- 모달 창 -->
  <div v-if="showModalProfile" class="modal-profile" @click="closeModalProfile">
    <div class="modal-content-profile">
      <h2 class="modal-header">프로필 수정</h2>
      <form class="modal-form">
        <!-- 사용자 프로필 사진 수정 -->
        <div class="user-profile-picture">
          <img src="@/assets/img/profile.png" alt="" />
          <div>
            <span style="font-size: 20px">사진 변경</span>
          </div>
        </div>
        <div class="form-group">
          <label for="username">이름:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div class="form-group">
          <label for="nickname">닉네임:</label>
          <input type="text" id="nickname" name="nickname" />
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
</template>

<style scoped>
.user-profile {
  display: flex;
}

.user-profile img {
  width: 100%;
  height: 100%;
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
  display: flex;
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.user-simple-info {
  width: 50%;
  height: 30%;
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

/* 프로필 모달창 */
.modal-profile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 흐림 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content-profile {
  background-color: white;
  text-align: center;
  padding: 25px;
  border-radius: 8px;
  width: 30%;
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

.user-profile-picture img {
  width: 40%;
  height: 30%;
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
  background-color: #363c5a;
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
</style>
