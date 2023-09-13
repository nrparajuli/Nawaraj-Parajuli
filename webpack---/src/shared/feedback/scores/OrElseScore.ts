import {hasValue} from 'src/shared/NullUtil';

import {RuleName} from '../../rule-name.model';
import {ICalculatedResult} from '../result.model';
import ResultScore from './ResultScore';
import Score from './Score';
import {IScoreAggregator} from './score.model';
import ScoreInfo from './ScoreInfo';

/**
 * Applies a default value to a score. If the score calculates to {@link NoValue}, then the provided `v` will be used as
 * the score.
 */
export default class OrElseScore implements IScoreAggregator {

    /**
     * @param name The RuleName to use for the {@link ResultScore}
     * @param value The constant score value to use if `score` calculates to {@link NoValue}
     */
    public static fromRuleName(name: RuleName, value: number): OrElseScore {
        return new OrElseScore(new ResultScore(name), value);
    }

    /**
     * @param score The score to calculate
     * @param value The constant score value to use if `score` calculates to {@link NoValue}
     */
    constructor(public readonly score: IScoreAggregator, public readonly value: number) {
    }

    public calculate(results: ICalculatedResult[]): ScoreInfo {
        const info = this.score.calculate(results);
        if (hasValue(info.score.value)) {
            return info;
        } else if (this.value === 1) {
            return new ScoreInfo(new Score(1));
        }
        return new ScoreInfo(new Score(this.value), info.ruleNames);
    }
}
