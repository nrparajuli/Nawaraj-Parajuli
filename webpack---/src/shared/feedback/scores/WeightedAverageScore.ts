
import {hasValue, orElse, whenHasValue} from 'src/shared/NullUtil';

import {ICalculatedResult} from '../result.model';
import Score from './Score';
import {IScoreAggregator} from './score.model';
import ScoreInfo from './ScoreInfo';

/**
 * A score that calculates a final score using a weighted average of other scores. Any score in the weighted average
 * list that calculates to a {@link NoValue} is discarded from the result, therefore the weight assigned to the score is
 * also discarded.
 *
 * If all provided scores in the weighted average were dropped, then the result of the weighted average is also
 * {@link NoValue}.
 */
export default class WeightedAverageScore implements IScoreAggregator {
    public readonly scores: Array<[number, IScoreAggregator]>;

    constructor(...scores: Array<[number, IScoreAggregator]>) {
        this.scores = scores;
    }

    public calculate(results: ICalculatedResult[]): ScoreInfo {
        const scores = [];
        const weights = [];
        for (const [weight, score] of this.scores) {
            if (weight === 0) {
                weights.push(0);
                scores.push(new ScoreInfo(new Score(0), score.calculate(results).ruleNames));
            } else {
                const info = score.calculate(results);
                if (hasValue(info.score.value)) {
                    weights.push(weight);
                    scores.push(new ScoreInfo(info.score.multiply(new Score(weight)), info.ruleNames));
                }
            }
        }

        if (scores.length === 0 && weights.length === 0) {
            return new ScoreInfo(Score.NoValue);
        }

        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const totalInfo = scores.reduce((a, b) => a.add(b));

        return new ScoreInfo(
            new Score(orElse(whenHasValue(totalInfo.score.value, (score) => score / totalWeight), undefined)),
            totalInfo.ruleNames
        );
    }
}
