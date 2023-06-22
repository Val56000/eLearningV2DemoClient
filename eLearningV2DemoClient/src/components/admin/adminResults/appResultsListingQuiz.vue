<script setup>
import { ref } from "vue";

//Get session descriptionQuiz's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session listQuestion's data
let sessionElements = sessionStorage.getItem("listQuestion");
let sessionJsonElements = JSON.parse(sessionElements);

//Get session response's data
let sessionResponse = sessionStorage.getItem("response");
let sessionJsonResponse = JSON.parse(sessionResponse);

//Get session result's data
let sessionResults = sessionStorage.getItem("results");
let sessionJsonResults = JSON.parse(sessionResults);

//Declare defineEmits
const emit = defineEmits(["indexQuiz", "mainMenu"]);

//Boolean variable to go to the main screen
const booleenMenu = ref(true);

function selectQuiz(idQuiz) {
  emit("indexQuiz", idQuiz);
}

function exit() {
  booleenMenu.value = false;
  emit("mainMenu", booleenMenu);
}
</script>


<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="exit"></i>
<div class="white withMax center roboto">Liste des quiz </div>
</nav>
  <div class="containerListing">
    <div class="containerListingChild">
      <div v-for="(item) in sessionJsonQuizDescription" :key="item">
        <div class="quizClass largeSize">
          <a @click="selectQuiz(item.idQuiz)"
            class="roboto">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.containerListing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.containerListingChild {
  text-align: left;
}
.rotateSpan {
  rotate: 180deg;
  position: fixed;
  top: 0;
  cursor: pointer;
  font-size: 3rem;
  margin-top: 1rem;
  margin-left: 1rem;
}
.quizClass:hover{
text-decoration: underline;
text-decoration-thickness: 1.1px;
}
a{
  color: #f29300;
}
a:hover{
  color: black;
}
h2{
  margin-top: 15rem;
  font-size: 1.7rem;
}
.roboto {
 font-family: 'Roboto', sans-serif;
}

.navScoped{
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
}
.marginLeftScoped{
  margin-left: 0.5rem;
}
</style>

