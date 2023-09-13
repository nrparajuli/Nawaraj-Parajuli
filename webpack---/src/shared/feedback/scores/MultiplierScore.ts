
import {orElse, whenHasValue} from 'src/shared/NullUtil';

import {ICalculatedResult} from '../result.model';
import OrElseScore from './OrElseScore';
import Score from './Score';
import {IScoreAggregator} from './score.model';
import ScoreInfo from './ScoreInfo';

/**
 * A score aggregator that multiplies a sequence of scores together. If any score in the multiplier calculates to a
 * {@link NoValue} the `default` will be applied to derive its score.
 */
export default class MultiplierScore implements IScoreAggregator {
    public readonly scores: IScoreAggregator[];

    /**
     * @param fallback  The default value to use if a multiplier results in a {@link NoValue}
     * @param scores    The scores to calculate and multiply together
     */
    constructor(public readonly fallback: number | undefined, ...scores: IScoreAggregator[]) {
        this.scores = scores;
    }

    public calculate(results: ICalculatedResult[]): ScoreInfo {
        const scores = this.recoveredScores();
        if (scores.length === 0) {
            return orElse(
                whenHasValue(this.fallback, (fallback) => new ScoreInfo(new Score(fallback))),
                new ScoreInfo(Score.NoValue)
            );
        }
        return scores
            .map((score) => score.calculate(results))
            .reduce((a, b) => a.multiply(b));
    }

    private recoveredScores() {
        return orElse(
            whenHasValue(this.fallback, (fallback) => {
                return this.scores.map((score) => new OrElseScore(score, fallback));
            }),
            this.scores
        );
    }
}
