import type { FetchError } from 'ofetch';
import { typeResponseString, type ResponseServer } from '~/interface/ResponseServer';

export function useFetchErrorControl<T>(
    data: Ref<ResponseServer<T> | null>,
    error: Ref<FetchError | null>
) {
    const errorMessage = ref('');

    //Error controls
    if (error.value && error.value.message) {
        errorMessage.value = error.value.message;
    }

    if (!data.value) {
        errorMessage.value = 'No data for this parameters';
    }

    if (
        data.value &&
        data.value.type === typeResponseString.ERROR &&
        typeof data.value.response === 'string'
    ) {
        errorMessage.value = data.value.response;
    }

    return { errorMessage };
}
