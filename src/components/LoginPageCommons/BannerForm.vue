<script setup></script>

<template>
  <div class="page-content">
    <div class="card">
      <div class="content">
        <h2 class="title">watch</h2>
        <p class="copy">
          "여기에서 게시글을 등록하실 수 있으며, 다른 사용자들이 작성한 게시글을
          확인하실 수도 있습니다."
        </p>
        <button class="btn">View Trips</button>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2 class="title">save</h2>
        <p class="copy">
          마음에 드는 게시글을 저장 할 수 있으며 저장 한 게시글로 여행 계획을
          작성 할 수 있습니다.
        </p>
        <button class="btn">View Trips</button>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2 class="title">plan</h2>
        <p class="copy">
          작성한 여행 계획을 카카오 맵 을 사용하여 경로를 지정 할 수 있으며 저장
          공유 수정 기능을 활용 할 수 있습니다
        </p>
        <button class="btn">Book Now</button>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2 class="title">chat</h2>
        <p class="copy">
          sns 답게 사용자들간 채팅 기능을 활용 하여 원할한 소통이 가능합니다.
        </p>
        <button class="btn">Book Now</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  display: grid;
  place-items: center;
}

.page-content {
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 1024px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .page-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 800px) {
  .page-content {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  text-align: center;
  color: whitesmoke;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
}

@media (min-width: 600px) {
  .card {
    height: 350px;
  }
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-size: cover;
  background-position: 0 0;
  transition: transform calc(700ms * 1.5) cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
}

.card:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.009) 11.7%,
    rgba(0, 0, 0, 0.034) 22.1%,
    rgba(0, 0, 0, 0.072) 31.2%,
    rgba(0, 0, 0, 0.123) 39.4%,
    rgba(0, 0, 0, 0.182) 46.6%,
    rgba(0, 0, 0, 0.249) 53.1%,
    rgba(0, 0, 0, 0.32) 58.9%,
    rgba(0, 0, 0, 0.394) 64.3%,
    rgba(0, 0, 0, 0.468) 69.3%,
    rgba(0, 0, 0, 0.54) 74.1%,
    rgba(0, 0, 0, 0.607) 78.8%,
    rgba(0, 0, 0, 0.668) 83.6%,
    rgba(0, 0, 0, 0.721) 88.7%,
    rgba(0, 0, 0, 0.762) 94.1%,
    rgba(0, 0, 0, 0.79) 100%
  );
  transform: translateY(-50%);
  transition: transform calc(700ms * 2) cubic-bezier(0.19, 1, 0.22, 1);
}

.card:nth-child(1):before {
  background-image: url(https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
}

.card:nth-child(2):before {
  background-image: url(https://images.unsplash.com/photo-1533903345306-15d1c30952de?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
}

.card:nth-child(3):before {
  background-image: url(https://images.unsplash.com/photo-1545243424-0ce743321e11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
}

.card:nth-child(4):before {
  background-image: url(https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;
}

.content > * + * {
  margin-top: 1rem;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.2;
}

.copy {
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.35;
}

.btn {
  cursor: pointer;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.65rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;
}

.btn:hover {
  background-color: #0d0d0d;
}

.btn:focus {
  outline: 1px dashed yellow;
  outline-offset: 3px;
}

@media (hover: hover) and (min-width: 600px) {
  .card:after {
    transform: translateY(0);
  }

  .content {
    transform: translateY(calc(100% - 4.5rem));
  }

  .content > *:not(.title) {
    opacity: 0;
    transform: translateY(1rem);
    transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1),
      opacity 700ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .card:hover,
  .card:focus-within {
    align-items: center;
  }

  .card:hover:before,
  .card:focus-within:before {
    transform: translateY(-4%);
  }

  .card:hover:after,
  .card:focus-within:after {
    transform: translateY(-50%);
  }

  .card:hover .content,
  .card:focus-within .content {
    transform: translateY(0);
  }

  .card:hover .content > *:not(.title),
  .card:focus-within .content > *:not(.title) {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(700ms / 8);
  }

  .card:focus-within:before,
  .card:focus-within:after,
  .card:focus-within .content,
  .card:focus-within .content > *:not(.title) {
    transition-duration: 0s;
  }
}
</style>
