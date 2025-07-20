<template>
    <article class="flex pokemon-card p-4">
        <NuxtImg
            :src="pokemon.sprites.front_default"
            placeholder
            loading="lazy"
            quality="80"
            :alt="`Pokemon ${pokemon.name} image`"
        />
        <div class="pokemon-card-data">
            <h3 class="is-text-navigation capitalize">{{ pokemon.name }}</h3>
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
        background-color: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: $border-radius-base;
        color: #333;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);

        img {
            flex: 0 0 33%;
        }

        &-container {
            flex: 0 0 auto;
        }
    }
</style>
