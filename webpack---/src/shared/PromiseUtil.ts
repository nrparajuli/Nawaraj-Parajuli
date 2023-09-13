
import * as NullUtil from './NullUtil';

/** Resolve a promise only when the specified function returns a value. */
export async function when<T>(f: () => Promise<T | null | undefined>, ms: number): Promise<T> {
    const t = await f();
    if (NullUtil.hasValue(t)) {
        return t;
    } else {
        await wait(ms);
        return when(f, ms);
    }
}

/** Resolve a promise only when the specified function returns a true. */
export async function waitUntil<T>(
    f: () => Promise<boolean>,
     ms: number,
     retries: number = 10,
     correlationId: string | undefined = ''
): Promise<boolean> {
    const t = await f().catch((e) => {
        console.warn('Failed to retrieve the condition', e);
        return undefined;
    });

    if (t === true) {
        return t;
    } else if (retries <= 0) {
        console.warn(`Failed promise at ${correlationId}!`);
        return Promise.reject('Failed to satisfy condition.');
    } else {
        await wait(ms);
        return waitUntil(f, ms, retries - 1, correlationId);
    }
}

/** Resolve a promise after the specified number of milliseconds. */
export async function wait(ms: number): Promise<void> {
    return await new Promise((accept) => setTimeout(accept, ms));
}
