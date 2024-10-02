<template>
    <div class="card">
        <div class="card-body row">
            <div class="col-xl-4 col-lg-6 col-sm-6" v-for="pokemon in props.pokemons" :key="pokemon.id">
                <div class="pokemon-card">
                    <RouterLink :to="{ name: 'PokemonDetails', params: { id: pokemon.id } }">
                        <div class="card mb-3 p-3" :style="getCardStyle(pokemon.types)">
                            <img :src="pokemon.image" class="card-img-top" :alt="pokemon.name" height="128" />
                            <div class="card-body text-center">
                                <h5 class="card-title text-dark">{{ capitalizeFirstLetter(pokemon.name) }}</h5>
                                <span class="badge text-dark">{{ pokemon.id }}</span>
                            </div>
                        </div>
                    </RouterLink>
                    <button @click="toggleFavorite(pokemon.id)" class="favorite-btn">
                        <span v-if="isFavorite(pokemon.id)">❤️</span>
                        <span v-else>🤍</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { defineProps, reactive, onMounted } from 'vue';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

const props = defineProps<{
    pokemons: Pokemon[];
}>();

const favorites = reactive<number[]>([]);

onMounted(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites.push(...JSON.parse(savedFavorites));
    }
});

const toggleFavorite = (pokemonId: number) => {
    const index = favorites.indexOf(pokemonId);
    if (index === -1) {
        favorites.push(pokemonId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

const isFavorite = (pokemonId: number) => {
    return favorites.includes(pokemonId);
};

const getCardStyle = (types: string[]) => {
    const typeColors: { [key: string]: string } = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#F0B6F0',
        normal: '#F5F5F0',
    };

    const primaryType = types[0];
    return {
        backgroundColor: typeColors[primaryType] || '#FFFFFF',
        color: '#FFFFFF'
    };
};

const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    text-decoration: none;
}

.pokemon-card {
    position: relative;
}

.favorite-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #ff0000;
}
</style>
