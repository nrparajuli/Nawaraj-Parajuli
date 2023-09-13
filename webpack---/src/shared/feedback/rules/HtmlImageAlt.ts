
import {FileType} from 'src/shared/file-type.model';
import {LmsType} from 'src/shared/lms-type.model';
import {RuleName} from 'src/shared/rule-name.model';

import {HtmlRuleName} from '../rule.model';

export default class HtmlImageAlt extends HtmlRuleName {
    public name: RuleName = RuleName.HtmlImageAlt;
    public appliesTo = (_: LmsType): Set<FileType> => new Set([FileType.HtmlFragment, FileType.HtmlPage]);
}
