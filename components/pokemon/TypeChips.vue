<template>
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
