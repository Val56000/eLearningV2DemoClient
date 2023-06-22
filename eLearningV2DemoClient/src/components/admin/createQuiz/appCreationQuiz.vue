<script setup>
import { ref } from "vue";
import buildCaracteristicQuiz from './buildCaracteristicQuiz.vue'
import componentQuestions from './componentQuestions.vue'


//This boolean displays the childs components in a v-if condition
const display = ref(true);

//Value used in "hideExitIconOfAppAdmin" function
const hideExitIconAppAdmin = ref(true);

const emit = defineEmits(["mainMenu, accessAppUser, hideExitIcon"]);

//This function sends to "appAdmin.vue" the value of "hideExitIconAppAdmin.value" to hide exit icon
function hideExitIconOfAppAdmin (){
    emit("hideExitIcon", hideExitIconAppAdmin)
}

//This function gets boolean value to "buildCaracteristicQuiz.vue" and sends it to "appAdmin" to display it
function goMenu (booleenMenu){
emit("mainMenu", booleenMenu)
}

//This function manages componentQuestions.vue's display
function goComponentQuestions(forComposantStartBuildQuiz){
if(forComposantStartBuildQuiz.value == false){
    display.value = false;
}
}

//This function shows buildCaracteristicQuiz's display after clicking on previous button of "listTypesQuestions.vue"
function returnBooleenCaracteristicQuiz(booleenCaracteristicQuiz){
    if(booleenCaracteristicQuiz.value == false){
        display.value = true;
    }
}

//This function shows buildCaracteristicQuiz's display after confirmation of a quiz
function retrieveDataBuildNewQuiz(booleenBuildNewQuiz){
    if (booleenBuildNewQuiz.value == false) {
        display.value = true;
    }
}

//This function manages button "Participer au quiz"
function accessAppUser(activateParticipateButton){
    emit("accessAppUser", activateParticipateButton)
}


</script>

<template>
    <buildCaracteristicQuiz v-if="display == true" @changeScreen="goComponentQuestions" @mainMenu="goMenu" @accessAppUser="accessAppUser" />
    <componentQuestions v-if="display == false"  @buildChoiceTypeAtStartBuildQuiz="returnBooleenCaracteristicQuiz" @toBuildNewQuiz="retrieveDataBuildNewQuiz" @hideExitIcon="hideExitIconAppCreationQuiz"/>
</template>

