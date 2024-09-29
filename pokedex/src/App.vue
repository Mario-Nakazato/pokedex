<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<nav class="navbar bg-body-tertiary">
		<div class="container">
			<RouterLink to="/pokedex" class="navbar-brand">Pokedex</RouterLink>
			<form class="d-flex col-md-4 col-12" role="search">
				<input class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search">
				<button class="btn btn-outline-success" type="submit">Pesquisar</button>
			</form>
			<RouterLink to="/favorites" class="navbar-brand">Favoritos</RouterLink>
		</div>
	</nav>
	<RouterView></RouterView>
</template>

<style scoped></style>
