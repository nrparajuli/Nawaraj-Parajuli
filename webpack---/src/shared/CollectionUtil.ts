
import * as NullUtil from './NullUtil';

export type SortKey<V> = (v: V) => any;

export const enum SortDirection {
    asc = 1,
    desc = -1
}

export function collect<I, C>(items: I[], f: (item: I) => C | undefined): C[] {
    return compact(items.map(f));
}

/**
 * Perform a stable sort on an array of items with a number of sort keys.
 *
 * @param items The items to sort
 * @param sorts A set of sort descriptors, each providing first a function that derives a value to sort by, and a sort
 *              direction that will control ascending or descending sort order. The result of the `SortKey` function
 *              will be compared with items using native `<` and `>`
 */
export function stableSort<V>(items: V[], sorts: Array<[SortKey<V>, SortDirection]>): void {
    items.sort((a, b) => {
        for (const [key, dir] of sorts) {
            const aV = key(a);
            const bV = key(b);
            if (aV > bV) {
                return 1 * dir;
            } else if (aV < bV) {
                return -1 * dir;
            }
        }
        return 0;
    });
}

/**
 * Unzip an object into 2 separate arrays of its keys, and its values, respectively.
 *
 * Examples:
 *
 * ```
 * $ unzipObject({'a': 1, 'b': 2, 'c': 3})
 * > [['a', 'b', 'c'], [1, 2, 3]]
 * ```
 *
 * ```
 * $ unzipObject({})
 * > [[], []]
 * ```
 *
 * @param obj   The object whose keys and values to unzip
 * @return      A tuple of arrays, where the first is the array of keys, and the second is the array of values
 */
export function unzipObject<V>(obj: {[keys: string]: V}): [string[], V[]] {
    const ks: string[] = [];
    const vs: V[] = [];
    Object.keys(obj).forEach((k) => {
        ks.push(k);
        vs.push(obj[k]);
    });
    return [ks, vs];
}

/**
 * Zip an array of strings and values into key-value pairs and assembled as an object. Each `n`th item of the keys array
 * will be paired with each `n`th item of the values array. If there are any duplicate keys, the last key will "win".
 *
 * Examples:
 *
 * ```
 * $ zipObject(['a', 'b', 'c'], [1, 2, 3])
 * > {'a': 1, 'b': 2, 'c': 3}
 * ```
 *
 * ```
 * $ zipObject(['a', 'b', 'a'], [1, 2, 3])
 * > {'b': 2, 'a': 3}
 * ```
 *
 * ```
 * $ zipObject([], [])
 * > {}
 * ```
 *
 * @param ks The object keys to zip
 * @param values The object values to zip
 * @return The object assembled from key-value pairs of the provided arrays
 */
export function zipObject<V>(ks: string[], vs: V[]): {[ks: string]: V} {
    const result: {[ks: string]: V} = {};
    ks.forEach((k, i) => {
        result[k] = vs[i];
    });
    return result;
}

/**
 * Create an object from a set of key, value pairs
 *
 * @param  pairs     The key value pairs to create an object from
 * @return           The created object
 */
export function fromPairs<V>(pairs: Array<[string, V]>): {[key: string]: V} {
    const obj: {[key: string]: V} = {};
    pairs.forEach(([key, value]) => obj[key] = value);
    return obj;
}

/**
 * Map the values of an object to a new value
 *
 * @param  obj      The object whose values to map to another value
 * @param  mapper   The function that maps the input value to a new value V
 * @return          An object with the same keys as `obj` but whose values have been transformed
 */
export function mapValues<V>(obj: {[key: string]: any}, mapper: (v: any) => V): {[key: string]: V} {
    const mappedObj: {[key: string]: V} = {};
    Object.keys(obj).forEach((k) => {
        mappedObj[k] = mapper(obj[k]);
    });
    return mappedObj;
}

/**
 * Get a collection of the values of this object.
 *
 * @param obj The object whose values to get
 * @return    The values of the object without the keys
 */
export function values<V>(obj: {[key: string]: V}): V[] {
    return Object.keys(obj).map((k) => obj[k]);
}

/**
 * Remove all `null` and `undefined` values from the collection, resulting in only the proper values. Note that this
 * does not remove false-y values such as empty string or `0`.
 *
 * @param maybeVs The collection of potentually `null` or `undefined` `v`s
 * @return All `v`s that were not `null` or `undefined`
 */
export function compact<V>(maybeVs: Array<V | null | undefined>): V[] {
    const vs: V[] = [];
    maybeVs.forEach((v) => {
        if (NullUtil.hasValue(v)) {
            vs.push(v);
        }
    });
    return vs;
}

/** Compact the values of the specified key-value pairings. */
export function compactValues<V>(maybeKvs: {[key: string]: V | null | undefined}): {[key: string]: V} {
    const obj: {[key: string]: V} = {};
    Object.keys(maybeKvs).forEach((k) => {
        const v = maybeKvs[k];
        if (NullUtil.hasValue(v)) {
            obj[k] = v;
        }
    });
    return obj;
}

/**
 * Retrieve the keys of a plain JSON object but typecasted to the given `K`.
 *
 * Equivalent to the `Object.keys()` method, but appeases the typescript compiler gods by retaining the key type.
 *
 * ```
 * enum LmsType {
 *   Canvas = 'Canvas',
 *   D2L = 'D2l',
 *   Learn = 'Learn',
 *   Moodle = 'Moodle'
 * }
 *
 * const data = {
 *   [LmsType.Canvas]: 3,
 *   [LmsType.Moodle]: 7
 * };
 *
 * // Returns [Canvas, Moodle], and has type LmsType[]
 * CollectionUtil.keys<LmsType>(data);
 * ```
 */
export function keys<K extends (string | number | symbol)>(obj: {[k in K]?: any}): K[] {
    return Object.keys(obj).map((k) => k as K);
}

/**
 * Find the first value for which the `predicateFunction` returns true. Returns `undefined` if no value matches or
 * the collection is empty.
 */
export function find<V>(coll: V[], predicate: (v: V) => boolean): V | undefined {
    for (const v of coll) {
        if (predicate(v)) {
            return v;
        }
    }

    return undefined;
}

/**
 * Creates a simple array of incrementing numbers. If the end is lower or equal than the start an empty array will be
 * returned.
 *
 * @param start The start of the range.
 * @param end The end of the range (exclusive).
 * @return Returns a new range array.
 */
export function range(start: number, end: number): number[] {
    if (end <= start) {
        return [];
    }

    const arr: number[] = [start];
    for (let i = start + 1; i < end; i++) {
        arr.push(i);
    }
    return arr;
}

/**
 * Returns the smallest value of an array assuming the values are comparable through the `<` operator.
 *
 * @param coll The collection to find the smallest value in
 * @return Returns the smallest value of the collection or `undefined` if the collection is empty
 */
export function min<V>(coll: V[]): V | undefined {
    let m;
    for (const v of coll) {
        if (m === undefined || v < m) {
            m = v;
        }
    }
    return m;
}

/**
 * Returns the largest value of an array assuming the values are comparable through the `>` operator.
 *
 * @param coll The collection to find the largest value in
 * @return Returns the largest value of the collection or `undefined` if the collection is empty
 */
export function max<V>(coll: V[]): V | undefined {
    let m;
    for (const v of coll) {
        if (m === undefined || v > m) {
            m = v;
        }
    }
    return m;
}

/**
 * Flattens an collection of collections into a single collection
 *
 * This can be used as an alternative to lodash's flatMap to avoid inflating the app
 *
 * @param coll The collection to find the largest value in
 */
export function flatten<V>(coll: V[][]): V[] {
    const acc: V[] = [];
    coll.forEach((items: V[]) => {
        for (const i of items) {
            acc.push(i);
        }
    });
    return acc;
}

/**
 * Coerce the given collection value into a guaranteed array. If the value is `undefined` or `null`, it will be the the
 * `noValue` value specified. If the value is an instance of the value type `V`, then it will be a single-element array
 * with that value. If the value is an array already, it will be returned itself.
 *
 * @param coll The possible collection
 * @param noValue What to return when there is no value
 */
export function asArray<V>(coll: undefined | null | V | V[], noValue: V[] = []): V[] {
    if (!NullUtil.hasValue(coll)) {
        return noValue;
    } else if (Array.isArray(coll)) {
        return coll;
    } else {
        return [coll];
    }
}

/**
 * Remove all duplicates from an array. The item identity the defines equality will be determined by the provided `by`
 * function.
 *
 * @param as The items to make unique
 * @param by The identity function for the items
 * @returns The collection of items in the same order, with the duplicates filtered out
 */
export function uniqBy<A>(as: A[], by: (a: A) => string): A[] {
    const uniq: Record<string, boolean> = {};
    return as.filter((a) => {
        const key = by(a);
        const isUniq = !uniq[key];
        uniq[key] = true;
        return isUniq;
    });
}
