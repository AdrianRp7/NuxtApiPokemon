import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';
import type { PokemonNameUrl, ResponsePokemonList } from '~/interface/ResponsePokemonList';
import type { FetchError } from 'ofetch';
import type { PokemonInterface } from '~/interface/PokemonInterface';
import { typeResponseString } from '~/interface/ResponseServer';

export default defineCachedEventHandler(
    async e => {
        try {
            const query = getQuery(e);
            const limit =
                parseInt(query.limit as string) || PokemonPaginationVariables.PokemonPerPage;
            const offset = parseInt(query.offset as string) || 0;
            const { api_url_pokemon } = useRuntimeConfig(e);

            const data = await $fetch<ResponsePokemonList>(
                `${api_url_pokemon}/pokemon?limit=${limit}&offset=${offset}`
            );

            const resultsPokemonPromises = await Promise.allSettled(
                data.results.map(async (pokemon): Promise<PokemonNameUrl> => {
                    pokemon.pokemonData = await $fetch<PokemonInterface>(pokemon.url);
                    return pokemon;
                })
            );

            //Returns all promises without failure, if one pokemon fails we continue with the rest of Pokemons
            data.results = resultsPokemonPromises
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);

            return {
                type: typeResponseString.OK,
                response: data
            };
        } catch (e: unknown) {
            console.log(e);
            const error: FetchError = e as FetchError;
            if (error.response) {
                const errorMessage = error.response.statusText;
                const errorCode = error.response.status;

                const objectError = {
                    type: typeResponseString.ERROR,
                    response: `The api returns an error with code ${errorCode} and message: ${errorMessage}`
                };

                return objectError;
            }

            return {
                type: typeResponseString.ERROR,
                response: 'Hubo un error desconocido'
            };
        }
    },
    {
        maxAge: 60 * 60,
        staleMaxAge: 60 * 60 * 2
    }
);
