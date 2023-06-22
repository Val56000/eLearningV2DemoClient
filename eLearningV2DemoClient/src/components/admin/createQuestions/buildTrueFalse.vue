<script setup>
import { ref, watch } from "vue";

//Question's id
const newId = ref(1);

//Textarea's value
const responseTextarea = ref("");

//Question's answer
const responseTrueFalseAdmin = ref(null);

//Value is sent to "componentQuestions.vue" when administrator clicks on "Précédent"
const previousButtonBooleen = ref(true);

//value of the question's type
const typeQuestion = "trueFalse";

//"Button validate"
const disabledValidatedButton = ref(true);

//Get session quizDescription's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Value is sent to "componentQuestions.vue" to say that the question is validated and return to main screen
const finishQuestion = ref(false);
const emit = defineEmits(["changeScreen", "goComponentQuestions"]);

//Last idQuiz of "quizDescription" session, this value is used in a condition with "createFirstQuestion.value" variable
let lastIdquizDescription =
  sessionJsonQuizDescription[sessionJsonQuizDescription.length - 1].idQuiz;

//Boolean checks if "adminQuestions" session has the last idQuiz of "quizDescription" session
const createFirstQuestion = ref(true);

//If there is a new quiz whithout new questions then "createFirstQuestion.value = true", else if we stay on the same quiz so "createFirstQuestion.value = false"
if (sessionJsonAdminQuestions) {
  if (sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].idQuiz !=
    lastIdquizDescription
  ) {
    createFirstQuestion.value = true;
  } else {
    createFirstQuestion.value = false;
  }
}

//These 2 reactive variables use "checkAllElements" function to check if all elements are full
watch(responseTextarea, () => {
  checkAllElements();
});

watch(responseTrueFalseAdmin, () => {
  checkAllElements();
});

//This function sends "previousButtonBooleen.value" to "componentQuestions.vue" after clicking on "Précédent"
function previousScreen() {
  emit("goComponentQuestions", previousButtonBooleen);
}

//This function sends data in sessionStorage
function sendDataTrueFalse() {
  //This condition allows to manage the question's id before the sent
  if (sessionJsonAdminQuestions && createFirstQuestion.value == false) {
    newId.value = sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].questions.length + 1;
  } else {
    newId.value = 1;
  }

  //Variables used in this function and sent in sessionStorage
  let objectTrueFalse = {
    id: newId.value,
    typeQuestion: typeQuestion,
    question: responseTextarea.value,
    reponse: responseTrueFalseAdmin.value,
  };
  let arrayObject = [
    { idQuiz: sessionJsonQuizDescription.length, questions: [objectTrueFalse] },
  ];
  let ObjectQuiz = {
    idQuiz: sessionJsonQuizDescription.length,
    questions: [objectTrueFalse],
  };

  //Case 1, If sessionAdminQuestions doesn't exist
  if (!sessionAdminQuestions) {
    sessionStorage.setItem("adminQuestions", JSON.stringify(arrayObject));
  }

  //Case 2, If sessionAdminQuestions exists and administrator wants to add questions to the current quiz
  else if (sessionAdminQuestions && createFirstQuestion.value == false) {
    sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].questions.push(objectTrueFalse);
    sessionStorage.setItem("adminQuestions", JSON.stringify(sessionJsonAdminQuestions));
  }

  //Case 3, If sessionAdminQuestions exists and administrator wants to add a question to a new quiz
  else if (sessionAdminQuestions && createFirstQuestion.value == true) {
    sessionJsonAdminQuestions.push(ObjectQuiz);
    sessionStorage.setItem("adminQuestions", JSON.stringify(sessionJsonAdminQuestions));
  }

  //This variable is sent to "componentQuestions.vue"
  finishQuestion.value = true;
  emit("changeScreen", finishQuestion);
}

//This function changes DOM (Buttons of "Vrai" and "Faux")
function changeChoicesColor(index) {
  console.log(index);
  let listClassMain = document.querySelectorAll(".targetInput");
  //For loop to reinitialize colors
    for (let index1 = 0; index1 < listClassMain.length; index1++) {
    const element = listClassMain[index1];
    if (element.classList.contains("greenBold")) {
      element.classList.remove("greenBold")
      element.classList.add("is-light");
    }
  }
  listClassMain[index].classList.remove("is-light");
  listClassMain[index].classList.add("greenBold");
}

// This function checks if all elements are full
function checkAllElements() {
  disabledValidatedButton.value = true;
  if (responseTextarea.value.trim() != "" && responseTrueFalseAdmin.value != null
  ) {
    disabledValidatedButton.value = false;
  } else {
    disabledValidatedButton.value = true;
  }
}
</script>

<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen"></i>
 <div class="white withMax center roboto">Question vrai/faux</div>
</nav>
  <div class="flexColumn marginTop">
    <h3 class="blueBold roboto">Création question Vrai / Faux</h3>
    <label :for="textBuildTrueFalse" class="blueLight smallSize"
      >Ecrivez votre question :</label>
    <textarea
      class="textarea is-success modifyTextarea"
      :id="textBuildTrueFalse"
      cols="30"
      rows="7"
      v-model="responseTextarea"
    />
    <!-- Part input text questions -->
    <div class=" blueBold marginTop withMedium center smallSize marginBottomScoped roboto">
      Sélectionnez la bonne réponse :
    </div>

    <div class="flexRow gap">
      <input id="idTrueFalse1"
        type="radio"
        v-model="responseTrueFalseAdmin"
        value="Vrai"
      />

      <label
        @click="changeChoicesColor(0)"
        class="targetInput targetInputSecond button is-link is-light"
        for="idTrueFalse1"
        >Vrai</label>

      <input
        id="idTrueFalse2"
        type="radio"
        v-model="responseTrueFalseAdmin"
        value="Faux"
      />

      <label
        @click="changeChoicesColor(1)"
        class="targetInput targetInputSecond button is-link is-light"
        for="idTrueFalse2"
        >Faux</label>
    </div>
    <div class="flexColumn gapScoped marginTop">
      <button class="button is-info" @click="previousScreen">Précédent</button>

      <button
        class="button is-info"
        @click="sendDataTrueFalse"
        :disabled="disabledValidatedButton"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type="radio"] {
  display: none;
}
.gapScoped {
  gap: 0.5rem;
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
