<script setup>

</script>

<template>
    <div class="container">
        <div class="button-effect">
            <a class="effect effect-5" href="#" title="Learn More">Learn More</a>
            <a class="effect effect-5" href="#" title="Learn More">Learn More</a>
            <a class="effect effect-5" href="#" title="Learn More">Learn More</a>
            <a class="effect effect-5" href="#" title="Learn More">Learn More</a>
            <a class="effect effect-5" href="#" title="Learn More">Learn More</a>
        </div>
    </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.container {
    position: absolute;
    left: 0;
    right: 0;
    width: 550px;
    width: 600px;
    text-align: center;
    margin: 200px auto 0px auto;
    /* 버튼과 검색창 사이의 상단 마진 추가 */
}

.container .button-effect a:nth-child(1) {
    background-color: #00bfff;
}

/* Coral 버튼 */
.container .button-effect a:nth-child(2) {
    background-color: #ff7f50;
}

/* Medium Sea Green 버튼 */
.container .button-effect a:nth-child(3) {
    background-color: #3cb371;
}

/* Tomato 버튼 */
.container .button-effect a:nth-child(4) {
    background-color: #ff6347;
}

/* Slate Blue 버튼 */
.container .button-effect a:nth-child(5) {
    background-color: #6a5acd;
}

.effect {
    text-align: center;
    display: inline-block;
    position: relative;
    text-decoration: none;
    color: #fff;
    text-transform: capitalize;
    /* background-color: - add your own background-color */
    font-family: "Roboto", sans-serif;
    /* put your font-family */
    font-size: 18px;
    padding: 20px 0px;
    width: 150px;
    border-radius: 50px;
    overflow: hidden;
    margin: 2%;
    /* 버튼 사이 간격 추가 */
}


/* effect-5 styles */
.effect.effect-5 {
    transition: all 0.2s linear 0s;
}

.effect.effect-5:before {
    content: "";
    font-family: FontAwesome;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0px;
    height: 100%;
    width: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0 50% 50% 0;
    transform: scale(0, 1);
    transform-origin: left center;
    transition: all 0.2s linear 0s;
}

.effect.effect-5:hover {
    text-indent: 30px;
}

.effect.effect-5:hover:before {
    transform: scale(1, 1);
    text-indent: 0;
}
</style>