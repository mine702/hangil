<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="entire">
    <!-- 로그인 화면에서 웹 소개 부분 -->
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <!-- 로고 + 로그인 폼 -->
        <div class="right-form">
          <!-- 로고 -->
          <div class="login-logo"></div>
          <!-- 로그인 폼 -->
          <!-- v-if를 이용해 로그인폼 / 회원가입 폼 전환 -->
          <div class="login-form">
            <form action="">
              <div class="login-box">
                ID <br />
                <input type="text" class="id" placeholder="id" /><br /><br />
                Password <br />
                <input
                  type="password"
                  class="password"
                  placeholder="password"
                />
                <br />
              </div>
              <button class="btn" @click="">
                <span>로그인</span>
              </button>
              <br />
              <button class="btn btn-regist" @click="">
                <span>회원가입</span>
              </button>
            </form>
          </div>
        </div>
        <!-- 로그인 화면에서 로그인 부분 -->
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "BMJUA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.entire {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.content {
  display: flex;
  width: 1280px;
  height: 720px;
  /* background-color: black; */
  margin: auto;
  font-family: "BMJUA";
  font-size: 20px;
  gap: 90px;
}

.left,
.right {
  /* 그림자 */
  box-shadow: 5px 5px 5px 5px gray;
  /* 테두리 윤곽 */
  /* border: 1px solid black; */
  border-radius: 15px;
  background-color: white;
}

.left {
  width: 1000px;
  background-image: url("../assets/img/멋진사진1.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  /* 추가적으로 브라우저의 크기에 따라 이미지가 잘리지 않도록 조정할 수 있습니다 */
  background-repeat: no-repeat;
}

.right {
  width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.right-form {
  height: 450px;
  margin: 10px 20px;
  border-radius: 15px;
  background-color: white;
}

.login-logo {
  height: 200px;
  background-image: url("../assets/img/hangil_logo.png");
  background-size: 70%;
  background-position: center;

  /* 추가적으로 브라우저의 크기에 따라 이미지가 잘리지 않도록 조정할 수 있습니다 */
  background-repeat: no-repeat;
}

.login-form {
  text-align: center;
  margin-top: 20px;
  height: 300px;
  /* background-color: beige; */
}

.login-box {
  display: grid;
  /* grid-template-columns: max-content 1fr; */
  column-gap: 0.5rem;
  padding: 1.125rem 1rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.5rem;
}

span {
  font-family: BMJUA;
}

/* 버튼 디자인 */
.btn {
  overflow: hidden;
  transition: all 0.3s ease;
  top: 50%;
  background-color: #363c5a;
  color: white;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  min-height: 30px;
  min-width: 120px;
}
.btn:hover {
  background: #000;
  color: #fff;
}

.btn:active {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
