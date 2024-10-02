<template>
    <div class="app-container">
        <nav class="navbar bg-custom">
            <div class="container">
                <RouterLink to="/pokedex" class="navbar-brand">Pokedex</RouterLink>
                <form class="d-flex col-md-6 col-12" role="search" @submit.prevent="handleSearch">
                    <input v-model="searchQuery" class="form-control me-2" type="search"
                        placeholder="Pesquisar por nome ou número" aria-label="Search" />
                    <select v-model="selectedTypes" multiple class="form-select me-2" style="height: 48px;">
                        <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
                    </select>
                    <button class="btn btn-danger" type="button" @click="clearForm">Limpar</button>
                </form>
                <RouterLink to="/favorites" class="navbar-brand">Favoritos</RouterLink>
            </div>
        </nav>
        <RouterView class="content"></RouterView>

        <footer class="footer bg-custom text-white">
            <div class="container text-center">
                <p>&copy; 2024 Pokédex. Todos os direitos reservados.</p>
                <p>Desenvolvido por Mário Nakazato Neto</p>
                <a href="https://github.com/Mario-Nakazato" target="_blank" class="text-white">GitHub</a>
                <span> | </span>
                <a href="https://www.linkedin.com/in/marionakazato/" target="_blank" class="text-white">LinkedIn</a>
            </div>
        </footer>
    </div>
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
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.bg-custom {
    background-color: #F0F0F0;
}

.navbar {
    background-color: #FFCC00;
    border-bottom: 4px solid #FF4500;
    padding: 10px 20px;
}

.navbar-brand {
    color: #1C1C1C;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 20px;
}

.navbar-brand:hover {
    color: #FF6F00;
}

.form-control {
    border: 2px solid #FFD700;
    background-color: #FFFFFF;
}

.form-control:focus {
    border-color: #00A4D3;
    box-shadow: 0 0 5px rgba(0, 164, 211, 0.5);
}

.form-select {
    border: 2px solid #FFD700;
    background-color: #FFFFFF;
}

.btn-primary {
    background-color: #00A4D3;
    border: none;
    color: #FFFFFF;
}

.btn-primary:hover {
    background-color: #0085A1;
    color: #FFFFFF;
}

.content {
    flex: 1;
}

.footer {
    padding: 20px 0;
    background-color: #1C1C1C;
    text-align: center;
}

.footer a {
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}
</style>
