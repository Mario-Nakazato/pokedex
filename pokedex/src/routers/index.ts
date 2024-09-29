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
        path: '/pokedex',
        component: () => import('../views/Pokedex.vue')
    },
    {
        path: '/favorites',
        component: () => import('../views/Favorites.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;