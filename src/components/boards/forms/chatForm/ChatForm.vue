<script setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const ws = ref(null);
const newMessage = ref('');
const messages = ref([]);
const memberStore = useMemberStore();

const { userInfo } = storeToRefs(memberStore);

// WebSocket 서버에 연결하고 이벤트 핸들러를 설정하는 함수
function setupWebSocket() {
  ws.value = new WebSocket(import.meta.env.VITE_CHAT_URL);

  // 서버로부터 메시지를 받았을 때 호출될 이벤트 핸들러
  ws.value.onmessage = event => {
    // 서버로부터 받은 메시지(JSON 문자열)를 파싱하여 자바스크립트 객체로 변환
    const message = JSON.parse(event.data);
    if (message.userId == userInfo.value.userId) {
      message.isCurrentUser = true;
    }
    // 메시지 배열에 새 메시지 객체를 추가하여 화면에 표시
    messages.value.push(message);
  };

  // WebSocket 연결이 열릴 때 호출될 이벤트 핸들러
  ws.value.onopen = () => {
    console.log('Connected to WebSocket');
  };

  // WebSocket 연결이 닫힐 때 호출될 이벤트 핸들러
  ws.value.onclose = () => {
    console.log('Disconnected from WebSocket');
  };

  // WebSocket 연결 중 오류가 발생했을 때 호출될 이벤트 핸들러
  ws.value.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };
}


function sendMessage() {
  if (newMessage.value.trim()) {
    const message = {
      userId: userInfo.value.userId, // 메시지 객체에 userId 추가
      content: newMessage.value,
    };
    ws.value.send(JSON.stringify(message));
    newMessage.value = '';
  }
}

onMounted(() => {
  setupWebSocket();
});

// 현재 시간과 분을 얻기 위한 함수
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

// 현재 시간과 분을 저장할 반응형 변수
const currentTime = ref(getCurrentTime());

// 현재 시간과 분을 갱신하는 함수
const updateTime = () => {
  currentTime.value = getCurrentTime();
};

// 갱신을 위해 setInterval 사용
setInterval(updateTime, 1000 * 60); // 매 분마다 갱신
</script>

<template>
  <div class="chat" ref="chat">
    <div class="contact bar">
      <div class="pic stark"></div>
      <div class="name">{{ userInfo.userId }}</div>
      <div class="seen">{{ currentTime }}</div>
    </div>
    <div class="messages" id="chat">
      <div v-for="(message, index) in messages" :key="index"
        :class="{ 'message parker': message.isCurrentUser, 'message stark': !message.isCurrentUser }">
        <strong>{{ message.userId }}: </strong>{{ message.content }}
      </div>
    </div>
    <div class="input">
      <i class="fas fa-camera"></i><i class="far fa-laugh-beam"></i>
      <input placeholder="Type your message here!" type="text" v-model="newMessage" />
      <button class="send-butten" @click="sendMessage">
        <i class="fa-regular fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pic {
  width: 4rem;
  height: 4rem;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.contact {
  position: relative;
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
  font-weight: 400;
  letter-spacing: 0.025em;
}

.messages {
  height: 100%;
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
</style>
