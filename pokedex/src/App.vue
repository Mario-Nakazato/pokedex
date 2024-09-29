<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<div>
		<div>
			<RouterLink to="/">Inicio</RouterLink>
		</div>
		<div>
			<RouterLink to="/pag">Pagina</RouterLink>
		</div>
		<div>
			<RouterLink to="/pokedex">Pokedex</RouterLink>
		</div>
	</div>
	<RouterView></RouterView>
</template>

<style scoped></style>
