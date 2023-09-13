
import MultiplierScore from './MultiplierScore';
import {IScoreAggregator} from './score.model';

/**
 * A special case of the {@link MultiplierScore} in which any {@link NoValue} st causes the calculation
 * to return a {@link Value} of `0.0`.
 */
export default class RequiredMultiplierScore extends MultiplierScore {
    constructor(...scores: IScoreAggregator[]) {
        super(0, ...scores);
    }
}
