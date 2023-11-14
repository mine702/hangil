<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import LoginForm from "../components/LoginPageCommons/forms/LoginForm.vue";

gsap.registerPlugin(ScrollTrigger);
console.log(gsap);
const pageContainer = ref(null);

onMounted(() => {
  const scroller = new LocomotiveScroll({
    el: pageContainer.value,
    smooth: true,
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer.value, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: pageContainer.value.style.transform ? "transform" : "fixed",
  });

  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: pageContainer.value,
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      start: "top top",
      end: pinWrapWidth,
    },
    x: -horizontalScrollLength,
    ease: "none",
  });
  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();
});
</script>

<template>
  <div class="container" ref="pageContainer">
    <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
      <div>
        <img
          src="../assets/img/hangil_logo.png"
          style="width: 100%; height: auto"
        />
        <p data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
          with Hangil & SSAFY
        </p>
      </div>
    </section>

    <section id="sectionPin">
      <div class="pin-wrap">
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h2>
        <img src="../assets/img/slide1.jpg" alt="" />
        <img src="../assets/img/slide2.jpg" alt="" />
        <img class="lastwrapImg" src="../assets/img/slide3.jpg" alt="" />
      </div>
    </section>

    <section
      class="loginFormContainer"
      data-bgcolor="#bcb8ad"
      data-textcolor="#032f35"
    >
      <div>
        <LoginForm />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.css");

body {
  font-family: termina, sans-serif;
  color: #111;
  background: #b9b3a9;
  transition: 0.3s ease-out;
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
  overscroll-behavior: none;
}

section:not(#sectionPin) {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 50px 10vw;
  margin: auto;
  place-items: center;
}

img {
  height: 80vh;
  width: auto;
  object-fit: cover;
}

.lastwrapImg {
  margin-right: 400px;
}

h1 {
  font-size: 5rem;
  line-height: 1;
  font-weight: 800;
  margin-bottom: 1rem;
  position: absolute;
  top: 10vw;
  left: 10vw;
  z-index: 4;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    font-size: 16vw;
  }

  span {
    display: block;
  }
}

h2 {
  font-size: 2rem;
  max-width: 400px;
}

.credit {
  font-family: Termina, sans-serif;
  a {
    color: #111;
  }
}

* {
  box-sizing: border-box;
}

#sectionPin {
  height: 100vh;
  overflow: hidden;
  display: flex;
  left: 0;
  background: #111;
  color: #b9b3a9;
}

.pin-wrap {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 10vw;
  & > * {
    min-width: 60vw;
    padding: 0 5vw;
  }
}
.loginFormContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // 높이를 뷰포트 높이의 100%로 설정
}

p {
  position: absolute;
  bottom: 10vw;
  right: 10vw;
  width: 200px;
  line-height: 1.5;
}
</style>
