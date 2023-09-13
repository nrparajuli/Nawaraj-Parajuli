
import * as PromiseUtil from './PromiseUtil';

export interface IThrottleAsyncOptions {
    /** An error callback, invoked whenever the provided function fails. */
    onError: (err: any) => void;
    /** How long to wait after an invocation before the function can be invoked again. */
    wait?: number;
}

/**
 * An async throttler that will ensure that only one instance of the async function is in flight at one time, as well as
 * optionally throttling how often the async function can run, taking into consideration the response time of the
 * function.
 *
 * @param f The function to run
 * @param options The invokation options
 * @returns A function whose execution will be throttled according to the options
 */
export function throttleAsync(
    f: () => Promise<void>,
    { onError, wait = 0 }: IThrottleAsyncOptions
): () => void {
    let canRunNow = true;
    let shouldRunAgain = false;

    const run = () => {
        if (!canRunNow) {
            shouldRunAgain = true;
        } else {
            canRunNow = false;
            const p = f().catch(onError);
            void p
                .then(() => PromiseUtil.wait(wait))
                .then(() => {
                    canRunNow = true;
                    if (shouldRunAgain) {
                        shouldRunAgain = false;
                        run();
                    }
                });
        }
    };

    return run;
}
