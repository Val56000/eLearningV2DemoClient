<script setup>
import { ref } from "vue";
import appPlayQuiz from "./playQuiz/appPlayQuiz.vue";

//variable is assigned of child's components
const pathChoice = ref(null);

//Variable displays "exit icon"
const displayChildComponent = ref(false)

//Variable used in "previousScreen" function
const goToMainScreen = ref(true)
const emit = defineEmits(["changeScreen"]);

//This function indicates the variable pathChoice's value for choice the child's component
function choosePath(numberPath) {
  pathChoice.value = numberPath;
}

//This Function gets the boolean value of child component "appPlayQuiz" to show this template
function exit(booleenMenu) {
  if (booleenMenu.value == false) {
    pathChoice.value = null;
  }
}

//This function allows to return to previous screen with exit icon
function previousScreen() {
  emit("changeScreen", goToMainScreen);
}

//This function manages the display "exit icon" of "appUser.vue"
function displayExitIcon(displayExitIcon) {
  if (displayExitIcon.value == false) {
    displayChildComponent.value = true
  }
}
</script>


<template>
  <nav class="navScoped"><i class="fi fi-ss-exit rotateLogOutChild marginLeftScoped" @click="previousScreen"></i>
    <div class="white withMax center roboto">Interface utilisateur</div>
  </nav>

  <div class="flexColumn gap" v-if="pathChoice == null">
    <button class="button is-info is-light" @click="choosePath('appPlayQuiz')" v-if="pathChoice == null"
      :disabled="disabledParticipateQuiz">
      Participer au quiz
    </button>
  </div>

  <appPlayQuiz v-if="pathChoice == 'appPlayQuiz'" @mainMenu="exit" @hideExitIcon="displayExitIcon" />
</template>

<style scoped>
button {
  width: 15rem;
}

.navScoped {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
}

.marginLeftScoped {
  margin-left: 0.5rem;
}
</style>