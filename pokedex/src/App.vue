<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container">
            <RouterLink to="/pokedex" class="navbar-brand">Pokedex</RouterLink>
            <form class="d-flex col-md-6 col-12" role="search" @submit.prevent="handleSearch">
                <input v-model="searchQuery" class="form-control me-2" type="search"
                    placeholder="Pesquisar por nome ou número" aria-label="Search" />
                <select v-model="selectedTypes" multiple class="form-select me-2">
                    <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
                </select>
                <button class="btn btn-outline-danger" type="button" @click="clearForm">Limpar</button>
            </form>
            <RouterLink to="/favorites" class="navbar-brand">Favoritos</RouterLink>
        </div>
    </nav>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const tipos: string[] = [
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
    'normal',
];

const searchQuery = ref('');
const selectedTypes = ref<string[]>([]);
const router = useRouter();

const handleSearch = () => {
    const query = searchQuery.value;
    router.push({ path: '/pokedex', query: { search: query, types: selectedTypes.value } });
};

const clearForm = () => {
    searchQuery.value = '';
    selectedTypes.value = [];
};
</script>

<style scoped></style>