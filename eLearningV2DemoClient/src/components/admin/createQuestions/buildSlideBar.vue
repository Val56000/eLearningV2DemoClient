<script setup>
import { ref, watch, computed } from "vue";

//Question's id
const newId = ref(1);

//Textarea's value
const responseTextarea = ref();

//Interval's value
const responseInterval = ref(1);

//Extent's value
const responseExtent = ref();

//Question's answer
const responseSlideBarAdmin = ref();

//slidebar's demonstration used in the template
const demonstrationSlideBar = ref(0);

//If this value == true, then the template shows slidebar's demonstration
const showSlideBar = ref(false);

//Value is sent to "componentQuestions.vue" when administrator clicks on "Précédent"
const previousButtonBooleen = ref(true);

//if these values == 0, then the slidebar can be shown in the template
const firstCalculation = computed(() => responseSlideBarAdmin.value % responseInterval.value);
const secondCalculation = computed(() => responseExtent.value % responseInterval.value);

//Button "validate"
const disabledValidatedButton = ref(true);

//value of the question's type
const typeQuestion = "slideBar";

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
let lastIdquizDescription = sessionJsonQuizDescription[sessionJsonQuizDescription.length - 1].idQuiz;

//Boolean checks if "adminQuestions" session has the last idQuiz of "quizDescription" session
const createFirstQuestion = ref(true);

//If there is a new quiz whithout new questions then "createFirstQuestion.value = true", else if we stay on the same quiz so "createFirstQuestion.value = false"
if (sessionJsonAdminQuestions) {
  if (
    sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].idQuiz !=
    lastIdquizDescription
  ) {
    createFirstQuestion.value = true;
  } else {
    createFirstQuestion.value = false;
  }
}

//These 4 reactive variables use "checkAllElements" function to check if all elements are full
watch(responseTextarea, () => {
  checkAllElements();
});

watch(responseInterval, () => {
  checkAllElements();
});

watch(responseExtent, () => {
  checkAllElements();
});

watch(responseSlideBarAdmin, () => {
  checkAllElements();
});

watch(disabledValidatedButton, () => {
  if (disabledValidatedButton.value == false) {
    showSlideBar.value = true;
  } else {
    showSlideBar.value = false;
  }
});

//This function sends "previousButtonBooleen.value" to "componentQuestions.vue" after clicking on "Précédent"
function previousScreen() {
  emit("goComponentQuestions", previousButtonBooleen);
}

//This function sends data in sessionStorage
function sendDataSlideBar() {
  //This condition allows to manage the question's id before the sent
  if (sessionJsonAdminQuestions && createFirstQuestion.value == false) {
    newId.value = sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].questions.length + 1;
  } else {
    newId.value = 1;
  }

  //Variables used in this function and sent in sessionStorage
  let objectSlideBar = {
    id: newId.value,
    typeQuestion: typeQuestion,
    question: responseTextarea.value,
    interval: responseInterval.value,
    etendue: responseExtent.value,
    reponse: responseSlideBarAdmin.value,
  };
  let arrayObject = [
    { idQuiz: sessionJsonQuizDescription.length, questions: [objectSlideBar] },
  ];
  let ObjectQuiz = {
    idQuiz: sessionJsonQuizDescription.length,
    questions: [objectSlideBar],
  };

  //Case 1, If sessionAdminQuestions doesn't exist
  if (!sessionAdminQuestions) {
    sessionStorage.setItem("adminQuestions", JSON.stringify(arrayObject));
  }

  //Case 2, If sessionAdminQuestions exists and administrator wants to add questions to the current quiz
  else if (sessionAdminQuestions && createFirstQuestion.value == false) {
    sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].questions.push(objectSlideBar);
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

// This function checks if all elements are full
function checkAllElements() {
  if (responseSlideBarAdmin.value == "" ||
    responseInterval.value == "" ||
    responseExtent.value == "" ||
    responseTextarea.value == "" ||
    responseSlideBarAdmin.value > responseExtent.value ||
    responseSlideBarAdmin.value < responseInterval.value ||
    firstCalculation.value != 0 ||
    secondCalculation.value != 0
  ) {
    disabledValidatedButton.value = true;
  } else {
    disabledValidatedButton.value = false;
  }
}
</script>

<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen"></i>
 <div class="white withMax center roboto">Question numérique</div>
</nav>
  <div class="flexColumn marginTop">
    <h3 class="blueBold roboto">Création question numérique</h3>
    <label :for="textBuildSlideBar" class="blueLight smallSize"
      >Ecrivez votre question :</label
    >
    <textarea
      class="textarea is-success modifyTextarea marginBottom"
      :id="textBuildSlideBar"
      cols="30"
      rows="7"
      v-model="responseTextarea"
    />

    <div class="flexColumn otherHeightScoped">
      <label
        :for="interval"
        class=" blueBold marginTop withMedium center smallSize marginBottomScoped"
        >Graduation :</label>
      <input
        class="input is-success blueBold"
        type="number"
        :id="interval"
        v-model="responseInterval"
      />
    </div>

    <div class="flexColumn otherHeightScoped">
      <label
        :for="extent"
        class="blueBold marginTop withMedium center smallSize marginBottomScoped">
        Max :</label>
      <input
        class="input is-success blueBold"
        type="number"
        :id="extent"
        v-model="responseExtent"
      />
    </div>

    <div class="flexColumn otherHeightScoped">
      <label
        :for="reponseSlideBarAdmin"
        class="blueBold marginTop withMedium center smallSize marginBottomScoped">
        Indiquez la réponse :</label>
      <input
        class="input is-success blueBold"
        type="number"
        :id="reponseSlideBarAdmin"
        v-model="responseSlideBarAdmin"
      />
    </div>

    <div class="marginTop heightScoped" v-if="showSlideBar == true">
      <div class="blueLight roboto">Résultat du visuel côté utilisateur :</div>
      <input
        type="range"
        id="slidebar"
        min="0"
        :max="responseExtent"
        :step="responseInterval"
        v-model="demonstrationSlideBar"
      />
      <div class="center blueBold">
        {{ demonstrationSlideBar }}
      </div>
    </div>

    <div class="flexColumn gapScoped">
      <button class="button is-info marginTop" @click="previousScreen">
        Précédent
      </button>

      <button
        class="button is-info"
        @click="sendDataSlideBar"
        :disabled="disabledValidatedButton"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>


<style scoped>
input[type="number"] {
  width: 12rem;
  height: 1.9rem;
  margin-right: 0.5rem;
}
.lessAndMore {
  width: 2rem;
  margin: 0.8rem 0.5rem 0.8rem 0.5rem;
  box-shadow: none !important;
}
.gapScoped {
  gap: 0.5rem;
}
.marginScoped {
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
}
.marginBottomScoped {
  margin-bottom: 0.5rem;
}
#slidebar {
  width: 15rem;
}
.heightScoped {
  line-height: 1.1rem;
}
.otherHeightScoped {
  line-height: 0.2rem;
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
