import * as $ from 'jquery';
import { ProtoframePubsub } from 'protoframe';
import * as NullUtil from 'src/shared/NullUtil';

import { feedbackProtocol, IFeedbackProtocol } from './FeedbackProtocol';
import { IAxeConsumer, IFeedbackProvider } from './FeedbackProvider';

export interface IFeedbackProviderFactory {

    provide(consumer: IAxeConsumer): IFeedbackProvider;

}

/**
 * The default factory responsible for Ally AX check. In it's core an iframe gets created and attached
 * to the main window, subsequently a connection between the main window and iframe gets established. This
 * pipe is then used to pass messages from the window to the iframe, the message body contains the HTML
 * fragment submitted for the AX check. Each HTML payload then replaces the body of the iframe and AX
 * checks are being performed. The result of such check is then passed to the provided consumer - this
 * would usually be a REST API call that evaluates the AX results.
 */
export class DefaultFeedbackProviderFactory implements IFeedbackProviderFactory {

    private protoframe?: ProtoframePubsub<IFeedbackProtocol>;
    private feedback: Promise<any> = Promise.resolve();

    constructor(
        private readonly frameSource: string | ProtoframePubsub<IFeedbackProtocol>,
        private readonly retries?: number,
        private readonly timeout?: number
    ) {}

    public provide(consumer: IAxeConsumer): IFeedbackProvider {
        return {
            'feedback': (input: string) => {
                const generateFeedback = async () => {
                    const client = await this.pubsubClient();
                    const request = {
                        'payload': input,
                        'preprocess': consumer.preprocessType
                    };
                    const axeFeedback = await client.ask('feedback', request, 30000);
                    return consumer.consume(JSON.parse(axeFeedback.results));
                };

                this.feedback = this.feedback.then(generateFeedback, generateFeedback);
                return this.feedback;
            }
        } as IFeedbackProvider;
    }

    /** Kick of the iframe to window communication channel  */
    private pubsubClient(): Promise<ProtoframePubsub<IFeedbackProtocol>> {
        return ProtoframePubsub.connect(this.lazyInit(), this.retries, this.timeout);
    }

    /** Only attach the iframe if needed, support multiple ways of instantiating the iframe */
    private lazyInit(): ProtoframePubsub<IFeedbackProtocol> {
        if (!NullUtil.hasValue(this.protoframe)) {
            if (this.frameSource instanceof ProtoframePubsub) {
                this.protoframe = this.frameSource;
            } else {
                const iframe = $(`
                    <iframe
                        id="feedbackframe" style="position: absolute; left: -10000px; top: -10000px;"
                        src="${this.frameSource}">
                    </iframe>`).appendTo('body')[0] as HTMLIFrameElement;
                this.protoframe = ProtoframePubsub.parent(feedbackProtocol, iframe);
            }
            return this.protoframe as ProtoframePubsub<IFeedbackProtocol>;
        } else {
            return this.protoframe as ProtoframePubsub<IFeedbackProtocol>;
        }
    }

}
