
/** Determine if `v` has a value (i.e., is not null or undefined). */
export function hasValue<V>(v: V | null | undefined): v is V {
    return (v !== null && v !== undefined);
}

/** Assert the given value is not null or undefined, throwing an error if it is. */
export function assertValue<V>(v: V | null | undefined, errorMessage: string = 'Failed value assertion'): V {
    if (hasValue(v)) {
        return v;
    } else {
        throw new Error(errorMessage);
    }
}

/**
 * Return the provided value `maybeV` if it is not `null` or `undefined`, otherwise return value `d`. This is indented
 * to supplement the pattern `maybeV || d` without falling victim to false-y values in types such as `0` and `''`.
 */
export function orElse<V>(maybeV: V | null | undefined, d: V): V {
    if (hasValue(maybeV)) {
        return maybeV;
    } else {
        return d;
    }
}

/**
 * Scanning from beginning to end of the specified array, return the first value (i.e., not null or undefined), and if
 * no values result, return `null`. This can be thought of as a lazy or syntax such as `v0 || v1 || v2` where the first
 * proper value will be the result.
 *
 * @param maybeVs The collection of potential lazy values
 */
export function firstOrNull<V>(...maybeVs: Array<() => V | null | undefined>): V | null {
    for (const maybeVFn of maybeVs) {
        const maybeV = maybeVFn();
        if (hasValue(maybeV)) {
            return maybeV;
        }
    }
    return null;
}

/** Return the provided value `maybeV` if it has a value, otherwise return `null`. */
export function orNull<V>(maybeV: V | null | undefined): V | null {
    if (hasValue(maybeV)) {
        return maybeV;
    } else {
        return null;
    }
}

/** Use the `maybeV` if it has a value as an argument to `f` and return the result. Returns `null` if value-less */
export function whenHasValue<V, R>(maybeV: V | null | undefined, f: (v: V) => R): R | null {
    if (hasValue(maybeV)) {
        return f(maybeV);
    }

    return null;
}
