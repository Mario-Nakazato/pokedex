<template>
    <div class="d-flex justify-content-center"
        style="background-color: #ff7029; box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);">
        <div class="col-sm-12 col-lg-6">
            <div v-if="favoritePokemons.length > 0">
                <h1 class="text-center mb-4">Pokémons Favoritos</h1>
                <CardList :pokemons="favoritePokemons" />
            </div>
            <div v-else class="text-center">
                <h2 class="mb-4">Nenhum Pokémon favoritado ainda.</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardList from '../components/CardList.vue';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

const favoritePokemons = ref<Pokemon[]>([]);

// Carrega os favoritos do localStorage ao montar o componente
onMounted(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        const favoriteIds = JSON.parse(savedFavorites);

        // Buscar os detalhes dos Pokémon favoritados usando a PokeAPI
        Promise.all(
            favoriteIds.map(async (id: number) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                return {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other.dream_world.front_default,
                    types: data.types.map((type: { type: { name: string } }) => type.type.name),
                };
            })
        ).then((pokemons) => {
            favoritePokemons.value = pokemons;
        });
    }
});
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
}

h1 {
    color: #000000;
}
</style>
