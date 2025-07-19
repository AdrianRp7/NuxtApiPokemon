import PokemonPaginationVariables from '~/data/PokemonPaginationVariables';
import type { ResponsePokemonList } from '~/interface/ResponsePokemonList';
import type { FetchError } from 'ofetch';

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
            return data;
        } catch (e: unknown) {
            const error: FetchError = e as FetchError;
            if (error.response) {
                const errorMessage = error.response.statusText;
                const errorCode = error.response.status;

                const objectError = {
                    type: 'ERROR',
                    response: `The api returns an error with code ${errorCode} and message: ${errorMessage}`
                };

                return objectError;
            }

            return {
                type: 'ERROR',
                response: 'Hubo un error desconocido'
            };
        }
    },
    {
        maxAge: 60 * 60,
        staleMaxAge: 60 * 60 * 2
    }
);
