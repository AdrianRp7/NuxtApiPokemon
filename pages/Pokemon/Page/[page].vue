<template>
    <section aria-label="List of pokemon section" class="w-100">
        <div v-if="errorMessage === ''" class="flex justify-content-center w-100 mt-5 mb-5">
            <SharedPaginator
                :name-nuxt-url="'pokemon-page-page'"
                :total-elements="totalPokemon"
                :actual-page="page"
                :elements-per-page="PokemonPaginationVariables.PokemonPerPage"
                @changed-page="showLoading = true"
            />
        </div>
        <div class="grid-pokemon w-100 mb-5">
            <template v-for="pokemon in pokemonList" :key="pokemon.name">
                <PokemonCard v-if="pokemon.pokemonData" :pokemon="pokemon.pokemonData" />
            </template>
            <template v-if="errorMessage !== ''">
                <h3 class="is-text-h3 text-center capitalize">{{ errorMessage }}</h3>
            </template>
        </div>
        <PokemonLoading v-if="showLoading" />
    </section>
</template>

<script setup lang="ts">
    import { useFetchErrorControl } from '~/composable/UseFetchErrorControl';
    import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';
    import type { PokemonNameUrl, ResponsePokemonList } from '~/interface/ResponsePokemonList';
    import type { ResponseServer } from '~/interface/ResponseServer';

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
    const totalPokemon = ref<number>(0);
    const route = useRoute();
    const page = computed(() => Number(route.params.page));
    const offset = computed(() => (page.value - 1) * PokemonPaginationVariables.PokemonPerPage);
    const showLoading = ref<boolean>(false);

    const { error, data } = await useFetch<ResponseServer<ResponsePokemonList | string>>(
        `/api/pokemon/pokemon-list?limit=${PokemonPaginationVariables.PokemonPerPage}&offset=${offset.value}`,
        {
            watch: [page],
            server: true
        }
    );

    const { errorMessage } = useFetchErrorControl<ResponsePokemonList | string>(data, error);

    //Logic
    if (errorMessage.value === '' && data.value && typeof data.value.response !== 'string') {
        const links = [{ rel: 'canonical', href: runConf.public.front_url + route.fullPath }];

        totalPokemon.value = data?.value?.response.count ?? 0;

        if (data?.value?.response.next)
            links.push({
                rel: 'next',
                href: `${runConf.public.front_url}/pokemon/page/${page.value + 1}`
            });
        if (data?.value?.response.previous)
            links.push({
                rel: 'prev',
                href: `${runConf.public.front_url}/pokemon/page/${page.value - 1}`
            });

        if (data.value) pokemonList.value = data.value.response.results;

        useHead({
            title: `Pokemon - Page ${page.value}`,
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
            grid-template-columns: repeat(4, 1fr);
        }
    }
</style>
