import {IContrastResults} from 'projects/axefeedback';
import {IHtmlConfig} from 'src/shared/feedback/html-config.model';
import {ContrastKey} from 'src/shared/feedback/results/contrast/ContrastKey';
import HtmlColorContrast from 'src/shared/feedback/rules/HtmlColorContrast';
import {Explanation, IContrastViolation, IHtmlResult} from '../result.model';
import {IRuleName} from '../rule.model';

/**
 * An HtmlResult that is capable of calculating the score for the contrast check on-the-fly.
 *
 * The default text- and background color is retrieved from the {@link IHtmlConfig} and contrast ratios are calculated
 * for each pair of (text color, background color) in the HTML document.
 *
 * The score is the fraction of characters that passed the check divided by the total number of characters.
 */
export default class HtmlColorContrastResult implements IHtmlResult {
    public static for(results: IContrastResults, htmlConfig: IHtmlConfig): IHtmlResult {
        let totalCharacters = 0;
        let failureCharacters = 0;
        const violations: IContrastViolation[] = [];
        Object.entries(results).forEach(([key, {count, xpaths}]) => {
                const contrastKey = ContrastKey.from(key);

                if (contrastKey.isWcagAaFailure(htmlConfig)) {
                    xpaths.forEach((xpath) => {
                        violations.push({'details': {...contrastKey}, 'xpath': xpath});
                    });
                    failureCharacters += count;
                }
                totalCharacters += count;
            }
        );

        return new HtmlColorContrastResult(
            totalCharacters === 0 ? 1 : 1 - (failureCharacters / totalCharacters),
            {
                'defaultBackgroundColor': htmlConfig.backgroundColor,
                'defaultTextColor': htmlConfig.textColor,
                violations,
            }
        );
    }

    public readonly name: IRuleName = new HtmlColorContrast();

    private constructor(
        public readonly score: number,
        public readonly data: Explanation
    ) {
    }
}
