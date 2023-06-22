<script setup>
import { onUpdated, ref } from "vue";
import appCreationQuiz from "./createQuiz/appCreationQuiz.vue"
import appResults from "./adminResults/appResults.vue"


//Get session quizDescription's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Get session responses data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);

//Get session results data
let sessionUserResults = sessionStorage.getItem("userResults");
let sessionJsonUserResults = JSON.parse(sessionUserResults);

//variable is assigned of child's components
const pathChoice = ref(null);

//Display of exit icon with v-if condition
const exitIcon = ref(true)

//Variable used in "previousScreen" function
const goToMainScreen = ref(true)
const emit = defineEmits(["changeScreen"]);

//This function indicates the variable pathChoice's value for choice the child's component
function choosePath(namePath) {
  pathChoice.value = namePath
}

//This function gets the boolean value to the child component "appCreationQuiz" for show this template
function exit(booleenMenu) {
  if (booleenMenu.value == false) {
    pathChoice.value = null;
  }
}

//This function allows to return to previous screen with exit icon
function previousScreen() {
  emit("changeScreen", goToMainScreen);
}

//This function allows to get a value of "appCreationQuiz.vue" to hide exit icon of template's appAdmin.vue
function hideExitIconAppAdmin(hideExitIconAppAdmin) {
  if (hideExitIconAppAdmin.valu == true) {
    exitIcon.value = false
  } else {
    exitIcon.value = true
  }
}

// Change data in sessionStorage during the demo
function changeDataStructure() {
  let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
  let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);
  sessionJsonAdminQuestions[0].questions.push({
    id: 2,
    typeQuestion: "radio",
    question: "Parmi ces propositions, quel type de question existe au sein de Okalys Learning ?",
    choix: [
      "Choix unique",
      "Texte à trou",
      "Drag and Drop"
    ],
    reponse: "Choix unique"
  },
    {
      id: 3,
      typeQuestion: "checkBox",
      question: "Quelles sont les fonctionnalités principales de Okalys Learning ?",
      choix: [
        "Création de quiz",
        "Consultation des résultats",
        "Personnalisation de l'interface du module",
        "Participation au quiz"
      ],
      reponse: [
        "Création de quiz",
        "Consultation des résultats",
        "Participation au quiz"
      ]
    },
    {
      id: 4,
      typeQuestion: "slideBar",
      question: "Combien de type de questions existe t'il dans Okalys Learning",
      interval: 2,
      etendue: 10,
      reponse: 4
    });
  sessionStorage.setItem("adminQuestions", JSON.stringify(sessionJsonAdminQuestions));
}


</script>


<template>
  <nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen"
      v-if="exitIcon == true"></i>
    <div class="white withMax center roboto">Interface administrateur</div>
  </nav>
  <div class="flexColumn gap" v-if="pathChoice == null">
    <button class="button is-info is-light" @click="choosePath('appCreationQuiz')" v-if="pathChoice == null">
      Création quiz
    </button>

    <button class="button is-info is-light" @click="choosePath('appResults')" v-if="pathChoice == null"
      :disabled="disabledResultsUser">
      Résultats utilisateurs
    </button>

    <i v-if="pathChoice == null" @click="changeDataStructure" class="fi fi-rr-exchange cursorPointer"></i>
  </div>

  <appCreationQuiz v-if="pathChoice == 'appCreationQuiz'" @mainMenu="exit" @accessAppUser="accessAppUser"
    @hideExitIcon="hideExitIconAppAdmin" />
  <appResults v-if="pathChoice == 'appResults'" @mainMenu="exit" />
</template>

<style scoped>
button {
  width: 15rem;
}

.navScoped {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
}

.marginLeftScoped {
  margin-left: 0.5rem;
}
</style>