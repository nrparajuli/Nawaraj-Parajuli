
import {FileType} from 'src/shared/file-type.model';
import {LmsType} from 'src/shared/lms-type.model';
import {RuleName} from 'src/shared/rule-name.model';

export interface IRuleName {
    name: RuleName;
    canPreview: boolean;

    appliesTo(lmsType: LmsType): Set<FileType>;
}

export abstract class HtmlRuleName implements IRuleName {
    public canPreview: boolean = true;
    public abstract name: RuleName;

    public abstract appliesTo(lmsType: LmsType): Set<FileType>;
}
