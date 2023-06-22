<script setup>
import { ref } from "vue";
import Checkbox from "../questions/checkbox.vue";
import Radio from "../questions/radio.vue";
import SlideBar from "../questions/slideBar.vue";
import TrueFalse from "../questions/trueFalse.vue";

const props = defineProps([
  "increment",
  "nextButton1",
  "indexQuiz",
  "startQuiz",
]);

const emit = defineEmits(["eventData", "disabledNextButton"]);

//Get session descriptionQuiz's data
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//Get session adminQuestions's data
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//Get session responses data
// let sessionUserResponses = sessionStorage.getItem("userResponses");
// let sessionJsonUserResponses = JSON.parse(sessionUserResponses);

//"props.indexQuiz" is the index of the quiz chosen by the user
const indexQuiz = props.indexQuiz;

//If "state.value" == true, user's responses go in the same array; if "state.value" == false, then a new array is created to stock responses
const state = ref(true);

//This array gets questions of quiz and it is used in this template with v-for
const questionsArray = ref(sessionJsonAdminQuestions[indexQuiz].questions);

let indexFilter = null;

//Fonction functionEmitDisabled pour émettre une valeur booleenne lié au oneMounted du composant enfant
function EmitDisabledNextButton(booleenDisabledNextButton) {
  emit("disabledNextButton", booleenDisabledNextButton);
}

//Radio function
const functionRadio = (response, questionId) => {
//Get session responses data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);

  const newResponse = { id: questionId, reponse: response };
  const newArrayResponse = {
    idQuiz: indexQuiz + 1,
    listResponse: [{ id: questionId, reponse: response }],
  };
  const newArrayTotal = [
    {
      nameUser: "GHA",
      quizResponse: [
        {
          idQuiz: indexQuiz + 1,
          listResponse: [{ id: questionId, reponse: response }],
        },
      ],
    },
  ];

  //Vérification si un quiz avec son idQuiz existe déjà en session "response"  / Si il existe alors state = true; sinon state = false
  if (sessionJsonUserResponses && state.value == true) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[0].quizResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[0].quizResponse[index].idQuiz;
      if (element == indexQuiz + 1) {
        indexFilter = index;
        state.value = true;
      } else {
        state.value = false;
      }
    }
  }

  //Cas n°1. Si une réponse est modifié
  if (sessionJsonUserResponses && state.value == true) {
    for (
      let index = 0;
      index <
        sessionJsonUserResponses[0].quizResponse[indexFilter].listResponse.length;
      index++
    ) {
      const element =
      sessionJsonUserResponses[0].quizResponse[indexFilter].listResponse[index];
      if (element.id == questionId) {
        element.reponse = response;
        sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
        emit("eventData", response, questionId, indexQuiz);
        return;
      }
    }
  }

  //Cas n°2. Si la session "response" existe && on souhaite alimenter le quiz en cours
  if (sessionJsonUserResponses && state.value == true) {
    sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
      indexFilter
    ].listResponse.push(newResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
    console.log("etape1");
  }

  //Cas n°3. Si la session "response" existe && on démarre un autre quiz
  else if (sessionJsonUserResponses && state.value == false) {
    sessionJsonUserResponses[0].quizResponse.push(newArrayResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
    state.value = true;
  }

  //Cas n°4. Si la session "response" n'existe pas
  else if (!sessionJsonUserResponses) {
    sessionStorage.setItem("userResponses", JSON.stringify(newArrayTotal));
    emit("eventData", response, questionId, indexQuiz);
  }
};

//Fonction CHECKBOX
const functionCheckbox = (response, questionId) => {
//Get session responses data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);
  const newResponse = { id: questionId, reponse: response };
  const newArrayResponse = {
    idQuiz: indexQuiz + 1,
    listResponse: [{ id: questionId, reponse: response }],
  };
  const newArrayTotal = [
    {
      nameUser: "GHA",
      quizResponse: [
        {
          idQuiz: indexQuiz + 1,
          listResponse: [{ id: questionId, reponse: response }],
        },
      ],
    },
  ];


  //Vérification si un quiz avec son idQuiz existe déjà en session  / Si il existe, state.value = true; sinon state.value = false
  if (sessionJsonUserResponses) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[0].quizResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[0].quizResponse[index].idQuiz;
      if (element == indexQuiz + 1) {
        indexFilter = index;
        state.value = true;
      } else {
        state.value = false;
      }
    }
  }

  //Cas n°1. Si une réponse est modifié
  if (sessionUserResponses && state.value == true) {
    for (
      let index = 0;
      index <
        sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
        indexFilter
      ].listResponse.length;
      index++
    ) {
      const element =
      sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
          indexFilter
        ].listResponse[index];
      if (element.id == questionId) {
        element.reponse = response;
        sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
        emit("eventData", response, questionId, indexQuiz);
        return;
      }
    }
  }

  //Cas n°2. Si la session "response" existe && on souhaite alimenter le quiz en cours
  if (sessionJsonUserResponses && state.value == true) {
    sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
      indexFilter
    ].listResponse.push(newResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
  }

  //Cas n°3. Si la session "response" existe && on démarre un autre quiz
  else if (sessionJsonUserResponses && state.value == false) {
    sessionJsonUserResponses[0].quizResponse.push(newArrayResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
    state.value = true;
  }

  //Cas n°4. Si la session "response" n'existe pas
  else if (!sessionJsonUserResponses) {
    sessionStorage.setItem("userResponses", JSON.stringify(newArrayTotal));
    emit("eventData", response, questionId, indexQuiz);
  }
};

//Fonction SLIDEBAR
const functionSlideBar = (response, questionId) => {
//Get session responses data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);
  const newResponse = { id: questionId, reponse: response };
  const newArrayResponse = {
    idQuiz: indexQuiz + 1,
    listResponse: [{ id: questionId, reponse: response }],
  };
  const newArrayTotal = [
    {
      nameUser: "GHA",
      quizResponse: [
        {
          idQuiz: indexQuiz + 1,
          listResponse: [{ id: questionId, reponse: response }],
        },
      ],
    },
  ];


  //Vérification si un quiz avec son idQuiz existe déjà en session  / Si il existe, state = true; sinon state = false
  if (sessionJsonUserResponses && state.value == true) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[0].quizResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[0].quizResponse[index].idQuiz;
      if (element == indexQuiz + 1) {
        indexFilter = index;
        state.value = true;
      } else {
        state.value = false;
      }
    }
  }

  //Cas n°1. Si une réponse est modifié
  if (sessionUserResponses && state.value == true) {
    for (
      let index = 0;
      index <
        sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
        indexFilter
      ].listResponse.length;
      index++
    ) {
      const element =
      sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
          indexFilter
        ].listResponse[index];
      if (element.id == questionId) {
        element.reponse = response;
        sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
        emit("eventData", response, questionId, indexQuiz);
        return;
      }
    }
  }

  //Cas n°2. Si la session "response" existe && on souhaite alimenter le quiz en cours
  if (sessionJsonUserResponses && state.value == true) {
    sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
      indexFilter
    ].listResponse.push(newResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
  }

  //Cas n°3. Si la session "response" existe && on démarre un autre quiz
  else if (sessionJsonUserResponses && state.value == false) {
    sessionJsonUserResponses[0].quizResponse.push(newArrayResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
    state.value = true;
  }

  //Cas n°4. Si la session "response" n'existe pas
  else if (!sessionJsonUserResponses) {
    sessionStorage.setItem("userResponses", JSON.stringify(newArrayTotal));
    emit("eventData", response, questionId, indexQuiz);
  }
};

//Fonction TRUEFALSE
const functionTrueFalse = (response, questionId) => {
//Get session responses data
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);
  const newResponse = { id: questionId, reponse: response };
  const newArrayResponse = {
    idQuiz: indexQuiz + 1,
    listResponse: [{ id: questionId, reponse: response }],
  };
  const newArrayTotal = [
    {
      nameUser: "GHA",
      quizResponse: [
        {
          idQuiz: indexQuiz + 1,
          listResponse: [{ id: questionId, reponse: response }],
        },
      ],
    },
  ];

  //Vérification si un quiz avec son idQuiz existe déjà en session  / Si il existe, state = true; sinon state = false
  if (sessionJsonUserResponses && state.value == true) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[0].quizResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[0].quizResponse[index].idQuiz;
      if (element == indexQuiz + 1) {
        indexFilter = index;
        state.value = true;
      } else {
        state.value = false;
      }
    }
  }

  //Cas n°1. Si une réponse est modifié
  if (sessionJsonUserResponses && state.value == true) {
    for (
      let index = 0;
      index <
        sessionJsonUserResponses[0].quizResponse[indexFilter].listResponse.length;
      index++
    ) {
      const element =
      sessionJsonUserResponses[0].quizResponse[indexFilter].listResponse[index];
      if (element.id == questionId) {
        element.reponse = response;
        sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
        emit("eventData", response, questionId, indexQuiz);
        return;
      }
    }
  }

  //Cas n°2. Si la session "response" existe && on souhaite alimenter le quiz en cours
  if (sessionJsonUserResponses && state.value == true) {
    sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[
      indexFilter
    ].listResponse.push(newResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
  }

  //Cas n°3. Si la session "response" existe && on démarre un autre quiz
  else if (sessionJsonUserResponses && state.value == false) {
    sessionJsonUserResponses[0].quizResponse.push(newArrayResponse);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
    emit("eventData", response, questionId, indexQuiz);
    state.value = true;
  }

  //Cas n°4. Si la session "response" n'existe pas
  else if (!sessionJsonUserResponses) {
    sessionStorage.setItem("userResponses", JSON.stringify(newArrayTotal));
    emit("eventData", response, questionId, indexQuiz);
  }
};
</script>


<template>
  <div v-for="item in questionsArray" :key="item">
    <Checkbox
      :libelle="item"
      v-if="
        item.id == props.increment && item.typeQuestion == 'checkBox'
      "
      @eventCheckbox="functionCheckbox"
      :indexQuiz="props.indexQuiz"
      :incrementQuestion="props.increment"
    />

    <Radio
      :libelle="item"
      v-if="
        item.id == props.increment && item.typeQuestion == 'radio'
      "
      @eventRadio="functionRadio"
      @disabledNextButton="EmitDisabledNextButton"
      :startQuiz="props.startQuiz"
      :indexQuiz="props.indexQuiz"
    />

    <TrueFalse
      :libelle="item"
      v-if="
        item.id == props.increment &&
        item.typeQuestion == 'trueFalse'
      "
      @eventTrueFalse="functionTrueFalse"
      :indexQuiz="props.indexQuiz"
    />

    <SlideBar
      :libelle="item"
      v-if="
        item.id == props.increment && item.typeQuestion == 'slideBar'
      "
      @eventSlideBar="functionSlideBar"
      :indexQuiz="props.indexQuiz"
    />
  </div>
</template> 
