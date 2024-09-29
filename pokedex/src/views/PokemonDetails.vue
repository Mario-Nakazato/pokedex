<template>
    <div v-if="pokemon">
        <h1>{{ capitalizeFirstLetter(pokemon.name) }}</h1>
        <img :src="pokemon.image" :alt="pokemon.name" />

        <h2>Tipos</h2>
        <div>
            <span v-for="type in pokemon.types" :key="type"
                :style="{ backgroundColor: getTypeColor(type), color: '#fff', padding: '5px', margin: '5px' }">
                {{ capitalizeFirstLetter(type) }}
            </span>
        </div>

        <h2>Estatísticas</h2>
        <ul>
            <li>HP: {{ pokemon.stats.hp }}</li>
            <li>Ataque: {{ pokemon.stats.attack }}</li>
            <li>Defesa: {{ pokemon.stats.defense }}</li>
            <li>Ataque Especial: {{ pokemon.stats.special_attack }}</li>
            <li>Defesa Especial: {{ pokemon.stats.special_defense }}</li>
            <li>Velocidade: {{ pokemon.stats.speed }}</li>
        </ul>

        <h2>Evoluções</h2>
        <div v-if="evolutionChain">
            <div v-for="(evolution, index) in evolutionChain" :key="index">
                <img :src="evolution.image" :alt="evolution.name" />
                <span>{{ capitalizeFirstLetter(evolution.name) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Pokemon {
    name: string;
    image: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    };
}

const pokemon = ref<Pokemon | null>(null);
const evolutionChain = ref<any[]>([]);

const route = useRoute();
const pokemonId = route.params.id;

const fetchPokemonDetails = async () => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = response.data;

        pokemon.value = {
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            types: data.types.map((type: { type: { name: string } }) => type.type.name),
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                special_attack: data.stats[3].base_stat,
                special_defense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            },
        };

        // Buscar cadeia de evolução
        const speciesResponse = await axios.get(data.species.url);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        let currentEvolution = evolutionResponse.data.chain;
        while (currentEvolution) {
            const evolutionDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentEvolution.species.name}`);
            evolutionChain.value.push({
                name: currentEvolution.species.name,
                image: evolutionDetails.data.sprites.other.dream_world.front_default,
            });
            currentEvolution = currentEvolution.evolves_to[0];
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
    }
};

onMounted(() => {
    fetchPokemonDetails();
});

const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const getTypeColor = (type: string) => {
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
    return typeColors[type] || '#FFFFFF';
};
</script>

<style scoped></style>