
import * as $ from 'jquery';

import {AttrUtil} from './AttrUtil';

/**
 * Represents any element that has been annotated with a `data-ally-content-ref` attribute.
 */
export class UiComponent {

    /**
     * Find all [[UiComponent]]s contained within the provided `$el` root element.
     *
     * @param $el   The root element from which to search for components
     * @return      All [[UiComponent]]s within the root element
     */
    public static fromRoot($el: JQuery<HTMLElement>): UiComponent[] {
        return $el
            .find(`[${AttrUtil.getDataAllyAttrName('content-ref')}]`)
            .toArray()
            .map((el) => new UiComponent($(el)));
    }

    /** The element of the actual component on the page */
    public $el: JQuery<HTMLElement>;

    constructor($el: JQuery<HTMLElement>) {
        this.$el = $el;
    }

    /** The id of the [[ContentInstance]] that this component references */
    public getContentInstanceId(): string {
        return this.getDataAllyAttrValue('content-ref') as string;
    }

    /** Convenience to get a `data-ally-`-prefixed attribute value on the component */
    public getDataAllyAttrValue(attrName: string): string | null {
        const value = this.$el.attr(AttrUtil.getDataAllyAttrName(attrName));
        return (value !== undefined) ? value : null;
    }

    /** Determine if the element has a particular `data-ally-`-prefixed attribute on the component */
    public hasDataAllyAttr(attrName: string): boolean {
        return this.$el.is(`[${AttrUtil.getDataAllyAttrName(attrName)}]`);
    }
}
