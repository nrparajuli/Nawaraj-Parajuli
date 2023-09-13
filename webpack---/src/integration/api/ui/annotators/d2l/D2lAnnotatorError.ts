
/** Enumerates different reasons in which we could decide not to annotate a D2l webpage. */
export enum D2lAnnotatorError {
    /** We didn't annotate the page because a `window.allyConfig` object was not available in the global scope. */
    NoConfigObjectAvailable,
    /** We didn't annotate the page because the script tag didn't have a `platform-name=d2l` query string param. */
    NotAD2lPlatform,
    /** We didn't annotate the page because we don't support this particular page type. */
    NotASupportedPageType
}
