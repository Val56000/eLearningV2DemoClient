<script setup>
import { ref } from "vue";

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Get session response's data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);

//Get session result's data
let sessionUserResults = sessionStorage.getItem("userResults");
let sessionJsonUserResults = JSON.parse(sessionUserResults);

const props = defineProps(["propsUserNameChoice", "propsIdQuizChoice"]);

const emit  = defineEmits(["mainMenu"]);

//User's answers
const arrayResponseUser = ref([]);

//Quiz questions and solutions
const arrayQuestionsResponsesAdmin = ref([]);

//User's score
const score = ref()

//This variable is given to its parent's component
const booleenMenu = ref(true);


//For loop to assign the user's score to the "score" variable
for (let index = 0; index < sessionJsonUserResults.length; index++) {
  const element = sessionJsonUserResults[index];
  if (element.nameUser == props.propsUserNameChoice){
        for (let index2 = 0; index2 < element.quizData.length; index2++) {
      const element2 = element.quizData[index2];
      if (element2.idQuiz == props.propsIdQuizChoice) {
        score.value = element2.points + "/" + element2.numberQuestions;
      }
    }
  }
}



//For loop to assign all user responses to variable "arrayResponseUser"
for (let index = 0; index < sessionJsonUserResponses.length; index++) {
  const element = sessionJsonUserResponses[index];
  if (element.nameUser == props.propsUserNameChoice) {
    for (let index2 = 0; index2 < element.quizResponse.length; index2++) {
      const element2 = element.quizResponse[index2];
      if (element2.idQuiz == props.propsIdQuizChoice) {
        arrayResponseUser.value = element2.listResponse;
      }
    }
  }
}


//For loop to assign all elements on the admin side to variable "arrayQuestionsResponsesAdmin".
for (let index = 0; index < sessionJsonAdminQuestions.length; index++) {
  const element = sessionJsonAdminQuestions[index];
  if (element.idQuiz == props.propsIdQuizChoice) {
    console.log(element.idQuiz);
    for (let index2 = 0; index2 < element.questions.length; index2++) {
      const element2 = element.questions[index2];
      arrayQuestionsResponsesAdmin.value.push(element2);
    }
  }
}

function exit() {
  emit("mainMenu", booleenMenu);
}
</script>


<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="exit"></i>
<div class="white withMax center roboto">Résultats de l'utilisateur : {{props.propsUserNameChoice}} </div>
</nav>
  <div class="containerComposantOnlyUser">

    <div class="blueLight roboto marginTop largeSize">
      Score : 
      {{score}}</div>

    <div class="containerChildResult">
      <div
        class="oneElement"
        v-for="(item, index) in arrayResponseUser"
        :key="item.id"
      >

        <li class="questionAdmin">
                  <div v-if="JSON.stringify(item.reponse) == JSON.stringify(arrayQuestionsResponsesAdmin[index].reponse) || item.reponse == arrayQuestionsResponsesAdmin[index].reponse">
          <i class="fi fi-ss-check circle"></i>
        </div>
        <div v-else>
          <i class="fi fi-ss-cross-circle cancel"></i>
        </div>
          <div class="blueBold roboto">Question {{ index + 1 }}</div>
          <span class="blueLight roboto">
          {{ arrayQuestionsResponsesAdmin[index].question }}
          </span>
        </li>
        <li v-if="Array.isArray(item.reponse)">
          <div class="blueBold roboto">
            Réponse de {{ props.propsUserNameChoice }} :
          </div>
          <span class="blueLight roboto">
            {{ item.reponse.join() }}
          </span>
        </li>
        <li v-else>
          <div class="blueBold roboto">
            Réponse de {{ props.propsUserNameChoice }} :
          </div>
          <span class="blueLight roboto">
            {{ item.reponse }}
          </span>
        </li>
        <li
          v-if="Array.isArray(arrayQuestionsResponsesAdmin[index].reponse)"
          class="blueLight roboto"
        >
          <div class="blueBold roboto">Solution :</div>
          <span class="blueLight roboto">
            {{ arrayQuestionsResponsesAdmin[index].reponse.join() }}
          </span>
        </li>
        <li v-else>
          <div class="blueBold roboto">Solution :</div>
          <span class="blueLight roboto">
            {{ arrayQuestionsResponsesAdmin[index].reponse }}
          </span>
        </li>
      </div>
    </div>
  </div>
</template>

<style scoped>
.containerComposantOnlyUser {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6rem;
}
.containerChildResult {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
li {
  list-style-type: none;
  line-height: 1.2rem;
}
.questionAdmin:first-child {
  margin-top: 2rem;
}
.firstTitle {
  margin-top: 6rem;
  font-size: 1.2rem;
  color: #485fc7;
  text-decoration: underline;
}

.colorBlueBold {
  color: #485fc7;
}
.colorBlueLight {
  color: #a6b5d4 !important;
}

.questionAdmin {
  line-height: 1.2rem;
}
.oneElement {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.oneElement:last-child{
  margin-bottom: 10rem;
}
.circle{
  color: rgb(60, 226, 60);
}
.cancel{
  color: rgb(207, 31, 31);
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
.roboto {
 font-family: 'Roboto', sans-serif;
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