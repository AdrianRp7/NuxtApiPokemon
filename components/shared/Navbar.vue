<template>
    <header class="flex justify-content-between align-center p-4 is-bg-color-main">
        <NuxtLink to="/">
            <img class="logo" :src="'/images/pokemon-logo.svg'" />
        </NuxtLink>
        <div class="flex">
            <NuxtLink to="/" class="is-text-navigation is-color-white">Home</NuxtLink>
        </div>
    </header>
</template>

<style scoped lang="scss">
    .logo {
        width: 80px;
        height: auto;
    }
</style>
