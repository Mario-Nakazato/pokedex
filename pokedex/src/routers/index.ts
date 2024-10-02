import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/',
        component: () => import('../views/Pokedex.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
        path: '/pokedex',
        component: () => import('../views/Pokedex.vue')
    },
    {
        path: '/pokemon/:id',
        component: () => import('../views/PokemonDetails.vue'),
        name: 'PokemonDetails'
    },
    {
        path: '/favorites',
        component: () => import('../views/Favorites.vue')
    },
    {
        path: '/esteregg',
        component: () => import('../views/Home.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;