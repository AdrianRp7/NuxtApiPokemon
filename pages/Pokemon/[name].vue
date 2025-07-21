<template>
    <div>
        <section aria-label="Pokemon information section" class="grid-pokemon w-100">
            <template v-if="pokemon">
                <div class="text-center">
                    <NuxtImg class="mx-auto" :src="pokemonImage" />
                </div>
                <h1 class="is-text-h3 text-center capitalize">{{ pokemonName }}</h1>
                <p>Height: {{ pokemon.height }}</p>
                <p>Weidth: {{ pokemon.weight }}</p>
                <p>Stats: {{ pokemon.stats }}</p>
                <div>
                    <p class="is-text-regular">Types:</p>
                    <PokemonTypeChips :pokemon="pokemon" />
                </div>
            </template>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { useFetchErrorControl } from '~/composable/UseFetchErrorControl';
    import type { PokemonInterface } from '~/interface/PokemonInterface';
    import type { ResponseServer } from '~/interface/ResponseServer';
    import type { PokemonType } from '~/types/PokemonTypes';

    definePageMeta({
        validate: async route => {
            //Check if the page param is a number
            return typeof route.params.name === 'string' && isNaN(Number(route.params.name));
        }
    });
    const runConf = useRuntimeConfig();
    const route = useRoute();
    const pokemonName = computed(() => route.params.name);
    const pokemon = ref<PokemonInterface | null>(null);
    const pokemonTypes = ref<PokemonType[]>([]);
    const pokemonImage = computed(() => {
        return pokemon.value?.sprites.animated?.front_default
            ? pokemon.value?.sprites.animated?.front_default
            : pokemon.value?.sprites.front_default;
    });

    const { error, data } = await useFetch<ResponseServer<PokemonInterface | string>>(
        `/api/pokemon/getPokemon?pokemon=${pokemonName.value}`,
        {
            watch: [pokemonName],
            server: true
        }
    );

    const { errorMessage } = useFetchErrorControl<PokemonInterface | string>(data, error);

    //Logic
    if (errorMessage.value === '' && data.value && typeof data.value.response !== 'string') {
        const links = [{ rel: 'canonical', href: runConf.public.front_url + route.fullPath }];
        pokemon.value = data.value.response;

        pokemonTypes.value = pokemon.value.types.map(element => {
            return element.type.name;
        });

        useHead({
            title: `Pokemon - ${pokemonName.value}`,
            link: links
        });
    }
</script>

<style scoped lang="scss">
    img {
        height: auto;
        width: 150px;
    }
</style>
