/*jslint browser: true*/
/*global  jQuery */

(function ($) {
    'use strict';

    /* Center the current jQuery object on the screen. */
    $.fn.center = function (target) {
        this.css("position", "fixed");
        this.css("z-index", "2200");

        var self = $(this),
            targetObj = $(target),
            win = $(window);

        if (target) {
            this.css("top", Math.max(0, ((targetObj.height() - self.outerHeight()) / 2) + targetObj.offset().top) + "px");
            this.css("left", Math.max(0, ((targetObj.width() - self.outerWidth()) / 2) + targetObj.offset().left) + "px");
        } else {
            this.css("top", Math.max(0, ((win.height() - self.outerHeight()) / 2) + win.scrollTop()) + "px");
            this.css("left", Math.max(0, ((win.width() - self.outerWidth()) / 2) + win.scrollLeft()) + "px");
        }

        return this;
    };

    /* Does the current jQuery object contain a value. */
    $.fn.exists = function () {
        return this.length !== 0;
    };

    /* Remove an event handler and re-attach the event handler to the selected element. */
    $.fn.reBind = function (types, fn) {
        return this.off(types, fn).on(types, fn);
    };

    /* Find matching descendant elements and include the current element if it also matches the selector. */
    $.fn.findAndSelf = function (selector) {
        return this.find(selector).addBack(selector);
    };

    $.clientBrowser = $.clientBrowser || {};
    $.clientBrowser = {
        /* Is the current browser an IOS device. */
        isIOS: function () {
            var deviceAgent = navigator.userAgent.toLowerCase();
            return deviceAgent.match(/(iphone|ipod|ipad)/) !== null;
        },

        isAndroid: function () {
            var deviceAgent = navigator.userAgent.toLowerCase();
            return deviceAgent.match(/android/) !== null;
        },

        isChrome: function () {
            var deviceAgent = navigator.userAgent.toLowerCase();
            return deviceAgent.match(/chrom(e|ium)/) !== null;
        }
    };

    /* Disable the control. */
    $.fn.disable = function () {
        return $(this).attr('disabled', true);
    };

    /* Enable the control. */
    $.fn.enable = function () {
        return $(this).attr('disabled', false);
    };

    /* Will be true if there are no visible failed validations. */
    $.fn.isValid = function () {
        return !$('.field-validation-error:visible', $(this)).exists();
    };

    /* Will be true if there are no visible failed validations. */
    $.fn.swapClasses = function (removeClassName, addClassName, removeMustExist) {
        if (removeMustExist && !this.hasClass(removeClassName)) {
            return this;
        }

        this.removeClass(removeClassName);
        this.addClass(addClassName);
        return this;
    };
}(jQuery));