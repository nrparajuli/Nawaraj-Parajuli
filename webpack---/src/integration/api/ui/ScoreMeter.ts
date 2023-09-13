
import * as $ from 'jquery';

import { ScoreService } from 'projects/common/feedback/src/services/score.service';
import { II18n } from './Ui';

export function ScoreMeter(
    initialScore: number,
    locale: string,
    i18n: II18n
): { el: HTMLElement, updateScore: (score: number) => void } {
    const viewBoxSize = 155;
    const strokeWidth = 34;
    const radius = (viewBoxSize - strokeWidth) / 2;
    const center = radius + strokeWidth / 2;
    const scoreService = new ScoreService();
    const browserSafeLocale = locale.split('-').shift();

    function calculateDash(score: number): string {
        // Since it's only a half circle, we treat the arc percent as half the score
        const percent = score / 2;
        const dashIn = Math.PI * 2 * radius * percent;
        const dashOut = Math.PI * 2 * radius * (1 - percent);
        return `${dashIn}, ${dashOut}`;
    }

    function renderScoreLabel(score: number): string {
        return scoreService.getScoreDisplay(score).percent.toLocaleString(browserSafeLocale, {'style': 'percent'});
    }

    function renderAccessibilityScoreText(score: number): string {
        const scoreLabel = renderScoreLabel(score);
        const accessibilityScore = i18n.ACCESSIBILITY_SCORE_PERCENT ?
            i18n.ACCESSIBILITY_SCORE_PERCENT.replace('{0}', scoreLabel) : scoreLabel;
        return `${accessibilityScore}\n${i18n.CLICK_TO_IMPROVE}`;
    }

    const $el = $(`
        <button
            type="button" class="ally-score-meter-container ally-add-tooltip"
            aria-label="${renderAccessibilityScoreText(initialScore)}"
            data-ally-tooltip>
            <svg class="ally-score-meter" viewBox="0 0 ${viewBoxSize} ${viewBoxSize / 2}">
                <circle
                    class="ally-score-meter-background"
                    cx="${center}"
                    cy="${center}"
                    fill="none"
                    r="${radius}"
                    stroke="#000"
                    stroke-dasharray="${calculateDash(1)}"
                    stroke-dashoffset="0"
                    stroke-width="${strokeWidth}"
                    transform="rotate(180 ${center} ${center})"
                />
                <circle
                    class="ally-score-meter-foreground"
                    cx="${center}"
                    cy="${center}"
                    fill="none"
                    r="${radius}"
                    stroke-dasharray="${calculateDash(0)}"
                    stroke-dashoffset="0"
                    stroke-width="${strokeWidth}"
                    transform="rotate(180 ${center} ${center})"
                />
            </svg>
            <span class="ally-score-meter-text">${renderScoreLabel(initialScore)}</span>
        </button>
    `);
    const el = $el[0];

    const updateScore = (score: number) => {
        $el.find('.ally-score-meter-foreground').attr('stroke', scoreService.getScoreDisplay(score).level.color);
        $el.find('.ally-score-meter-foreground').attr('stroke-dasharray', calculateDash(score));
        $el.find('.ally-score-meter-text').text(renderScoreLabel(score));
        $el.attr('aria-label', renderAccessibilityScoreText(score));
    };

    setTimeout(() => updateScore(initialScore), 0);

    return {el, updateScore};
}
