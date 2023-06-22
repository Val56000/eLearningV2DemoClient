<script setup>
import {ref} from 'vue';
import listingQuiz from './listingQuiz.vue';
import questionLayout from './questionLayout.vue';

//Value manages the display of childs components
const limit = ref(0);

//Quiz index
const quizIndex = ref()

//Variable stocks "startQuiz value" in the "getIdQuiz" function
const goStart = ref()

const emit = defineEmits(["mainMenu, accessAppResults", "hideExitIcon"]);

//Get "quiz's index" / "startQuiz value" allows to start this quiz
function getIdQuiz(index, startQuiz){
limit.value++;
quizIndex.value = index
goStart.value = startQuiz;
}

//This function sends "booleenMenu.value" to "appUser.vue" after clicking on "Précédent"
function exit(booleenMenu){
  booleenMenu.value = false
  emit("mainMenu", booleenMenu);
}

//This function manages the display "exit icon" of "appUser.vue"
function displayExitIcon(displayExitIcon){
emit("hideExitIcon", displayExitIcon)
}
</script>


<template>

<listingQuiz  @startQuiz="getIdQuiz" v-if="limit == 0" @mainMenu="exit" @hideExitIcon="displayExitIcon"/>
<questionLayout v-if="limit >= 1" :indexQuiz="quizIndex" :startQuiz="goStart" @mainMenu="exit"/> 

</template>
