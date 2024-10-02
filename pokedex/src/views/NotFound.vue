<template>
    <div class="not-found-container d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="text-center">
            <h1 class="display-1 fw-bold">404</h1>
            <h2 class="mb-4">Oops! Página não encontrada.</h2>
            <p class="lead mb-4">
                Parece que a página que você está procurando não existe. Verifique a URL ou retorne à página inicial.
            </p>
            <router-link to="/" class="btn btn-primary btn-lg">
                Voltar para o Início
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found-container {
    background-color: #f8f9fa;
    color: #343a40;
}

h1 {
    font-size: 6rem;
}

h2 {
    font-size: 2.5rem;
}

p {
    font-size: 1.25rem;
}
</style>