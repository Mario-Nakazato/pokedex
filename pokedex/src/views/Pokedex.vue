<template>
	<div class="d-flex justify-content-center">
		<div class="col-sm-12 col-lg-6">
			<CardList :pokemons="pokemons"></CardList>
		</div>
	</div>
</template>

<script setup lang="ts">
import CardList from '../components/CardList.vue';
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface Pokemon {
	id: number;
	name: string;
	image: string;
	url: string;
	types: string[];
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

        const pokemonDetails = await Promise.all(
            results.map(async (pokemon: Pokemon) => {
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
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
    } finally {
        loading.value = false;
    }
};

const handleScroll = () => {
    const scrollTop =
		window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight =
		window.innerHeight || document.documentElement.clientHeight;
    const fullHeight =
		document.documentElement.scrollHeight;

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

</script>

<style scoped></style>
