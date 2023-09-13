
import {ContentInstance} from './ContentInstance';
import {PositionMonitor} from './PositionMonitor';
import * as Templates from './Templates';
import {Ui} from './Ui';

/** Optional arguments for destroying a seizure guard. */
interface IDestroyOpts {
    /** Specifies whether or not a seizure guard should fade while being destroyed. A fading effect is the default. */
    fade: boolean;
}

export class SeizureGuard {

    /**
     * Create a seizure guard that overlays an image that can be destroyed by clicking on it.
     *
     * @param ui                The [[Ui]] instance in context
     * @param contentInstance   The [[ContentInstance]] to which to apply the guard
     */
    public static create(ui: Ui, contentInstance: ContentInstance): void {
        const id = SeizureGuard.guardId(contentInstance);
        const coordsRefreshInterval = 50;

        // Add the template
        const $seizureGuard = Templates.seizureGuard.apply({
            'ALLY_DOMAIN': ui.client.config.baseUrl,
            'i18n': ui.i18n
        });
        contentInstance.$el.after($seizureGuard);

        // Track the position of the image and ensure the guard is always on top of it
        PositionMonitor.onCoordsChange(contentInstance.$el, id, coordsRefreshInterval, (coords) => {
            if (coords) {
                // The coords have changed
                $seizureGuard.offset({
                    'left': coords.left,
                    'top': coords.top
                });
                $seizureGuard.width(coords.right - coords.left);
                $seizureGuard.height(coords.bottom - coords.top);
            } else {
                // The target element has disappeared from the DOM -- may as well destroy the seizure guard as well
                SeizureGuard.destroy(ui, contentInstance);
            }
        });

        // Register the seizure guard
        SeizureGuard.guards[id] = $seizureGuard;

        // When the button is clicked, the guard should self destruct
        $seizureGuard.find('button').click(() => {
            SeizureGuard.destroy(ui, contentInstance);
            return false;
        });
    }

    /**
     * Destroy all seizure guards registered on the UI.
     */
    public static destroyAll(): void {
        Object.keys(SeizureGuard.guards).forEach((id) => SeizureGuard.destroyByGuardId(id, {'fade': false}));
    }

    /**
     * Reveal an image behind a seizure guard and unregister all functionality such as clicks handling and position
     * monitoring from it.
     *
     * @param ui                The [[Ui]] instance in context
     * @param contentInstance   The [[ContentInstance]] to which to the guard was applied
     * @param opts              Optional arguments
     */
    public static destroy(ui: Ui, contentInstance: ContentInstance, {fade = true}: Partial<IDestroyOpts> = {}): void {
        const id = SeizureGuard.guardId(contentInstance);
        SeizureGuard.destroyByGuardId(id, {fade});
    }

    /** Determine how many seizure guards are currently bound on the page. */
    public static count(): number {
        return Object.keys(SeizureGuard.guards).length;
    }

    private static guards: {[id: string]: JQuery<HTMLElement>} = {};

    /**
     * Reveal an image behind a seizure guard and unregister all functionality such as clicks handling and position
     * monitoring from it.
     *
     * @param guardId   The internal id of the seizure guard
     * @param opts      Optional arguments
     */
    private static destroyByGuardId(guardId: string, opts: IDestroyOpts): void {
        PositionMonitor.offCoordsChange(guardId);
        if (guardId in SeizureGuard.guards) {
            const $el = SeizureGuard.guards[guardId];
            if (opts.fade) {
                $el.fadeOut(() => $el.remove());
            } else {
                $el.remove();
            }
            delete SeizureGuard.guards[guardId];
        }
    }

    private static guardId(contentInstance: ContentInstance): string {
        return `seizureguard-${contentInstance.getId()}`;
    }
}
