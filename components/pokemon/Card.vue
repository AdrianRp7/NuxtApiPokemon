<template>
    <article class="flex pokemon-card button-default p-4">
        <NuxtImg
            :src="pokemon.sprites.front_default"
            placeholder
            loading="lazy"
            quality="80"
            :alt="`Pokemon ${pokemon.name} image`"
        />
        <div class="pokemon-card-data flex flex-col justify-content-between">
            <h3 class="is-text-navigation capitalize">{{ pokemon.name }}</h3>
            <div>
                <p class="is-text-regular">Types:</p>
                <div class="flex gap-1">
                    <SharedChip
                        v-for="type in pokemonTypes"
                        :key="pokemon.name + type"
                        class="is-color-white is-text-regular capitalize"
                        :bgcolor="PokemonsColors[type]"
                    >
                        {{ type }}
                    </SharedChip>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
    import type { PokemonInterface } from '~/interface/PokemonInterface';
    import PokemonsColors from '~/data/PokemonColors';
    import type { PokemonType } from '~/types/PokemonTypes';

    interface Props {
        pokemon: PokemonInterface;
    }

    const { pokemon } = defineProps<Props>();

    const pokemonTypes: PokemonType[] = pokemon.types.map(element => {
        return element.type.name;
    });
</script>

<style scoped lang="scss">
    .pokemon-card {
        gap: 10px;
        border-radius: $border-radius-base;
        cursor: pointer;
        img {
            flex: 0 0 33%;
        }

        &-container {
            flex: 0 0 auto;
        }
    }
</style>
