/*jslint browser: true*/
/*global  jQuery */

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
            text = $t.attr('data-toggle-text').split('|');

        if ($t.text() !== text[0]) {
            $t.html(text[0] + icons.DownCaretFixed);
        } else {
            $t.html(text[1] + icons.UpCaretFixed);
        }
    }

    function initializeToggleText()
    {
        var $t = $(this),
        text = $t.attr('data-toggle-text').split('|');

        $t.addClass('toggle-text-initialized');

        if ($t.text() === text[0]) {
            $t.html(text[0] + icons.DownCaretFixed);
        } else {
            $t.html(text[1] + icons.UpCaretFixed);
        }
    }

    healthStream.utilities.toggleText = function (target) {
        var localTarget = $(target || 'body');

        $('a[data-toggle-text]', localTarget)
            .reBind('click', showHideHandler)
            .not('.toggle-text-initialized')
            .each(initializeToggleText);
    };

    $(function () {
        healthStream.utilities.toggleText();
    });

}(window, jQuery));