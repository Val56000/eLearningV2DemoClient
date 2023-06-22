<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, watch } from "@vue/runtime-core";

//Props contenant une question de type radio
const props = defineProps(["libelle", "indexUse", "incrementQuestion"]);

const responseCheckbox = ref([]);

const tablo = props.libelle.choix;

const questionId = props.libelle.id;

//index du quiz sélectionné par l'utilisateur
const indexUse = props.indexUse;

let indexFilter = null;

//variable booleenne utilisé dans la fonction "toogleButton"
const booleenColor = ref(null);


//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//récupérer les données des réponses du quiz en session Storage pour les manipuler côté user
const sessionUserResponses = sessionStorage.getItem("userResponses");
const sessionJsonUserResponses = JSON.parse(sessionUserResponses);

//newQuiz = false si on démarre un nouveau quiz; newQuiz = true si on est sur un quiz en cours
let newQuiz = false;

//Filtrer la session "response" pour trouver à quel index de la session se réfère indexUse
//Cette condition permet de savoir si un quiz démarre ou si il est en cours
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
  const sessionUserResponses = sessionStorage.getItem("userResponses");
  const sessionJsonUserResponses = JSON.parse(sessionUserResponses);
  let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
  let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);
  let listClassMain = document.querySelectorAll(".targetInput");

  if (sessionJsonUserResponses && newQuiz == true) {
    for (
      let index = 0;
      index <
      sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[0]
        .listResponse.length;
      index++
    ) {
      const element =
        sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[0]
          .listResponse[index];

      if (element.id == props.incrementQuestion) {
        responseCheckbox.value =
          sessionJsonUserResponses[
            sessionJsonUserResponses.length - 1
          ].quizResponse[0].listResponse[props.incrementQuestion - 1].reponse;

        for (
          let index2 = 0;
          index2 <
          sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[0]
            .listResponse[props.incrementQuestion - 1].reponse.length;
          index2++
        ) {
          const element2 =
            sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[0]
              .listResponse[props.incrementQuestion - 1].reponse[index2];
          for (
            let index3 = 0;
            index3 <
            sessionJsonAdminQuestions[indexUse].questions[
              props.incrementQuestion - 1
            ].choix.length;
            index3++
          ) {
            const element3 =
              sessionJsonAdminQuestions[indexUse].questions[
                props.incrementQuestion - 1
              ].choix[index3];
            if (element2 == element3) {
              console.log(element3);
              listClassMain[index3].classList.replace(
                "is-info",
                "targetInputSecond"
              );
            }
          }
        }
      } else {
        console.log("pas repondu");
      }
    }
  }
});

//Fonction pour mettre une couleur(bleue) sur la réponse sélectionnée
function toogleButton(index) {
  let listClassMain = document.querySelectorAll(".targetInput");
  if (listClassMain[index].classList.contains("is-info")) {
    listClassMain[index].classList.replace("is-info", "greenBold");
  } else {
    listClassMain[index].classList.replace("greenBold", "is-info");
  }
}

//liste des evenements a emettre
const emit = defineEmits(["eventCheckbox"]);

//Si la valeur de responseCheckbox change alors ..
watch(responseCheckbox, () => {
  const response = responseCheckbox.value;
  console.log("testtesttest !");
  emit("eventCheckbox", response, questionId, indexUse);
});
</script>







<template>
  <div class="containerQuestion">
    <div class="laQuestion">
      {{ libelle.question }}
    </div>
    <div class="rule">(Sélectionnez la ou les bonnes réponses)</div>
  </div>

  <div class="containerQuestionCheckbox">
    <div class="choiceCheckbox" v-for="(elem, index) in tablo">
      <input
        type="checkbox"
        :id="'idCheckBox' + index"
        :value="elem"
        v-model="responseCheckbox"
      />
      <label
        @click="toogleButton(index)"
        class="targetInput button is-info"
        :for="'idCheckBox' + index"
        >{{ elem }}</label
      >
    </div>
  </div>
</template>



<style scoped>
.button.is-info {
  background-color: #eff5fb;
  border: 1px solid #485fc7;
  color: #3e8ed0;
}
.containerQuestionCheckbox {
  display: flex;
  flex-wrap: wrap;
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
.button.is-warning {
  background-color: #eff5fb;
  border: 1px solid #485fc7;
  color: #485fc7;
}

.targetInputSecond {
  background-color: #3e8ed0;
  border: 1px solid #eff5fb;
  color: #eff5fb;
}
input {
  display: none;
}
</style>