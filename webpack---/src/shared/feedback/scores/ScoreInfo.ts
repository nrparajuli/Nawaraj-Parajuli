
import {RuleName} from 'src/shared/rule-name.model';

import Score from './Score';

function union<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set<T>([
        ...Array.from(a), ...Array.from(b)
    ]);
}

/**
 * An actual score info, represents the actual accessibility assessment score associated to the file.
 */
export default class ScoreInfo {
    constructor(public readonly score: Score, public readonly ruleNames: Set<RuleName> = new Set()) {
    }

    /**
     * Aggregate this score info with the `other` using multiplication semantics. Generally this would at least mean
     * multiplying the contained score, but if there is more metadata associated with the score info (e.g., rule names)
     * that needs to be carried forward, that metadata should be aggregated as well (i.e., the rule names combined).
     *
     * @param other   The score info to aggregated with
     * @return        The aggregated score info
     */
    public multiply = (other: ScoreInfo): ScoreInfo =>
        new ScoreInfo(this.score.multiply(other.score), union(this.ruleNames, other.ruleNames))

    /**
     * Aggregate this score info with the `other` using addition semantics. Generally this would at least mean summing
     * the contained score, but if there is more metadata associated with the score info (e.g., rule names) that needs
     * carried forward, that metadata should be aggregated as well (i.e., the rule names combined).
     *
     * @param other   The score info to aggregated with
     * @return        The aggregated score info
     */
    public add = (other: ScoreInfo): ScoreInfo =>
        new ScoreInfo(this.score.add(other.score), union(this.ruleNames, other.ruleNames))

    /**
     * Combine this score info with the `other` by retaining the `other` score. If there is more metadata associated
     * with the score info (e.g., rule names), that metadata will be aggregated as well (i.e., the rule names combined).
     *
     * @param other   The score info to aggregated with
     * @return        The aggregated score info
     */
    public retain = (other: ScoreInfo): ScoreInfo =>
        new ScoreInfo(other.score, union(this.ruleNames, other.ruleNames))
}
