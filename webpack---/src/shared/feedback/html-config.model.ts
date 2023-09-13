
import {LmsType} from 'src/shared/lms-type.model';

export interface IHtmlConfig {
    headingStart: number;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
}

const DEFAULT_HTML_CONFIG: IHtmlConfig = {
    'backgroundColor': 'ffffff',
    'fontSize': 12,
    'headingStart': 1,
    'textColor': '000000',
};

export const DEFAULT_COLOR = 'default';
export const FONT_WEIGHT_BOLD = 'bold';

/**
 * Gets the default HTML configuration for the given LMS type.
 *
 * @param lmsType  The LMS type
 */
export function getHtmlConfig(lmsType: LmsType): IHtmlConfig {
    switch (lmsType) {
        case LmsType.Canvas:
            return {...DEFAULT_HTML_CONFIG, 'headingStart': 2};
        case LmsType.Moodle:
            return {...DEFAULT_HTML_CONFIG, 'headingStart': 3};
        case LmsType.Learn:
            return {...DEFAULT_HTML_CONFIG, 'headingStart': 4};
        default:
            return DEFAULT_HTML_CONFIG;
    }
}
