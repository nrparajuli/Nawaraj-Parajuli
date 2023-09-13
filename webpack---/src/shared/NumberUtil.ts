
import * as NullUtil from './NullUtil';

/**
 * Run the potential numeric string through `parseInt` (base 10), returning either an integer with potential decimals
 * truncated, or `null` if the string was not numeric. Use [[floatOrNull]] if you don't want decimals truncated.
 *
 * @param maybeNumber Potentially a numeric string
 * @return The parsed integer number (truncating decimals), or `null` if it was not numeric
 */
export function intOrNull(maybeNumber: string | null | undefined): number | null {
    const maybeNaN = parseInt(NullUtil.orElse<string>(maybeNumber, ''), 10);
    if (isNaN(maybeNaN)) {
        return null;
    } else {
        return maybeNaN;
    }
}

/**
 * Run the potential numeric string through `parseFloat`, returning either a number, or `null` if the string was not
 * numeric.
 *
 * @param maybeNumber Potentially a numeric string
 * @return The parsed float number, or `null` if it was not numeric
 */
export function floatOrNull(maybeNumber: string | null | undefined): number | null {
    const maybeNaN = parseFloat(NullUtil.orElse<string>(maybeNumber, ''));
    if (isNaN(maybeNaN)) {
        return null;
    } else {
        return maybeNaN;
    }
}
