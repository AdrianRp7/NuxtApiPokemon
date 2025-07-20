<template>
    <section aria-label="List of pokemon section" class="grid-pokemon w-100">
        <template v-for="pokemon in pokemonList" :key="pokemon.name">
            <PokemonCard v-if="pokemon.pokemonData" :pokemon="pokemon.pokemonData" />
        </template>
        <template v-if="errorMessage !== ''">
            <h3 class="is-text-h3 text-center capitalize">{{ errorMessage }}</h3>
        </template>
    </section>
</template>

<script setup lang="ts">
    import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';
    import type { PokemonNameUrl, ResponsePokemonList } from '~/interface/ResponsePokemonList';
    import { typeResponseString, type ResponseServer } from '~/interface/ResponseServer';

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
    const runConf = useRuntimeConfig();
    const pokemonList = ref<PokemonNameUrl[]>([]);
    const route = useRoute();
    const page: number = Number(route.params.page);
    const offset = ref((page - 1) * PokemonPaginationVariables.PokemonPerPage);
    const errorMessage = ref('');

    const { error, data } = await useFetch<ResponseServer<ResponsePokemonList | string>>(
        `/api/pokemon/pokemon-list?limit=${PokemonPaginationVariables.PokemonPerPage}&offset=${offset.value}`
    );

    //Error controls
    if (error.value && error.value.message) {
        errorMessage.value = error.value.message;
    }

    if (!data.value) {
        errorMessage.value = 'No data for this parameters';
    }

    if (
        data.value &&
        data.value.type === typeResponseString.ERROR &&
        typeof data.value.response === 'string'
    ) {
        errorMessage.value = data.value.response;
    }

    //Logic
    if (errorMessage.value === '' && data.value && typeof data.value.response !== 'string') {
        const links = [{ rel: 'canonical', href: runConf.public.front_url + route.fullPath }];

        if (data?.value?.response.next)
            links.push({
                rel: 'next',
                href: `${runConf.public.front_url}/pokemon/page/${page + 1}`
            });
        if (data?.value?.response.previous)
            links.push({
                rel: 'prev',
                href: `${runConf.public.front_url}/pokemon/page/${page - 1}`
            });

        if (data.value) pokemonList.value = data.value.response.results;

        useHead({
            title: `Pokemon - Page ${page}`,
            link: links
        });
    }
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
