
import {IRulePass, IRuleViolation} from 'projects/axefeedback/src/model';
import {Explanation, IHtmlResult} from '../result.model';
import {IRuleName} from '../rule.model';

/**
 * A {@link IHtmlResult} that doesn't require any extra configuration to return a score. All the score information
 * should be known when this class is instantiated.
 */
export default class SimpleHtmlResult implements IHtmlResult {

    public readonly score: number;
    public readonly data: Explanation;

    constructor(
        public readonly name: IRuleName,
        public readonly occurrences: IRulePass | IRuleViolation
    ) {
        const {count, xpaths} = 'violations' in occurrences ? occurrences.violations : {'count': 0, 'xpaths': []};
        const passes = 'passes' in occurrences ? occurrences.passes : 0;

        this.score = passes / (count + passes);
        this.data = {count, xpaths};
    }
}
