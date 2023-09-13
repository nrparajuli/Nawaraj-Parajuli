
export const PUNCTUATION_REGEX = /[\s!@#$%^&*\(\)_+=-\[\]\{\};':"<>\?,\\.\/-]/g;
const URL_REGEX = /^[a-zA-Z]{1,6}:[/\\][a-zA-Z0-9\-\._~:\\/?#\[\]@!$&'\(\)\*\+,;=% ]*$/g;
const FILENAME_REGEX = /^.*\.[a-zA-Z]{3,4}$/g;

const fragmentPlaceholder = '::ally::';
const fragmentMatcher = new RegExp(fragmentPlaceholder, 'g');
const parameterSplit = '&#';

export interface IFragments {
    'preFragment': string;
    'fragment'?: string;
}

export interface IFragmentsParsingError {
    'error': string;
}

export function isFragment(maybeFragment: IFragments | IFragmentsParsingError): maybeFragment is IFragments {
    return (maybeFragment as IFragments).preFragment !== undefined;
}

const USER_UPDATED_ATTRIBUTE = 'data-ally-user-updated-';

export class StringUtil {

    public static getAttributeMap(src: string): Map<string, string> {
        const fragment = StringUtil.splitFragment(src);
        if (isFragment(fragment) && (fragment.fragment?.includes(USER_UPDATED_ATTRIBUTE) ?? false)) {
            const attributes = fragment.fragment?.split('&amp;') ?? [];
            return new Map<string, string>(attributes
                .filter((e) => e.includes(USER_UPDATED_ATTRIBUTE))
                .map((attrs) => {
                    const parts = attrs.split('=');
                    const attrName = parts[0].replace(USER_UPDATED_ATTRIBUTE, '');
                    const attrValue = parts.length > 1 ? decodeURIComponent(parts[1]) : '';
                    return [attrName, attrValue];
                }));
        } else {
            return new Map<string, string>();
        }
    }

    /**
     * Splits an attribute encoded url into a pre-fragment and optional fragment.
     *
     * This guards against # symbols that are part of attribute encoding.
     *
     * For example
     * {{{foo&#123.jpg#the_fragment}}}
     * is split into
     * {{{(foo&#123.jpg, Some(the_fragment))}}}
     */
    public static splitFragment(attrEncodedStr: string): IFragments | IFragmentsParsingError {
        const fragments = attrEncodedStr
          .split(parameterSplit)
          .join(fragmentPlaceholder)
          .split(/#/)
          .map((s) => s.replace(fragmentMatcher, parameterSplit));
        if (fragments.length === 1) {
            return {
                'preFragment': fragments[0]
            };
        } else if (fragments.length === 2) {
            return {
                'fragment': fragments[1],
                'preFragment': fragments[0]
            };
        } else {
            return {
                'error': 'Could not parse fragment'
            };
        }
    }

    public static isDefaultDescription(description: string, fileName?: string): boolean {
        const descriptionNormalized = this.normalizeFileName(description).trim();
        const fileNameNormalized = this.normalizeFileName(fileName ?? '').trim();
        const fileBaseNameNormalized = this.normalizeFileName(this.baseName(this.sanitize(fileName ?? ''))).trim();

        return descriptionNormalized.length === 0 ||
            this.isUrlToFile(description) || this.isFileName(description) ||
            fileNameNormalized === descriptionNormalized ||
            fileBaseNameNormalized === descriptionNormalized;
    }

    public static normalizeFileName(text: string): string {
        return this.sanitize(text.trim().toLowerCase()).replace(PUNCTUATION_REGEX, '');
    }

    public static sanitize(str: string): string {
        return str.replace(/\u0000/g, '').replace(/\uFEFF/g, '');
    }

    public static basePath(path: string): string {
        return path.substr(
          Math.max(
            path.lastIndexOf('\\'),
            path.lastIndexOf('/'),
          ) + 1,
        );
    }

    public static baseName(fileName: string): string {
        const base = this.basePath(fileName);
        const index = base.lastIndexOf('.');
        if (index === -1) {
            return base;
        } else {
            return base.substring(0, index);
        }
    }

    public static isUrlToFile(input: string): boolean {
        return input.trim().match(URL_REGEX) !== null;
    }

    public static isFileName(input: string): boolean {
        return input.trim().match(FILENAME_REGEX) !== null;
    }

}
