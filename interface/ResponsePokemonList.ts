export interface ResponsePokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    result: PokemonNameUrl[];
}

export interface PokemonNameUrl {
    name: string;
    url: string;
}
