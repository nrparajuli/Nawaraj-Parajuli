
import { IScoreDisplay } from '../models/score-display.model';
import { IScoreLevel, IScoreLevelIcons, ScoreLevelId } from '../models/score-level.model';

export class ScoreService {

    /** Get the [[IScoreDisplay]] for the specified raw score. */
    public getScoreDisplay(decimal: number): IScoreDisplay {
        const percent = Math.floor(decimal * 100) / 100;
        const level = this.getScoreLevel(percent);
        return {level, percent};
    }

    /** Get the [[IScoreDisplay]] for the specified score level id. */
    public getScoreDisplayForLevelId(scoreLevelId: ScoreLevelId): IScoreDisplay {
        const percent = this.getRepresentativeScore(scoreLevelId);
        const level = this.getScoreLevel(percent);
        return {level, percent};
    }

    /** Get the score level for the given score percentage */
    private getScoreLevel(percent: number): IScoreLevel {
        const id = this.getScoreLevelId(percent);
        const color = this.getScoreLevelColor(id);
        const icons = this.getScoreLevelIcons(id);
        const i18nKey = this.getScoreLevelI18nKey(id);
        return {color, i18nKey, icons, id};
    }

    /** Get the score level id for the given score percentage */
    private getScoreLevelId(percent: number): ScoreLevelId {
        if (percent <= 0.33) {
            return 'low';
        } else if (percent <= 0.66) {
            return 'medium';
        } else if (percent === 1) {
            return 'perfect';
        } else {
            return 'high';
        }
    }

    /** Get a representative numerical score for a given score level */
    private getRepresentativeScore(scoreLevelId: ScoreLevelId): number {
        switch (scoreLevelId) {
            case 'low':
                return 0;
            case 'medium':
                return 0.34;
            case 'high':
                return 0.67;
            case 'perfect':
                return 1;
        }
    }

    private getScoreLevelColor(scoreLevelId: ScoreLevelId): string {
        switch (scoreLevelId) {
            case 'low':
                return '#E30100';
            case 'medium':
                return '#DC7C01';
            case 'high':
                return '#71A63E';
            case 'perfect':
                return '#009B02';
        }
    }

    /** Get the score level icons set for the given score level id */
    private getScoreLevelIcons(id: ScoreLevelId): IScoreLevelIcons {
        switch (id) {
            case 'low':
                return {
                    'circle': require('src/integration/img/ally-icon-indicator-low-circle.svg'),
                    'standard': require('src/integration/img/ally-icon-indicator-low.svg'),
                };
            case 'medium':
                return {
                    'circle': require('src/integration/img/ally-icon-indicator-medium-circle.svg'),
                    'standard': require('src/integration/img/ally-icon-indicator-medium.svg'),
                };
            case 'high':
                return {
                    'circle': require('src/integration/img/ally-icon-indicator-high-circle.svg'),
                    'standard': require('src/integration/img/ally-icon-indicator-high.svg'),
                };
            case 'perfect':
                return {
                    'circle': require('src/integration/img/ally-icon-indicator-perfect-circle.svg'),
                    'standard': require('src/integration/img/ally-icon-indicator-perfect.svg'),
                };
        }
    }

    /** Get the i18n key describing the given score level id */
    private getScoreLevelI18nKey(id: ScoreLevelId): string {
        switch (id) {
            case 'low':
                return 'ACCESSIBILITY_SCORE_LOW';
            case 'medium':
                return 'ACCESSIBILITY_SCORE_MEDIUM';
            case 'high':
                return 'ACCESSIBILITY_SCORE_HIGH';
            case 'perfect':
                return 'ACCESSIBILITY_SCORE_PERFECT';
        }
    }
}
