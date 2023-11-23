<script setup>
import { ref, onMounted } from "vue";
import { ChatService } from "@/api/ChatService";
import ChatForm from "./chatForm/ChatForm.vue";
const chat = ref();
onMounted(() => {
  chat.value.scrollTop = chat.value.scrollHeight - chat.value.clientHeight;
});

const chatService = new ChatService();
const message = ref("");

function sendMessage() {
  chatService.sendMessage({ text: message.value });
  message.value = "";
}

onMounted(() => {
  chatService.connect();
});
const showChatInput = ref(false);
const userId = ref("");

function toggleChatInput() {
  showChatInput.value = !showChatInput.value;
}

function startChat() {
  if (userId.value) {
    // 여기에 WebSocket을 통해 실시간 채팅을 시작하는 로직을 연결합니다.
    console.log("Starting chat with user ID:", userId.value);
    // 예시로 WebSocket 연결 코드를 호출할 수 있습니다.
    // chatService.startChatWithUser(userId.value);
    showChatInput.value = false; // 입력 영역을 숨깁니다.
  }
}
</script>

<template>
  <div class="container">
    <!-- partial:index.partial.html -->
    <div class="contacts">
      <div class="user-add">
        <button class="user-add-button" @click="toggleChatInput">
          <i class="fa-solid fa-user-plus"></i>
        </button>
        <div v-if="showChatInput" class="chat-input-area">
          <input
            v-model="userId"
            placeholder="Enter user ID"
            class="user-id-input"
          />
          <button @click="startChat" class="start-chat-button">Chat</button>
        </div>
      </div>
      <div class="contact">
        <div class="pic rogers"></div>
        <div class="badge">14</div>
        <div class="name">Steve Rogers</div>
        <div class="message">That is America's ass 🇺🇸🍑</div>
      </div>
      <button class="scroll-button" @click="closeModal">
        <i class="fa-solid fa-angles-down"></i>
      </button>
    </div>

    <ChatForm ref="chat" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Red+Hat+Display:400,500,900&display=swap");
.container {
  line-height: 1.25em;
  letter-spacing: 0.025em;
  transform: translate(-0%, -0%);
}

.pic {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.contact {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 5rem;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.contact .pic {
  position: absolute;
  left: 0;
}
.contact .name {
  font-weight: 500;
  margin-bottom: 0.125rem;
}
.contact .message,
.contact .seen {
  font-size: 0.9rem;
  color: #999;
}
.contact .badge {
  box-sizing: border-box;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  padding-top: 0.125rem;
  border-radius: 1rem;
  top: 0;
  left: 2.5rem;
  background: #333;
  color: white;
}

.contacts {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-6rem, -50%);
  width: 24rem;
  height: 32rem;
  padding: 1rem 2rem 1rem 1rem;
  box-sizing: border-box;
  border-radius: 1rem 0 0 1rem;
  cursor: pointer;
  background: white;
  box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
    2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
  transition: transform 500ms;
}
.contacts h2 {
  margin: 0.5rem 0 1.5rem 5rem;
}
.contacts .fa-bars {
  position: absolute;
  left: 2.25rem;
  color: #999;
  transition: color 200ms;
}
.contacts .fa-bars:hover {
  color: #666;
}
.contacts .contact:last-child {
  margin: 0;
}
.contacts:hover {
  transform: translate(-23rem, -50%);
}

.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24rem;
  height: 38rem;
  z-index: 2;
  box-sizing: border-box;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
    0rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
}
.chat .contact.bar {
  flex-basis: 3.5rem;
  flex-shrink: 0;
  margin: 1rem;
  box-sizing: border-box;
}
.chat .messages {
  padding: 1rem;
  background: #f7f7f7;
  flex-shrink: 2;
  overflow-y: auto;
  box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
    inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
}
.chat .messages .time {
  font-size: 0.8rem;
  background: #eee;
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  color: #999;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: 0 auto;
}
.chat .messages .message {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 1rem;
  background: #fff;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 66%;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
    0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
}
.chat .messages .message.parker {
  margin: 1rem 1rem 1rem auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  background: #333;
  color: white;
}
.chat .messages .message .typing {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0rem;
  box-sizing: border-box;
  background: #ccc;
  border-radius: 50%;
}
.chat .messages .message .typing.typing-1 {
  -webkit-animation: typing 3s infinite;
  animation: typing 3s infinite;
}
.chat .messages .message .typing.typing-2 {
  -webkit-animation: typing 3s 250ms infinite;
  animation: typing 3s 250ms infinite;
}
.chat .messages .message .typing.typing-3 {
  -webkit-animation: typing 3s 500ms infinite;
  animation: typing 3s 500ms infinite;
}
.chat .input {
  box-sizing: border-box;
  flex-basis: 4rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 1.5rem;
}
.chat .input i {
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #666;
  cursor: pointer;
  transition: color 200ms;
}
.chat .input i:hover {
  color: #333;
}
.chat .input input {
  border: none;
  background-image: none;
  background-color: white;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 1.125rem;
  flex-grow: 2;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1),
    0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.2);
  font-family: Red hat Display, sans-serif;
  font-weight: 400;
  letter-spacing: 0.025em;
}
.chat .input input:placeholder {
  color: #999;
}

@-webkit-keyframes typing {
  0%,
  75%,
  100% {
    transform: translate(0, 0.25rem) scale(0.9);
    opacity: 0.5;
  }
  25% {
    transform: translate(0, -0.25rem) scale(1);
    opacity: 1;
  }
}

@keyframes typing {
  0%,
  75%,
  100% {
    transform: translate(0, 0.25rem) scale(0.9);
    opacity: 0.5;
  }
  25% {
    transform: translate(0, -0.25rem) scale(1);
    opacity: 1;
  }
}
.pic.stark {
  background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png");
}

.pic.banner {
  background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/4f/BruceHulk-Endgame-TravelingCapInPast.jpg");
}

.pic.thor {
  background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/98/ThorFliesThroughTheAnus.jpg");
}

.pic.danvers {
  background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/05/HeyPeterParker.png");
}

.pic.rogers {
  background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Cap.America_%28We_Don%27t_Trade_Lives_Vision%29.png");
}

.user-add {
  /* 버튼과 입력 필드를 함께 묶는 컨테이너 스타일 */
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 추가: 요소들 사이의 간격 */
}

.user-add-button {
  font-size: 1.7em;
}
.user-id-input {
  /* 사용자 ID 입력 필드 스타일 */
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  flex-grow: 1; /* 추가: 입력 필드가 남은 공간을 모두 차지하도록 설정 */
}

.start-chat-button {
  /* 채팅 시작 버튼 스타일 */
  padding: 0.2rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 200ms;
  /* 추가: 입력 필드와 동일한 높이 설정 */
  height: 100%;
  box-sizing: border-box;
}

.start-chat-button:hover {
  /* 채팅 시작 버튼 호버 스타일 */
  background-color: #0056b3;
}
</style>
