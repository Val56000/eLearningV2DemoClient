<script setup>
import questionContainer from "./questionContainer.vue";
import finalResult from "./finalResult.vue";
import { ref, watch } from "vue";

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Get session responses data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);


const props = defineProps(["indexQuiz", "startQuiz"]);

const emit = defineEmits(["mainMenu, accessAppResults"]);

//"props.indexQuiz" is the index of the quiz chosen by the user
const listAdminQuestions = sessionJsonAdminQuestions[props.indexQuiz].questions;

//This variable manages the progression's quiz
const incrementQuestion = ref(1);

//Disable "validate" button
const isDisabledNext = ref(true);

//Manage the child's components display
const displayProgress = ref(false);

//This function allows to go to "finalResult.vue"
function goToFinalResults() {
  const sessionJsonUserResponses = JSON.parse(sessionStorage.getItem("userResponses"));
  let lastItemOfSession = sessionJsonUserResponses.pop();
  const lastItemAdmin = sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1];
  if (lastItemOfSession.id == lastItemAdmin.id && lastItemOfSession.reponse != "") {
    displayProgress.value = true;
  }
}

//Manage the activation of "suivant" button
watch(incrementQuestion, () => {
  let sessionUserResponses = sessionStorage.getItem("response");
  let sessionJsonUserResponses = JSON.parse(sessionUserResponses);
  isDisabledNext.value = true
  if (sessionJsonUserResponses) {
    for (let index = 0; index < sessionJsonUserResponses[sessionJsonUserResponses.length-1].quizResponse[0].listResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[sessionJsonUserResponses.length-1].quizResponse[0].listResponse[index];
      if (element.id == incrementQuestion.value && element.reponse != null) {
        isDisabledNext.value = false;
        return;
      } else {
        isDisabledNext.value = true; 
      }
    }
  }
})

//This function gets data from "questionContainer.vue" 
function activateButtonNext(indexUse, questionId) {
  // Info les variables ont été inversé dans les composants enfants / indexUse est le numéro de la question et Response est l'index du Quiz choisi / A rectifier à l'avenir !!!
if (questionId == incrementQuestion.value) {
  isDisabledNext.value = false
}else{
  isDisabledNext.value = true
}
}

//This function allows to return to previous screen
function exit(booleenMenu) {
  booleenMenu.value = false;
  emit("mainMenu", booleenMenu);
}

</script>


<template>
  <div v-if="displayProgress == false">
    <div>
      <div class="center blueBold roboto">
        {{ incrementQuestion }}/{{ listAdminQuestions.length }}
      </div>
      <div class="center widthSmall">
        <progress
        class="sizeProgress progress"
          :value="incrementQuestion"
          :max="listAdminQuestions.length"
        ></progress>
      </div>

      <questionContainer
        :increment="incrementQuestion"
        @eventData="activateButtonNext"
        :indexQuiz="props.indexQuiz"
        :startQuiz="props.startQuiz"
      />

      <div class="marginTop gap center">
        <button
          class="button marginRight"
          @click="incrementQuestion--"
          v-if="incrementQuestion > 1"
        >
          <i class="fi fi-rs-angle-left"></i>
          Précédent
        </button>

        <button
          class="button"
          @click="incrementQuestion++"
          :disabled="isDisabledNext"
          v-if="incrementQuestion >= 1 && incrementQuestion < sessionJsonAdminQuestions[props.indexQuiz].questions.length">
          Suivant
          <i class="fi fi-rs-angle-right"></i>
        </button>

        <button
          :disabled="isDisabledNext"
          class="button"
          v-if="
            incrementQuestion ==
            sessionJsonAdminQuestions[props.indexQuiz].questions.length
          "
          @click="goToFinalResults"
        >
          <div>Valider</div>
          <i class="fi fi-rs-angle-right"></i>
        </button>
      </div>
    </div>
  </div>
  <finalResult
    v-if="displayProgress == true"
    :indexQuiz="props.indexQuiz"
    @mainMenu="exit"
    @accessAppResults="goAppResults"
  />
</template>

<style scoped>
.sizeProgress{
  /* width: 10rem; */
  height: 0.5rem;
}

button.is-info{
  color: #a2ce6a !important;
  background-color: transparent !important;
  border: none;
}


button{
  background-color: transparent !important;
  border: none;
}
</style>
