<template>
    <article>
        <img src="" alt="" />
        <div>
            <h3>{{ pokemon.name }}</h3>
            <p>Types</p>
            <div class="flex">
                <SharedChip
                    v-for="type in pokemonTypes"
                    :key="pokemon.name + type"
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
