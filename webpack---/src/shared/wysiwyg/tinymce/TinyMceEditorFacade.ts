import * as $ from 'jquery';

import {HtmlPreviewDriver} from 'src/integration/api/ui/annotators/web/HtmlPreviewDriver';
import {IBlock} from 'src/integration/api/ui/InstructorFeedback';
import {hasValue, orElse, whenHasValue} from 'src/shared/NullUtil';
import {enterFullscreen, exitFullscreen, IFullscreenInfo} from 'src/shared/tinymce/canvas/Fullscreen';
import {ITinyMceV3Editor} from 'src/shared/wysiwyg/tinymce/ITinyMceV3Editor';
import {ITinyMceSubMenuItem, ITinyMceV4Editor} from 'src/shared/wysiwyg/tinymce/ITinyMceV4Editor';
import {ITinyMceV6Editor} from 'src/shared/wysiwyg/tinymce/ITinyMceV6Editor';
import {parseBlockLevel} from 'src/shared/wysiwyg/WysiwygFeedbackUtil';
import {ITinyMceEditorFacade} from './ITinyMceEditorFacade';

const A11Y_CSS_ID = 'ally-a11y-styles';
const ALLY_IF_INSTRUCTURE_HEADER = 'ally-if-canvas-header';
const INSTRUCTURE_MENU_ITEM_CLASS = '.tox-mbtn';
const A11Y_CHECKER_CSS = `<style id="${A11Y_CSS_ID}" type='text/css'>
/** Hiding the native a11y wysiwyg buttons in Canvas and D2l */
body.ally-wysiwyg-feedback-active [data-btn-id="rce-a11y-btn"],
body.ally-wysiwyg-feedback-active span > [data-btn-id="rce-a11y-btn"] + span,
body.ally-wysiwyg-feedback-active .mce-i-a11y {
    display: none !important;
}
</style>`;

/**
 * Represents the model we care about for the global TinyMCE object.
 *
 * Note that we encode a simple type in here instead of import @types/tinymce because we need to work with various
 * versions of TinyMCE, so carrying a static set of types in the node_modules is not a valid approach for our use-case.
 */
export interface ITinyMce {
    /** The array of editors. We support TinyMCE v3 and v4 */
    editors?: Array<ITinyMceV3Editor | ITinyMceV4Editor | ITinyMceV6Editor>;
    /** The TinyMCE major version. */
    majorVersion: string;
    /** The TinyMCE minor version. */
    minorVersion: string;
    /** The editors for TinyMCE v6 are obtained this method */
    get?(): ITinyMceV6Editor[];
}

/** Represents a collection of listeners in the TinyMCE v3 editor model. */
export interface ITinyMceV3ListenersObject<F extends (...args: any[]) => any = () => void> {
    /** The list of listener callbacks, with an unused scope. */
    listeners: Array<{
        cb: F;
        scope: ITinyMceV3Editor;
    }>;
}

/** Represents a serialization node of the TinyMCE editor. */
export interface ITinyMceNode {
    /** Element lookup name. */
    name: string;
    /** Element attributes. */
    attributes: Array<{
        name: string;
        value: string;
    }>;
}

/** Represents a serialization filter structure for the TinyMCE editor. */
export type TinyMceNodes = {
    map: { [_: string]: string };
} & ITinyMceNode[];

/** Represents a serialization filter for the TinyMCE editor. */
export type ITinyMceSerializerFilter = (n: TinyMceNodes, name: string) => void;

/** Represents editor style item */
export interface ITinyMceV3ControlItem {
    /** Title of item */
    title: string;
    /** Html tag associated with style */
    value: string;

    /**
     * Html style used in RCE dropdown.
     *
     * A function is returned if the drop-down hasn't been opened yet. A string will be returned if the dropdown has
     * been engaged with by the user already.
     */
    style?: (() => string) | string;
}

export interface ITinyMceEditorGetContentOptions {
    /**
     * Whether to disable further manipulations on the content view.
     *
     * This is relevant for Learn original, as a falsy value will cause any LaTeX formulas to be rendered to an image
     * on each invocation of editor.getContent(). It's very much recommended to always pass in `true`.
     */
    'source_view': boolean;
}

/**
 * Represents the lowest common denominator of operations we need to interact with an TinyMCE controller as we do
 * WYSWIYG feedback. This controller federates functionality across different versions of TinyMCE editors.
 */
export class TinyMceEditorFacade implements ITinyMceEditorFacade {

    /** Filter out custom attributes from serialized result. */
    public static filterAttributes(nodes: TinyMceNodes, attribute: string) {
        nodes.forEach((n) => {
            for (let i = 0; i < n.attributes.length; i++) {
                if (n.attributes[i].name === attribute) {
                    n.attributes.splice(i, 1);
                    break;
                }
            }
        });
        delete nodes.map[attribute];
    }

    /** Transforms CSS string into object. */
    private static parseStyles(styles?: string): { [_: string]: string } {
        const style: { [_: string]: string } = {};

        if (hasValue(styles)) {
            styles.split(';')
                .map((l) => l.trim())
                .filter((l) => l.length > 0)
                .forEach((l) => {
                    const attr = l.split(':')[0];
                    style[attr.trim()] = l.substring(attr.length + 1)
                        .replace(/"/g, '\'')
                        .trim();
                });
        }
        return style;
    }

    private static getEditor(editor: ITinyMceV4Editor| ITinyMceV6Editor): [HTMLElement, HTMLIFrameElement] | undefined {
        const container = editor.getContainer();
        const iframe = editor.iframeElement;

        if ((!hasValue(container) || !hasValue(iframe))) {
            return;
        }
        return [container, iframe];
    }

    private static getViewButton(editor: ITinyMceV4Editor | ITinyMceV6Editor) {
        const viewButtonNameSelector =
                `${INSTRUCTURE_MENU_ITEM_CLASS}:button:contains(${editor.settings.menu?.view?.title})`;
        return $(viewButtonNameSelector);
    }

    private fullscreenInfo?: IFullscreenInfo;
    private lastChangeContent?: string;
    private changeCallbacks: Array<() => void> = [];
    private currentViewButtonDisplayValue: string = '';

    constructor(
        /** The TinyMCE editor to interact with. */
        public readonly editor: ITinyMceV3Editor | ITinyMceV4Editor | ITinyMceV6Editor,
        /** The global tinymce object. */
        private readonly tinymce: ITinyMce = (window as any).tinymce,
        /** Invoked whenever a change callback throws an error. */
        private readonly changeErrorHandler: (err: any) => void =
            (err) => console.error('Failed calling change callback', err)
    ) {

        // Single change callback that will be bound across all different ways the editor can signal content changes
        const changeCallback = () => {
            const content = this.getContent();
            if (content !== this.lastChangeContent) {
                this.lastChangeContent = content;
                this.changeCallbacks.forEach((cb) => {
                    try {
                        cb();
                    } catch (err) {
                        this.changeErrorHandler(err);
                    }
                });
            }
        };

        if (this.isV3(editor)) {
            this.addListenerV3(editor, editor.onChange, changeCallback);
            this.addListenerV3(editor, editor.onKeyUp, changeCallback);
            this.addListenerV3(editor, editor.onSetContent, changeCallback);
            this.chainDestroy(() => this.changeCallbacks.length = 0);
        } else {
            editor.on('change', changeCallback);
            editor.on('keyup', changeCallback);
            editor.on('SetContent', changeCallback);
            this.chainDestroy(() => {
                editor.off('change', changeCallback);
                editor.off('keyup', changeCallback);
                editor.off('SetContent', changeCallback);
                this.changeCallbacks.length = 0;
            });
        }

        this.onInit(() => {
            // Filter out any custom attributes used for ally highlighting
            editor.serializer.addAttributeFilter(
                Object.values(HtmlPreviewDriver.customAttributes).join(','), TinyMceEditorFacade.filterAttributes
            );
        });
    }

    public annotateEditor(): void {
        whenHasValue(this.editor.getContainer(), (container) =>
            $(container).addClass('ally-wysiwyg-feedback-tinymce')
        );
    }

    /**
     * Bind an initialization handler. If the editor has already initialized, the callback function will be invoked
     * right away.
     */
    public onInit(cb: () => void): void {
        if (this.isV3(this.editor)) {
            if (this.editor.initialized) {
                cb();
            } else {
                this.addListenerV3(this.editor, this.editor.onInit, cb);
            }
        } else {
            const editor = this.editor;
            if (editor.initialized) {
                cb();
            } else {
                editor.on('init', () => cb());
                this.chainDestroy(() => editor.off('init', cb));
            }
        }
    }

    /**
     * Bind a change listener, invoking the function whenever the editor contents have changed.
     *
     * @param cb The callback to run when the editor contents have changed
     */
    public onChange(cb: () => void): void {
        this.changeCallbacks.push(cb);
    }

    /**
     * Bind a pre-process listener, allowing us to change the editor contents as its being converted to raw HTML.
     *
     * @param cb The callback to run when the editor contents are being converted to raw HTML
     */
    public onPreProcess(cb: (ctx: { node: HTMLElement }) => void): void {
        if (this.isV3(this.editor)) {
            const listener = () => cb({'node': this.editor.getDoc().body});
            this.addListenerV3(this.editor, this.editor.onPreProcess, listener);
            this.addListenerV3(this.editor, this.editor.onRedo, listener);
            this.addListenerV3(this.editor, this.editor.onUndo, listener);
        } else {
            const editor = this.editor;

            const cleanUndoCb = () => cb({'node': editor.getDoc().body});
            editor.on('PreProcess', cb);
            editor.on('Redo', cleanUndoCb);
            editor.on('Undo', cleanUndoCb);
            this.chainDestroy(() => {
                editor.off('PreProcess', cb);
                editor.off('Redo', cleanUndoCb);
                editor.off('Undo', cleanUndoCb);
            });
        }
    }

    /** Determines if the editor is configured in a way that can be supported for wysiwyg feedback. */
    public isSupported(): boolean {
        if (this.isV3(this.editor)) {
            // We don't need fullscreen capability for v3 because its editor area scrolls
            return true;
        } else {
            // We can't support v4 if it can't full-screen because otherwise we don't have a strategy to scroll the
            // interior editor contents. At the moment that can only be achieved in supported configurations by
            // going into fullscreen mode. Technically, it depends on how the "tinymce.init" was executed by the
            // host page
            return hasValue(this.editor.plugins.fullscreen) ||
                hasValue(this.editor.plugins.instructure_fullscreen);
        }
    }

    /** Get the root content container element of the editor contents. */
    public getContainer(): HTMLElement | null {
        return this.editor.getContainer();
    }

    /** Get the HTML document of the editor contents. This might be embedded in an iframe. */
    public getDocument(): Document {
        return this.editor.getDoc();
    }

    /** Get the raw HTML content of the editor contents. */
    public getContent(): string {
        // ALLYPD-6147: Pass in source_view: true so that LaTeX formulas aren't rendered each time the content is
        // requested. This is disastrous performance-wise otherwise as TinyMCE makes various HTTP requests to render
        // the formula to an image
        return this.editor.getContent({'source_view': true});
    }

    public getBlocks(): IBlock[] {
        if (this.isV3(this.editor)) {
            return this.getBlocksV3(this.editor);
        } else if (this.isV4orV5(this.editor)) {
            return this.getBlocksV4V5V6(this.editor);
        } else {
            return this.getBlocksV4V5V6(this.editor);
        }
    }

    /** Update the raw HTML contents of the editor. */
    public saveContent(content: string): void {
        this.editor.setContent(content);
        this.editor.save();
    }

    /** Hide any non-Ally TinyMCE accessibility plugins. */
    public hideAccessibilityPlugin(): void {
        if (!this.isV3(this.editor) && hasValue(this.editor.ui)) {
            // The accessibility button doesn't have any uniquely identifying features to identify it by in CSS. Look up
            // its tooltip value and disable it that way.
            const container = this.getContainer();
            const {a11ycheck} = this.editor.ui.registry.getAll().buttons;
            if (hasValue(a11ycheck) && hasValue(container)) {
                $(container).find(`button[title="${a11ycheck.tooltip}"]`).css('display', 'none');
            }
        }
        if ($(`#${A11Y_CSS_ID}`).length === 0) {
            $('head').append(A11Y_CHECKER_CSS);
        }
    }

    /**
     * Expand and position the editor such that it is in "Full screen" mode overlaying instructor feedback. This is
     * not synonymous with the 'Fullscreen' functionality of TinyMCE, as we custom positioning and z-index needs.
     */
    public ensureFullScreen(): void {
        if (this.isV3(this.editor)) {
            whenHasValue(this.editor.getContainer(), (container) => {
                const $container = $(container);

                // If we're in fullscreen mode, the fullscreen container should be static and not fixed (so it does not
                // cover the instructor feedback)
                $container.parents('#mce_fullscreen_container').css('position', 'static');

                // User cannot change the fullscreen status
                $container.find('.mce_fullscreen').css('display', 'none');
            });
        } else if (hasValue(this.editor.plugins.instructure_fullscreen)) {
            this.enableInstructureFullscreen(this.editor);
        } else if (!orElse(this.editor.plugins.fullscreen?.isFullscreen(), false)) {
            // We have to ensure the editor goes into proper "fullscreen" mode because in LMS where the editor is not
            // in full screen, the contents of the editor will not be scrollable. Thus by going into fullscreen mode,
            // we tell TinyMCE that the height of the editor content pane is fixed, thus it will allow the content to
            // scroll
            this.editor.execCommand('mceFullscreen');
        }
        this.getFullscreenContainer()?.classList.add('ally-wysiwyg-feedback-tinymce-fullscreen');
    }

    /** Exit "full screen" mode and go back to the default view of the editor. */
    public ensureNotFullScreen(): void {
        if (this.isV3(this.editor)) {
            whenHasValue(this.editor.getContainer(), (container) => {
                const $container = $(container);
                // If we're in fullscreen mode, the fullscreen container should be static and not fixed (so it does not
                // cover the instructor feedback)
                $container.parents('#mce_fullscreen_container').css('position', 'fixed');

                // The user can now toggle fullscreen again
                $container.find('.mce_fullscreen').css('display', 'block');
            });
        } else if (hasValue(this.editor.plugins.instructure_fullscreen)) {
            this.disableInstructureFullscreen(this.editor);
        } else if (orElse(this.editor.plugins.fullscreen?.isFullscreen(), false)) {
            this.editor.execCommand('mceFullscreen');
        }
        this.getFullscreenContainer()?.classList.remove('ally-wysiwyg-feedback-tinymce-fullscreen');
    }

    /**
     * Bind a listener, invoking whenever the user has changed the fullscreen state of the editor.
     *
     * @param cb The function to run when the fullscreen state has changed
     */
    public onFullScreenStateChanged(cb: (isFullscreen: boolean) => void) {
        if (!this.isV3(this.editor)) {
            const editor = this.editor;
            const fn = (ev: { state: boolean }) => cb(ev.state);
            editor.on('FullscreenStateChanged', fn);
            this.chainDestroy(() => editor.off('FullscreenStateChanged', fn));
        }
    }

    /** Unbind all listeners we have for the editor. */
    public destroy(): void {
        this.doDestroy();
        this.doDestroy = () => undefined;
    }

    /** Get the HTML element that needs to be full-screened inside of the IF */
    protected getFullscreenContainer(): HTMLElement | null {
        return this.editor.getContainer();
    }

    /** A mutable destroy function which changes based on new operations that are applied. */
    private doDestroy: () => void = () => undefined;

    private addListenerV3<F extends (...args: any[]) => any>(
        editor: ITinyMceV3Editor,
        listeners: ITinyMceV3ListenersObject<F>,
        cb: F
    ): void {
        listeners.listeners.push({
            cb,
            'scope': editor,
        });
        this.chainDestroy(() => {
            const i = listeners.listeners.findIndex((obj) => obj.cb === cb);
            listeners.listeners.splice(i, 1);
        });
    }

    private chainDestroy(f: () => void): void {
        const prevDestroy = this.doDestroy;
        this.doDestroy = () => {
            prevDestroy();
            f();
        };
    }

    private isV3(editor: ITinyMceV3Editor | ITinyMceV4Editor | ITinyMceV6Editor): editor is ITinyMceV3Editor {
        return this.tinymce.majorVersion === '3';
    }
    private isV4orV5(editor: ITinyMceV4Editor | ITinyMceV6Editor): editor is ITinyMceV4Editor {
        return this.tinymce.majorVersion === '4' || this.tinymce.majorVersion === '5';
    }

    private getBlocksV3(editor: ITinyMceV3Editor): IBlock[] {
        if (!hasValue(editor.controlManager) || !hasValue(editor.controlManager.controls)) {
            return [];
        }

        const formatSelectKey = Object.keys(editor.controlManager.controls)
            .find((k) => k.endsWith('_formatselect'));
        if (hasValue(formatSelectKey)) {
            const items = orElse(
                editor.controlManager.controls[formatSelectKey].items, []
            );

            return items.map((i: ITinyMceV3ControlItem) => {
                let style: string | undefined;
                if (hasValue(i.style) && typeof i.style === 'string') {
                    style = i.style;
                } else if (hasValue(i.style) && typeof i.style === 'function') {
                    style = i.style();
                }
                return {
                    'level': parseBlockLevel(i.value),
                    'name': $.trim(i.title),
                    'style': TinyMceEditorFacade.parseStyles(style),
                    'tag': i.value
                };
            });
        }

        return [];
    }

    private getMenuItems<E extends ITinyMceV4Editor | ITinyMceV6Editor>(e: E):
        ReturnType<NonNullable<E['ui']>['registry']['getAll']>['menuItems'] | undefined {
        return e.ui?.registry.getAll()?.menuItems;
    }

    private getBlocksV4V5V6(editor: ITinyMceV4Editor | ITinyMceV6Editor): IBlock[] {
        if (hasValue(editor.ui) &&
            hasValue(editor.ui.registry)) {
            const blocks = this.isV4orV5(editor) ?
                this.getMenuItems(editor)?.blockformats :
                this.getMenuItems(editor)?.blocks;

            if (hasValue(blocks)) {
                const subMenuItems = orElse(blocks.getSubmenuItems(), []);

                return subMenuItems.map((i: ITinyMceSubMenuItem) => {
                    return {
                        'level': parseBlockLevel(i.meta.style.tag),
                        'name': $.trim(i.text),
                        'style': i.meta.style.styles,
                        'tag': i.meta.style.tag,
                    };
                });
            }
        }

        return [];
    }

    /**
     * Enable the fullscreen of the editor in Canvas.
     * Also removes the View button, and replaces it, as changing the view while in IF should not be allowed.
     * @param editor Reference to the TinyMCE instance
     */
    private enableInstructureFullscreen(editor: ITinyMceV4Editor | ITinyMceV6Editor) {
        whenHasValue(TinyMceEditorFacade.getEditor(editor), ([container, iframe]) => {
            if (!hasValue(this.fullscreenInfo)) {
                $('header').addClass(ALLY_IF_INSTRUCTURE_HEADER);
                const viewButton = TinyMceEditorFacade.getViewButton(editor);
                this.currentViewButtonDisplayValue = orElse(viewButton.css('display'), '');
                viewButton.css('display', 'none');
                this.fullscreenInfo = enterFullscreen(container, iframe);
            }
        });
    }

    /**
     * Disable the fullscreen of the editor in Canvas.
     * @param editor Reference to the TinyMCE instance
     */
    private disableInstructureFullscreen(editor: ITinyMceV4Editor | ITinyMceV6Editor) {
        whenHasValue(TinyMceEditorFacade.getEditor(editor), ([container, iframe]) => {
            whenHasValue(this.fullscreenInfo, (info) => {
                $('header').removeClass(ALLY_IF_INSTRUCTURE_HEADER);
                TinyMceEditorFacade.getViewButton(editor)?.css('display', this.currentViewButtonDisplayValue);
                this.currentViewButtonDisplayValue = '';
                exitFullscreen(
                    container,
                    iframe,
                    info
                );
            });
            this.fullscreenInfo = undefined;
        });
    }
}
