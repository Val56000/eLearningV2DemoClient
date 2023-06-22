<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
const moreOnePoint = ref(0);
const moreLittlePoint = ref(0);
const booleanSuccessMessage = ref(true);

//Cette props permet d'envoyer à questionContainer.vue, l'index du quiz qu'à choisi l'utilisateur / Origine de la props "App.vue"
const props = defineProps(["indexQuiz"]);
const emit_changeScreen = defineEmits(["mainMenu, accessAppResults"]);
let indexUse = props.indexQuiz;

let indexTarget = null;

const booleenMenu = ref(true);
const accessAppResults = ref(true);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionUserResponses = sessionStorage.getItem("userResponses");
let sessionJsonUserResponses = JSON.parse(sessionUserResponses);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionUserResults = sessionStorage.getItem("userResults");
let sessionJsonUserResults = JSON.parse(sessionUserResults);

const SortingArray = ref([]);

//Définir le tableau de sessionJsonAdminQuestions qui sera utilisé dans la suite du script.
for (let index1 = 0; index1 < sessionJsonAdminQuestions.length; index1++) {
  const element1 = sessionJsonAdminQuestions[index1].idQuiz;
  for (let index2 = 0; index2 < sessionJsonUserResponses.length; index2++) {
    const element2 = sessionJsonUserResponses[index2].idQuiz;
    if (element1 == element2) {
      indexTarget = index1;
    }
  }
}

//Double boucle for pour le comptage des points.
for (
  let index = 0;
  index < sessionJsonAdminQuestions[indexUse].questions.length;
  index++
) {
  const elementAdmin = sessionJsonAdminQuestions[indexUse].questions[index];

  for (
    let index2 = 0;
    index2 <
    sessionJsonUserResponses[0].quizResponse[sessionJsonUserResponses[0].quizResponse.length-1].listResponse.length;
    index2++
  ) {
    const elementUser =
      sessionJsonUserResponses[0].quizResponse[sessionJsonUserResponses[0].quizResponse.length-1].listResponse[index2];
    if (
      elementAdmin.id == elementUser.id &&
      elementAdmin.reponse == elementUser.reponse
    ) {
      moreOnePoint.value++;
      SortingArray.value.push(index);
    } else if (
      elementAdmin.typeQuestion == "checkBox" &&
      elementAdmin.id == elementUser.id
    ) {
      const reponseAdminCheckBox = elementAdmin.reponse;
      const reponseUserCheckBox = elementUser.reponse;
      // Pour type checkbox, si la taille du tableau de réponses de l'admin = taille du tableau de réponses du user alors :
      if (reponseAdminCheckBox.length == reponseUserCheckBox.length) {
        for (let index3 = 0; index3 < reponseUserCheckBox.length; index3++) {
          let elementUser = reponseUserCheckBox[index3];
          if (reponseAdminCheckBox.includes(elementUser)) {
            moreLittlePoint.value++;
            if (moreLittlePoint.value == reponseAdminCheckBox.length) {
              moreOnePoint.value++;
              SortingArray.value.push(index);
            }
          }
        }
      }
    }
  }
}

let mysessionJsonAdminQuestions = sessionJsonAdminQuestions[indexUse].questions;

//Résultat pourcentage
const beforeResultPercent = computed(
  () => (moreOnePoint.value / mysessionJsonAdminQuestions.length) * 100
);
const resultPercent = beforeResultPercent.value.toFixed(0);
const resultPercentTypeInteger = Number(resultPercent);
if (resultPercentTypeInteger === 100) {
  booleanSuccessMessage.value = false;
}

//création d'une session qui permettra d'enregistrer les résultats en pourcentage et diverses informations
let arrayResultUserEvaluation = {
  nameUser: "GHA",
  quizData: [
    {
      idQuiz: sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[indexUse].idQuiz,
      name: sessionJsonQuizDescription[indexUse].name,
      modeQuiz: sessionJsonQuizDescription[indexUse].modeQuiz,
      commentaireQuiz: sessionJsonQuizDescription[indexUse].commentaireQuiz,
      resultPercent: resultPercent + "%",
      points: moreOnePoint.value,
      numberQuestions: sessionJsonAdminQuestions[indexUse].questions.length,
    },
  ],
};

let objectResultEvaluation =     {
      idQuiz: sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[indexUse].idQuiz,
      name: sessionJsonQuizDescription[indexUse].name,
      modeQuiz: sessionJsonQuizDescription[indexUse].modeQuiz,
      commentaireQuiz: sessionJsonQuizDescription[indexUse].commentaireQuiz,
      resultPercent: resultPercent + "%",
      points: moreOnePoint.value,
      numberQuestions: sessionJsonAdminQuestions[indexUse].questions.length,
    }

let arrayResultUserTraining = {
  nameUser: "GHA",
  quizData: [
    {
      idQuiz: sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[indexUse].idQuiz,
      name: sessionJsonQuizDescription[indexUse].name,
      modeQuiz: sessionJsonQuizDescription[indexUse].modeQuiz,
      commentaireQuiz: sessionJsonQuizDescription[indexUse].commentaireQuiz,
      nbreTentative: 1,
      resultPercent: resultPercent + "%",
      points: moreOnePoint.value,
      numberQuestions: sessionJsonAdminQuestions[indexUse].questions.length,
    },
  ],
};


let objectResultTraining = {
      idQuiz: sessionJsonUserResponses[sessionJsonUserResponses.length - 1].quizResponse[indexUse].idQuiz,
      name: sessionJsonQuizDescription[indexUse].name,
      modeQuiz: sessionJsonQuizDescription[indexUse].modeQuiz,
      commentaireQuiz: sessionJsonQuizDescription[indexUse].commentaireQuiz,
      nbreTentative: 1,
      resultPercent: resultPercent + "%",
      points: moreOnePoint.value,
      numberQuestions: sessionJsonAdminQuestions[indexUse].questions.length,
    }

let mainArray = [];

//CREATION SESSION "RESULTS"
//Si la session results n'existe pas
if (!sessionJsonUserResults) {
  if (sessionJsonQuizDescription[indexUse].modeQuiz == "evaluation") {
    mainArray.push(arrayResultUserEvaluation);
    sessionStorage.setItem("userResults", JSON.stringify(mainArray));
  } else if (sessionJsonQuizDescription[indexUse].modeQuiz == "training") {
    mainArray.push(arrayResultUserTraining);
    sessionStorage.setItem("userResults", JSON.stringify(mainArray));
  }
  console.log("Session n'existe pas.");
}
//Si la session results existe
else if (sessionJsonUserResults) {
  if (sessionJsonQuizDescription[indexUse].modeQuiz == "evaluation") {
    sessionJsonUserResults[0].quizData.push(objectResultEvaluation);
    sessionStorage.setItem("userResults", JSON.stringify(sessionJsonUserResults));
  } else if (sessionJsonQuizDescription[indexUse].modeQuiz == "training") {
    sessionJsonUserResults[0].quizData.push(objectResultTraining);
    sessionStorage.setItem("userResults", JSON.stringify(sessionJsonUserResults));
  }
}

//Analyse du tableau - Si la session results existe et que l'utilisateur a déjà répondu à ce quiz
if (sessionJsonUserResults) {
  for (let index = 0; index < sessionJsonUserResults.length - 1; index++) {
    const element = sessionJsonUserResults[index].idQuiz;
    const elementNormal = sessionJsonUserResults[index];
    if (element == sessionJsonUserResults[sessionJsonUserResults.length - 1].idQuiz) {
      if (elementNormal.modeQuiz == "training") {
        sessionJsonUserResults[sessionJsonUserResults.length - 1].nbreTentative =
          sessionJsonUserResults[index].nbreTentative + 1;
        sessionJsonUserResults.splice(index, 1);
        sessionStorage.setItem("userResults", JSON.stringify(sessionJsonUserResults));
        break;
      }
      sessionJsonUserResults.splice(index, 1);
      sessionStorage.setItem("userResults", JSON.stringify(sessionJsonUserResults));
    }
  }
}

function exit() {
  booleenMenu.value = false;
  emit_changeScreen("mainMenu", booleenMenu);
  emit_changeScreen("accessAppResults", accessAppResults);
}

//Si un resultat dans sessionJsonUserResults existe déjà, on le remplace
for (let index = 0; index < sessionJsonUserResponses.length - 1; index++) {
  const element = sessionJsonUserResponses[index].idQuiz;
  if (element == sessionJsonUserResponses[sessionJsonUserResponses.length - 1].idQuiz) {
    sessionJsonUserResponses.splice(index, 1);
    sessionStorage.setItem("userResponses", JSON.stringify(sessionJsonUserResponses));
  }
}
</script>




<template>
<nav class="navScoped">
  <i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="exit"></i>
<div class="white withMax center roboto">Fin du quiz<i class="fi fi-rs-check marginLeft"></i></div>
</nav>


  <div v-for="(item, index) in 1" :key="item">
    <div class="containerFinalResult marginTopScoped">
      <div class="containerFinalResultChild">
        <div class="mainTitle">
          <table class="table is-striped">
            <tbody>
              <tr>
                <td class="texte blueLight roboto">Note</td>
                <td class="roboto blueBold">
                  {{ moreOnePoint }}/{{ mysessionJsonAdminQuestions.length }}
                </td>
              </tr>
              <tr>
                <td class="texte blueLight roboto">Pourcentage de réussite</td>
                <td class="roboto blueBold">{{ resultPercent }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="containerThreeLists">
        <div class="adminQuestionssAdmin">
          <ol>
            <ul v-for="(itemChild, index) in mysessionJsonAdminQuestions" :key="itemChild">
              <div v-if="SortingArray.includes(index)">
                <i class="fi fi-ss-check circle"></i>
              </div>
              <div v-else>
                <i class="fi fi-ss-cross-circle cancel"></i>
              </div>

              <h3 class="roboto blueBold">Question {{ index + 1 }}</h3>
              <div class="roboto blueLight">
                {{ itemChild.question }}
              </div>
              <h3 class="roboto blueBold">Ma réponse</h3>

              <div
                class="roboto blueLight"
                v-if="
                  Array.isArray(itemChild.reponse) == true &&
                  itemChild.reponse.join(', ') ==
                    mysessionJsonAdminQuestions[index].reponse.join(', ') &&
                  !SortingArray.includes(index)
                "
              >
                {{
                  sessionJsonUserResponses[
                    sessionJsonUserResponses.length - 1
                  ].quizResponse[indexUse].listResponse[index].reponse.join(", ")
                }}
              </div>

              <div
                class="roboto blueLight"
                v-else-if="
                  Array.isArray(itemChild.reponse) == true &&
                  itemChild.reponse.join(', ') ==
                    mysessionJsonAdminQuestions[index].reponse.join(', ') &&
                  SortingArray.includes(index)
                "
              >
                {{ itemChild.reponse.join(", ") }}
              </div>

              <div v-else class="roboto blueLight">
                {{
                  sessionJsonUserResponses[0].quizResponse[indexUse].listResponse[index].reponse
                }}
              </div>

              <h3 class="roboto blueBold">Solution</h3>
              <div
                class="roboto blueLight"
                v-if="Array.isArray(itemChild.reponse) == true"
              >
                {{ itemChild.reponse.join(", ") }}
              </div>
              <div class="roboto blueLight" v-else>
                {{ itemChild.reponse }}
              </div>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
.containerGlobal {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.containerFinalResult {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.containerFinalResultChild {
  margin-bottom: 5rem;
}
.TitleQuizFinished {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mainTitle {
  color: #485fc7;
  margin-top: 3rem;
}

#congratulation {
  display: flex;
  color: #485fc7;
  margin-top: 1rem;
  margin-bottom: 3rem;
  font-size: 1.4rem;
  font-style: italic;
}

.containerThreeLists {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.adminQuestionssUser {
  list-style-type: none;
}
ul {
  margin-bottom: 4rem;
}
.resultPercents {
  margin-bottom: 1rem;
}

h1 {
  margin-top: 5%;
  font-size: 2rem;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

.material-symbols-outlined-second {
  font-variation-settings: "FILL" 0, "wght" 200, "GRAD" -25, "opsz" 40;
}
.cancel {
  color: rgb(207, 31, 31);
}
.circle {
  color: rgb(60, 226, 60);
}
.roboto {
  font-family: "Roboto", sans-serif;
}

.rotateSpan {
  rotate: 180deg;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  font-size: 3rem;
  margin-top: 1rem;
  margin-left: 1rem;
}

td.texte {
  text-align: left;
}

.colorBlueBold {
  color: #485fc7;
}
.colorBlueLight {
  color: #a6b5d4 !important;
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
  margin-top: 5rem !important;
}
</style>
