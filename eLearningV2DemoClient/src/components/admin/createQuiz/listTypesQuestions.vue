<script setup>
import { ref } from "vue";

//Value of type of creation chosen with v-model
const creationTypeQuestion = ref(null);

//Variable for each tooltip related to a question type
const showInfoRadio = ref(false);
const showInfoCheckBox = ref(false);
const showInfoTrueFalse = ref(false);
const showInfoSlideBar = ref(false);

//Get session descriptionQuiz's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Value sends to "componentQuestions" after choosing a question type / It's used in "activateButton" function
const buttonSendTypeQuestion = ref(true);

//Value sends to "componentQuestions" after clicking on the previous button / It's used in "previousScreen" function
const booleenCaracteristicQuiz = ref(false);

//Value sends to "componentQuestions" to validate the quiz / It's used in "buildNewQuiz" function
const booleenBuildNewQuiz = ref(true);

//Activate validate button
const disabledValidatedButton = ref(true);

//Manage validate button
if (sessionJsonAdminQuestions) {
  if (
    sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].idQuiz ==
    sessionJsonQuizDescription[sessionJsonQuizDescription.length - 1].idQuiz
  ) {
    disabledValidatedButton.value = false;
  } else {
    disabledValidatedButton.value = true;
  }
}

const emit = defineEmits([
  "sendTypeQuestion",
  "toAccessCaracteristicQuiz",
  "sendTypeForEditQuestion",
  "sendTypeForCreateQuestion",
  "buildNewQuiz",
]);

//This function allows to send "creationTypeQuestion.vue" to "componentQuestions" to show a component of "createQuestions" folder
function sendDataBuildChoiceTypeChild() {
  if (creationTypeQuestion != null) {
    emit("sendTypeQuestion", creationTypeQuestion);
  }
}

//This function allows to send "booleenCaracteristicQuiz.value" to "componentQuestions" with previous button
function previousScreen() {
  emit("toAccessCaracteristicQuiz", booleenCaracteristicQuiz);
}

//This function allows to return to main screen after validation of the quiz
function buildNewQuiz() {
  booleenBuildNewQuiz.value = false;
  emit("buildNewQuiz", booleenBuildNewQuiz);
}

//This function manages tooltips
function showInfoBulle(typeInfoBulle) {
  switch (typeInfoBulle) {
    case "radio":
      if (event.type === "mouseover") {
        showInfoRadio.value = true;
      } else if (event.type === "mouseout") showInfoRadio.value = false;
      break;

    case "checkbox":
      if (event.type === "mouseover") {
        showInfoCheckBox.value = true;
      } else if (event.type === "mouseout") showInfoCheckBox.value = false;
      break;

    case "slidebar":
      if (event.type === "mouseover") {
        showInfoSlideBar.value = true;
      } else if (event.type === "mouseout") showInfoSlideBar.value = false;
      break;

    case "truefalse":
      if (event.type === "mouseover") {
        showInfoTrueFalse.value = true;
      } else if (event.type === "mouseout") showInfoTrueFalse.value = false;
      break;

    default:
      break;
  }
}
</script>



<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen"></i>
<div class="white withMax center roboto">Création des questions</div>
</nav>
  <div class="flexColumnScoped gap">
    <div class="titleAndSpan">
      <h2 class="center roboto blueBold">Mode création</h2>
      <span class="smallSize blueBold">(Choisissez le type de question)</span>
    </div>


        <!-- TrueFalse question -->
        <div>
      <div>
        <i
          class="fi fi-rs-comment-info marginRight blueBold"
          @mouseover="() => showInfoBulle('truefalse')"
          @mouseout="() => showInfoBulle('truefalse')"
        ></i>
        <div class="informationType" v-if="showInfoTrueFalse == true">
          <h4>Vrai ou Faux :</h4>
          Une question Vrai ou Faux comprend deux propositions et une réponse.
          <br /><br />
        </div>
        <label
          class="targetInput button is-link is-light raleway marginRight"
          :for="'createQuestionTrueFalse'"
          >Vrai ou Faux</label>
      </div>
      <input
        type="radio"
        :id="'createQuestionTrueFalse'"
        value="trueFalseType"
        v-model="creationTypeQuestion"
        @change="sendDataBuildChoiceTypeChild"
      />
    </div>

    <!-- Radio question -->
    <div>
      <div>
        <i class="fi fi-rs-comment-info marginRight blueBold"
          @mouseover="() => showInfoBulle('radio')"
          @mouseout="() => showInfoBulle('radio')" ></i>
        <div class="informationType" v-if="showInfoRadio == true">
          <h4>Choix unique :</h4>
          Une question à choix unique comprend deux propositions ou plus et une
          réponse.
        </div>

        <label
          class="targetInput button is-link is-light raleway marginRight"
          :for="'createQuestionRadio'"
          >Choix unique</label>
      </div>
      <input
        type="radio"
        :id="'createQuestionRadio'"
        value="radioType"
        v-model="creationTypeQuestion"
        @change="sendDataBuildChoiceTypeChild"
      />
    </div>
    <!-- Checkbox question -->
    <div>
      <div>
        <i class="fi fi-rs-comment-info marginRight blueBold"
          @mouseover="() => showInfoBulle('checkbox')"
          @mouseout="() => showInfoBulle('checkbox')"></i>

        <div class="informationType" v-if="showInfoCheckBox == true">
          <h4>Choix multiple :</h4>
          Une question à choix multiple comprend deux propositions ou plus et
          plusieurs réponses possible.
        </div>

        <label
          class="targetInput button is-link is-light raleway marginRight"
          :for="'createQuestionCheckBox'"
          >Choix multiple</label>
      </div>
      <input
        type="radio"
        :id="'createQuestionCheckBox'"
        value="checkboxType"
        v-model="creationTypeQuestion"
        @change="sendDataBuildChoiceTypeChild"
      />
    </div>


    <!-- Slidebar question -->
    <div>
      <div>
        <i
          class="fi fi-rs-comment-info marginRight blueBold"
          @mouseover="() => showInfoBulle('slidebar')"
          @mouseout="() => showInfoBulle('slidebar')"
        ></i>
        <div class="informationType" v-if="showInfoSlideBar == true">
          <h4>Numérique :</h4>
          Une question numérique comprend un curseur permettant au participant
          de choisir une valeur numérique.
        </div>
        <label
          class="targetInput button is-link is-light raleway marginRight"
          :for="'createQuestionSlideBar'">
          Numérique
          </label>
      </div>
      <input
        type="radio"
        :id="'createQuestionSlideBar'"
        value="slidebarType"
        v-model="creationTypeQuestion"
        @change="sendDataBuildChoiceTypeChild"
      />
    </div>

    <div class="flexColumn gapSecond">
      <button
        v-if="disabledValidatedButton == false"
        class="button is-info marginLeft borderScoped"
        @click="buildNewQuiz"
      >
        Finaliser le quiz
      </button>
    </div>
  </div>
</template>

<style scoped>
button{
  width: 9rem;
}
.gapSecond{
  gap: 0.5rem;
}
h3 {
  font-size: 100% !important;
}
input[type="radio"] {
  display: none;
}
label {
  width: 15rem;
}
.informationType {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  font-size: 0.8rem;
  color: #f29300;
  width: 19rem;
  font-family: "Roboto", sans-serif;
  padding-left: 1rem;
  padding-top: 0.3rem;
  padding-right: 1rem;
  z-index: 1 !important;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
}
.titleAndSpan{
  line-height: 1rem;
  padding-left: 1rem;
}
.flexRowScoped {
    width: 100vw;
    height: auto !important;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.flexColumnScoped {
    width: 100vw;
    height: auto !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
.borderScoped{
  border: 2px solid black !important;
}
</style>