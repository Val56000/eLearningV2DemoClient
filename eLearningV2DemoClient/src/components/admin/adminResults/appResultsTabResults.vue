<script setup>
import { ref } from "@vue/reactivity";

// //récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionUserResults = sessionStorage.getItem("userResults");
let sessionJsonUserResults = JSON.parse(sessionUserResults);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionQuizDescription = sessionStorage.getItem("quizDescription");
let sessionJsonQuizDescription = JSON.parse(sessionQuizDescription);

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

const props = defineProps(["propsIdQuizChoice"]);

//Array contenant les notes de tous les participants
const arrayPoints = ref([]);

//variable contenant la moyenne générale
const average = ref(null);

//Variable indiquant le mode du quiz sur lequel l'administrateur est.
const modeQuiz = ref(null);

//variable reactive booleenne envoyée à "appResults.vue" pour retourner sur Listing des Quiz
const booleenChangeScreen = ref(true);

//Fonction calculant la moyenne
function calculateAverage(array) {
  let somme = 0;
  for (let i = 0; i < array.length; i++) {
    somme += array[i];
  }
  average.value = somme / array.length;
}

//calcul de la moyenne des scores
if (sessionJsonUserResults.length > 1) {
  for (let index = 0; index < sessionJsonUserResults.length; index++) {
    const element = sessionJsonUserResults[index];
    for (
      let index2 = 0;
      index2 < sessionJsonUserResults[index].quizData.length;
      index2++
    ) {
      const element2 = sessionJsonUserResults[index].quizData[index2];
      if (element2.idQuiz == props.propsIdQuizChoice) {
        arrayPoints.value.push(element2.points);
      }
    }
  }

  calculateAverage(arrayPoints.value);
}

const emit_changeScreen = defineEmits(["indexName", "goListingQuiz"]);

//Affecter la valeur de element2.modeQuiz à la variable reactive modeQuiz.value
for (let index = 0; index < sessionJsonUserResults.length; index++) {
  const element = sessionJsonUserResults[index];
  for (
    let index2 = 0;
    index2 < sessionJsonUserResults[index].quizData.length;
    index2++
  ) {
    const element2 = sessionJsonUserResults[index].quizData[index2];
    if (element2.idQuiz == props.propsIdQuizChoice) {
      modeQuiz.value = element2.modeQuiz;
      break;
    }
  }
}
function selectVisibility(index) {
  let indexNameUser = sessionJsonUserResults[index].nameUser;
  emit_changeScreen("indexName", indexNameUser);
}

function previous() {
  emit_changeScreen("goListingQuiz", booleenChangeScreen);
}
</script>


<template>
<nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previous"></i>
<div class="white withMax center roboto">Résultats utilisateurs </div>
</nav>
  <div class="containerTab">
    <div class="beforeTable">
      <div class="roboto">
        {{ sessionJsonQuizDescription[props.propsIdQuizChoice - 1].name }}
      </div>
      <div class="roboto littleSize">
        {{
          "(Mode " +
          sessionJsonQuizDescription[props.propsIdQuizChoice - 1].modeQuiz +
          ")"
        }}
      </div>
    </div>
    <table class="table is-bordered">
      <thead>
        <tr v-if="sessionJsonUserResults.length > 1">
          <th id="onlyTh"></th>
          <th class="roboto" colspan="3" v-if="sessionJsonUserResults.length > 1">
            {{"Moyenne générale : " + average.toFixed(1) + "/" + sessionJsonAdminQuestions[props.propsIdQuizChoice - 1].questions.length}}
          </th>
        </tr>

        <tr class="rowMain">
          <th class="alignLeft roboto">
            {{ "User's name" }}
          </th>

          <th class="roboto">Score</th>
          <th v-if="modeQuiz == 'training'" class="roboto">Nbre tentatives</th>
          <th class="alignCenter roboto">Visualisation</th>
        </tr>
      </thead>
      <tbody>
        <tr class="rowElements" v-for="(item, index) in sessionJsonUserResults" :key="item">
          <td class="verticalMiddle">
            {{ item.nameUser }}
          </td>

          <!-- Cellule du score -->
          <td class="alignCenter verticalMiddle">
            {{
              sessionJsonUserResults[index].quizData[props.propsIdQuizChoice - 1].points
            }}/{{
              sessionJsonUserResults[index].quizData[props.propsIdQuizChoice - 1]
                .numberQuestions
            }}
          </td>

          <!-- Cellule du nombre de tentatives -->
          <td class="alignCenter verticalMiddle" v-if="modeQuiz == 'training'">
            {{
              sessionJsonUserResults[index].quizData[props.propsIdQuizChoice - 1]
                .nbreTentative
            }}
          </td>

          <!-- Cellule de visualisation -->
          <td class="alignCenter verticalMiddle">
            <i class="fi fi-rs-eye eyeIcon" @click="selectVisibility(index)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.containerTab {
  margin-top: 3rem;
}
.containerTab,
.beforeTable {
  display: flex;
  flex-direction: column;
  align-items: center;
}
table {
  width: 60vw;
  border-collapse: initial;
  border: 1px solid black;
}
.alignCenter,
th {
  text-align: center !important;
  border: 1px solid black;
}
th {
  color: black !important;
  border: 1px solid black;
}

.alignLeft {
  text-align: left !important;
}
.verticalMiddle {
  vertical-align: middle !important;
}
.eyeIcon {
  cursor: pointer;
}
.eyeIcon:hover {
  color: #d1d1d4;
}
td {
  border: 10px solid #004D22;
  color: #f29300;
}
tr{
    border: 1px solid #004D22;
}
.nameQuiz {
  text-decoration: underline;
  text-decoration-thickness: 1.2px;
}
.beforeTable {
  line-height: 1.3rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: black;
}
.roboto {
  font-family: "Roboto", sans-serif;
}
.button.is-info {
  background-color: transparent;
  color: black;
  border: none;
  border-color: transparent;
  box-shadow: none;
}
.button.is-info:hover {
  color: black;
}
.button.is-info:focus {
  box-shadow: none;
}
#onlyTh {
  background-color: black;
}
.littleSize {
  font-size: 1rem;
}
.rotateSpan {
  rotate: 180deg;
  position: fixed;
  top: 0;
  cursor: pointer;
  font-size: 3rem;
  margin-top: 1rem;
  margin-left: 1rem;
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
.table td, .table th{
border: 1px solid #004D22;
}
</style>