
import { RuleName } from '../../rule-name.model';
import {IRuleName} from '../rule.model';
import HtmlDefinitionList from '../rules/HtmlDefinitionList';
import HtmlEmptyHeading from '../rules/HtmlEmptyHeading';
import HtmlEmptyTableHeader from '../rules/HtmlEmptyTableHeader';
import HtmlHasLang from '../rules/HtmlHasLang';
import HtmlHeadingOrder from '../rules/HtmlHeadingOrder';
import HtmlHeadingsPresence from '../rules/HtmlHeadingsPresence';
import HtmlImageAlt from '../rules/HtmlImageAlt';
import HtmlImageRedundantAlt from '../rules/HtmlImageRedundantAlt';
import HtmlLabel from '../rules/HtmlLabel';
import HtmlLinkName from '../rules/HtmlLinkName';
import HtmlList from '../rules/HtmlList';
import HtmlObjectAlt from '../rules/HtmlObjectAlt';
import HtmlTdHasHeader from '../rules/HtmlTdHasHeader';
import HtmlTitle from '../rules/HtmlTitle';
import OrElseScore from './OrElseScore';
import RequiredMultiplierScore from './RequiredMultiplierScore';
import WeightedAverageScore from './WeightedAverageScore';

export const HtmlScore = new RequiredMultiplierScore(
    OrElseScore.fromRuleName(RuleName.HtmlColorContrast, 1),
    OrElseScore.fromRuleName(RuleName.HtmlBrokenLink, 1),
    new WeightedAverageScore(
        // Headings
        [25, OrElseScore.fromRuleName(RuleName.HtmlHeadingsPresence, 1)],
        [6, OrElseScore.fromRuleName(RuleName.HtmlEmptyHeading, 1)],
        [2, OrElseScore.fromRuleName(RuleName.HtmlHeadingsStart, 1)],
        [2, OrElseScore.fromRuleName(RuleName.HtmlHeadingOrder, 1)],

        // Alternative text
        [25, OrElseScore.fromRuleName(RuleName.HtmlImageAlt, 1)],
        [5, OrElseScore.fromRuleName(RuleName.HtmlObjectAlt, 1)],
        // alt text that repeats a button/link's regular text
        [5, OrElseScore.fromRuleName(RuleName.HtmlImageRedundantAlt, 1)],
        // caption checking should be included in the report, but not the score
        [0, OrElseScore.fromRuleName(RuleName.HtmlCaption, 1)],

        // Tables
        [10, OrElseScore.fromRuleName(RuleName.HtmlTdHasHeader, 1)],
        [5, OrElseScore.fromRuleName(RuleName.HtmlEmptyTableHeader, 1)],

        // Minor issues
        [5, OrElseScore.fromRuleName(RuleName.HtmlLinkName, 1)], // all links should have discernible text
        [4, OrElseScore.fromRuleName(RuleName.HtmlLabel, 1)],
        [2, OrElseScore.fromRuleName(RuleName.HtmlTitle, 1)],
        [2, OrElseScore.fromRuleName(RuleName.HtmlHasLang, 1)],
        [1, OrElseScore.fromRuleName(RuleName.HtmlList, 1)],
        [1, OrElseScore.fromRuleName(RuleName.HtmlDefinitionList, 1)],
    )
);

export const HTML_RULE_NAMES = new Map<string, IRuleName>([
    ['definition-list', new HtmlDefinitionList()],
    ['document-title', new HtmlTitle()],
    ['empty-heading', new HtmlEmptyHeading()],
    ['heading-order', new HtmlHeadingOrder()],
    ['html-has-lang', new HtmlHasLang()],
    ['image-alt', new HtmlImageAlt()],
    ['image-redundant-alt', new HtmlImageRedundantAlt()],
    ['label', new HtmlLabel()],
    ['link-name', new HtmlLinkName()],
    ['list', new HtmlList()],
    ['object-alt', new HtmlObjectAlt()],
    ['td-has-header', new HtmlTdHasHeader()],
    ['empty-table-header', new HtmlEmptyTableHeader()],

    // Ally specific rules
    ['ally-headings-presence', new HtmlHeadingsPresence()]
]);
