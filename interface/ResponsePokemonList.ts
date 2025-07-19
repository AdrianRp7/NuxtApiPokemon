import type { PokemonInterface } from './PokemonInterface';

export interface ResponsePokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonNameUrl[];
}

export interface PokemonNameUrl {
    name: string;
    url: string;
    pokemonData?: PokemonInterface;
}
