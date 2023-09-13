
import {FileType} from 'src/shared/file-type.model';
import {LmsType} from 'src/shared/lms-type.model';

import {ICalculatedResult} from '../result.model';
import {HtmlScore} from './HtmlScore';
import ScoreInfo from './ScoreInfo';

export interface IScoreAggregator {

    /**
     * Calculate the aggregated score of this aggregator.
     *
     * @param results  The results from which the aggregator will get its low-level scoring values to calculate score
     * @return         The final score
     */
    calculate(results: ICalculatedResult[]): ScoreInfo;
}

/**
 * Get the score aggregator for the given LMS and file type.
 *
 * @param lmsType   The LMS type
 * @param fileType  The file type
 */
export function getScoreAggregator(lmsType: LmsType, fileType: FileType): IScoreAggregator {
    switch (fileType) {
        case FileType.HtmlFragment:
        case FileType.HtmlPage:
            return HtmlScore;
        default:
            throw new Error('Not implemented');
    }
}
