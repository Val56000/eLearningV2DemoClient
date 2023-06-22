<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, watch } from "@vue/runtime-core";

const props = defineProps(["libelle", "indexUse"]);

const responseTrueFalse = ref(null);

const tablo = props.libelle.choix;
const questionId = props.libelle.id;

//index du quiz sélectionné par l'utilisateur
const indexUse = props.indexUse;

let indexFilter = null;

//newQuiz = false si on démarre un nouveau quiz; newQuiz = true si on est sur un quiz en cours
let newQuiz = false;

//variable booleenne utilisé dans la fonction "clicResponse"
const booleenColor = ref(null);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//récupérer les données des réponses du quiz en session Storage pour les manipuler côté user
const sessionUserResponses = sessionStorage.getItem("userResponses");
const sessionJsonUserResponses = JSON.parse(sessionUserResponses);

//Fonction pour modifier le DOM suite à une saisie d'une réponse
function clicResponse(index) {
  let listClassMain = document.querySelectorAll(".targetInput");


    for (let index1 = 0; index1 < listClassMain.length; index1++) {
      const element = listClassMain[index1];
      if (element.classList.contains("greenBold")) {
        element.classList.remove("greenBold");
        element.classList.add("is-info")
      }
    }
    listClassMain[index].classList.replace("is-info", "greenBold");
}

//Filtrer la session "response" pour trouver à quel index de la session se réfère indexUse
if (sessionJsonUserResponses) {
  for (let index = 0; index < sessionJsonUserResponses.length; index++) {
    const element = sessionJsonUserResponses[index].idQuiz;
    if (element == indexUse + 1) {
      indexFilter = index;
      newQuiz = true;
    }
  }
}

//Ce code est executé quand que ce composant est monté
onMounted(() => {
  let listClassMain = document.querySelectorAll(".targetInput");
  if (sessionJsonUserResponses && newQuiz == true) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[indexFilter].listResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[indexFilter].listResponse[index];
      if (element.id == questionId) {
        responseTrueFalse.value = element.reponse;
        if (responseTrueFalse.value == "Vrai") {
          listClassMain[0].classList.replace("is-warning", "targetInputSecond");
        } else if (responseTrueFalse.value == "Faux") {
          listClassMain[1].classList.replace("is-warning", "targetInputSecond");
        }
      }
    }
    booleenColor.value = true;
  }
});

//liste des evenements a emettre
const emit = defineEmits(["eventTrueFalse"]);

//Si la valeur de responseTrueFalse change alors ..
watch(responseTrueFalse, () => {
  const response = responseTrueFalse.value;
  emit("eventTrueFalse", response, questionId, indexUse);
});
</script>








<template>
  <div class="containerQuestion">
    <div class="laQuestion">
      {{ libelle.question }}
    </div>
    <div class="rule">(Sélectionnez la bonne réponse)</div>
  </div>

  <!-- {{ tablo.choix }} -->

  <div class="containerQuestionTrueFalse">
    <input
      id="idTrueFalse1"
      type="radio"
      v-model="responseTrueFalse"
      value="Vrai"
      @keyup="activateButtonSendData"
    />
    <label
      @click="clicResponse(0)"
      class="targetInput button is-info"
      for="idTrueFalse1"
      >Vrai</label
    >
    <input
      id="idTrueFalse2"
      type="radio"
      v-model="responseTrueFalse"
      value="Faux"
      @change="activateButtonSendData"
    />
    <label
      @click="clicResponse(1)"
      class="targetInput button is-info"
      for="idTrueFalse2"
      >Faux</label
    >
  </div>
</template>



<style scoped>
.containerQuestionTrueFalse {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.containerQuestion {
  display: flex;
  flex-direction: column;
  line-height: 1rem;
}
.laQuestion {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  text-align: center;
}
.rule {
  text-align: center;
  font-size: 0.7rem;
  font-style: italic;
}
.choiceRadio {
  display: flex;
  justify-content: center;
  align-items: center;
}
.targetInput {
  width: 5rem;
}
.button.is-warning {
  background-color: #eff5fb;
  border: 1px solid #485fc7;
  color: #485fc7;
}
.button.is-warning:hover {
  background-color: #485fc7;
  color: #eff5fb;
}
.targetInputSecond {
  background-color: #485fc7;
  border: 1px solid #eff5fb;
  color: #eff5fb;
}
input {
  display: none;
}
</style>