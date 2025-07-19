<template>
    <div>
        <h1 class="is-color-main">Hola Mundo</h1>
        {{ result.data }}
    </div>
</template>

<script setup lang="ts">
    import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';

    const offset = ref(0);

    const result = useFetch(
        `/api/pokemon/pokemon-list?limit=${PokemonPaginationVariables.PokemonPerPage}&offset=${offset.value}`
    );

    console.log(result.data);
</script>
