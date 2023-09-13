
import {FileType} from 'src/shared/file-type.model';
import {LmsType} from 'src/shared/lms-type.model';
import {RuleName} from 'src/shared/rule-name.model';

import {HtmlRuleName} from '../rule.model';

export default class HtmlHasLang extends HtmlRuleName {
    public name: RuleName = RuleName.HtmlHasLang;

    public appliesTo = (lmsType: LmsType): Set<FileType> => {
        switch (lmsType) {
            case LmsType.Web:
            case LmsType.Wcm:
                // Web and Wcm fragments are webpages, so may have a missing lang attribute
                return new Set([FileType.HtmlPage, FileType.HtmlFragment]);
            case LmsType.Moodle:
            case LmsType.Learn:
            case LmsType.Canvas:
            case LmsType.D2l:
            case LmsType.Schoology:
                // Lms fragments are embedded, so cannot have a missing lang attribute
                return new Set([FileType.HtmlPage]);
        }
    }
}
