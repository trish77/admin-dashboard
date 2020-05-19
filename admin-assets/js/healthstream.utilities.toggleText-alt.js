/*jslint browser: true*/
/*global  jQuery */

// NOTE USAGE: This version of toggleText is used when the toggle triger is docked to the top of the expanding drawer.

(function (window, $) {
    'use strict';

    var healthStream = window.HealthStream = window.HealthStream || {};
    healthStream.utilities = healthStream.utilities || {};
    var constants = healthStream.constants || {};
    var defaultIcons = {
        DownCaretFixed: '<i class="fa-fw fa-caret-down fa"></i>',
        UpCaretFixed: '<i class="fa-fw fa-caret-up fa"></i>'
    };
    var icons = constants.icons ? $.extend({}, defaultIcons, constants.icons) : defaultIcons;

    function showHideHandler() {
        var $t = $(this),
            text = $t.attr('data-toggle-text-alt').split('|');

        if ($t.text() !== text[0]) {
            $t.html(text[0] + icons.UpCaretFixed);
        } else {
            $t.html(text[1] + icons.DownCaretFixed);
        }
    }

    function initializeToggleText()
    {
        var $t = $(this),
        text = $t.attr('data-toggle-text-alt').split('|');

        $t.addClass('toggle-text-alt-initialized');

        if ($t.text() === text[0]) {
            $t.html(text[0] + icons.UpCaretFixed);
        } else {
            $t.html(text[1] + icons.DownCaretFixed);
        }
    }

    healthStream.utilities.toggleText = function (target) {
        var localTarget = $(target || 'body');

        $('a[data-toggle-text-alt]', localTarget)
            .reBind('click', showHideHandler)
            .not('.toggle-text-alt-initialized')
            .each(initializeToggleText);
    };

    $(function () {
        healthStream.utilities.toggleText();
    });

}(window, jQuery));
