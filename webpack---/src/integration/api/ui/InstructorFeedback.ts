
import { HtmlRuleNames } from 'projects/common/feedback/src/models/issue.model';
import {EventTracker, UiConfig} from 'src/integration/api/ui/UiConfig';
import {RuleName} from 'src/shared/rule-name.model';
import {IFileReference} from '../client/FileReference';
import {FileReport} from '../client/FileReport';
import {PartialFalsey} from '../PartialFalsey';
import {ILocator} from './ContentInstance';
import * as Templates from './Templates';
import {Ui} from './Ui';

const InstructorFeedbackUtil = require('src/integration/instructorFeedbackUtil');

type LaunchArgs = [
    string,
    string | null | undefined,
    string,
    string | null,
    number,
    string,
    IFileReference,
    JQuery<HTMLElement>,
    PartialFalsey<ILaunchOpts>,
    ILaunchCallbacks
];

/** The targets in which the instructor feedback can be launched */
export const enum Target {
    /** Launch the instructor feedback in an iframe on top of the currently displayed page */
    Iframe = 'iframe',
    /** Launch the instructor feedback in its own tab or window */
    Window = 'window'
}
/** Editor style block */
export interface IBlock {
    /** Heading level or null if the block is not header */
    level: number | null;
    /** Name of block */
    name?: string;
    /** If the block should be disabled from quickfix selection */
    disabled?: boolean;
    /** The HTML tagname. e,g, h1, h2, ..., h6 for headings or p for paragraphs, code for codeblocks, ... */
    tag: string;
    /** The HTML style associated with block. */
    style?: { [_: string]: any };
}

/** Provided as optional arguments when launching instructor feedback. */
export interface ILaunchOpts {
    /** A predicate deciding when we will allow focus in the parent when instructor feedback is active. */
    allowFocus: (target: HTMLElement) => boolean;
    /** The HTML element to which to append the instructor feedback iframe. Defaults to the body. */
    appendTo: HTMLElement;
    /** Block styles from WYSIWYG editor, if any. */
    editorBlocks?: IBlock[];
    /** If the file can be previewed, this should be the full authenticated URL to such a preview. */
    filePreviewUrl: string;
    /** The specific issue that should be shown, if any */
    issue: RuleName;
    /** The current set of live feedback for the content. If launching for wysiwyg feedback, this would be set. */
    liveFeedback: any;
    /** The locale of the user (e.g., en-us) */
    locale: string;
    /** How the content instance can be found if it's located in supported rich content */
    locator: ILocator;
    /** The id of the supported rich content that this content instance is embedded into, if any */
    richContentId: string;
    /** The target the instructor feedback should be launched in. Defaults to `Target.Iframe` */
    target: Target;
    /** The function that can open a URL in a new window. Defaults to `window.open` */
    windowLauncher: (url: string) => void;
    /** The title of the new window in case the instructor feedback is launched in a new window */
    windowTitle: string;
}

export interface ILaunchCallbacks {
    /** Invoked when the user closes the instructor feedback modal. */
    closed: () => void;
    /**
     * Invoked when the user deletes a file through instructor feedback.
     *
     * @param fileId    The eid of the file that was deleted
     */
    deleted: (fileId: string) => void;
    /**
     * Invoked when the user chooses to automatically fix an html issue through instructor feedback.
     */
    fixHtmlIssue: (ruleName: HtmlRuleNames, locators: string[], fixOptions: unknown) => Promise<void>;
    /**
     * Invoked when the user replaces a file with a new one through instructor feedback.
     *
     * @param oldFileId     The eid of the file that was removed/replaced
     * @param newFileInfo   The [[FileReport]] instance representing the new file that was created in its place
     */
    replacedFile: (oldFileId: string, newFileInfo: FileReport) => void;
    /**
     * Invoked when the user updates a file through instructor feedback.
     *
     * @param newFileInfo   The [[FileReport]] instance representing the new state of the file
     */
    updated: (newFileInfo: FileReport) => void;
    /** The external UI event tracking service. */
    eventTracker?: EventTracker;
}

/** Contains all utilities for launching an instructor feedback modal overtop of the screen. */
export class InstructorFeedback {

    /** Carries the previous launch args that were used to launch instructor feedback. This is recorded for testing. */
    public static previousLaunchArgs: LaunchArgs;

    /**
     * Invoke all handlers bound to content deleted events.
     *
     * @see [[ILaunchCallbacks.deleted]]
     */
    public static emitContentDeleted(fileId: string): void {
        Object.keys(InstructorFeedback.deleteHandlers)
            .map((k) => InstructorFeedback.deleteHandlers[k])
            .forEach((handler) => handler(fileId));
        if (InstructorFeedback.userCallbacks) {
            InstructorFeedback.userCallbacks.deleted(fileId);
        }
    }

    /**
     * Unbind a content deleted handler.
     *
     * @param id    The id provided for the handler when it was originally bound
     * @see [[ILaunchCallbacks.deleted]]
     */
    public static offContentDeleted(id: string): void {
        delete InstructorFeedback.deleteHandlers[id];
    }

    /**
     * Bind a content deleted handler.
     *
     * @param id    The id of the handler. Can be referenced to unbind or replace later
     * @see [[ILaunchCallbacks.deleted]]
     */
    public static onContentDeleted(id: string, handler: (fileId: string) => void): void {
        InstructorFeedback.deleteHandlers[id] = handler;
    }

    /**
     * Invoke all handlers bound to content replaced events.
     *
     * @see [[ILaunchCallbacks.replacedFile]]
     */
    public static emitContentReplaced(oldFileId: string, newFileInfo: FileReport): void {
        Object.keys(InstructorFeedback.replaceHandlers)
            .map((k) => InstructorFeedback.replaceHandlers[k])
            .forEach((handler) => handler(oldFileId, newFileInfo));
        if (InstructorFeedback.userCallbacks) {
            InstructorFeedback.userCallbacks.replacedFile(oldFileId, newFileInfo);
        }
    }

    /**
     * Unbind a content replaced handler.
     *
     * @param id    The id provided for the handler when it was originally bound
     * @see [[ILaunchCallbacks.replacedFile]]
     */
    public static offContentReplaced(id: string): void {
        delete InstructorFeedback.replaceHandlers[id];
    }

    /**
     * Bind a content replaced handler.
     *
     * @param id    The id of the handler. Can be referenced to unbind or replace later
     * @see [[ILaunchCallbacks.replacedFile]]
     */
    public static onContentReplaced(id: string, handler: (oldFileId: string, newFileInfo: FileReport) => void): void {
        InstructorFeedback.replaceHandlers[id] = handler;
    }

    /**
     * Invoke all handlers bound to content updated events.
     *
     * @see [[ILaunchCallbacks.updated]]
     */
    public static emitContentUpdated(fileReport: FileReport): void {
        Object.keys(InstructorFeedback.updatedHandlers)
            .map((k) => InstructorFeedback.updatedHandlers[k])
            .forEach((handler) => handler(fileReport));
        if (InstructorFeedback.userCallbacks) {
            InstructorFeedback.userCallbacks.updated(fileReport);
        }
    }

    /**
     * Unbind a content updated handler.
     *
     * @param id    The id provided for the handler when it was originally bound
     * @see [[ILaunchCallbacks.updated]]
     */
    public static offContentUpdated(id: string): void {
        delete InstructorFeedback.updatedHandlers[id];
    }

    /**
     * Bind a content updated handler.
     *
     * @param id    The id of the handler. Can be referenced to unbind or replace later
     * @see [[ILaunchCallbacks.updated]]
     */
    public static onContentUpdated(id: string, handler: (fileReport: FileReport) => void): void {
        InstructorFeedback.updatedHandlers[id] = handler;
    }

    /**
     * Launch the instructor feedback modal.
     *
     * @param ui                The [[Ui]] instance and associated configuration
     * @param courseId          The id of the course to which the file belongs
     * @param fileReference     The file reference data associated to the content instance being launched
     * @param opts              Launch options
     * @param callerCallbacks   Caller callbacks that can be used to connect functionality to file and instructor
     *                          feedback events. This will be invoked after internal system callbacks, but before the
     *                          user callbacks provided in the [[UiConfig]]
     */
    public static launch(
        ui: Ui,
        courseId: string,
        fileReference: IFileReference,
        opts: PartialFalsey<ILaunchOpts>,
        callerCallbacks: PartialFalsey<ILaunchCallbacks>
    ): void {
        const baseUrl = ui.client.config.baseUrl;
        const lmsUrl = ui.client.config.lmsUrl;
        const platformName = ui.config.platformName;
        const platformUi = ui.config.platformUi;
        const clientId = ui.client.config.clientId;
        const iframeHtml = Templates.instructorFeedbackIframe.apply({
            'ALLY_DOMAIN': ui.client.config.baseUrl,
            'i18n': ui.i18n,
            'locale': ui.config.locale
        });

        // Merge callbacks that handle triggering both the user callbacks specified in the UI configuration and the
        // internal callbacks needed to do things like proactively purge files from caches and fuel functionality such
        // as auto-updating components
        const resolvedCallerCallbacks = UiConfig.resolveInstructorFeedbackCallbacks(callerCallbacks);
        const userCallbacks = InstructorFeedback.userCallbacks = {
            'closed': () => {
                resolvedCallerCallbacks.closed();
                ui.config.instructorFeedback.callbacks.closed();
            },
            'deleted': (fileId) => {
                resolvedCallerCallbacks.deleted(fileId);
                ui.config.instructorFeedback.callbacks.deleted(fileId);
            },
            'fixHtmlIssue': async (ruleName, locators, fixOptions) => {
                // All fixHtmlIssue implementations across codebase must be async functions for unified handling
                await resolvedCallerCallbacks.fixHtmlIssue(ruleName, locators, fixOptions);
                await ui.config.instructorFeedback.callbacks.fixHtmlIssue(ruleName, locators, fixOptions);
            },
            'replacedFile': (oldFileId, newFileInfo) => {
                resolvedCallerCallbacks.replacedFile(oldFileId, newFileInfo);
                ui.config.instructorFeedback.callbacks.replacedFile(oldFileId, newFileInfo);
            },
            'updated': (fileReport) => {
                resolvedCallerCallbacks.updated(fileReport);
                ui.config.instructorFeedback.callbacks.updated(fileReport);
            }
        };
        const callbacks: ILaunchCallbacks = {
            'closed': () => userCallbacks.closed(),
            'deleted': InstructorFeedback.emitContentDeleted,
            'eventTracker': ui.config.eventTracker,
            'fixHtmlIssue': userCallbacks.fixHtmlIssue,
            'replacedFile': InstructorFeedback.emitContentReplaced,
            'updated': InstructorFeedback.emitContentUpdated
        };

        InstructorFeedback.previousLaunchArgs = [
            baseUrl,
            lmsUrl,
            platformName,
            platformUi,
            clientId,
            courseId,
            fileReference,
            iframeHtml,
            opts,
            callbacks
        ];

        InstructorFeedbackUtil.launch.call(null, ...InstructorFeedback.previousLaunchArgs);
    }

    /**
     * Destroy all stateful functionality relating to instructor feedback, such as the extension listeners and any
     * internal iframes that remain available for the duration of the page session.
     */
    public static destroy(): void {
        InstructorFeedbackUtil.reset();
        Object.keys(InstructorFeedback.deleteHandlers).forEach(InstructorFeedback.offContentDeleted);
        Object.keys(InstructorFeedback.replaceHandlers).forEach(InstructorFeedback.offContentReplaced);
        Object.keys(InstructorFeedback.updatedHandlers).forEach(InstructorFeedback.offContentUpdated);
        this.userCallbacks = null;
    }

    private static userCallbacks: ILaunchCallbacks | null = null;

    /** Handlers for create / update / delete events observed through instructor feedback */
    private static deleteHandlers: {[id: string]: (fileId: string) => void} = {};
    private static replaceHandlers: {[id: string]: (oldFileId: string, newFileInfo: FileReport) => void} = {};
    private static updatedHandlers: {[id: string]: (fileReport: FileReport) => void} = {};
}
