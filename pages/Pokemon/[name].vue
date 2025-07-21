<template>
    <section aria-label="Pokemon information section" class="w-100 text-center">
        <div v-if="pokemon" class="flex flex-col gap-2">
            <section aria-label="name and photo pokemon" class="flex flex-col">
                <h1 class="is-text-h3 text-center capitalize title">{{ pokemonName }}</h1>
                <div class="text-center">
                    <NuxtImg fit="cover" class="mx-auto" :src="pokemonImage" />
                </div>
            </section>
            <section
                class="mx-auto flex justify-content-center button-default section-basic-information p-5 gap-5"
                aria-label="pokemon basic information"
            >
                <div class="flex flex-col justify-between w-100">
                    <p class="text-left is-text-regular text-semibold">
                        Height:
                        <span class="text-regular">{{ pokemon.height }} dm</span>
                    </p>
                    <p class="text-left is-text-regular text-semibold">
                        Weidth:
                        <span class="text-regular">{{ pokemon.weight }} hg</span>
                    </p>
                </div>
                <div class="flex flex-col justify-between w-100">
                    <p class="is-text-regular text-semibold text-center">Types</p>
                    <div class="flex justify-content-center">
                        <PokemonTypeChips :pokemon="pokemon" />
                    </div>
                </div>
            </section>
            <section
                class="mx-auto section-stats-information flex p-5 gap-5"
                aria-label="pokemon stats information"
            >
                <p
                    v-for="pokStat in pokemon.stats"
                    :key="pokStat.stat.name"
                    class="is-text-regular text-semibold capitalize"
                >
                    {{ pokStat.stat.name }}:
                    <span class="text-regular">{{ pokStat.base_stat }}</span>
                </p>
            </section>
        </div>
    </section>
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
    const usePokemon = usePokemonStore();
    const pokemonImage = computed(() => {
        const imageReturn: 'front_shiny' | 'front_default' = usePokemon.shinyModeActive
            ? 'front_shiny'
            : 'front_default';
        return pokemon.value?.sprites.animated?.[imageReturn]
            ? pokemon.value?.sprites.animated?.[imageReturn]
            : pokemon.value?.sprites.versions?.['generation-v']['black-white'].animated?.[
                    imageReturn
                ]
              ? pokemon.value?.sprites.versions?.['generation-v']['black-white'].animated?.[
                    imageReturn
                ]
              : pokemon.value?.sprites?.[imageReturn];
    });

    const { error, data } = await useFetch<ResponseServer<PokemonInterface | string>>(
        `/api/pokemon/getPokemon?pokemon=${pokemonName.value}`,
        {
            watch: [pokemonName],
            server: true
        }
    );

    const { errorMessage } = useFetchErrorControl<PokemonInterface | string>(data, error);

    // const { shinyModeActive } = usePokemonStore();

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
    @use 'sass:map';
    img {
        height: auto;
        width: 80px;
    }

    body .section-basic-information,
    body .section-stats-information {
        border-radius: $border-radius-base;
        // max-width: fit-content;
        width: 90%;
        @include tablet {
            width: 400px;
        }
        @include desktop {
            width: 400px;
        }
    }
    body .section-basic-information {
        background-color: map.get($colors, 'accent');
    }
    body .section-stats-information {
        background-color: map.get($colors, 'accent-pikachu');
        flex-wrap: wrap;
        p {
            flex: 0 0 calc(50% - map.get($margins, '5'));
            text-align: left;
        }
    }
</style>
