import * as $ from 'jquery';

import {Ui} from 'src/integration/api/ui/Ui';
import {D2lConfig} from '../D2lConfig';
import {D2lContentItem} from '../D2lContentItem';
import {ID2lContentItemAnnotator} from '../ID2lContentItemAnnotator';

/**
 * An annotator that annotates the displayed image on the content view page. This is necessary to display a seizure
 * guard in case the image is seizure inducing. Ideally, this annotator would be rolled up into the
 * [[IndividualContentViewAnnotator]], but as the image is lazy-loaded and the annotators only run once, the image would
 * never get annotated properly.
 */
export class ContentViewImageAnnotator implements ID2lContentItemAnnotator {

    public annotate(config: D2lConfig, item: D2lContentItem, ui: Ui): boolean {
        // If this is an image, a seizure guard might be necessary
        item.$el.attr('data-ally-file-eid', item.eid);
        item.$el.attr('data-ally-content-ref', item.id);

        // The score indicator on this view is controlled by the download button (IndividualContentViewItemAnnotator).
        // Update the individual content view annotator's file preview URL, so that when its score indicator is clicked,
        // an image preview is shown in the IF.
        const src = item.$el.attr('src');
        const location = document.location;
        const imgUrl = `${location.protocol}//${location.host}${src}`;
        $('.d2l-button[data-ally-content-id]').attr('data-ally-file-preview-url', imgUrl);
        return true;
    }
}
