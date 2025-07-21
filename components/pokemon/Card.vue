<template>
    <nuxt-link
        class="text-decoration-none"
        :to="{ name: 'pokemon-name', params: { name: pokemon.name } }"
    >
        <article class="flex pokemon-card button-default p-4">
            <NuxtImg
                :src="pokemonImage"
                placeholder
                fit="cover"
                loading="lazy"
                quality="80"
                :alt="`Pokemon ${pokemon.name} image`"
            />
            <div class="pokemon-card-data flex flex-col justify-content-between">
                <h3 class="is-text-navigation capitalize title">{{ pokemon.name }}</h3>
                <div>
                    <p class="is-text-regular">Types:</p>
                    <PokemonTypeChips :pokemon="pokemon" />
                </div>
            </div>
        </article>
    </nuxt-link>
</template>

<script setup lang="ts">
    import type { PokemonInterface } from '~/interface/PokemonInterface';

    interface Props {
        pokemon: PokemonInterface;
    }

    const { pokemon } = defineProps<Props>();

    const usePokemon = usePokemonStore();

    const pokemonImage = computed(() => {
        return usePokemon.shinyModeActive
            ? pokemon.sprites.front_shiny
            : pokemon.sprites.front_default;
    });
</script>

<style scoped lang="scss">
    .pokemon-card {
        gap: 10px;
        border-radius: $border-radius-base;
        cursor: pointer;
        img {
            flex: 0 0 33%;
            max-width: 33%;
            object-fit: contain;
        }

        &-container {
            flex: 0 0 auto;
        }
    }
</style>
