
import * as NullUtil from 'src/shared/NullUtil';

import { IJsUploadReport } from './UploadReport';
import { UploadType } from './UploadType';

export class RichContentReport {

    public static fromResponseItem(report: IJsUploadReport): RichContentReport {
        const id = NullUtil.orElse<string>(report.id, '');
        const type = NullUtil.orElse<string>(report.type, 'other');
        const mimeType = NullUtil.orElse<string>(report.mimeType, 'application/octet-stream');
        const size = NullUtil.orElse<number>(report.size, 0);

        return new RichContentReport(
            id,
            type,
            mimeType,
            size,
            report.name,
            report.availableAlternativeFormats,
            report.score,
            report.results,
            report.suggestions,
            report.link,
            report.newAlternativeFormats
        );
    }

    public readonly uploadType: UploadType = 'RichContent';

    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly mimeType: string,
        public readonly size: number,
        public readonly name?: string,
        public readonly availableAlternativeFormats?: string[],
        public readonly score?: number,
        public readonly results?: {[key: string]: number},
        public readonly suggestions?: {[key: string]: number},
        public readonly link?: string,
        public readonly newAlternativeFormats?: string[]
    ) { }
}
