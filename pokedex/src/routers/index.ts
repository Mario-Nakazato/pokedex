import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
        path: '/pag',
        component: () => import('../views/Pag.vue')
    },
    {
        path: '/pokedex',
        component: () => import('../views/Pokedex.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;