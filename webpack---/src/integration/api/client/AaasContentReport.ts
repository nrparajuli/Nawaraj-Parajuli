
import { FileType } from 'src/shared/file-type.model';
import * as NullUtil from 'src/shared/NullUtil';
import {RuleName} from 'src/shared/rule-name.model';

import { FileReport, IJsLibraryReference } from './FileReport';
import { IFeedback, IFormats } from './IndividualFileReport';

/** The data that is sent to the batch content endpoint */
export interface IJsAaasContentBatchRequest {
    references: IJsAaasContentReference[];
}

/** A single AaaS Content reference */
export interface IJsAaasContentReference {
    hash: string;
}

export interface IJsAaasContentBatchResponse {
    reports: IJsContentReport[];
}

export interface IJsContentReport {
    hash: string;
    metadata: IJsContentReportMetadata;
    feedback: IFeedback | null;
    formats: IFormats | null;
}

export interface IJsContentReportMetadata {
    name: string;
    fileType: FileType;
    mimeType: string;
    description: string | null;
    libraryReference: IJsLibraryReference | null;
    decorative: boolean | null;
}

export interface IJsContentReportFormats {
    availableFormats: string[];
    available: boolean;
    visibility: boolean;
}

export function aaasContentReportToFileReport(report: IJsContentReport): FileReport {

    let results: {[key: string]: number} | undefined;
    const aaasResults = report.feedback?.report?.results;
    if (NullUtil.hasValue(aaasResults)) {
        results = {};
        Object.keys(aaasResults).forEach((ruleName) => {
            results![ruleName] = aaasResults[ruleName as RuleName]!.score;
        });
    }

    return new FileReport(
        report.hash,
        report.metadata.fileType,
        report.metadata.mimeType,
        0,
        undefined,
        report.metadata.name,
        NullUtil.orElse<string | undefined>(report.metadata.description, undefined),
        NullUtil.orElse<IJsLibraryReference | undefined>(report.metadata.libraryReference, undefined),
        NullUtil.orElse<boolean | undefined>(report.metadata.decorative, undefined),
        NullUtil.orElse<string[] | undefined>(report.formats?.availableFormats, undefined),
        undefined,
        undefined,
        undefined,
        report.feedback?.report?.score,
        results,
        report.feedback?.report?.suggestions as {[key: string]: number} | undefined,
        undefined
    );
}
