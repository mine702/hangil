<template>
  <font-awesome-icon
    :icon="['fas', 'user']"
    class="flip-icon"
    @mouseenter="flip = true"
    @mouseleave="flip = false"
    :class="{ flip: flip }"
    size="2x"
  />
</template>

<script>
export default {
  data() {
    return {
      flip: false,
    };
  },
};
</script>

<style>
.flip-icon {
  transition: transform 0.6s;
}

.flip-icon.flip {
  transform: rotateY(
    180deg
  ); /* 또는 원하는 'flip' 애니메이션에 맞게 조절하세요. */
}
</style>
