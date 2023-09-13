import {IClient, IClientInfo, IUploadReportMap} from 'src/integration/api/client/client.model';
import {ClientConfig, IClientConfigObj} from 'src/integration/api/client/ClientConfig';
import {IJsFileReferences} from 'src/integration/api/client/FileReference';
import { generateAxeFeedback } from 'src/shared/feedback/axefeedback';
import { FileType } from 'src/shared/file-type.model';
import { LmsType } from 'src/shared/lms-type.model';

export class AnonymousClient implements IClient {

    public config: ClientConfig;
    public jQuery: JQueryStatic;

    constructor(config: IClientConfigObj, private readonly lmsType: LmsType) {
        this.config = ClientConfig.fromConfigObject(config);
        this.jQuery = this.config.jQuery;
    }

    public generateAxeFeedback(axeResults: JSON): Promise<any> {
        return Promise.resolve(
            generateAxeFeedback(this.lmsType, FileType.HtmlFragment, axeResults as any)
        );
    }

    public getClientInfo(courseId: string | null): Promise<IClientInfo> {
        return Promise.resolve({
            'flags': {
                'ifLaunchFromWysiwyg': true,
                'nativeWysiwygAxEnabled': false,
            }
        });
    }

    public applyWysiwygFix(courseId: string, fileId: string, quickFix: any): Promise<string> {
        return Promise.reject('Not supported.');
    }

    public authenticate(ajaxSettings: JQuery.UrlAjaxSettings): Promise<JQuery.UrlAjaxSettings> {
        return Promise.reject('Not supported.');
    }

    public authenticateAndExec(ajaxSettings: JQuery.UrlAjaxSettings): Promise<any> {
        return Promise.reject('Not supported.');
    }

    public getFileReports(courseId: string, refsById: IJsFileReferences): Promise<IUploadReportMap> {
        return Promise.reject('Not supported.');
    }

    /* istanbul ignore next */
    // tslint:disable-next-line:no-empty
    public clearAllFromCache(): void {
    }

    /* istanbul ignore next */
    // tslint:disable-next-line:no-empty
    public clearFileIdFromCache(fileId: string): void {
    }
}
