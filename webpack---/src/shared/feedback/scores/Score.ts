import {hasValue} from 'src/shared/NullUtil';

/**
 * Represents a score when calculating feedback results for a file. As it is possible to not have a score, this
 * type essentially wraps an `number | undefined`, while adding a few convenient arithmetic operations.
 */
export default class Score {

    public static NoValue = new Score();

    constructor(public readonly value?: number) {
    }

    /**
     * Multiply this score with the other. If any of the scores are {@link NoValue},
     * then this will be a {@link NoValue}. Otherwise, it is the multiplication of the values.
     *
     * @param other The score to multiply against
     * @return      The multiplied score
     */
    public multiply(other: Score): Score {
        if (hasValue(this.value) && hasValue(other.value)) {
            return new Score(this.value * other.value);
        }
        return Score.NoValue;
    }

    /**
     * Add this score with the other. If both scores are {@link NoValue}, the result will be {@link NoValue}. Otherwise,
     * {@link NoValue} will be treated like `0`.
     *
     * @param other The score to sum with
     * @return      The sum of the scores
     */
    public add(other: Score): Score {
        if (hasValue(this.value) && hasValue(other.value)) {
            return new Score(this.value + other.value);
        }
        return Score.NoValue;
    }
}
