
import {FileType} from 'src/shared/file-type.model';
import {LmsType} from 'src/shared/lms-type.model';
import {RuleName} from 'src/shared/rule-name.model';

import {HtmlRuleName} from '../rule.model';

export default class HtmlHeadingsStart extends HtmlRuleName {
    public name: RuleName = RuleName.HtmlHeadingsStart;
    public appliesTo = (lmsType: LmsType): Set<FileType> => {
        switch (lmsType) {
            case LmsType.Web:
            case LmsType.Wcm:
                // Web and Wcm fragments are webpages, so their headings can start at any level.
                // No need to check it for their content
                return new Set();
            case LmsType.Moodle:
            case LmsType.Learn:
            case LmsType.Canvas:
            case LmsType.D2l:
            case LmsType.Schoology:
                // Lms fragments are embedded in a page that likely already has headings.
                // Ensure that the WYSIWYG content does not clash with the LMS its headings
                return new Set([FileType.HtmlFragment]);
        }
    }
}
