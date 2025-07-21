<template>
    <header class="flex justify-content-between align-center p-4 is-bg-color-main">
        <NuxtLink to="/">
            <img class="logo" :src="'/images/pokemon-logo.svg'" />
        </NuxtLink>
        <div class="flex align-center gap-5">
            <NuxtLink to="/" class="is-text-navigation is-color-white text-decoration-none">
                Home
            </NuxtLink>
            <div class="flex align-center gap-2">
                <p class="is-text-navigation is-color-white">Shiny mode:</p>
                <SharedSwitcher v-model="usePokemon.shinyModeActive" />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    const usePokemon = usePokemonStore();
</script>

<style scoped lang="scss">
    .logo {
        width: 80px;
        height: auto;
    }
</style>
