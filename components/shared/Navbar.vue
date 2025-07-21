<template>
    <header class="flex justify-content-between align-center p-4 is-bg-color-main">
        <NuxtLink to="/">
            <img class="logo" :src="'/images/pokemon-logo.svg'" />
        </NuxtLink>
        <div class="flex align-center gap-3">
            <NuxtLink to="/" class="is-text-navigation is-color-white text-decoration-none">
                Home
            </NuxtLink>
            <SharedSwitcher v-model="usePokemon.shinyModeActive" />
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
