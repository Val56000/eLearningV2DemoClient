import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import "../src/assets/css/bulma.min.css";
import "../src/assets/css/main.css";

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
