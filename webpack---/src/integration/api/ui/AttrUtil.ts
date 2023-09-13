
export class AttrUtil {

    /**
     * Get the data-ally- attribute name for the given simple name.
     *
     * @param attrName - The simple attribute name
     * @return The data-ally-prefixed name
     */
    public static getDataAllyAttrName(attrName: string): string {
        return `data-ally-${attrName}`;
    }

}
