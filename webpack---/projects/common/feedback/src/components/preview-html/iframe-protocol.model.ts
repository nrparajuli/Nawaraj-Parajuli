
import { ProtoframeDescriptor } from 'protoframe';

import { IssueLocator } from './issue-locator.model';

/** Represents an object that can be used to select a particular element in an html document. */
export type SelectLocator =
    {
        link?: never;
        xpath: string;
    } |
    {
        link: string;
        xpath?: never;
    };

// tslint:disable-next-line: interface-over-type-literal
export type PreviewHtmlIframeProtocol = {
    init: {
        body: {
            index?: number;
            locator?: IssueLocator;
        };
        response: undefined;
    };
    select: {
        body: {
            index: number;
        };
        response: {
            locator: SelectLocator | undefined;
        };
    };
    setVisibility: {
        body: {
            visibility: boolean;
        };
        response: undefined;
    };
};

export const previewHtmlIframeProtocol: ProtoframeDescriptor<PreviewHtmlIframeProtocol> = {'type': 'preview-html'};
