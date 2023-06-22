<script setup>
import { ref, watch } from "vue";

//Question's id
const newId = ref(1);

//If value = true, there is a duplicate in arrayChoices
const booleanDuplicate = ref(false);

//Textarea's value
const responseTextarea = ref();

//Admin's choices
const arrayChoices = ref([]);

//Question's answer
const responseRadioAdmin = ref(null);

//Value is sent to "componentQuestions.vue" when administrator clicks on "Précédent"
const previousButtonBooleen = ref(true);

// 1. "Button +"
const disabledMoreButton = ref(true);
// 2. "Button -"
const disabledLessButton = ref(true);
// 3. "Button validate"
const disabledValidatedButton = ref(true);

//variable increments with "bouton +"
const oneMoreElement = ref(2);

//value of the question's type
const typeQuestion = "radio";

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
  if (sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].idQuiz != lastIdquizDescription
  ) {
    createFirstQuestion.value = true;
  } else {
    createFirstQuestion.value = false;
  }
}

//These 3 reactive variables use "checkAllElements" function to check if all elements are full
watch(responseTextarea, () => {
  checkAllElements();
});

watch(arrayChoices.value, () => {
  checkAllElements();
});

watch(responseRadioAdmin, () => {
  checkAllElements();
});

//This function sends "previousButtonBooleen.value" to "componentQuestions.vue" after clicking on "Précédent"
function previousScreen() {
  emit("goComponentQuestions", previousButtonBooleen);
}

//This function sends data in sessionStorage
function sendDataRadio() {
  //This condition allows to manage the question's id before the sent
  if (sessionJsonAdminQuestions && createFirstQuestion.value == false) {
    newId.value = sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].questions.length + 1;
  } else {
    newId.value = 1;
  }

  //Variables used in this function and sent in sessionStorage
  let objectRadio = {
    id: newId.value,
    typeQuestion: typeQuestion,
    question: responseTextarea.value,
    choix: arrayChoices.value,
    reponse: responseRadioAdmin.value,
  };
  let arrayObject = [
    { idQuiz: sessionJsonQuizDescription.length, questions: [objectRadio] },
  ];
  let ObjectQuiz = {
    idQuiz: sessionJsonQuizDescription.length,
    questions: [objectRadio],
  };

  //Case 1, If sessionAdminQuestions doesn't exist
  if (!sessionAdminQuestions) {
    sessionStorage.setItem("adminQuestions", JSON.stringify(arrayObject));
  }

  //Case 2, If sessionAdminQuestions exists and administrator wants to add questions to the current quiz
  else if (sessionAdminQuestions && createFirstQuestion.value == false) {
    sessionJsonAdminQuestions[sessionJsonAdminQuestions.length - 1].questions.push(objectRadio);
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

//This function adds an input of type "text" and "radio" with "+"
function oneMoreInput() {
  oneMoreElement.value++;
  checkAllElements();
}

//This function deletes an input of type "text" and "radio" with "-"
function oneLessInput() {
  if (oneMoreElement.value > 2 && arrayChoices.value.length == oneMoreElement.value) {
    oneMoreElement.value--;
    arrayChoices.value.pop();
    if (!arrayChoices.value.includes(responseRadioAdmin.value)) {
      responseRadioAdmin.value = null;
    }
  } else if (oneMoreElement.value > 2 && arrayChoices.value.length != oneMoreElement.value
  ) {
    oneMoreElement.value--;
  }
  checkAllElements();
}

// This function checks if all elements are full
function checkAllElements() {
  //Check if duplicates in arrayChoices exist
  booleanDuplicate.value = false;
  for (let index = 0; index < arrayChoices.value.length - 1; index++) {
    for (let index2 = index + 1; index2 < arrayChoices.value.length; index2++) {
      if (arrayChoices.value[index] == arrayChoices.value[index2]) {
        booleanDuplicate.value = true;
        break;
      }
    }
  }

  //for loop checks each element and manages "validate" button
  for (let index = 0; index < arrayChoices.value.length; index++) {
    const element = arrayChoices.value[index];
    if (element.trim() == "" ||
      arrayChoices.value.length != oneMoreElement.value ||
      responseTextarea.value == null ||
      responseTextarea.value.trim() == "" ||
      arrayChoices.value.length < 2 ||
      responseRadioAdmin.value == null ||
      booleanDuplicate.value == true
    ) {
      disabledValidatedButton.value = true;
      break;
    } else {
      disabledValidatedButton.value = false;
    }
  }

  //Manage "less" and "more" buttons
  disabledMoreButton.value = true;
  if (arrayChoices.value.length === oneMoreElement.value) {
    disabledMoreButton.value = false;
  } else if (arrayChoices.value.length != oneMoreElement.value && arrayChoices.value.includes("")) {
    disabledMoreButton.value = true;
  }
  if (oneMoreElement.value > 2) {
    disabledLessButton.value = false;
  } else if (oneMoreElement.value == 2) {
    disabledLessButton.value = true;
  }
}
</script>



<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen"></i>
 <div class="white withMax center roboto">Question à choix unique</div>
</nav>
  <div class="flexColumn marginTopScoped marginBottomLargeScoped">
    <h3 class="blueBold roboto">Création question à choix unique</h3>
    <label :for="textBuildRadio" class="blueLight smallSize">Ecrivez votre question :</label
    >
    <textarea
      class="textarea is-success modifyTextarea marginBottom"
      :id="textBuildRadio"
      cols="30"
      rows="7"
      v-model="responseTextarea"
    />

    <!-- Part input text questions -->
    <div>
      <div class="blueBold marginTop withMedium center smallSize marginBottomScoped roboto"
        >Indiquez les choix de réponse et cochez la case correspondant à la
        bonne réponse :</div>
    </div>
    <ol>
      <!-- Loop v-for -->
      <div v-for="(element, index) in oneMoreElement" :key="element">
        <li>
          <input
            class="input is-success"
            type="text"
            :id="index + 3"
            v-model="arrayChoices[index]"
            />
          <input
          class="is-success"
            type="radio"
            v-model="responseRadioAdmin"
            :value="arrayChoices[index]"
          />
        </li>
      </div>
    </ol>

    <div class="flexColumn">
      <div class="flexRow gap marginScoped">
        <button
          class="button lessAndMore"
          @click="oneLessInput"
          :disabled="disabledLessButton"
        >
          <i class="fi fi-ss-minus"></i>
        </button>
        <button
          class="button lessAndMore"
          @click="oneMoreInput"
          :disabled="disabledMoreButton"
        >
          <i class="fi fi-ss-plus"></i>
        </button>
      </div>
      <div class="flexColumn gapScoped">
        <button class="button is-info" @click="previousScreen">
          Précédent
        </button>

        <button
          class="button is-info"
          @click="sendDataRadio"
          :disabled="disabledValidatedButton"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="text"] {
  width: 12rem;
  height: 1.9rem;
  margin-right: 0.5rem;
}
.lessAndMore {
  width: 2rem;
  margin: 0.8rem 0.5rem 0.8rem 0.5rem;
  box-shadow: none !important;
  background-color: transparent !important;
  border: none;
}
.gapScoped {
  gap: 0.5rem;
}
.marginScoped {
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
}
.marginBottomScoped{
  margin-bottom: 0.5rem;
}
.marginBottomLargeScoped{
  margin-bottom: 4rem;
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
.marginTopScoped{
  margin-top: 5rem;
}
</style>