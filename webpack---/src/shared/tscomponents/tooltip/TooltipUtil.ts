import * as $ from 'jquery';

import * as NullUtil from '../../NullUtil';

require('jquery-ui/ui/widgets/tooltip');

// This is the jquery-visible plugin that has been amd-ified to work with require and webpack
require('src/shared/jqueryExtensions/visible');

/** Enable tooltips */
export function enableTooltips(): void {
    enableTooltipsIfNecessary();
}

/** Removes any tooltips that might be present in the DOM immediately. */
export function clearAllTooltips(): void {
    $('.ally-tooltip').remove();
}

function enableTooltipsIfNecessary(): void {
    if ($(document.body).hasClass('ally-tooltips-enabled')) {
        return;
    }
    $(document.body).addClass('ally-tooltips-enabled');

    $(window).on('scroll', () => {
        $('.ally-tooltip').fadeOut(400, function() {
            $(this).remove();
        });
    });

    $(document).tooltip(tooltipOptions());

    // The jQuery UI tooltip library adds an aria-live div element to the DOM that allows screenreaders to read out
    // tooltips. It gives this div a `ui-helper-hidden-accessible` CSS class which hides the content from the
    // presentation layer, but still allows it to be read out by screenreaders. Remove the class and apply our own
    // as the jQuery UI CSS is not included and we should not rely on the LMS to provide it.
    $('div.ui-helper-hidden-accessible:last-of-type')
        .removeClass('ui-helper-hidden-accessible')
        .addClass('ally-helper-hidden-accessible');
}

function tooltipOptions() {
    const verticalOffset = 15;
    const options: JQueryUI.TooltipOptions = {
        // Override the default behaviour as jQuery UI by default escapes any HTML characters that are in the title
        // attribute
        'content'() {
            const el = this as HTMLElement;
            const content = NullUtil.firstOrNull(
                () => el.getAttribute('title'),
                () => el.getAttribute('data-title'),
                () => el.getAttribute('aria-label'));
            return NullUtil.orElse<string>(content, '').replace(/\n/g, '<br>');
        },
        'items': '.ally-add-tooltip',

        // Position the tooltip centrally above the element
        'position': {
            'at': 'center top',
            'my': `center bottom-${verticalOffset}`,
            'using': (position: any, feedback: any) => {
                // Wait a little bit before positioning the tooltip. This gives the browser a chance to render the
                // tooltip and makes the width calculations a bit more reliable. Override the default jquery-ui
                // positioning logic as Learn applies `position: relative; margin: 0 auto` on its body element which
                // jquery-ui doesn't seem to be able to handle
                setTimeout(() => {
                    const $tooltip = $(feedback.element.element).css({'position': 'fixed'});
                    const tooltipWidth = NullUtil.orElse<number>($tooltip.outerWidth(), 0);
                    const tooltipHeight = NullUtil.orElse<number>($tooltip.outerHeight(), 0);

                    // By default, the element with the ally-add-tooltip class is used to centrally position a tooltip
                    // over. However, one of the children can be targetted by applying the ally-tooltip-center class.
                    let $targetEl = $(feedback.target.element);
                    const $centerOnEl = $targetEl.find('.ally-tooltip-center');
                    if ($centerOnEl.length !== 0) {
                        $targetEl = $centerOnEl;
                    }

                    const targetElWidth = NullUtil.orElse<number>($targetEl.outerWidth(), 0);
                    const targetElHeight = NullUtil.orElse<number>($targetEl.outerHeight(), 0);
                    const targetElOffset = $targetEl[0].getBoundingClientRect();
                    const targetElCenterX = targetElOffset.left + (targetElWidth / 2);
                    const targetElCenterY = targetElOffset.top + (targetElHeight / 2);

                    const targetElImage = $targetEl.find('img');
                    const targetElImageWidth = NullUtil.orElse<number>(targetElImage.outerWidth(), targetElWidth);
                    const targetElImageHeight = NullUtil.orElse<number>(targetElImage.outerHeight(), 0);

                    const tooltipVerticalPadding = 25;
                    const tooltipHorizontalPadding = 15;
                    $tooltip.css({
                        'left': `${targetElCenterX - (tooltipWidth / 2)}px`,
                        'position': 'fixed',
                        'top': `${targetElCenterY - tooltipHeight - tooltipVerticalPadding}px`
                    });

                    const tooltipVisibility = ($tooltip as any).visible();

                    $('<div>')
                        .addClass('ally-arrow')
                        .appendTo($tooltip);

                    if (!tooltipVisibility.isEntirelyVisible) {
                        const windowHeight = NullUtil.orElse<number>($(window).outerHeight(), 0);

                        if (targetElOffset.bottom + 75 < windowHeight
                            && tooltipVisibility.leftVisible && tooltipVisibility.rightVisible) {
                            const top = (targetElCenterY + targetElImageHeight / 2 + tooltipVerticalPadding);
                            $tooltip.css({'top': `${top}px`});
                            $('.ally-arrow').addClass('ally-arrow-bottom');
                        } else if (tooltipVisibility.leftVisible) {
                            const left = (targetElCenterX - tooltipWidth - targetElImageWidth / 2 -
                                tooltipHorizontalPadding);
                            const top = (targetElCenterY - tooltipHeight / 2);
                            $tooltip.css({
                                'left':  `${left}px`,
                                'top': `${top}px`
                            });
                            $('.ally-arrow').addClass('ally-arrow-right');
                        } else {
                            const left = (targetElCenterX + targetElImageWidth / 2 + tooltipHorizontalPadding);
                            const top = (targetElCenterY - tooltipHeight / 2);
                            $tooltip.css({
                                'left': `${left}px`,
                                'top':  `${top}px`
                            });
                            $('.ally-arrow').addClass('ally-arrow-left');
                        }
                    }
                    $tooltip.css('visibility', 'visible');
                }, 50);
            }
        },

        // Remove all the jQuery UI related classes to prevent any clashes if the LMS has styling for any jQuery UI
        // widgets.
        'open': (event, ui) => {
            removejQueryUiClasses((ui as any).tooltip);
            removejQueryUiClasses((ui as any).tooltip.find('*'));
        }
    };

    // Add the ally-tooltip CSS class so it can be styled. This can't be done inline as the jquery-ui type def
    // bindings for typescript don't know about this method
    (options as any).classes = {'ui-tooltip': 'ally-tooltip'};

    return options;
}

/**
 * Removes any jQuery UI CSS classes from a given element. A jQuery UI class is any classname that's prefixed with
 * `ui-`.
 *
 * @param $el    The element to remove the CSS classes from
 */
function removejQueryUiClasses($el: JQuery<HTMLElement>) {
    const uiClasses = NullUtil.orElse<string>($el.attr('class'), '')
        .split(' ')
        .filter((c) => (c.indexOf('ui-') === 0))
        .join(' ');
    $el.removeClass(uiClasses);
}
