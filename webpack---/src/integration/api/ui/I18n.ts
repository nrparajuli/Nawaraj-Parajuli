
export class I18n {

    public static allI18n = require('!!amdi18n-loader!src/integration/nls/integration');

    /**
     * Resolve the language for a given locale for which there's i18n support
     *
     * @param  locale    The locale to find the best matching language bundle for
     * @return           The best matching language bundle
     */
    public static resolveSupportedLanguage(locale: string): string {
        if (this.hasAllyLanguageSupport(locale)) {
            return locale;
        } else if (locale.indexOf('-') !== -1) {
            return this.resolveSupportedLanguage(locale.split('-').slice(0, -1).join('-'));
        } else {
            return locale;
        }
    }

    /**
     * Whether the given locale has i18n support
     *
     * @param  locale    The locale to check
     * @return           Whether Ally supports the given locale
     */
    public static hasAllyLanguageSupport(locale: string): boolean {
        return this.allI18n[`__${locale}`];
    }
}
