
import * as $ from 'jquery';

export interface ICoords {
    bottom: number;
    left: number;
    right: number;
    top: number;
}

/**
 * Utility to provide DOM location information and notifications when position changes.
 */
export class PositionMonitor {

    /**
     * The current number of active monitors.
     */
    public static count(): number {
        return Object.keys(PositionMonitor.monitors).length;
    }

    /**
     * Disable a monitor by its id.
     *
     * @param id    The id of the monitor to disable
     */
    public static offCoordsChange(id: string): void {
        const timer = PositionMonitor.monitors[id];
        if (timer) {
            clearInterval(timer);
        }
        delete PositionMonitor.monitors[id];
    }

    /**
     * Start a new monitor on an element.
     *
     * @param $el       The element whose position to monitor
     * @param id        The id of this monitor. This id can be used to later deactivate using [[offCoordsChange]]
     * @param interval  The polling interval in milliseconds
     * @param callback  The callback to invoke when the position changes. This will call immediately when the monitor
     *                  is activated on an element, and will call a final time with `null` if the element is ever
     *                  removed from the DOM. Therefore it is important to handle both the [[ICoords]] parameter and
     *                  `null`
     */
    public static onCoordsChange($el: JQuery<HTMLElement>, id: string, interval: number,
        callback: (coords: ICoords | null) => void): void {
        const initCoords = PositionMonitor.findCoords($el);
        if (!initCoords) {
            callback(null);
        } else {
            let currCoords = initCoords;

            // Call back immediately with the current coordindates
            callback(currCoords);

            // Add the interval handle to our active monitors list
            PositionMonitor.monitors[id] = setInterval(() => {
                const prevCoords = currCoords;
                const nextCoords = PositionMonitor.findCoords($el);
                if (!nextCoords) {
                    // If the element has been deleted from the DOM, we just close everything up
                    PositionMonitor.offCoordsChange(id);
                    callback(null);
                } else {
                    currCoords = nextCoords;
                    if (!PositionMonitor.coordsEqual(prevCoords, nextCoords)) {
                        // The position has changed, notify the caller
                        callback(currCoords);
                    }
                }
            }, interval);
        }
    }

    /** The active set of monitors by id. */
    private static monitors: {[id: string]: any} = {};

    /**
     * Determine if the two sets of coordinates are equal.
     */
    private static coordsEqual(one: ICoords, other: ICoords): boolean {
        return one.bottom === other.bottom && one.left === other.left && one.right === other.right
            && one.top === other.top;
    }

    /**
     * Get the coords from the element. If the element is not on the DOM, then `null` is returned.
     */
    private static findCoords($el: JQuery<HTMLElement>): ICoords | null {
        // First check if the element is still on the DOM
        if (!$.contains(document.documentElement, $el[0])) {
            return null;
        }

        // If the element is on the DOM, then offset, height and width are always available so it is safe to cast these
        const offset = $el.offset() as JQuery.Coordinates;
        const height = $el.height() as number;
        const width = $el.width() as number;
        return {
            'bottom': offset.top + height,
            'left': offset.left,
            'right': offset.left + width,
            'top': offset.top
        };
    }
}
