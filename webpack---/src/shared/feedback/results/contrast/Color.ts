import {DEFAULT_COLOR} from 'src/shared/feedback/html-config.model';

/**
 * RGB color value for a string color value that originated from the HTML checker. If the given string value is
 * the default color (e.g. "default"), it will fall back to the given default color
 */
export class Color {

    /**
     * Parse a color segment (e.g. `ff` in `#ffffff` or `f` in `fff`) into a number value
     *
     * @param offset   The offset of the parsed segment representing either R/G/B in the color
     * @param color    The string color to parse that doesn't contain leading `#`
     */
    private static parseSegment(offset: number, color: string): number {
        return parseInt(
            color.length === 3 ?
                color.slice(offset, 1 + offset).repeat(2) :
                color.slice(offset * 2, 2 + offset * 2),
            16
        );
    }

    public readonly r: number;
    public readonly g: number;
    public readonly b: number;

    /**
     * @param colorHex           The color to decode into a {@link Color} instance
     * @param defaultColorHex    The default color value in case the given `colorHex` was the "default" color
     */
    constructor(colorHex: string, defaultColorHex: string) {
        colorHex = colorHex === DEFAULT_COLOR ? defaultColorHex : colorHex;

        this.r = Color.parseSegment(0, colorHex);
        this.g = Color.parseSegment(1, colorHex);
        this.b = Color.parseSegment(2, colorHex);
    }

    /**
     * Get the relative luminance for a color
     *
     * @return  A triple with the relative luminance components in the form of (red, green, blue)
     * @see     https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
     * @see     http://www.w3.org/TR/WCAG20-TECHS/G18.html
     */
    public getRelativeLuminance(): number {
        return (0.2126 * getRelativeLuminanceComponent(this.r)) +
            (0.7152 * getRelativeLuminanceComponent(this.g)) +
            (0.0722 * getRelativeLuminanceComponent(this.b));
    }
}

/**
 * Get the relative luminance component for the red, green or blue component of a color
 *
 * @param colorValue The red, green or blue component of a color
 */
function getRelativeLuminanceComponent(colorValue: number): number {
    // Linearize the color
    const linearizedColor = colorValue / 255;

    // Apply simple luminance value
    if (linearizedColor <= 0.03928) {
        return linearizedColor / 12.92;
    }
    return Math.pow((linearizedColor + 0.055) / 1.055, 2.4);
}
