
import { ITinyMceV3Editor } from 'src/shared/wysiwyg/tinymce/ITinyMceV3Editor';
import { ITinyMceV4Editor } from 'src/shared/wysiwyg/tinymce/ITinyMceV4Editor';
import { ITinyMceV6Editor } from 'src/shared/wysiwyg/tinymce/ITinyMceV6Editor';
import { ICanHaveTinyMceEditors, ITinyMceEditorListenerOptions, TinyMceEditorListener } from 'src/shared/wysiwyg/tinymce/TinyMceEditorListener';
import { D2lTinyMceEditorController } from './D2lTinyMceEditorController';
import { D2lTinyMceEditorFacade } from './D2lTinyMceEditorFacade';

export class D2lTinyMceEditorListener extends TinyMceEditorListener {

    constructor(
        baseUrl: string,
        i18n: any,
        global: ICanHaveTinyMceEditors,
        hideAccessibilityPlugin: boolean,
        options: ITinyMceEditorListenerOptions,
        protected readonly isNewLessonsExperience: boolean
    ) {
        super(baseUrl, i18n, global, hideAccessibilityPlugin, options);
    }

    // TODO: Add override keyword once on Typescript 4.3
    public mkTinyMceEditorController(instance: ITinyMceV3Editor | ITinyMceV4Editor | ITinyMceV6Editor) {
        const facade = new D2lTinyMceEditorFacade(
            instance,
            this.global.tinymce
        );
        return new D2lTinyMceEditorController(
            this.baseUrl, this.i18n, facade, this.hideAccessibilityPlugin, this.isNewLessonsExperience
        );
    }
}
