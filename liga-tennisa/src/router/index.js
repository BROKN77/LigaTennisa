// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Home.vue'; // Импортируйте ваши компоненты
import ForParticipants from '../ForParticipants.vue';
import Results from '../Results.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/for-participants', component: ForParticipants },
  { path: '/results', component: Results },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
