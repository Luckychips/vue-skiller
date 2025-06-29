import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.ts";
import App from "./App.vue";
import "primeicons/primeicons.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
