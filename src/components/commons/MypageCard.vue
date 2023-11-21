<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click", {
    /* 필요한 데이터를 여기에 전달할 수 있습니다 */
  });
};
</script>

<template>
  <div class="common-card" @click="onClick">
    <div class="card-image">
      <img :src="post.image" alt="Post Image" />
    </div>
    <div class="card-title">{{ post.title }}</div>
  </div>
</template>

<style scoped>
.common-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #fff;
  cursor: pointer;
}

.common-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.card-image img {
  width: 100%;
  height: 300px; /* 고정 높이 */
  object-fit: cover;
  margin: auto; /* 중앙 정렬 */
}

.card-title {
  padding: 15px;
  font-size: 1em;
  text-align: center;
  color: #333;
  background-color: #f8f8f8;
  border-top: 1px solid #eaeaea;
}
</style>
