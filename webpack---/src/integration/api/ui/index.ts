
import * as $ from 'jquery';

import { enableTooltips } from 'src/shared/tscomponents/tooltip/TooltipUtil';
import { IClient } from '../client/client.model';
import { Clientable, from } from '../client/ClientFactory';
import { D2lAnnotator } from './annotators/D2lAnnotator';
import { MoodleAnnotator } from './annotators/moodle/MoodleAnnotator';
import { SchoologyAnnotator } from './annotators/SchoologyAnnotator';
import { WcmAnnotator } from './annotators/WcmAnnotator';
import { WebAnnotator } from './annotators/web/WebAnnotator';
import {JsUiFactory, Ui} from './Ui';

export function client(obj: Clientable): IClient {
    return from(obj);
}

export const ui = JsUiFactory;

// Apply annotators on first load
const $allyLoader = $('script[data-ally-loader]');
/* istanbul ignore next */
const clientInfoSupplier = (v: Ui) => v.client.getClientInfo(v.config.courseId);

// tslint:disable: no-floating-promises
MoodleAnnotator.annotate($('body'), $allyLoader, window, clientInfoSupplier);
WebAnnotator.annotate(window, window.parent, $allyLoader);
D2lAnnotator.annotate($('body'), location.href, $allyLoader, clientInfoSupplier);
WcmAnnotator.annotate(window, window.parent, $allyLoader);
SchoologyAnnotator.annotate($('body'), location.href, $allyLoader);

enableTooltips();
