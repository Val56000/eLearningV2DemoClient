<script setup>
import progression from "./progression.vue";

const props = defineProps(["indexQuiz", "startQuiz"])

const emit = defineEmits(["mainMenu, accessAppResults"]);

// This function allows to go to main screen
function exit(booleenMenu){
  booleenMenu.value = false
  emit("mainMenu", booleenMenu);
}
</script>


<template>
  <progression :indexQuiz="props.indexQuiz" :startQuiz="props.startQuiz" @mainMenu="exit" />
</template>

