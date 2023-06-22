<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, watch } from "@vue/runtime-core";

//Props contenant une question de type radio
const props = defineProps(["libelle", "indexUse"]);

const responseRadio = ref(null);

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

//liste des evenements à émettre
const emit = defineEmits(["eventRadio", "disabledNextButton"]);

//Fonction pour modifier le DOM suite au clique d'une réponse
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






//   let listClassMain = document.querySelectorAll(".targetInput");

//   if (booleenColor.value == true) {
//     for (let index1 = 0; index1 < listClassMain.length; index1++) {
//       const element = listClassMain[index1];
//       if (element.classList.contains("greenBold")) {
//         element.classList.remove("greenBold");
//       }
//     }
//     listClassMain[index].classList.replace("is-info", "greenBold");
//   } else if (booleenColor.value == null) {
//     listClassMain[index].classList.add("is-info");
//     listClassMain[index].classList.remove("greenBold");
//     booleenColor.value = true;
//   }
// }

//Filtrer la session "response" pour trouver à quel index de la session se réfère indexUse
//Cette condition permet de savoir si un quiz démarre ou si il est en cours
if (sessionJsonUserResponses) {
  for (let index = 0; index < sessionJsonUserResponses[0].quizResponse.length; index++) {
    const element = sessionJsonUserResponses[0].quizResponse[index].idQuiz;
    if (element == indexUse + 1) {
      indexFilter = index;
      newQuiz = true;
    }
  }
}

//Ce code est executé quand que ce composant est monté
onMounted(() => {
  console.log(indexUse);
  let listClassMain = document.querySelectorAll(".targetInput");
  if (sessionJsonUserResponses && newQuiz == true) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[0].quizResponse[indexFilter].listResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[0].quizResponse[indexFilter].listResponse[index];
      if (element.id == questionId) {
        
        for (
          let index2 = 0;
          index2 < sessionJsonAdminQuestions[indexUse].questions.length;
          index2++
        ) {
          const element2 = sessionJsonAdminQuestions[indexUse].questions[index2];
          if (element.id == element2.id) {
            
let indexOfResponse = element2.choix.indexOf(element.reponse);
          listClassMain[indexOfResponse].classList.replace("is-warning", "targetInputSecond")


          }
        }
      }
    }
    booleenColor.value = true;
  }
//Si la réponse est différent de null ou de undefined alors :
// faire un emit avec un booleen qui sera transmit à progression.vue qui dira que isDisabledNext sera = false
//En attente du code 
let booleenDisabledNextButton = true
emit("disabledNextButton", booleenDisabledNextButton);
});



//Si la valeur de responseRadio change alors ..
watch(responseRadio, () => {
  const response = responseRadio.value;
  emit("eventRadio", response, questionId, indexUse);
});
</script>










<template>
  <!-- Affichage de la question  -->

  <div class="containerQuestion">
    <div class="laQuestion raleway blueBold">
      {{ libelle.question }}
    </div>
    <div class="rule blueBold">(Sélectionnez la bonne réponse)</div>
  </div>

  {{ tablo.choix }}

  <div class="containerQuestionRadio">
    <div class="choiceRadio" v-for="(elem, index) in tablo" :key="elem">
      <input
        :id="'idRadio' + index"
        type="radio"
        :value="elem"
        v-model="responseRadio"
      />
      <label
        @click="clicResponse(index)"
        class="targetInput button is-info"
        :for="'idRadio' + index"
        >{{ elem }}</label
      >
    </div>
  </div>
</template>








<style scoped>
.containerQuestionRadio {
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

.targetInputSecond {
  background-color: #485fc7;
  border: 1px solid #eff5fb;
  color: #eff5fb;
}
input {
  display: none;
}
</style>