
/** Polyfill `URLSearchParams` for IE11 */
import '@ungap/url-search-params';

export class UrlUtil {

    /**
     * Get a single value of a query string parameter.
     *
     * @param search Search string from which to extract params. E.g., `window.location.search`
     * @param key The key of the query string parameter to get
     */
    public static getQueryStringParam(search: string, key: string): string | null {
        const qs = new URLSearchParams(search);
        return qs.get(key);
    }
}
