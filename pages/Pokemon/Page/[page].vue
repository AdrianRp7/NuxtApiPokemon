<template>
    <section aria-label="List of pokemon section" class="grid-pokemon w-100">
        <template v-for="pokemon in pokemonList" :key="pokemon.name">
            <PokemonCard v-if="pokemon.pokemonData" :pokemon="pokemon.pokemonData" />
        </template>
    </section>
</template>

<script setup lang="ts">
    import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';
    import type { PokemonNameUrl, ResponsePokemonList } from '~/interface/ResponsePokemonList';

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

    const { error, data } = useFetch<ResponsePokemonList>(
        `/api/pokemon/pokemon-list?limit=${PokemonPaginationVariables.PokemonPerPage}&offset=${offset.value}`
    );

    const links = [{ rel: 'canonical', href: route.fullPath }];

    if (data?.value?.next) links.push({ rel: 'next', href: data.value.next });
    if (data?.value?.previous) links.push({ rel: 'prev', href: data.value.previous });

    const pokemonList = ref<PokemonNameUrl[]>([]);

    if (data.value) pokemonList.value = data.value.results;

    useHead({
        title: `Pokemon - Page ${page}`,
        link: links
    });
</script>

<style scoped lang="scss">
    .grid-pokemon {
        display: grid;
        gap: 15px;

        grid-template-columns: repeat(1, 1fr);

        @include tablet {
            grid-template-columns: repeat(2, 1fr);
        }

        @include desktop {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
