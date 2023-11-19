<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";

// Define the reactive variables
let cards = ref([]);
let cover = ref(null);
let openContent = ref(null);
let openContentText = ref(null);
let openContentImage = ref(null);
let closeContent = ref(null);
let currentCard = ref(null);
let pageIsOpen = ref(false);
let windowWidth = ref(window.innerWidth);
let windowHeight = ref(window.innerHeight);

const paragraphText = "<p>Somebody once told me the world is gonna roll me...</p>";

// Function to initialize and attach event listeners
const init = () => {
  resize();
  selectElements();
  attachListeners();
};

// Function to select elements and set them to reactive variables
const selectElements = () => {
  cards.value = Array.from(document.getElementsByClassName("card"));
  cover.value = document.getElementById("cover");
  openContent.value = document.getElementById("open-content");
  openContentText.value = document.getElementById("open-content-text");
  openContentImage.value = document.getElementById("open-content-image");
  closeContent.value = document.getElementById("close-content");
};

// Function to attach event listeners
const attachListeners = () => {
  cards.value.forEach((card, index) => {
    card.addEventListener("click", (e) => onCardClick(e, index));
  });
  closeContent.value.addEventListener("click", onCloseClick);
  window.addEventListener("resize", resize);
};

// Function to handle card click
const onCardClick = (e, index) => {
  currentCard.value = getCardElement(e.target);
  currentCard.value.classList.add("clicked");
  setTimeout(() => animateCoverUp(currentCard.value), 200);
  animateOtherCards(currentCard.value, true);
  openContent.value.classList.add("open");
};

function animateCoverUp(card) {
  const cardPosition = card.getBoundingClientRect();
  const cardStyle = window.getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);

  openContentText.value.innerHTML = `<h1>${card.children[2].textContent}</h1>${paragraphText}`;
  openContentImage.value.src = card.children[1].src;

  setTimeout(() => {
    window.scroll(0, 0);
    pageIsOpen.value = true;
  }, 300);
}

function animateCoverBack(card) {
  const cardPosition = card.getBoundingClientRect();
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);

  cover.value.style.transform = `scaleX(1) scaleY(1) translate3d(0px, 0px, 0px)`;

  setTimeout(() => {
    openContentText.value.innerHTML = "";
    openContentImage.value.src = "";
    cover.value.style.width = "0px";
    cover.value.style.height = "0px";
    pageIsOpen.value = false;
    currentCard.value.classList.remove("clicked");
  }, 301);
}

function setCoverPosition(cardPosition) {
  cover.value.style.left = `${cardPosition.left}px`;
  cover.value.style.top = `${cardPosition.top}px`;
  cover.value.style.width = `${cardPosition.width}px`;
  cover.value.style.height = `${cardPosition.height}px`;
}

function setCoverColor(cardStyle) {
  cover.value.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  const scaleX = windowWidth.value / cardPosition.width;
  const scaleY = windowHeight.value / cardPosition.height;
  const offsetX = (windowWidth.value / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  const offsetY = (windowHeight.value / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;

  cover.value.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) translate3d(${offsetX}px, ${offsetY}px, 0px)`;
}

function onCloseClick() {
  openContent.value.classList.remove("open");
  animateCoverBack(currentCard.value);
  animateOtherCards(currentCard.value, false);
}

function animateOtherCards(card, out) {
  let delay = 100;
  for (let i = 0; i < cards.value.length; i++) {
    if (cards.value[i] === card) continue;
    if (out) animateOutCard(cards.value[i], delay);
    else animateInCard(cards.value[i], delay);
    delay += 100;
  }
}

function animateOutCard(card, delay) {
  setTimeout(() => {
    card.classList.add("out");
  }, delay);
}

function animateInCard(card, delay) {
  setTimeout(() => {
    card.classList.remove("out");
  }, delay);
}

// Util function to find the card element
const getCardElement = (el) => {
  if (el.classList.contains("card")) return el;
  else return getCardElement(el.parentElement);
};

// Function to handle resize event
const resize = () => {
  if (pageIsOpen.value) {
    const cardPosition = currentCard.value.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

// Mounted and unmounted lifecycle hooks
onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  // Cleanup: remove event listeners
  closeContent.value.removeEventListener("click", onCloseClick);
  window.removeEventListener("resize", resize);
  cards.value.forEach((card) => {
    card.removeEventListener("click", onCardClick);
  });
});
</script>

<template>
  <!--
  Please note: this code is in no way ready to be used as is in production on your website. It will need to be adapted to be cross browser compliant & accessible. I just wanted to share how one might go about this effect with CSS & JS and no other dependencies
-->
  <div class="container">
    <div class="card-column column-0">
      <div class="card card-color-0">
        <div class="border"></div>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/deathtostock-00.jpg" />
        <h1>Hey now, you're an allstar</h1>
      </div>
    </div>
  </div>

  <div id="cover" class="cover"></div>

  <div id="open-content" class="open-content">
    <a href="#" id="close-content" class="close-content"
      ><span class="x-1"></span><span class="x-2"></span
    ></a>
    <img id="open-content-image" src="" />
    <div class="text" id="open-content-text"></div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

/* Cards */
.card-column {
  width: 50%;
  float: left;
  padding: 4%;
  box-sizing: border-box;
}

.column-1 {
  padding-top: 100px;
}

.card {
  width: 92%;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background: #eb5160;
  color: #fff;
  cursor: pointer;
  margin-bottom: 60px;
}

.border {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 6px;
  border: 1px solid #fff;
  opacity: 0.5;
  left: -6px;
  top: -6px;
}

.card h1 {
  position: relative;
  padding: 250px 0px 100px 10px;
  width: 90%;
}

.card > img {
  width: 90%;
  position: absolute;
  top: 6%;
  left: 6%;
}

.card-color-0 {
  background-color: eb5160;
}

/* The cover (expanding background) */
.cover {
  position: fixed;
  background: #eb5160;
  z-index: 100;
  transform-origin: 50% 50%;
}

/* The open page content */
.open-content {
  width: 100%;
  z-index: 110;
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.open-content img {
  position: relative;
  width: 90%;
  margin-left: 3%;
  margin-top: 20px;
  z-index: 5;
}

.open-content .text {
  background: #fff;
  margin-top: -56%;
  padding: 60% 5% 5% 5%;
  width: 80%;
  margin-left: 5%;
  margin-bottom: 5%;
}

.open-content .text h1,
.open-content .text p {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.close-content {
  display: block;
  position: absolute;
  right: 12px;
  top: 12px;
  width: 30px;
  height: 30px;
}

.close-content span {
  background: #222;
  width: 30px;
  height: 6px;
  display: block;
  position: absolute;
  top: 14px;
}

.x-1 {
  transform: rotate(45deg);
}

.x-2 {
  transform: rotate(-45deg);
}

.card {
  transition: opacity 200ms linear 320ms, transform 200ms ease-out 320ms;
}

.border {
  transition: opacity 200ms linear, transform 200ms ease-out;
}

.card img {
  transition: opacity 200ms linear 0ms, transform 200ms ease-in 0ms;
}

.card h1 {
  transform: translate3d(20%, 0px, 0px);
  transition: opacity 200ms linear 120ms, transform 200ms ease-in 120ms;
}

/* Clicked card */
.card.clicked img {
  transform: translate3d(0px, -40px, 0px);
  opacity: 0;
}

.card.clicked .border {
  opacity: 0;
  transform: scale(1.3);
}

.card.out,
.card.out img {
  transform: translate3d(0px, -40px, 0px);
  opacity: 0;
}

.card.out h1,
.card.clicked h1 {
  transform: translate3d(20%, -40px, 0px);
  opacity: 0;
}

.cover {
  transition: transform 300ms ease-in-out;
}

.open-content {
  transition: opacity 200ms linear 0ms;
}

.open-content.open {
  opacity: 1;
  pointer-events: all;
  transition-delay: 1000ms;
}

/* 
** Media Queries
*/

@media screen and (max-width: 600px) {
  .card-column {
    width: 90%;
  }

  .open-content img {
    margin-top: 40px;
  }
}
</style>
