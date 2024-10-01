<template>
    <nav class="navbar bg-custom">
        <div class="container">
            <RouterLink to="/pokedex" class="navbar-brand">Pokedex</RouterLink>
            <form class="d-flex col-md-6 col-12" role="search" @submit.prevent="handleSearch">
                <input v-model="searchQuery" class="form-control me-2" type="search"
                    placeholder="Pesquisar por nome ou número" aria-label="Search" />
                <select v-model="selectedTypes" multiple class="form-select me-2" style="height: 48px;">
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const tipos: string[] = [
    'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground',
    'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy', 'normal',
];

const searchQuery = ref('');
const selectedTypes = ref<string[]>([]);
const router = useRouter();

watch([searchQuery, selectedTypes], () => {
    router.push({
        path: '/pokedex',
        query: {
            search: searchQuery.value || undefined,
            types: selectedTypes.value.length ? selectedTypes.value : undefined
        }
    });
});

const handleSearch = () => {
    router.push({
        path: '/pokedex',
        query: {
            search: searchQuery.value || undefined,
            types: selectedTypes.value.length ? selectedTypes.value : undefined
        }
    });
};

const clearForm = () => {
    searchQuery.value = '';
    selectedTypes.value = [];
};
</script>

<style scoped>
.bg-custom {
    background-color: #2E2E2E;
}

.navbar {
    background-color: #2E2E2E;
    border-bottom: 4px solid #FF4500;
    padding: 10px 20px;
}

.navbar-brand {
    color: #FFD700;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 20px;
}

.navbar-brand:hover {
    color: #FFA500;
}

.form-control {
    border: 2px solid #FFD700;
    background-color: #FFFFFF;
}

.form-control:focus {
    border-color: #FF4500;
    box-shadow: 0 0 5px rgba(255, 69, 0, 0.5);
}

.form-select {
    border: 2px solid #FFD700;
    background-color: #FFFFFF;
}

.btn-outline-danger {
    color: #FF4500;
    border-color: #FF4500;
}

.btn-outline-danger:hover {
    background-color: #FF4500;
    color: #FFFFFF;
}
</style>
