
import {IHtmlConfig} from '../html-config.model';
import {Explanation, IHtmlResult} from '../result.model';
import {IRuleName} from '../rule.model';
import HtmlHeadingsStart from '../rules/HtmlHeadingsStart';

/**
 * A check that verifies that the first HTML heading in the page body starts at the correct level. This result uses
 * information that's available in the {@link IHtmlConfig} to calculate a score on-the-fly.
 *
 * The score is a binary score as the first heading tag is either the expected or an unexpected tag.
 */
export default class HtmlHeadingsStartResult implements IHtmlResult {

    public static for(firstHeading: string, {headingStart}: IHtmlConfig): IHtmlResult {
        const level = Number.parseInt(firstHeading[1], 10);
        if (isFinite(level) && level === headingStart) {
            return new HtmlHeadingsStartResult(1);
        }
        return new HtmlHeadingsStartResult(0);
    }

    public readonly name: IRuleName = new HtmlHeadingsStart();
    public readonly data: Explanation = null;

    private constructor(public readonly score: number) {
    }
}
