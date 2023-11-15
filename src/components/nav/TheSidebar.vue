<script setup>
import { ref, defineEmits } from "vue";

const isExpanded = ref(false);
const emit = defineEmits(["update:expanded"]);

function toggleSidebar(expand) {
  isExpanded.value = expand;
  emit("update:expanded", isExpanded.value);
}
</script>

<template>
  <ul
    class="side-menu"
    @mouseenter="() => toggleSidebar(true)"
    @mouseleave="() => toggleSidebar(false)"
  >
    <li>
      <a href="#"><span class="fa fa-code"></span>Superguide</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-cog"></span>Instalação e Dependências</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-font"></span>Tipografia</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-caret-square-o-right"></span>Botões</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-check-square"></span>Formulários</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-square"></span>Cards</a>
    </li>
    <li>
      <a href="#"><span class="fa fa-bars"></span>Menu</a>
    </li>
  </ul>
</template>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Roboto";
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css");
.side-menu {
  font-family: "Roboto", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 60px;
  list-style-type: none;
  background: #363c5a;
  overflow: hidden;
  transition: width 0.3s;
}

.side-menu:hover {
  width: 300px;
}

.side-menu li {
  width: 300px;
}

.side-menu li span {
  font-size: 1rem;
  margin: 20px 30px 0 22px;
}

.side-menu li a {
  display: block;
  font-size: 0.9rem;
  text-decoration: none;
  color: #fff;
  height: 60px;
}

.side-menu li a:hover,
.side-menu li:first-child a {
  background: #14081d;
  display: block;
}
</style>
