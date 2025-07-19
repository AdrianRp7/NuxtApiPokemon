<template>
    <div>
        {{ result.data }}
    </div>
</template>

<script setup lang="ts">
    import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';
    definePageMeta({
        validate: async route => {
            //Check if the page param is a number
            return (
                !Array.isArray(route.params.page) &&
                typeof route.params.page === 'string' &&
                !isNaN(Number(route.params.page))
            );
        }
    });

    const route = useRoute();
    const page: number = Number(route.params.page);

    const offset = ref((page - 1) * PokemonPaginationVariables.PokemonPerPage);

    const result = useFetch(
        `/api/pokemon/pokemon-list?limit=${PokemonPaginationVariables.PokemonPerPage}&offset=${offset.value}`
    );
</script>
