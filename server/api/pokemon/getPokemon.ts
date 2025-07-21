import type { FetchError } from 'ofetch';
import type { PokemonInterface } from '~/interface/PokemonInterface';
import type { ResponseServer } from '~/interface/ResponseServer';
import { typeResponseString } from '~/interface/ResponseServer';

export default defineCachedEventHandler(
    async e => {
        try {
            const query = getQuery(e);
            const pokemon = query.pokemon;
            const { api_url_pokemon } = useRuntimeConfig(e);

            const data = await $fetch<PokemonInterface>(`${api_url_pokemon}/pokemon/${pokemon}`);

            const result: ResponseServer<PokemonInterface> = {
                type: typeResponseString.OK,
                response: data
            };

            return result;
        } catch (e: unknown) {
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
