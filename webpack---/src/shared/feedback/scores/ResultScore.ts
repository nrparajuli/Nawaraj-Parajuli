
import {hasValue} from 'src/shared/NullUtil';

import { RuleName } from '../../rule-name.model';
import {ICalculatedResult} from '../result.model';
import Score from './Score';
import {IScoreAggregator} from './score.model';
import ScoreInfo from './ScoreInfo';

/**
 * A score that pulls its calculated value directly from a result item in the results list.
 */
export default class ResultScore implements IScoreAggregator {

    /**
     * @param name The name of the result whose score to use from the results list
     */
    constructor(public readonly name: RuleName) {
    }

    public calculate(results: ICalculatedResult[]): ScoreInfo {
        const result = results.find(({name}) => name === this.name);
        if (hasValue(result)) {
            if (result.score === 1) {
                return new ScoreInfo(new Score(1));
            }
            return new ScoreInfo(new Score(result.score), new Set([this.name]));
        }
        return new ScoreInfo(Score.NoValue);
    }
}
