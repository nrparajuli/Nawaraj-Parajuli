import * as NullUtil from 'src/shared/NullUtil';
import { DefaultFeedbackProviderFactory, IFeedbackProviderFactory } from '../api/ui/FeedbackProviderFactory';
import { ILazyInitializer, Lazy } from './Initializer';

export interface IDI {
    feedbackProviderFactory: IFeedbackProviderFactory;
}

export class AllyDI {

    public static default(baseUrl: string) {
        this.custom(this.DEFAULT(baseUrl));
    }

    public static custom(
        initializer: ILazyInitializer<IDI>,
        override: boolean = false
    ) {
        if (!NullUtil.hasValue((window as any).ALLY_DI) || override) {
            (window as any).ALLY_DI = new Lazy(initializer);
        }
    }

    public static get(): IDI {
        if (NullUtil.hasValue((window as any).ALLY_DI)) {
            const lazyDI = (window as any).ALLY_DI as Lazy<IDI>;
            return lazyDI.value;
        } else {
            throw new Error('No Ally DI found.');
        }
    }

    private static DEFAULT = (baseUrl: string) => () => {
        return {
            'feedbackProviderFactory':
                new DefaultFeedbackProviderFactory(`${baseUrl}/htmlfeedback/`)
        };
    }
}
