<script setup>
import { ref, watch } from "vue";

//Values of quiz's mode, quiz's name and quiz's comment
const modeQuizAdmin = ref("");
const nameQuizAdmin = ref("");
const commentQuizAdmin = ref("");

//This array is sent in quizDescription's session
const ArrayAllDescriptionQuiz = [];

//Get session quizDescription's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Value quiz Id
const idQuiz = ref(1);

//Variable shows info-bulle
const showInfoBulle = ref(false);

//Variable is sent in "previousScreen" function
const booleenMenu = ref(true);

//Variable is sent in "previousScreen" function to activate button of "Participer au quiz"
const activateParticipateButton = ref(true);

//This variable manages the activation of next button and send datas (quiz's caracteristics in session)
const disabledValidatedButton = ref(true);

//This variable is sent to "appCreationQuiz.vue" for template's display
const forComposantStartBuildQuiz = ref(true);

//Display of exit icon with v-if condition
const exitIcon = ref(true);

const emit = defineEmits(["changeScreen, mainMenu, accessAppUser"]);

//Watch manages button colours
watch(modeQuizAdmin, () => {
  let listClassMain = document.querySelectorAll(".targetInput");
  if (modeQuizAdmin.value == "evaluation") {
    listClassMain[0].classList.remove("is-info");
    listClassMain[0].classList.add("greenBold");
    listClassMain[1].classList.remove("greenBold");
    listClassMain[1].classList.add("is-info");
  } else if (modeQuizAdmin.value == "training") {
    listClassMain[0].classList.remove("greenBold");
    listClassMain[0].classList.add("is-info");
    listClassMain[1].classList.remove("is-info");
    listClassMain[1].classList.add("greenBold");
  }
});

//This function checks if all elements are full
function allInputsOk() {
  if (
    modeQuizAdmin.value == undefined ||
    nameQuizAdmin.value.trim() == "" ||
    commentQuizAdmin.value.trim() == ""
  ) {
    disabledValidatedButton.value = true;
  } else if (
    modeQuizAdmin.value != undefined &&
    nameQuizAdmin.value != "" &&
    commentQuizAdmin.value != ""
  ) {
    disabledValidatedButton.value = false;
  }
}

//This function allows to return to previous screen with exit icon
function previousScreen() {
  booleenMenu.value = false;
  if (sessionJsonAdminQuestions) {
    emit("accessAppUser", activateParticipateButton);
  }
  emit("mainMenu", booleenMenu);
  if (sessionJsonQuizDescription && sessionJsonAdminQuestions) {
    if (sessionJsonQuizDescription.length != sessionJsonAdminQuestions.length) {
      sessionJsonQuizDescription.splice(
        sessionJsonQuizDescription.length - 1,
        1
      );
      sessionStorage.setItem(
        "quizDescription",
        JSON.stringify(sessionJsonQuizDescription)
      );
    }
  }
}

//Send datas in session "quizDescription"
function sendDataCaracteristicQuiz() {
  exitIcon.value = false;
  //Case 1, if sessionQuizDescription doesn't exist
  if (!sessionJsonQuizDescription) {
    ArrayAllDescriptionQuiz.push({
      idQuiz: idQuiz.value,
      name: nameQuizAdmin.value,
      modeQuiz: modeQuizAdmin.value,
      commentaireQuiz: commentQuizAdmin.value,
    });
    sessionStorage.setItem(
      "quizDescription",
      JSON.stringify(ArrayAllDescriptionQuiz)
    );
    forComposantStartBuildQuiz.value = false;
    emit("changeScreen", forComposantStartBuildQuiz);
    return;
  }

  //Case 2, if sessionQuizDescription exist
  else if (sessionJsonQuizDescription) {
    sessionJsonQuizDescription.push({
      idQuiz: sessionJsonQuizDescription.length + 1,
      name: nameQuizAdmin.value,
      modeQuiz: modeQuizAdmin.value,
      commentaireQuiz: commentQuizAdmin.value,
    });
    sessionStorage.setItem(
      "quizDescription",
      JSON.stringify(sessionJsonQuizDescription)
    );
    forComposantStartBuildQuiz.value = false;
    emit("changeScreen", forComposantStartBuildQuiz);
    return;
  }
}

//This function shows info-bulle
function showMode(event) {
  if (event.type === "mouseover") {
    showInfoBulle.value = true;
  } else if (event.type === "mouseout") {
    showInfoBulle.value = false;
  }
}
</script>




<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen" v-if="exitIcon == true"></i>
<div class="white withMax center roboto">Paramètres du quiz</div>
</nav>

  <div class="flexColumn gap margins">
    <div class="center">
      <label for="createNameQuiz" class="roboto blueBold">Nom du quiz :</label>
      <input
        class="input is-success"
        type="text"
        id="createNameQuiz"
        v-model="nameQuizAdmin"
        @keyup="allInputsOk"
        @change="allInputsOk"
      />
    </div>

    <div>
      <div class="center blueBold tooltip-container relative flexRow">
        <div>
        Choix du mode
        </div>
        <i class="fi fi-rs-info marginLeftScoped" @mouseover="showMode" @mouseout="showMode"></i>
        <div class="tooltip absolute blueLight" v-if="showInfoBulle == true">
            <span>Mode évaluation : 1 tentative possible</span>
            <span>Mode entrainement : tentatives illimitées</span>
        </div>
      </div>
      <div class="flexRow marginBetweenButtons">
        <div>
          <label
            :for="'modeEvaluation'"
            class="targetInput button is-info raleway widthMode"
            > Mode Evaluation</label
          >
          <input
            :id="'modeEvaluation'"
            type="radio"
            value="evaluation"
            v-model="modeQuizAdmin"
            @change="allInputsOk"
          />
        </div>
        <div>
          <!-- 
          <label :for="'modeTraining'" class="targetInput button is-warning" :class="{training:modeQuizAdmin.value== true}" -->
         
          <label
            :for="'modeTraining'"
            class="targetInput button is-info raleway widthMode"
            >Mode Entrainement</label
          >
          <input
            :id="'modeTraining'"
            type="radio"
            value="training"
            v-model="modeQuizAdmin"
            @change="allInputsOk"
          />
        </div>
      </div>
    </div>
    <div class="flexColumn gap widthBlock alignLeft">
      <div class="flexRow">
        <label for="showSolution" class="roboto blueBold marginRightScoped"
          >Afficher les réponses au participant en fin de quiz</label
        >
        <input id="showSolution" type="checkbox" checked />
      </div>
      <div class="alignLeft">
        <span class="roboto blueBold marginRight"
          >Date de limite de participation</span>
        <input type="date" />
      </div>
    </div>
    <div class="containerTextareaAndLabel">
      <div class="row">
        <i class="fi fi-rr-pencil marginRightScoped"></i>
        <div class="roboto blueBold">Description du quiz</div>
      </div>

      <textarea
        class="textarea is-success modifyTextarea"
        placeholder="Ajouter un commentaire ..."
        cols="30"
        rows="10"
        v-model="commentQuizAdmin"
        @keyup="allInputsOk"
      >
      </textarea>
    </div>

    <button
      class="button is-info"
      :disabled="disabledValidatedButton"
      @click="sendDataCaracteristicQuiz"
    >
      Suivant
    </button>
  </div>
</template>

<style scoped>
input[type="radio"] {
  display: none;
}
.margins {
  margin-top: 5rem;
  margin-bottom: 5rem;
}
.widthBlock {
  width: 50vw;
}
.tooltip-container {
  position: relative;
}
.tooltip {
  display: flex;
  flex-direction: column;
  width: 16rem;
  font-size: 0.7rem;
  font-family: "Roboto", sans-serif;
  z-index: 1 !important;
  background-color: white;
  border: 1px solid #004D22;
  border-radius: 1rem;
  text-align: center;
  margin-left: 26rem;
}
ul {
  list-style-type: disc;
}
i.fi.fi-rs-info {
  vertical-align: sub;
}
label.targetInput.button.is-link.is-light {
  font-size: 0.9rem;
  width: 9rem;
}
label.targetInput.button.is-link.is-light.targetInputSecond {
  font-size: 0.9rem;
  width: 9rem;
}
.row {
  display: inline-flex;
}
.marginRightScoped {
  margin-right: 0.5rem;
}
.marginLeftScoped{
  margin-left: 0.5rem;
}
.navScoped{
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
}
.widthMode{
  width: 12rem;
}
</style>