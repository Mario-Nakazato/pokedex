<template>
    <div class="d-flex justify-content-center"
        style="background-color: #ff7029; box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);">
        <div class="col-sm-12 col-lg-6">
            <CardList :pokemons="pokemons"></CardList>
            <div v-if="loading" class="text-center mt-3">
                Carregando...
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CardList from '../components/CardList.vue';
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

const pokemons = ref<Pokemon[]>([]);
const loading = ref(false);
const allLoaded = ref(false);
const limit = 42;
const offset = ref(0);
const route = useRoute();

// Watchers para busca e tipos
watch(() => route.query, async () => {
    resetState();
    await fetchPokemons();
}, { immediate: true });

// Função que busca Pokémon, respeitando a busca e os tipos
const fetchPokemons = async () => {
    if (loading.value || allLoaded.value) return;
    loading.value = true;

    try {
        const searchQuery = route.query.search || '';
        let selectedTypes: string[] = [];

        // Verifica se types é um array e filtra valores nulos ou indefinidos
        if (Array.isArray(route.query.types)) {
            selectedTypes = route.query.types.filter((type): type is string => type !== null && type !== undefined);
        } else if (typeof route.query.types === 'string') {
            selectedTypes = [route.query.types];
        }

        if (selectedTypes.length > 0 && !searchQuery) {
            // Buscar Pokémon por tipo
            await fetchPokemonsByType(selectedTypes);
        } else if (searchQuery) {
            // Buscar Pokémon por nome ou número
            await fetchPokemonsBySearch(searchQuery as string);
        } else {
            // Buscar a lista padrão de Pokémon
            await fetchDefaultPokemons();
        }

    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
    } finally {
        loading.value = false;
    }
};


const fetchDefaultPokemons = async () => {
    const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset.value}`
    );
    const results = response.data.results;

    if (results.length === 0) {
        allLoaded.value = true;
        return;
    }

    const pokemonDetails = await Promise.all(
        results.map(async (pokemon: { url: string }) => {
            const res = await axios.get(pokemon.url);
            return {
                id: res.data.id,
                name: res.data.name,
                image: res.data.sprites.other.dream_world.front_default,
                types: res.data.types.map((type: { type: { name: string } }) => type.type.name),
            };
        })
    );

    pokemons.value.push(...pokemonDetails);
    offset.value += limit;
};

const fetchPokemonsByType = async (types: string[]) => {
    for (const type of types) {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const results = response.data.pokemon.slice(offset.value, offset.value + limit);

        if (results.length === 0) {
            allLoaded.value = true;
            return;
        }

        const pokemonDetails = await Promise.all(
            results.map(async (pokemonData: { pokemon: { url: string } }) => {
                const res = await axios.get(pokemonData.pokemon.url);
                return {
                    id: res.data.id,
                    name: res.data.name,
                    image: res.data.sprites.other.dream_world.front_default,
                    types: res.data.types.map((type: { type: { name: string } }) => type.type.name),
                };
            })
        );

        pokemons.value.push(...pokemonDetails);
    }
    offset.value += limit;
};

const fetchPokemonsBySearch = async (searchQuery: string) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
        const pokemon = response.data;

        pokemons.value = [{
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            types: pokemon.types.map((type: { type: { name: string } }) => type.type.name),
        }];
    } catch (error) {
        console.error('Pokémon não encontrado:', error);
    }
};

// Função de rolagem para carregar mais Pokémon
const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
        fetchPokemons();
    }
};

// Função que reseta o estado ao iniciar uma nova busca
const resetState = () => {
    pokemons.value = [];
    offset.value = 0;
    allLoaded.value = false;
};

onMounted(() => {
    fetchPokemons();
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped></style>
