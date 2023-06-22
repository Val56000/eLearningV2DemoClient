<script setup>
import { ref } from "vue";
import buildRadio from "../createQuestions/buildRadio.vue";
import buildCheckBox from "../createQuestions/buildCheckBox.vue";
import buildSlideBar from "../createQuestions/buildSlideBar.vue";
import buildTrueFalse from "../createQuestions/buildTrueFalse.vue";
import listTypesQuestions from "./listTypesQuestions.vue";

//Question's type choice
const questionTypeChoice = ref();

//Boolean manages the display of "listTypesQuestions.vue"
const listTypesDisplay = ref(false);

const emit = defineEmits(["buildChoiceTypeAtStartBuildQuiz", "toBuildNewQuiz"]);

//This function allows to show "listTypesQuestions.vue" after the creation of a question
const returnFinishQuestion = (finishQuestion) => {
  if (finishQuestion.value == true) {
    listTypesDisplay.value = false;
    questionTypeChoice.value = undefined;
  }
};

//Get the question's type of child's component
const receiveDataTypeQuestion = (creationTypeQuestion) => {
  questionTypeChoice.value = creationTypeQuestion.value;
  listTypesDisplay.value = true;
};

//This function allows to leave "listTypesQuestions.vue" with its exit icon
const giveForUpdateCaracteristicQuiz = (booleenCaracteristicQuiz) => {
  emit("buildChoiceTypeAtStartBuildQuiz",booleenCaracteristicQuiz);
};

//This function allows to show "listTypesQuestions.vue" after clicking on exit icon from the components "buildRadio.vue, buildTrueFalse.vue, etc .."
function getDataPreviousButton(previousButtonBooleen) {
  if (previousButtonBooleen.value == true) {
    listTypesDisplay.value = false;
    questionTypeChoice.value = null;
  }
}

//This function allows to get "booleenBuildNewQuiz.value" of "listTypesQuestions.vue" and to send this value to "buildCaracteristicQuiz.vue" to build a new quiz
function buildNewQuiz(booleenBuildNewQuiz) {
  emit("toBuildNewQuiz", booleenBuildNewQuiz);
}
</script>



<template>
  <listTypesQuestions
    v-if="listTypesDisplay == false"
    @sendTypeQuestion="receiveDataTypeQuestion"
    @toAccessCaracteristicQuiz="giveForUpdateCaracteristicQuiz"
    @buildNewQuiz="buildNewQuiz"
  />

  <buildRadio
    v-if="questionTypeChoice == 'radioType'"
    @changeScreen="returnFinishQuestion"
    @goComponentQuestions="getDataPreviousButton"
  />
  <buildCheckBox
    v-if="questionTypeChoice == 'checkboxType'"
    @changeScreen="returnFinishQuestion"
    @goComponentQuestions="getDataPreviousButton"
  />
  <buildSlideBar
    v-if="questionTypeChoice == 'slidebarType'"
    @changeScreen="returnFinishQuestion"
    @goComponentQuestions="getDataPreviousButton"
  />
  <buildTrueFalse
    v-if="questionTypeChoice == 'trueFalseType'"
    @changeScreen="returnFinishQuestion"
    @goComponentQuestions="getDataPreviousButton"
  />
</template>