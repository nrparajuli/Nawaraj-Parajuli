import {ContentInstance} from 'src/integration/api/ui/ContentInstance';
import {Ui} from 'src/integration/api/ui/Ui';
import {hasValue, orElse, whenHasValue} from 'src/shared/NullUtil';

export class LearnUltraUtil {

    /** Determine if the current window context is a learn ultra context. */
    public static isUltra(window: Window): boolean {
        return window.location.pathname.toLowerCase().startsWith('/ultra/');
    }
}

export function isUltraUi({config}: Ui): boolean {
    return config.platformName === 'learn' &&
        orElse(whenHasValue(config.platformUi, (ui) => ui.startsWith('ultra')), false);
}

export function renderPolicyFilter(ci: ContentInstance): boolean {
    const id = ci.getId();
    if (id.startsWith('bbml-editor-id')) {
        // File viewer doesn't have any metadata, thus only AF icon metadata must be used for render policy
        return ci.$el.parents('bb-file-viewer')
            .find(`*[show-alternative-formats-link="true"][content-id="${id}"]`)
            .length === 1;
    }

    // RTE files have embedded render policy metadata in attributes
    const metadata = whenHasValue(
        ci.$el.parents(`*[data-bbfile]`).attr('data-bbfile'), JSON.parse
    );

    return !(hasValue(metadata) &&
        metadata.render === 'inlineOnly' &&
        metadata.resourceUrl === ci.getFilePreviewUrl());
}
