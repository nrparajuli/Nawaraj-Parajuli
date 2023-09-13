
import { ICourseReport } from 'projects/common/feedback';
import {IFeedback, IIndividualFileReport, IResults, ISuggestions} from 'src/integration/api/client/IndividualFileReport';
import * as CollectionUtil from 'src/shared/CollectionUtil';
import { FileType } from 'src/shared/file-type.model';
import * as NullUtil from 'src/shared/NullUtil';
import {RuleName} from 'src/shared/rule-name.model';
import { IJsAaasContentBatchRequest, IJsContentReport } from '../client/AaasContentReport';
import {IJsFileReference} from '../client/FileReference';
import { FileReport } from '../client/FileReport';
import { IJsUploadReport } from '../client/UploadReport';
import { IJsAssociatedFile } from './AlternativeFormats';

/** Mocks a set of course reports, keyed by external course id */
export interface IMockCourseReports {
    [courseId: string]: ICourseReport;
}

/** Mocks a set of course content reports, keyed by external course id */
export interface IMockCourses {
    [courseId: string]: IMockContent;
}

/** Mocks course content */
export interface IMockContent {
    File: IMockFiles;
    RichContent: IMockRichContent;
}

/** Mocks a set of file reports, keyed by external file id */
export interface IMockFiles {
    [fileId: string]: IJsUploadReport | null;
}

export interface IMockRichContent {
    [richContentId: string]: IMockRichContentInfo | null;
}

export interface IMockRichContentInfo {
    report: IJsUploadReport;
    linkedFiles: IJsAssociatedFile[];
}

/** Mocks a set of course embed infos, keyed by external course id */
export interface IMockCourseEmbedInfos {
    [courseId: string]: IMockFileEmbedInfos;
}

/** Mocks a set of file embed infos, keyed by external file id */
export interface IMockFileEmbedInfos {
    [fileId: string]: any;
}

/**
 * An interface that is used to mock a mutable set of data to represent an Ally data-set. This type is generally a
 * partially-implemented jQuery (only the `$.ajax` function is implemented) and an additional [[set]] function that
 * allows the server data to be changed dynamically for sequences of tests and simulating updated content in Ally.
 *
 * @see [[IClientConfigObj.jQuery]] for sample usage.
 */
export interface IMock extends JQueryStatic {
    /** Hardcode the response for a single endpoint */
    hardcodeResponse: (url: string, response: any) => void;

    /** A setter that mutates the [[IMock]] instance so it's data-set dynamically changes. */
    set: (data: IMockCourses) => void;
}

/** Mocks the help configuration for students and instructors */
export interface IHelpConfig {
    'student': ITargetGroupConfig;
    'instructor': ITargetGroupConfig;
}

export interface ITargetGroupConfig {
    'content': {
        'expertEmail': string,
        'expertEnabled': boolean,
        'helpContent': string
    };
    'helpType': 'CustomHelp' | 'DefaultHelp';
}

export class UiMock {

    /**
     * Create a jQuery mock that implements only the `ajax` function which can be used to mock a state of data in the
     * Ally server.
     *
     * @param   data          The course and file report structure to mock in Ally
     * @param   embedInfos    The file embed information to mock in Ally
     * @param   helpConfig    The student and instructor help configuration to mock in Ally
     * @return                A jQuery instance whose data can be mutated and can be injected into the client
     *                        configuration to be used as the source of data for an Ally server
     */
    public static $mock(
        data: IMockCourses = {},
        embedInfos: IMockCourseEmbedInfos = {},
        helpConfig?: IHelpConfig,
        courseReports: IMockCourseReports = {}
    ): IMock {
        const courseReportRegex = /^.*\/api\/v1\/([^\/]+)\/reports\/courses\/([^\/]+)$/;
        const contentReportRegex = /^.*\/api\/v1\/([^\/]+)\/reports\/courses\/([^\/]+)\/content(\?|$)/;
        const individualFileReportRegex = /^.*\/api\/v2\/clients\/([^\/]+)\/courses\/([^\/]+)\/(files|rich-content)\/([^\/]+)\/report(\?|$)/;
        const uploadOptionsRegex = /^.*\/api\/v1\/([^\/]+)\/courses\/([^\/]+)\/files\/([^/?]+)$/;
        const clientHelpRegex = /^.*\/api\/v1\/[0-9]+\/help$/;
        const embedInfoRegex = /^.*\/api\/v1\/([^\/]+)\/courses\/([^\/]+)\/files\/([^\/?]+)\/embedInfo$/;
        const generateHtmlFeedbackAxeRegex = /^.*\/api\/v1\/([^\/]+)\/content\/generateFeedback\/axe$/;
        const sendHelpRegex = /^.*\/api\/v1\/([^\/]+)\/courses\/([^\/]+)\/files\/([^\/?]+)\/help\/sendExpertInstructorFeedbackHelp$/;
        const richContentLinksRegex = /^.*\/api\/v2\/clients\/([^\/]+)\/courses\/([^\/]+)\/rich-content\/([^\/?]+)\/files$/;
        const aaasContentBatchRegex = /^.*\/api\/v2\/clients\/([^\/]+)\/content\/batch(\?|$)/;

        const hardcodedResponses: {[url: string]: any} = {};

        const result = {
            'ajax': (settings: JQuery.UrlAjaxSettings) => {
                if (hardcodedResponses[settings.url] !== undefined) {
                    return (settings.success as (obj: any) => any)(hardcodedResponses[settings.url]);
                }

                const courseReportMatch = settings.url.match(courseReportRegex);
                const contentReportsMatch = settings.url.match(contentReportRegex);
                const embedInfoMatch = settings.url.match(embedInfoRegex);
                const generateHtmlFeedbackAxeMatch = settings.url.match(generateHtmlFeedbackAxeRegex);
                const individualFileReportMatch = settings.url.match(individualFileReportRegex);
                const richContentLinksMatch = settings.url.match(richContentLinksRegex);
                if (courseReportMatch !== null && courseReportMatch.length > 0) {
                    // URL would be of the form:
                    // https://performance.ally.ac/api/v1/:clientId/reports/courses/:courseId
                    const courseId = courseReportMatch[2];
                    const courseReport = courseReports[courseId];
                    if (courseReport !== undefined) {
                        (settings.success as (obj: any) => any)(courseReport);
                    } else {
                        (settings.error as (xhr: any, textStatus: string, errorThrow: string) => any)(
                            {
                                'responseText': 'Not Found',
                                'status': 404
                            },
                            'error',
                            'Not Found'
                        );
                    }
                } else if (contentReportsMatch !== null && contentReportsMatch.length > 0) {
                    // URL would be of the form:
                    // https://performance.ally.ac/api/v1/:clientId/courses/:courseId/content
                    const courseId = contentReportsMatch[2];
                    const references = JSON.parse(settings.data as string) as IJsFileReference[];
                    const reports = references.map((ref) => {
                        const courseData = data[courseId];
                        if (NullUtil.hasValue(courseData)) {
                            let contentData = null;
                            if (ref.uploadType === 'File') {
                                contentData = courseData.File[ref.id];
                            } else if (ref.uploadType === 'RichContent') {
                                const rcInfo = courseData.RichContent[ref.id];
                                if (NullUtil.hasValue(rcInfo)) {
                                    contentData = rcInfo.report;
                                }
                            }
                            return contentData;
                        } else {
                            return null;
                        }
                    });
                    const body = {
                        'uploadsReport': reports
                    };
                    (settings.success as (obj: any) => any)(body);
                } else if (individualFileReportMatch !== null && individualFileReportMatch.length > 0) {
                    // URL would be of the form:
                    // /api/v2/clients/{clientId}/courses/{courseId}/files/{fileId}/report
                    // /api/v2/clients/{clientId}/courses/{courseId}/rich-content/{richcontentId}/report
                    const courseId = decodeURIComponent(individualFileReportMatch[2]);
                    const uploadType = individualFileReportMatch[3] === 'rich-content' ? 'RichContent' : 'File';
                    const externalId = decodeURIComponent(individualFileReportMatch[4]);
                    let report: IJsUploadReport;

                    if (uploadType === 'RichContent') {
                        report = data[courseId].RichContent[externalId]!.report;
                    } else {
                        report = data[courseId].File[externalId]!;
                    }
                    const results: IResults = CollectionUtil.zipObject(
                        Object.keys(report.results!)
                            .map((key: string) => key as RuleName),
                        Object.values(report.results!)
                            .map((score: number) => ({'score': score})));

                    const availableFormats: string[] = NullUtil.orElse<string[]>(
                        report.availableAlternativeFormats,
                        [] as string[]
                    );
                    const newAlternativeFormats: string[] = NullUtil.orElse<string[]>(
                        report.newAlternativeFormats,
                        [] as string[]
                    );

                    const individualFileReport: IIndividualFileReport = {
                        'feedback': {
                            'report': {
                                'results': results,
                                'score': Number(report.score),
                                'suggestions': report!.suggestions!
                            }
                        },
                        'formats': {
                            'available': availableFormats.length > 0,
                            'availableFormats': availableFormats,
                            'canToggleAvailability': true,
                            'newAlternativeFormats': newAlternativeFormats,
                            'visibility': availableFormats.length > 0
                        },
                        'id': report!.id!,
                        'metadata': {
                            'decorative': report.decorative,
                            'description': report.description,
                            'fileType': report.type as FileType,
                            'isSeizureInducing': report.seizureRisk,
                            'isVersioned': Boolean(report.isVersioned),
                            'libraryReference': report.libraryReference,
                            'mimeType': String(report.mimeType),
                            'name': report!.name
                        }
                    };
                    (settings.success as (obj: any) => any)(individualFileReport);
                } else if (richContentLinksMatch !== null && richContentLinksMatch.length > 0) {
                    // URL would be of the form:
                    // /api/v2/clients/{clientId}/courses/{courseId}/rich-content/{richcontentId}/files
                    const courseId = decodeURIComponent(richContentLinksMatch[2]);
                    const externalId = decodeURIComponent(richContentLinksMatch[3]);
                    const linkedFiles = data[courseId].RichContent[externalId]!.linkedFiles;
                    (settings.success as (obj: any) => any)({'results': linkedFiles});
                } else if (uploadOptionsRegex.test(settings.url)) {
                    // URL would be of the form:
                    // https://performance.ally.ac/api/v1/:clientId/courses/:courseId/files/:fileId
                    // For now, alternative formats always enabled when mocking
                    (settings.success as (obj: any) => any)({'alternativeFormatsEnabled': true, 'disabledFormats': []});
                } else if (embedInfoMatch !== null && embedInfoMatch.length > 0) {
                    const courseId = embedInfoMatch[2];
                    const fileId = embedInfoMatch[3];
                    const courseEmbedInfos = embedInfos[courseId];
                    let embedInfo = {
                        'status': 'Pending',
                        'urls': {
                            'original': null,
                            'pdf': null
                        }
                    };
                    if (NullUtil.hasValue(courseEmbedInfos) && NullUtil.hasValue(courseEmbedInfos[fileId])) {
                        embedInfo = courseEmbedInfos[fileId];
                    }
                    (settings.success as (obj: any) => any)(embedInfo);
                } else if (generateHtmlFeedbackAxeMatch !== null && generateHtmlFeedbackAxeMatch.length > 0) {
                    const feedback = {
                        'explanationData': {
                            'type': 'Webpage'
                        },
                        'feedback': {
                            'score': 0.11
                        }
                    };
                    (settings.success as (obj: any) => any)(feedback);
                } else if (clientHelpRegex.test(settings.url)) {
                    // URL would be of the form:
                    // https://performance.ally.ac/api/v1/:clientId/help
                    if ((settings.data as any).targetGroup === 'instructor') {
                        (settings.success as (obj: any) => any)(NullUtil.hasValue(helpConfig) ? helpConfig.instructor :
                            null);
                    } else if ((settings.data as any).targetGroup === 'student') {
                        (settings.success as (obj: any) => any)(NullUtil.hasValue(helpConfig) ? helpConfig.student :
                            null);
                    }
                } else if (sendHelpRegex.test(settings.url)) {
                    // Send a success response to a help request
                    (settings.success as (obj: any) => any)('OK');
                } else if (aaasContentBatchRegex.test(settings.url) && NullUtil.hasValue(settings.data)) {
                    // URL would be of the form:
                    // https://performance.ally.ac/api/v2/clients/:clientId/content/batch
                    const params = JSON.parse(settings.data as string) as IJsAaasContentBatchRequest;
                    const allReports = params.references
                        .map((ref) => data['0'].File[ref.hash])
                        .map((report: IJsUploadReport | null) => {
                            if (!NullUtil.hasValue(report)) {
                                return null;
                            }

                            const availableFormats: string[] = NullUtil.orElse<string[]>(
                                report.availableAlternativeFormats,
                                []
                            );

                            const newAlternativeFormats: string[] = NullUtil.orElse<string[]>(
                                report.newAlternativeFormats,
                                []
                            );

                            let feedback: IFeedback | null = null;
                            let results: IResults | null = null;
                            const suggestions: ISuggestions | null = NullUtil.orNull(report.suggestions);

                            if (NullUtil.hasValue(report.results)) {
                                results = CollectionUtil.zipObject(
                                    Object.keys(report.results!)
                                        .map((key: string) => key as RuleName),
                                    Object.values(report.results!)
                                        .map((score: number) => ({'score': score})));
                            }

                            if (
                                NullUtil.hasValue(report.score) &&
                                NullUtil.hasValue(results) &&
                                NullUtil.hasValue(suggestions)
                            ) {
                                feedback = {
                                    'report': {
                                        results,
                                        'score': report.score,
                                        suggestions
                                    },
                                    'visibility': FileReport.scoreLabel(report.score)
                                };
                            }
                            const individualContentReport: IJsContentReport = {
                                feedback,
                                'formats': {
                                    'available': availableFormats.length > 0,
                                    'availableFormats': availableFormats,
                                    'canToggleAvailability': false,
                                    'newAlternativeFormats': newAlternativeFormats,
                                    'visibility': availableFormats.length > 0
                                },
                                'hash': report!.id!,
                                'metadata': {
                                    'decorative': NullUtil.orNull(report.decorative),
                                    'description': NullUtil.orNull(report.description),
                                    'fileType': report.type as FileType,
                                    'libraryReference': null,
                                    'mimeType': String(report.mimeType),
                                    'name': NullUtil.orElse(report!.name, 'File name')
                                }
                            };
                            return individualContentReport;
                        });
                    (settings.success as (obj: any) => any)({'reports': allReports});
                } else {
                    // tslint:disable-next-line: no-console
                    console.log(`Unknown URL hitting mock: ${settings.url}`);
                    (settings.error as any)({'code': 404});
                }
            },
            'hardcodeResponse': (url: string, response: any) => hardcodedResponses[url] = response,
            'set': (d: IMockCourses) => {
                data = d;
            }
        };
        return result as IMock;
    }
}
