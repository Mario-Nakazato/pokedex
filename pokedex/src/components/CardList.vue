<template>
    <div class="card">
        <div class="card-body row">
            <div class="col-xl-4 col-lg-6 col-sm-6" v-for="pokemon in pokemons" :key="pokemon.id">
                <RouterLink :to="{ name: 'PokemonDetails', params: { id: pokemon.id } }">
                    <div class="card mb-3 p-3" :style="getCardStyle(pokemon.types)">
                        <img :src="pokemon.image" class="card-img-top" :alt="pokemon.name" height="128" />
                        <div class="card-body text-center">
                            <h5 class="card-title text-dark">{{ capitalizeFirstLetter(pokemon.name) }}</h5>
                            <span class="badge text-dark">{{ pokemon.id }}</span>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    url: string;
    types: string[]; // Adicionando o tipo do Pokémon
}

const pokemons = ref<Pokemon[]>([]);
const loading = ref(false);
const allLoaded = ref(false);
const limit = 42;
const offset = ref(0);

const fetchPokemons = async () => {
    if (loading.value || allLoaded.value) return;

    loading.value = true;
    try {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset.value}`
        );
        const results = response.data.results;

        if (results.length === 0) {
            allLoaded.value = true;
            return;
        }

        // Obter detalhes de cada Pokémon para obter a imagem, ID e tipos
        const pokemonDetails = await Promise.all(
            results.map(async (pokemon: Pokemon) => {
                const res = await axios.get(pokemon.url);
                return {
                    id: res.data.id,
                    name: res.data.name,
                    image: res.data.sprites.other.dream_world.front_default,
                    types: res.data.types.map((type: { type: { name: string } }) => type.type.name), // Extraindo os tipos
                };
            })
        );

        pokemons.value.push(...pokemonDetails);
        offset.value += limit;
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
    } finally {
        loading.value = false;
    }
};

// Função para determinar a cor de fundo do cartão com base nos tipos do Pokémon
const getCardStyle = (types: string[]) => {
    const typeColors: { [key: string]: string } = {
        fire: '#F08030', // Cor para Fogo
        water: '#6890F0', // Cor para Água
        grass: '#78C850', // Cor para Grama
        electric: '#F8D030', // Cor para Elétrico
        ice: '#98D8D8', // Cor para Gelo
        fighting: '#C03028', // Cor para Luta
        poison: '#A040A0', // Cor para Veneno
        ground: '#E0C068', // Cor para Terra
        flying: '#A890F0', // Cor para Voador
        psychic: '#F85888', // Cor para Psíquico
        bug: '#A8B820', // Cor para Inseto
        rock: '#B8A038', // Cor para Rocha
        ghost: '#705898', // Cor para Fantasma
        dragon: '#7038F8', // Cor para Dragão
        dark: '#705848', // Cor para Sombrio
        steel: '#B8B8D0', // Cor para Aço
        fairy: '#F0B6F0', // Cor para Fada
        normal: '#F5F5F0', // Cor para Normal
    };

    // Usar a cor do primeiro tipo, ou padrão
    const primaryType = types[0];
    return {
        backgroundColor: typeColors[primaryType] || '#FFFFFF', // Cor padrão (branca) se o tipo não for reconhecido
        color: '#FFFFFF' // Texto branco para melhor contraste
    };
};

const handleScroll = () => {
    const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const fullHeight =
        document.documentElement.scrollHeight;

    // Carregar mais quando o usuário estiver a 100px do final da página
    if (scrollTop + windowHeight >= fullHeight - 100) {
        fetchPokemons();
    }
};

onMounted(() => {
    fetchPokemons();
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};
</script>

<style scoped>
/* Remover o sublinhado e a cor azul do RouterLink */
a {
    text-decoration: none;
    color: inherit;
    /* Herdar a cor do conteúdo pai */
}

a:hover {
    text-decoration: none;
    /* Garantir que não tenha sublinhado no hover */
}
</style>
