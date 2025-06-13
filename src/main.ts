import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.ts';
import App from './App.vue';
import { createApollo } from '@/modules';
import { DefaultApolloClient } from '@vue/apollo-composable';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia();
const apollo = createApollo();

app.use(pinia);
app.provide(DefaultApolloClient, apollo);
app.mount('#app');
