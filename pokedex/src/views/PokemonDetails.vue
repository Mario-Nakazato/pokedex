<template>
	<div class="d-flex justify-content-center">
		<div class="card-body">
			<div v-if="pokemon" class="container mt-4">
				<!-- Card para o Pokémon -->
				<div class="card">
					<div class="card-body text-center">
						<h1 class="card-title mb-4">{{ capitalizeFirstLetter(pokemon.name) }}</h1>
						<img :src="pokemon.image" :alt="pokemon.name" class="img-fluid mb-4" />

						<!-- Tipos do Pokémon -->
						<h2 class="mb-3">Tipos</h2>
						<div class="d-flex justify-content-center mb-4">
							<span v-for="type in pokemon.types" :key="type"
								:style="{ backgroundColor: getTypeColor(type), color: '#000', padding: '8px 12px', margin: '0 8px', borderRadius: '5px', fontSize: '1rem' }">
								{{ capitalizeFirstLetter(type) }}
							</span>
						</div>

						<!-- Estatísticas do Pokémon -->
						<h2 class="mb-3">Estatísticas</h2>
						<ul class="list-group list-group-flush mb-4">
							<li class="list-group-item">
								<strong>HP:</strong>
								<div class="progress">
									<div class="progress-bar" role="progressbar"
										:style="{ width: pokemon.stats.hp + '%' }" aria-valuenow="pokemon.stats.hp"
										aria-valuemin="0" aria-valuemax="100">
										{{ pokemon.stats.hp }}
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<strong>Ataque:</strong>
								<div class="progress">
									<div class="progress-bar" role="progressbar"
										:style="{ width: pokemon.stats.attack + '%' }"
										aria-valuenow="pokemon.stats.attack" aria-valuemin="0" aria-valuemax="100">
										{{ pokemon.stats.attack }}
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<strong>Defesa:</strong>
								<div class="progress">
									<div class="progress-bar" role="progressbar"
										:style="{ width: pokemon.stats.defense + '%' }"
										aria-valuenow="pokemon.stats.defense" aria-valuemin="0" aria-valuemax="100">
										{{ pokemon.stats.defense }}
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<strong>Ataque Especial:</strong>
								<div class="progress">
									<div class="progress-bar" role="progressbar"
										:style="{ width: pokemon.stats.special_attack + '%' }"
										aria-valuenow="pokemon.stats.special_attack" aria-valuemin="0"
										aria-valuemax="100">
										{{ pokemon.stats.special_attack }}
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<strong>Defesa Especial:</strong>
								<div class="progress">
									<div class="progress-bar" role="progressbar"
										:style="{ width: pokemon.stats.special_defense + '%' }"
										aria-valuenow="pokemon.stats.special_defense" aria-valuemin="0"
										aria-valuemax="100">
										{{ pokemon.stats.special_defense }}
									</div>
								</div>
							</li>
							<li class="list-group-item">
								<strong>Velocidade:</strong>
								<div class="progress">
									<div class="progress-bar" role="progressbar"
										:style="{ width: pokemon.stats.speed + '%' }"
										aria-valuenow="pokemon.stats.speed" aria-valuemin="0" aria-valuemax="100">
										{{ pokemon.stats.speed }}
									</div>
								</div>
							</li>
						</ul>
					</div>

					<!-- Evoluções utilizando CardList -->
					<h2 class="card-title mb-4">Evoluções</h2>
					<CardList :pokemons="evolutionChain" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import CardList from '../components/CardList.vue';

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
const pokemonId = ref(route.params.id);

const fetchPokemonDetails = async () => {
    evolutionChain.value = []; // Limpa a cadeia de evolução ao buscar novos detalhes
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
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

        const getEvolutions = async (evolutionData: any) => {
            const evolutionDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionData.species.name}`);
            evolutionChain.value.push({
                id: evolutionDetails.data.id,  // Adicionando ID da evolução
                name: evolutionData.species.name,
                image: evolutionDetails.data.sprites.other.dream_world.front_default,
                types: evolutionDetails.data.types.map((type: { type: { name: string } }) => type.type.name), // Adicionando tipos
            });

            // Se houver mais evoluções, chama recursivamente
            if (evolutionData.evolves_to.length > 0) {
                for (const nextEvolution of evolutionData.evolves_to) {
                    await getEvolutions(nextEvolution);
                }
            }
        };

        await getEvolutions(evolutionResponse.data.chain); // Começa com o primeiro Pokémon da cadeia
    } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
    }
};

// Chama a função ao montar e sempre que o ID do Pokémon mudar
onMounted(() => {
    fetchPokemonDetails();
});

watch(() => route.params.id, (newId) => {
    pokemonId.value = newId; // Atualiza o ID do Pokémon
    fetchPokemonDetails(); // Busca os detalhes do novo Pokémon
    window.scrollTo(0, 0); // Rola para o topo da página
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

<style scoped>
.card {
	border-radius: 10px;
}

.img-fluid {
	max-width: 150px;
	height: auto;
}

.progress {
	height: 20px;
	background-color: #f5f5f5;
}

.progress-bar {
	background-color: #4f298d;
}
</style>
