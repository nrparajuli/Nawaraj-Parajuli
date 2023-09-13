
/** Enumerates different reasons in which we could decide not to annotate a schoology webpage. */
export enum SchoologyAnnotatorError {
    /** A `window.allyConfig` object was not available in the global scope. */
    NoConfigObjectAvailable,
    /** The script tag didn't have a `platform-name=schoology` query string param. */
    NotAschoologyPlatform,
    /** Unsupported page type. */
    NotASupportedPageType,
    /** The Ally Client ID is missing. Has it been added as a custom LTI parameter? */
    MissingAllyClientId
}
