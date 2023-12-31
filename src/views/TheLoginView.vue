<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

import LoginForm from "../components/LoginPageCommons/forms/LoginForm.vue";
import BannerForm from "../components/LoginPageCommons/BannerForm.vue";

gsap.registerPlugin(ScrollTrigger);

const pageContainer = ref(null);
let scroller = null;

const updateScrollTrigger = () => {
  if (scroller) {
    scroller.update();
  }
};

onMounted(() => {
  if (!pageContainer.value) {
    console.error("pageContainer is not defined");
    return;
  }

  try {
    scroller = new LocomotiveScroll({
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
    ScrollTrigger.addEventListener("refresh", updateScrollTrigger);
  } catch (error) {
    console.error("Error initializing LocomotiveScroll:", error);
  }
});

onBeforeUnmount(() => {
  // 모든 ScrollTrigger 인스턴스 정리
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  ScrollTrigger.clearMatchMedia();

  // ScrollTrigger 프록시 정리
  if (pageContainer.value) {
    ScrollTrigger.scrollerProxy(pageContainer.value, {
      scrollTop: () => 0,
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }),
      pinType: pageContainer.value.style.transform ? "transform" : "fixed",
    });
  }

  // ScrollTrigger의 이벤트 리스너 제거
  ScrollTrigger.removeEventListener("refresh", updateScrollTrigger);

  // LocomotiveScroll 인스턴스 정리
  if (scroller) {
    scroller.destroy();
    scroller = null;
  }
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

    <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
      <div data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
        <BannerForm />
      </div>
    </section>

    <section id="sectionPin">
      <div class="pin-wrap">
        <h2>
          "로그인을 하시면 다양한 게시글을 공유하고, 여행에 영감을 줄 수 있는
          마음에 드는 게시물을 저장할 수 있습니다. 이렇게 모아진 정보로 여행
          계획을 세우는 데 도움을 받으세요. 여러분만의 특별한 여행 경로를
          계획하고, 다른 사용자들과 소중한 여행 경험을 공유하며 새로운
          아이디어를 얻어보세요."
        </h2>
        <img src="../assets/img/slide1.jpg" alt="" />
        <img src="../assets/img/slide2.jpg" alt="" />
        <img class="lastImg" src="../assets/img/slide3.jpg" alt="" />
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

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://use.typekit.net/skn8ash.css");
@import url("https://cdn.jsdelivr.net/npm/locomotive-scroll@3/dist/locomotive-scroll.css");

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

.lastImg {
  margin-right: 30%;
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
}

@media (max-width: 768px) {
  h1 {
    font-size: 16vw;
  }
}

h1 span {
  display: block;
}

h2 {
  font-size: 2rem;
  max-width: 400px;
}

.credit {
  font-family: Termina, sans-serif;
}

.credit a {
  color: #111;
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
}

.pin-wrap > * {
  min-width: 60vw;
  padding: 0 5vw;
}

p {
  position: absolute;
  bottom: 10vw;
  right: 10vw;
  width: 200px;
  line-height: 1.5;
}
</style>
