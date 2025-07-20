<template>
    <div>
        {{ result.data }}
    </div>
</template>

<script setup lang="ts">
    import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';

    const offset = ref(0);

    const result = useFetch(
        `/api/pokemon/pokemon-list?limit=${PokemonPaginationVariables.PokemonPerPage}&offset=${offset.value}`
    );
</script>
