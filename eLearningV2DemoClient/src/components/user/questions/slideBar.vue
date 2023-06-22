<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, watch } from "@vue/runtime-core";

//Props contenant une question de type radio
const props = defineProps(["libelle", "indexUse"]);

const responseSlideBar = ref(0);

const tablo = props.libelle.choix;
const questionId = props.libelle.id;

//index du quiz sélectionné par l'utilisateur
const indexUse = props.indexUse;

let indexFilter = null;

//newQuiz = false si on démarre un nouveau quiz; newQuiz = true si on est sur un quiz en cours
let newQuiz = false;

//récupérer les données de la description du quiz en session Storage pour les afficher côté user
let sessionAdminQuestions = sessionStorage.getItem("adminQuestions");
let sessionJsonAdminQuestions = JSON.parse(sessionAdminQuestions);

//récupérer les données des réponses du quiz en session Storage pour les manipuler côté user
const sessionUserResponses = sessionStorage.getItem("userResponses");
const sessionJsonUserResponses = JSON.parse(sessionUserResponses);

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

//Ce code est executé avant que ce composant ne soit appelé
onMounted(() => {
  if (sessionJsonUserResponses && newQuiz == true) {
    for (
      let index = 0;
      index < sessionJsonUserResponses[0].quizResponse[0].listResponse.length;
      index++
    ) {
      const element = sessionJsonUserResponses[0].quizResponse[0].listResponse[index];
      if (element.id == questionId) {
        responseSlideBar.value = element.reponse;

      }
    }
  }
});

//liste des evenements a emettre
const emit = defineEmits(["eventSlideBar"]);

//Si la valeur de responseSlideBar change alors ..
watch(responseSlideBar, () => {
  const response = responseSlideBar.value;
  emit("eventSlideBar", response, questionId, indexUse);
});
</script>









<template>
  <div class="containerQuestion">
    <div class="laQuestion blueBold">
      {{ libelle.question }}
    </div>
    <div class="rule blueBold">(Déplacer le curseur pour indiquer la bonne réponse)</div>
  </div>

  <div class="choiceSlidebar">
    <input
    class="color"
      type="range"
      id="slidebar"
      min="0"
      :max="libelle.etendue"
      :step="libelle.interval"
      v-model="responseSlideBar"
    />
  </div>

  <div class="responseSlideBar">
    {{ responseSlideBar }}
  </div>
</template>



<style scoped>
.choiceSlidebar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 2rem;
}

.color{
  background-color: yellow !important;
  color: yellow !important;
}

.responseSlideBar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;

}
.containerQuestion{
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
.rule{
  text-align: center;
  font-size: 0.7rem;
  font-style: italic;
}
input[type="range"]{
  cursor: pointer !important;
}
</style>