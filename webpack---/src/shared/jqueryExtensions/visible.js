import * as $ from 'jquery';

$.fn.visible = function() {
    var vpWidth = $(window).outerWidth();
    var vpHeight = $(window).outerHeight();
    var rectangle = this.get(0).getBoundingClientRect();
    var topVisible = rectangle.top >= 0 && rectangle.top < vpHeight;
    var bottomVisible = rectangle.bottom > 0 && rectangle.bottom <= vpHeight;
    var leftVisible = rectangle.left >= 0 && rectangle.left < vpWidth;
    var rightVisible = rectangle.right > 0 && rectangle.right <= vpWidth;

    return {
        isEntirelyVisible: topVisible && bottomVisible && leftVisible && rightVisible,
        topVisible: topVisible,
        bottomVisible: bottomVisible,
        leftVisible: leftVisible,
        rightVisible: rightVisible
    };
};