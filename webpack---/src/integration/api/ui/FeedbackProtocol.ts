
import { Protoframe, ProtoframeDescriptor } from 'protoframe';

export interface IAxeResponse {
    results: string;
}

export interface IFeedbackProtocol extends Protoframe {
    feedback: {
        body: {
            payload: string,
            preprocess: string
        };
        response: IAxeResponse | undefined;
    };
}

export const feedbackProtocol: ProtoframeDescriptor<IFeedbackProtocol> = {'type': 'feedback'};
