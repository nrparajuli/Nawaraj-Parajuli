
export class ClientError extends Error {

    // The ignore can be removed once we've upgraded to ES6
    /* istanbul ignore next */
    public constructor(
        public readonly code: number,
        public readonly responseText: string
    ) {
        super(`Unable to execute request. (code=${code}, text=${responseText})`);
    }
}
