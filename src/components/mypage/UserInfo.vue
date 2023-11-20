<script setup>
import { ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

// 모달 이벤트
const showModalProfile = ref(false);
const closeModalProfile = (event) => {
  if (event.target.classList.contains("modal-profile")) {
    showModalProfile.value = false;
  }
};

// 프로필 사진 수정
const profileImage = ref("/profile.png"); // 초기 이미지 경로
const fileInput = ref(null);
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result; // 업로드한 이미지로 변경
    };
    reader.readAsDataURL(file);
  }
};

const memberStore = useMemberStore();
const { userUpdate, getUserInfo } = memberStore;
const { userInfo } = storeToRefs(memberStore);

// 프로필 업데이트
const updateUserInfo = ref({
  userId: userInfo.value.userId,
  userPw: "",
  userNickname: "",
});

const update = async () => {
  let token = sessionStorage.getItem("accessToken");

  await userUpdate(updateUserInfo.value);
  getUserInfo(token);
  closeModalProfile = false;
};
</script>

<template>
  <div class="user-profile">
    <div class="profile-container" @click="showModalProfile = true">
      <img :src="profileImage" alt="" />
      <div class="profile-text" style="font-size: 25px">Account</div>
      <div class="user-simple-info"></div>
    </div>
    <br /><br />
    {{ userInfo.userId }} 님 안녕하세요
    <br />
    {{ userInfo.userNickname }} 님 하이요
  </div>
  <!-- 모달 창 -->
  <div v-if="showModalProfile" class="modal-profile" @click="closeModalProfile">
    <div class="modal-content-profile">
      <h2 class="modal-header">프로필 수정</h2>
      <form class="modal-form">
        <!-- 사용자 프로필 사진 수정 -->
        <div class="user-profile-picture">
          <img :src="profileImage" alt="" @click="triggerFileInput" />
          <input
            type="file"
            id="file-input"
            ref="fileInput"
            style="display: none"
            @change="handleFileChange"
          />
        </div>
        <div class="form-group">
          <label for="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            v-model="updateUserInfo.userNickname"
          />
        </div>
        <div class="form-group">
          <label for="password">새 비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="updateUserInfo.userPw"
          />
        </div>
        <div class="form-group">
          <a href="#" class="submit-btn" @click.prevent="update">저장</a>
        </div>
        <button class="close-btn" @click="closeModalProfile">닫기</button>
      </form>
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

.profile-container img {
  border-radius: 50%;
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
  height: 70%;
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
  height: 150px;
  cursor: pointer;
  border-radius: 50%;
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
