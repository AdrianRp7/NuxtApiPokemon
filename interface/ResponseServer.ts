export const typeResponseString = {
    ERROR: 'ERROR',
    OK: 'OK'
} as const;

type typeResponse = (typeof typeResponseString)[keyof typeof typeResponseString];

export interface ResponseServer<T> {
    type: typeResponse;
    response: T;
}
