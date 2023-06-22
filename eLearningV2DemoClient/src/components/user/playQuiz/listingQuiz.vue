<script setup>
import { ref, onMounted } from "vue";

//This function sends "startQuiz.value" with "emitStartQuiz" function to "appPlayQuiz" component
let startQuiz = true;

//Variable used in "exit" function
const booleenMenu = ref(true);

//Array stocks idQuiz of evaluation mode when the quiz is finish
const storageIdQuiz = ref([]);

const emit = defineEmits(["mainMenu", "startQuiz", "hideExitIcon"]);

//Get session quizDescription's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Get session results's data
let sessionResults = sessionStorage.getItem("userResults");
let sessionJsonResults = JSON.parse(sessionResults);

//Variable used in "onMounted" with "emit"
const displayExitIcon = ref(false)

//This Function sends "booleenMenu.value" to "appPlayQuiz" component to show this template
function exit() {
  booleenMenu.value = false;
  emit("mainMenu", booleenMenu);
}

//This function sends "index, startQuiz" to "appPlayQuiz" component which will be sent to "questionLayout" component to play the quiz
function emitStartQuiz(index, startQuiz) {
  emit("startQuiz", index, startQuiz);
}

//Manage the activation of buttons if the quiz with an "evaluation" mode has been completed by the user
onMounted(() => {
  emit("hideExitIcon", displayExitIcon)
  //Stock idQuiz of evaluation modes of finished quiz
  if (sessionJsonResults) {
    for (
      let index = 0;
      index < sessionJsonResults[0].quizData.length;
      index++
    ) {
      const element = sessionJsonResults[0].quizData[index];
      if (element.modeQuiz == "evaluation") {
        storageIdQuiz.value.push(element.idQuiz);
      }
    }
    //double for loop to disable the finished quiz in evaluation mode
    const listQuiz = document.querySelectorAll(".quiz");
    for (let index = 0; index < sessionJsonResults[0].quizData.length; index++) {
      const element = sessionJsonResults[0].quizData[index];
      for (let index2 = 0; index2 < sessionJsonQuizDescription.length; index2++) {
        const element2 = sessionJsonQuizDescription[index2];
        if (element.idQuiz == element2.idQuiz && element.modeQuiz == "evaluation") {
          listQuiz[index2].classList.remove("personnalizedColor", "cursorPointer");
          listQuiz[index2].disabled = true;
        }
      }
    }
  }
});
</script>


<template>
<nav class="navScoped">
  <i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="exit"></i>
<div class="white withMax center roboto">Liste des quiz</div>
</nav>
  
<div class="flexRowScoped marginTopScoped marginBottomScoped">
  <div v-for="(item, index) in sessionJsonQuizDescription" :key="item">
    <button
      class="quizScoped cursorPointer personnalizedColor quiz"
      @click="emitStartQuiz(index, startQuiz)"
    >
      <div class="flexColumnScoped relative">
        <i class="fi fi-ss-cross crossScoped absolute" v-if="storageIdQuiz.includes(sessionJsonQuizDescription[index].idQuiz)"></i>
        <div>
          <div class="roboto underline">Nom du quiz :</div>
          <div>
            {{ sessionJsonQuizDescription[index].name }}
          </div>
        </div>
        <div>
          <div class="roboto underline">
            Mode {{ sessionJsonQuizDescription[index].modeQuiz }}
          </div>
        </div>
        <div>
          <div class="roboto underline">Nombre de questions :</div>
          <div>
            {{ sessionJsonAdminQuestions[index].questions.length - 1 + 1 }}
          </div>
        </div>
        <div>
          <div class="roboto underline">Description du quiz :</div>
          <div>
            {{ sessionJsonQuizDescription[index].commentaireQuiz }}
          </div>
        </div>
      </div>
    </button>
  </div>
</div>
</template>


<style scoped>
.quizScoped {
  width: 15rem;
  height: 15rem !important;
  border: 1px solid #004D22;
  border-radius: 15px;
}
.flexColumnScoped {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1rem;
  gap: 1rem;
}
.flexRowScoped {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.personnalizedColor {
  background-color: #f29300;
    color: white;
}
.personnalizedColor:hover {

    color: black;

}
.crossScoped {
  font-size: 2rem;
  top: 0;
  left: 0;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}
.marginBottomScoped{
  margin-bottom: 4rem;
}
.marginTopScoped{
  margin-top: 4rem;
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
