
import { ScoreLevelId } from 'projects/common/feedback/src/models/score-level.model';
import * as NullUtil from 'src/shared/NullUtil';

import { IJsUploadReport } from './UploadReport';
import { UploadType } from './UploadType';

/** Represents a library reference that can be returned by the backend */
export interface IJsLibraryReference {
    url?: string;
    title?: string;
    chapterVolumePageNumber?: string;
    authors?: string;
    publicationDate?: string;
    publisher?: string;
}

export class FileReport {

    /** Get the low/medium/high/perfect score label for the specified score. */
    public static scoreLabel(score: number): ScoreLevelId {
        const scorePct = Math.floor(score * 100);
        if (scorePct <= 33) {
            return 'low';
        } else if (scorePct <= 66) {
            return 'medium';
        } else if (scorePct <= 99) {
            return 'high';
        } else {
            return 'perfect';
        }
    }

    public static fromResponseItem(report: IJsUploadReport): FileReport {
        const id = NullUtil.orElse<string>(report.id, '');
        const type = NullUtil.orElse<string>(report.type, 'other');
        const mimeType = NullUtil.orElse<string>(report.mimeType, 'application/octet-stream');
        const size = NullUtil.orElse<number>(report.size, 0);

        // Parse the library reference if one is available
        let ref: IJsLibraryReference | undefined;
        if (typeof report.libraryReference === 'string') {
            try {
                ref = JSON.parse(report.libraryReference);
            } catch (err) {
                // Swallow the exception
            }
        }

        return new FileReport(
            id,
            type,
            mimeType,
            size,
            report.isVersioned,
            report.name,
            report.description,
            ref,
            report.decorative,
            report.availableAlternativeFormats,
            report.creator,
            report.producer,
            report.seizureRisk,
            report.score,
            report.results,
            report.suggestions,
            report.link,
            report.newAlternativeFormats
        );
    }

    public readonly uploadType: UploadType = 'File';

    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly mimeType: string,
        public readonly size: number,
        public readonly isVersioned?: boolean,
        public readonly name?: string,
        public readonly description?: string,
        public readonly libraryReference?: IJsLibraryReference,
        public readonly decorative?: boolean,
        public readonly availableAlternativeFormats?: string[],
        public readonly creator?: string,
        public readonly producer?: string,
        public readonly seizureRisk?: boolean,
        public readonly score?: number,
        public readonly results?: {[key: string]: number},
        public readonly suggestions?: {[key: string]: number},
        public readonly link?: string,
        public readonly newAlternativeFormats?: string[]
    ) { }
}
