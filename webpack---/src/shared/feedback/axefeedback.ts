
import {FileType} from 'src/shared/file-type.model';
import {LmsType} from 'src/shared/lms-type.model';
import {hasValue, whenHasValue} from 'src/shared/NullUtil';
import {RuleName} from 'src/shared/rule-name.model';

import {IAxeResults} from 'projects/axefeedback/src/model';
import {getHtmlConfig} from 'src/shared/feedback/html-config.model';
import HtmlColorContrastResult from 'src/shared/feedback/results/HtmlContrastResult';
import {
    Explanations,
    ICalculatedResult,
    IFeedback, IHtmlResult,
    Results,
    Suggestions
} from './result.model';
import HtmlHeadingsStartResult from './results/HtmlHeadingsStartResult';
import SimpleHtmlResult from './results/SimpleHtmlResult';
import {HTML_RULE_NAMES} from './scores/HtmlScore';
import {getScoreAggregator} from './scores/score.model';

/**
 * Generates feedback from the given results.
 *
 * @param lmsType   The LMS type
 * @param fileType  The file type
 * @param results   The results
 */
function generateFeedback(lmsType: LmsType, fileType: FileType, results: ICalculatedResult[]): IFeedback {
    const scoreAggregator = getScoreAggregator(lmsType, fileType);
    const scoreInfo = scoreAggregator.calculate(results);

    const suggestions: Suggestions = {};
    scoreInfo.ruleNames.forEach((ruleName) => {
        suggestions[ruleName] = scoreAggregator.calculate(
            [...results.filter(({name}) => name !== ruleName), {'name': ruleName, 'score': 1}]
        ).score.value;
    });

    return {
        'results': results.reduce((acc, {name, score}) => {
            acc[name] = score;
            return acc;
        }, {} as Results),
        'score': scoreInfo.score.value,
        suggestions,
    };
}

/**
 * Generates feedback from the given Axe results.
 *
 * @param lmsType   The LMS type
 * @param fileType  The file type
 * @param input     The Axe results
 */
export function generateAxeFeedback(lmsType: LmsType, fileType: FileType, input: IAxeResults) {
    const htmlResults: IHtmlResult[] = Object.entries(input.resultData).map(([name, occurrences]) => {
        const rule = HTML_RULE_NAMES.get(name);
        const count = 'violations' in occurrences ? occurrences.violations.count : 0;
        if (!hasValue(rule) || count === 0) {
            return;
        }

        return new SimpleHtmlResult(rule, occurrences);
    }).filter(hasValue);

    const htmlConfig = getHtmlConfig(lmsType);
    whenHasValue(input.headingTags[0], (heading) =>
        htmlResults.push(HtmlHeadingsStartResult.for(heading, htmlConfig))
    );
    whenHasValue(input.contrastData, (contrast) =>
        htmlResults.push(HtmlColorContrastResult.for(contrast, htmlConfig))
    );

    const results: ICalculatedResult[] = [];
    const explanationData: Explanations = Object.values(RuleName)
        .filter((name) => name.startsWith('Html'))
        .reduce((acc, name) => ({...acc, [name]: null}), {});

    for (const {name, score, data} of htmlResults) {
        const ruleName = name.name;
        if (!name.appliesTo(lmsType).has(fileType)) {
            continue;
        }

        results.push({'name': ruleName, score});
        explanationData[ruleName] = data;
    }

    return {
        explanationData,
        'feedback': generateFeedback(lmsType, fileType, results),
    };
}
