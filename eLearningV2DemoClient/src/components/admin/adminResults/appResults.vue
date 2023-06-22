<script setup>
import { ref } from "vue";
import listingQuiz from "./appResultsListingQuiz.vue";
import tabResults from "./appResultsTabResults.vue";
import onlyUser from "./appResultsOnlyUser.vue";

//Variable sent in the emit to access the main screen
const booleenMenu = ref(true);

const pathChoice = ref(null);

const emit_changeScreen = defineEmits(["mainMenu"]);

const propsIdQuiz = ref(null);
const propsUserName = ref(null);

function exit() {
  booleenMenu.value = false;
  emit_changeScreen("mainMenu", booleenMenu);
}

function receiveIndexQuiz(idQuiz) {
  pathChoice.value = 1;
  propsIdQuiz.value = idQuiz;
}

function receiveIndexUser(indexNameUser){
  pathChoice.value = 2;
  propsUserName.value = indexNameUser;
}

function changeScreen(booleenChangeScreen){
if (booleenChangeScreen.value == true) {
  pathChoice.value = null
}
}
function screenTabResults(booleenMenu) {
  if (booleenMenu.value == true) {
    pathChoice.value = 1
  }
}
</script>

<template>
  <listingQuiz
    @indexQuiz="receiveIndexQuiz"
    @mainMenu="exit"
    v-if="pathChoice == null"
  />
  <tabResults v-if="pathChoice == 1" :propsIdQuizChoice="propsIdQuiz" @indexName="receiveIndexUser" @goListingQuiz="changeScreen"/>
  <onlyUser v-if="pathChoice == 2" :propsUserNameChoice="propsUserName" :propsIdQuizChoice="propsIdQuiz" @mainMenu="screenTabResults"/>
</template>

<style scoped>
</style>