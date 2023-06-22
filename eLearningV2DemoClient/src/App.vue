<script setup>
import { ref } from "vue";
import appAdmin from "./components/admin/appAdmin.vue";
import appUser from "./components/user/appUser.vue";

//Variable is assigned of child's components
const pathChoice = ref(null);

//This function indicates pathChoice's value for choice the child's component
function choosePath(numberPath) {
  pathChoice.value = numberPath;
}

//This Function gets the boolean value of child component "appCreationQuiz" to show this template
function showMainScreen(goToMainScreen){
  if (goToMainScreen.value == true) {
    pathChoice.value = null
  }
}
</script>


<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Raleway&family=Roboto&display=swap" rel="stylesheet"/>
  <nav class="navScoped">
<div class="white withMax center roboto" v-if="pathChoice == null">eLearning</div>
</nav>
  <div>
    <div class="center" v-if="pathChoice == null"><img src="./assets/images/Okalys-logo.png" alt="logo Bonduelle"></div>
    <div class="flexRow">
      
      <button
        v-if="pathChoice == null"
        class="button is-info is-light marginRight"
        @click="choosePath('appAdmin')"
      >
        Administrateur
      </button>
      <button
        v-if="pathChoice == null"
        class="button is-info is-light"
        @click="choosePath('appUser')"
      >
        Utilisateur
      </button>
      <appAdmin v-if="pathChoice == 'appAdmin'" @changeScreen="showMainScreen" />
      <appUser v-if="pathChoice == 'appUser'" @changeScreen="showMainScreen"/>
    </div>
  </div>
</template>

<style scoped>
button{
  width: 15rem;
}
img{
  width :20rem;
  margin-bottom: 5rem;
  
}


</style>




