<template>
  <font-awesome-icon
    :icon="['fas', 'heart']"
    class="flip-icon"
    @mouseenter="beat = true"
    @mouseleave="beat = false"
    :class="{ beat: beat }"
    size="1x"
    style="color: #fa0000"
  />
</template>

<script>
export default {
  data() {
    return {
      beat: false,
    };
  },
};
</script>

<style>
.beat-icon {
  transition: transform 0.6s;
}

.beat-icon.beat {
  transform: rotateY(
    180deg
  ); /* 또는 원하는 'flip' 애니메이션에 맞게 조절하세요. */
}
</style>
