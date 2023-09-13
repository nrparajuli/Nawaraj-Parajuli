import {FONT_WEIGHT_BOLD, IHtmlConfig} from 'src/shared/feedback/html-config.model';
import {Color} from 'src/shared/feedback/results/contrast/Color';
import {hasValue} from 'src/shared/NullUtil';

export enum WcagLevel {
    A, AA, AAA
}

/**
 * A key that's used in the `contrastData` that gets returned by the HTML checker. Each key is a serialized string
 * representation of the {@link ContrastKey} parameters.
 */
export class ContrastKey {

    public static from(str: string): ContrastKey {
        const [textColor, backgroundColor, fontRatioStr, fontWeight] = str.split(':');
        if (!hasValue(textColor) || !hasValue(backgroundColor) || !hasValue(fontRatioStr) || !hasValue(fontWeight)) {
            throw new Error(`Invalid contrast key: ${str}`);
        }
        const fontRatio = parseFloat(fontRatioStr);
        if (isNaN(fontRatio)) {
            throw new Error(`Invalid fontRatio key: ${str}`);
        }

        return new ContrastKey(textColor, backgroundColor, fontRatio, fontWeight);
    }

    /**
     * @param textColor          The color of the text. `default` if no specified color was detected
     * @param backgroundColor    The background color for text. `default` if no specified color was detected
     * @param fontRatio          The ratio to the default font size for some text. `1.0` indicates the text
     *                           did not have any special CSS font-size information
     * @param fontWeight         The weight of the text. One of `normal` or `bold`.
     */
    private constructor(
        public readonly textColor: string,
        public readonly backgroundColor: string,
        public readonly fontRatio: number,
        public readonly fontWeight: string,
    ) {
    }

    /**
     * Check whether the text color has sufficient color contrast with the background color to pass the WCAG AA spec.
     *
     * @param htmlConfig    The HTML configuration that should be taken into account
     * @return              `true` if there's not sufficient color contrast to pass WCAG AA, `false` otherwise
     */
    public isWcagAaFailure(htmlConfig: IHtmlConfig): boolean {
        return getContrastWcagLevel(
            new Color(this.backgroundColor, htmlConfig.backgroundColor),
            new Color(this.textColor, htmlConfig.textColor),
            htmlConfig.fontSize * this.fontRatio,
            this.fontWeight === FONT_WEIGHT_BOLD
        ) === WcagLevel.AA;
    }
}

/**
 * Check which (if any) WCAG level a contrast ratio violates. Keep in mind, that if it violates both AA and AAA
 * it will be marked as AA. If there's no contrast violation a `None` will be returned
 *
 * @param background    The color of the background a text character is on
 * @param text          The color of the character
 * @param fontSize      The font size of the character (in pt)
 * @param isBold        Whether it's a bold character or not
 */
function getContrastWcagLevel(
    background: Color,
    text: Color,
    fontSize: number,
    isBold: boolean
): WcagLevel | undefined {
    const l1 = background.getRelativeLuminance() + 0.05;
    const l2 = text.getRelativeLuminance() + 0.05;
    const ratio = Math.max(l1, l2) / Math.min(l1, l2);

    // See https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html for where the following
    // values come from.
    const isLarge = fontSize >= 18 || (fontSize >= 14 && isBold);

    if (isLarge && ratio < 3) {
        return WcagLevel.AA;
    } else if (isLarge && ratio < 4.5) {
        return WcagLevel.AAA;
    } else if (ratio < 4.5) {
        return WcagLevel.AA;
    } else if (ratio < 7) {
        return WcagLevel.AAA;
    }
    return undefined;
}
