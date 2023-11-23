<script setup>
import { ref, onMounted } from "vue";
import ChatForm from "./chatForm/ChatForm.vue";
const chat = ref();
onMounted(() => {
  chat.value.scrollTop = chat.value.scrollHeight - chat.value.clientHeight;
});

</script>

<template>
  <div class="container">
    <ChatForm ref="chat" />
  </div>
</template>

<style scoped>
.container {
  line-height: 1.25em;
  letter-spacing: 0.025em;
  transform: translate(-0%, -0%);
}
</style>
