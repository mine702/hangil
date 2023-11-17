<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isToggled = ref(false);

watch(isToggled, (newValue) => {
    if (newValue) {
        // 토글이 켜졌을 때 boardRegister로 라우팅
        router.push({ name: 'boardRegister' });
    } else {
        // 토글이 꺼졌을 때 boardPage로 라우팅
        router.push({ name: 'boardPage' });
    }
});
</script>

<template>
    <div>
        <RouterView></RouterView>
        <label class="toggle-switch">
            <input type="checkbox" class="toggle-input" v-model="isToggled">
            <span class="toggle-slider"></span>
        </label>
    </div>
</template>

<style scoped>
.toggle-switch {
    position: fixed;
    top: 90%;
    left: 8%;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input:checked+.toggle-slider {
    background-color: #7B68EE;
}

input:checked+.toggle-slider:before {
    transform: translateX(26px);
}
</style>