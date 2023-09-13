
import * as $ from 'jquery';

import {AfStyle} from 'src/integration/api/ui/annotators/web/WebAnnotator';
import {Template} from './Template';

export interface IParams {
    baseUrl: string;
    contentId: string;
    i18n: any;
    style: AfStyle;
}

export class AlternativeFormatsWebLauncherTemplate extends Template<IParams> {
    protected template = require('./alternativeformatsweblauncher.handlebars');

    private iconBlack = require('src/shared/img/icons/iconAllyDownload-IC-Black.svg');
    private iconWhite = require('src/shared/img/icons/iconAllyDownload-IC-White.svg');

    public apply(params: IParams): JQuery<HTMLElement> {
        // Add our icon src urls given the score indicator style
        const templateParams = {
            ...params,
            'iconBlack': this.iconBlack,
            'iconWhite': this.iconWhite
        };
        return $(this.template(templateParams));
    }
}
