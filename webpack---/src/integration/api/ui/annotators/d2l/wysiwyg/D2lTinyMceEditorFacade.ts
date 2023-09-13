
import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';

import { TinyMceEditorFacade } from 'src/shared/wysiwyg/tinymce/TinyMceEditorFacade';
import {parseBlockLevel, parseBlockStyles} from 'src/shared/wysiwyg/WysiwygFeedbackUtil';
import { IBlock } from '../../../InstructorFeedback';

export class D2lTinyMceEditorFacade extends TinyMceEditorFacade {

    // TODO: Add override keyword once on Typescript 4.3
    public isSupported(): boolean {
        // Everything is in place to support WYSIWYG support for D2L.
        return true;
    }

    // TODO: Add override keyword once on Typescript 4.3
    public ensureFullScreen(): void {
        this.getFullscreenContainer().classList.add('ally-wysiwyg-feedback-tinymce-fullscreen');
        this.toggleFullScreen(true);
    }

    // TODO: Add override keyword once on Typescript 4.3
    public ensureNotFullScreen(): void {
        this.getFullscreenContainer().classList.remove('ally-wysiwyg-feedback-tinymce-fullscreen');
        this.toggleFullScreen(false);
    }

    // TODO: Add override keyword once on Typescript 4.3
    public getBlocks(): IBlock[] {
        // D2L doesn't use any TinyMCE configuration to display the formatting options. They have a custom toolbar
        // that invokes TinyMCE commands. Scrape the available commands from there. The structure looks as follows:
        // <d2l-htmleditor>
        //   <shadowRoot>
        //     <d2l-htmleditor-toolbar-full>
        //       <shadowRoot>
        //         ..
        //           <div class="d2l-htmleditor-toolbar-actions">
        //             <div>
        //               <d2l-htmleditor-button-menu text="Format">
        //                 <d2l-dropdown-menu>
        //                   <d2l-menu>
        //                     <d2l-htmleditor-menu-item value="p" cmd="formatBlock">
        //                       <p slot="text">Paragraph</p>
        //                     </d2l-htmleditor-menu-item>
        //                   </d2l-menu>
        //                  </d2l-dropdown-menu>
        //                <d2l-htmleditor-button-menu>
        //               </div>
        //             </div>
        //           ..
        //         </d2l-htmleditor-toolbar-full>
        //       </shadowRoot>
        //     </d2l-htmleditor-toolbar-full>
        //   </shadowRoot>
        // </d2l-htmleditor>
        //
        // Note that D2L has an additional block format 'Blockquote'. We won't support this as this can be used in
        // combination with a heading and makes the IF interaction too complicated.
        const toolbar = this.getHtmlEditorToolbar();
        const formatOptionEls = toolbar?.shadowRoot?.querySelectorAll('d2l-htmleditor-menu-item[cmd="formatBlock"]');
        if (NullUtil.hasValue(formatOptionEls)) {
            return Array
                .from(formatOptionEls)
                .map((el) => {
                    const name = el.textContent;
                    const tag = el.getAttribute('value');

                    const level = parseBlockLevel(NullUtil.orElse(tag, ''));
                    return {
                        level,
                        name,
                        'style': parseBlockStyles($(el).find(tag)),
                        tag,
                    };
                })
                .filter((o) => NullUtil.hasValue(o.name) && NullUtil.hasValue(o.tag)) as IBlock[];
        }

        return [];
    }

    public getHtmlEditorToolbar(): Element | null | undefined {
        const shadowRoot = this.getHtmlEditorComponent()?.shadowRoot;
        return shadowRoot?.querySelector('d2l-htmleditor-toolbar-full');
    }

    /**
     * Get a reference to the `d2l-htmleditor` element.
     *
     * This can be wrapped inside the shadow DOM of other components (e.g. new lesson tool).
     */
    public getHtmlEditorComponent(): HTMLElement | undefined {
        // In the standard content experience (e.g. /d2l/le/content/6754/Home) the html editor is a component under
        // d2l-htmleditor
        let $htmlEditor = $('d2l-htmleditor');
        if ($htmlEditor.length > 1) {
            // Note that in the standard content experience, it's possible for multiple editors to be active
            // at the same time. Ensure that the correct component is returned
            $htmlEditor = $htmlEditor.filter((i, el) => {
                const els = Array.from(el.shadowRoot!.querySelectorAll('.ally-wysiwyg-feedback-tinymce'));
                return NullUtil.hasValue(els.find((e) => e === this.getContainer()));
            });
        }

        // In the new lessons experience (e.g. /d2l/le/lessons/6757/units/1775) the html editor is a component under
        // another component called new-html-editor
        const $newHtmlEditor = $('new-html-editor');
        if ($newHtmlEditor.length > 0) {
            $htmlEditor = $($newHtmlEditor[0].shadowRoot!.firstElementChild!);
        }

        return $htmlEditor[0];
    }

    // TODO: Add override keyword once on Typescript 4.3
    protected getFullscreenContainer(): HTMLElement {
        // In the new lessons experience (e.g. /d2l/le/lessons/6757/units/1775) the new-html-editor component can be
        // full-screened
        const $newHtmlEditor = $('new-html-editor');
        if ($newHtmlEditor.length > 0) {
            return $('new-html-editor')[0];
        }

        // In the standard content experience (e.g. /d2l/le/content/6754/Home) the d2l-htmleditor can be full-screened
        return this.getHtmlEditorComponent()!;
    }

    /** Enable or disable full screen mode of the editor */
    private toggleFullScreen(fullScreen: boolean): void {
        // Hide the full screen button when in IF mode as it could lead to wacky scenarios if the button was actionable
        // otherwise. Unfortunately, D2L uses tons of nested web components, so a few shadow roots need to be traversed
        // before we get to the actual button element
        const shadowRoot = this.getHtmlEditorComponent()?.shadowRoot;
        const container = shadowRoot?.querySelector('.d2l-htmleditor-container') as HTMLDivElement | null;
        if (NullUtil.hasValue(container)) {
            const toolbar = shadowRoot?.querySelector('d2l-htmleditor-toolbar-full');
            const fullScreenToggle = toolbar?.shadowRoot?.querySelector<HTMLElement>('[cmd="d2l-fullscreen"]');
            if (fullScreen) {
                container.classList.add('ally-fullscreen');
                if (NullUtil.hasValue(fullScreenToggle)) {
                    const fullScreenToggleButton = fullScreenToggle.shadowRoot?.querySelector('button');
                    const currentlyInFullScreen = fullScreenToggleButton?.getAttribute('aria-pressed') === 'true';
                    if (currentlyInFullScreen) {
                        // Ally wants to go full screen, but the D2L editor is already in full-screen. Unfortunately,
                        // the D2l full screen and IF don't play nice together.
                        // Drop the D2L editor back into normal view and then blow up the Ally full screen mode
                        fullScreenToggleButton?.click();
                    }

                    fullScreenToggle.style.display = 'none';
                }
            } else {
                container.classList.remove('ally-fullscreen');
                if (NullUtil.hasValue(fullScreenToggle)) {
                    fullScreenToggle.style.display = 'unset';
                }
            }
        }
    }
}
