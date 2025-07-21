<template>
    <div class="overlay flex flex-col justify-content-center align-center">
        <NuxtImg src="images/pikachu-loading.gif" />
        <p class="is-text-h3 is-color-white title">Loading</p>
    </div>
</template>

<style scoped lang="scss">
    img {
        width: 150px;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100dvh;
        width: 100dvw;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 2;
    }
</style>
