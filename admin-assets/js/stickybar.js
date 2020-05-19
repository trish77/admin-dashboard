/*  =============================================================================
    Safely add jQuery for use in the page
    ========================================================================== */

function checkjQuery(jQueryVersion, pathToJQuery, callback) {
    var jQueryLoaded = false;

    // compare versions of jQuery to determine if upgrade is necessary
    function requireUpgradeTo(version) {
        var a = window.jQuery.fn.jquery.split('.'), b = version.split('.'), i;
        for (i = 0; i < a.length; i += 1) {
            a[i] = Number(a[i]);
        }
        for (i = 0; i < b.length; i += 1) {
            b[i] = Number(b[i]);
        }
        if (a.length === 2) { a[2] = 0; }
        if (a[0] < b[0]) { return true; } // major version upgrade
        if (a[0] > b[0]) { return false; }
        if (a[1] < b[1]) { return true; } // minor version upgrade
        if (a[1] > b[1]) { return false; }
        if (a[2] < b[2]) { return true; } // patch version upgrade
        if (a[2] > b[2]) { return false; }
        return false;
    }

    function upgradeLoadComplete() {
        // This event handler can be called multiple times.  Break if load is complete.
        if (jQueryLoaded) return;

        // By this point jQuery has been downloaded.
        if (window.jQuery === undefined || requireUpgradeTo(jQueryVersion)) {
            // If jQuery has not been initialized then wait longer (IE prior to IE11).
            setTimeout(upgradeLoadComplete, 50);
        } else {
            loadjQuery();
        }
    }

    function upgradeJQuery() {
        var jquery_script = document.createElement('script');

        /*
        * format of base url
        * http + localhost
        */
        var baseUrl = document.location.protocol + "//" + document.domain;
        var jQueryPath = baseUrl + pathToJQuery.replace(/\\/g, "/");

        jquery_script.setAttribute("src", jQueryPath);
        jquery_script.setAttribute("type", "text/javascript");
        jquery_script.onload = upgradeLoadComplete; // All browser loading, except IE prior to IE11.
        jquery_script.onreadystatechange = function () { // IE loading
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                jquery_script.onreadystatechange = null;
                upgradeLoadComplete();
            }
        };
        // Insert jQuery to the head of the page or to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jquery_script);
    }

    // load jQuery in noConflict mode to avoid issues with other libraries
    function loadjQuery() {
        if (!jQueryLoaded) {
            jQueryLoaded = true;
            callback(window.jQuery.noConflict(true));
        }
    }

    // check to see if it exists or has a lower version
    if (window.jQuery === undefined || requireUpgradeTo(jQueryVersion)) {
        upgradeJQuery();
    } else {
        // The jQuery version on the window is the one we want to use
        callback(window.jQuery);
    }
}

function pageReady(callback) {
    // Make sure the rest of the page has been initialized before executing callback.
    if (window.jQuery !== undefined) {
        $(document).ready(function () {
            setTimeout(callback, 0);
        });
    }
    else {
        setTimeout(callback, 0);
    }
}

function debug(message) {
    if (window.adminRefreshLoggingEnabled === true && window.console !== undefined) {
        console.log(message);
    }
}

(function () {
    'use strict';

    var jQuery;

    function isFunction(possibleFunction) {
        return typeof (possibleFunction) === typeof (Function);
    }

    /*  =============================================================================
        Initiate the widget. jQuery is available in here.
        ========================================================================== */

    function init(minJQuery) {
        jQuery = minJQuery;
        jQuery(document).ready(function ($) {
            function addColor($button) {
                var mLowerCase = ' ' + $button.text().toLowerCase() + ' ';
                $.each(green, function () {
                        if (mLowerCase.indexOf(' ' + this + ' ') > -1 && !($button.is(':disabled'))) {
                            $button.removeClass('btn-default').addClass('btn-success');
                            return;
                        }
                    });

                $.each(red, function () {
                    if (mLowerCase.indexOf(' ' + this + ' ') > -1 && !($button.is(':disabled'))) {
                        $button.removeClass('btn-default').addClass('btn-danger');
                        return;
                    }
                });
            }

            function moveEventHandlers($input, $button, $gridDiv) {
                if ($input === null || $button === null || $gridDiv === null) return;

                // Outer jQuery context.
                var outer$ = window.jQuery || jQuery;

                // For JQuery >= 1.8
                var events;
                if (isFunction(outer$._data)) {
                    events = outer$._data($input[0], "events");
                };

                // For JQuery < 1.8
                if (events === null || events === undefined) {
                    events = outer$($input[0]).data("events");
                }

                if (events !== null && events !== undefined) {
                    var $outerGridDiv = outer$($gridDiv[0]);

                    outer$.each(events, function (i, event) {
                        outer$.each(event, function (j, h) {
                            // .delegate needed because .on is not available in older versions of jQuery.
                            $outerGridDiv.delegate('#' + $button[0].id, i, h.handler);
                        });
                    });
                }
            }

            function convertOldStyle() {
                debug('Stickybar: Converting Old Style');
                $os.append(template);
                var $stickybar = $os.find('.stickybar');

                $os.find('input[type="text"]').each(function (index) {
                    var $input = $(this),
                        $tb,
                        attributes = $input.prop("attributes");

                    if (attributes.length < 20) {
                        $stickybar.find('.stickybar-left').append('<textarea rows="1">' + $input.attr('value') + '</textarea>');
                        $tb = $stickybar.find('.stickybar-left textarea');

                        $(attributes).each(function () {
                            if (this.name !== 'type' && this.name !== '_pieId') {
                                $tb.attr(this.name, this.value);
                            }
                        });
                    }
                });

                var actionButtons = $os.find('input[type="submit"]');
                var isButtonOrderSwapped = $os.hasClass('btn_reverse');

                if (isButtonOrderSwapped)
                {
                     $(actionButtons.get().reverse()).each(createButton);
                }
                else{
                    actionButtons.each(createButton);
                }

                if ($('.stickybar button').length > 0) {
                    $os.html($os.find('.stickybar')[0].outerHTML);
                }

                function createButton(index) {
                    var $input = $(this),
                        $button,
                        attributes = $input.prop("attributes");

                    if (attributes.length < 20) {
                        $stickybar.find('.stickybar-left').append('<button type="submit">' + $input.attr('value') + '</button>');
                        $button = $stickybar.find('.stickybar-left button').eq(index);
                        $.each(attributes, function () {
                            if (this.name !== 'type' && this.name !== '_pieId') {
                                $button.attr(this.name, this.value);
                            }
                        });
                        $button.attr('class', 'btn btn-default').removeAttr('style');
                        moveEventHandlers($input, $button, $os);
                        addColor($button);
                    } else {
                        debug('Stickybar: Exiting due to not meeting minimum requirements');
                    }

                }
            }

            function convertNewStyleTop() {
                debug('Stickybar: Converting New Style (Top)');
                $nst.remove();
            }

            function convertNewStyleBottom() {
                debug('Stickybar: Converting New Style (Bottom)');

                $nsb.append(template);
                var $stickybar = $nsb.find('.stickybar');

                $nsb.find('input[type="submit"]').each(function (index) {
                    var $input = $(this),
                        $button,
                        attributes = $input.prop("attributes");

                    if (attributes.length < 20) {
                        $stickybar.find('.stickybar-left').append('<button type="submit">' + $input.attr('value') + '</button>');
                        $button = $stickybar.find('.stickybar-left button').eq(index);

                        $(attributes).each(function () {
                            if (this.name !== 'type' && this.name !== '_pieId') {
                                $button.attr(this.name, this.value);
                            }
                        });

                        if ($button.hasClass('btnPrimarySave'))
                            $button.html('Save');
                        if ($button.hasClass('btnPrimaryAdd'))
                            $button.html('Add');
                        if ($button.hasClass('btnPrimarySearch'))
                            $button.html('Search');
                        if ($button.hasClass('btnPrimarySelect'))
                            $button.html('Select');
                        if ($button.hasClass('btnPrimaryPublish'))
                            $button.html('Publish');
                        if ($button.hasClass('btnPrimarySelectDisabled')) {
                            $button.html('Select');
                            $button.attr('disabled', 'disabled');
                        }
                        if ($button.hasClass('btnPrimarySaveDisabled')) {
                            $button.attr('disabled', 'disabled');
                            $button.html('Save');
                        }
                        if ($button.hasClass('btnPrimaryCopy')) {
                            $button.html('Copy');
                        }
                        if ($button.hasClass('btnPrimaryDeriveGoal')) {
                            $button.html('Derive Goal');
                        }
                        if ($button.hasClass('btnPrimaryDelete')) {
                            $button.html('Delete');
                        }
                        if ($button.hasClass('btnPrimaryDeleteDisabled')) {
                            $button.attr('disabled', 'disabled');
                            $button.html('Delete');
                        }
                        $button.attr('class', 'btn btn-default').removeAttr('style');
                        moveEventHandlers($input, $button, $nsb);
                        addColor($button);

                    } else {
                        debug('Stickybar: Exiting due to not meeting minimum requirements');
                    }

                });

                $nsb.find('input[type="hidden"]').each(function (index) {
                    var $input = $(this),
                        $hf,
                        attributes = $input.prop("attributes");

                    if (attributes.length < 20) {
                        $stickybar.find('.stickybar-left').append('<input type="hidden">');
                        $hf = $stickybar.find('.stickybar-left input').eq(index);

                        $(attributes).each(function () {
                            if (this.name !== 'type' && this.name !== '_pieId') {
                                $hf.attr(this.name, this.value);
                            }
                        });
                    }
                });

                if ($('.stickybar button').length > 0) {
                    $nsb.html($nsb.find('.stickybar')[0].outerHTML);
                }

            }

            // function stylesheet() {
            //     $("<link>", {
            //         rel: "stylesheet",
            //         type: "text/css",
            //         href: document.location.protocol + "//" + document.domain + "/HLC/CSS/stickybar.css"
            //     }).appendTo('head');
            // }

            debug('Stickybar: Conversion Starting');

            // Selectors for three styles of button bar
            var $os = $('.bc'),
                $nst = $('.grid_16.actionTop'),
                $nsb = $('.grid_16.action,.grid_14.action');

            var red = ['remove', 'delete'];
            var green = ['save', 'add', 'continue', 'search', 'select', 'register', 'increase class size', 'confirm','publish','load','validate','import','request','create report','upload','derive goal','create new view','run now','send'];

            // Check for each type on page
            debug('Stickybar: Old Style: ' + $os.length + ' | New Style (Top): ' + $nst.length + ' | New Style (Bottom): ' + $nsb.length);

            // The basic structure of our new stickybar
            var template = '<div class="stickybar"><div class="stickybar-floater"><div class="stickybar-outer"><div class="stickybar-inner"><div class="stickybar-left"></div><div class="stickybar-right"></div></div></div></div></div>';

            if (!$.browser.msie || ($.browser.msie && $.browser.version > 7)) {

                // Add stylesheet
                debug('Stickybar: Adding Stylesheet');
                // stylesheet();

                // Convert Older Style
                var stikybarExists = $('.stickybar').length !== 0;
                if ($os.length === 1 && !stikybarExists) {
                    $os.html(convertOldStyle());
                }

                // Convert Newer Style Top
                if ($nst.length === 1) {
                    $nst.html(convertNewStyleTop());
                }

                // Convert Newer Style Bottom
                if ($nsb.length === 1 && !stikybarExists) {
                    convertNewStyleBottom();
                }

                debug('Stickybar: Binding Event Handlers');

                window.HealthStream = window.HealthStream || {};
                var healthStream = window.HealthStream;

                healthStream.stickybar = function () {
                    var $el = $('.stickybar');
                    if ($el.length > 0) {
                        debug('Stickybar: Checking Position ' + $(window).scrollTop() + '|' + (window.innerHeight || document.documentElement.clientHeight) + '|' + $el.offset().top);
                        if ($(window).scrollTop() + (window.innerHeight || document.documentElement.clientHeight) <= $el.offset().top) {
                            if ($el.find('button[type="submit"],input[type="submit"]').length > 0) {
                                $el.addClass('sticky');
                                debug('Stickybar: Attach Stickybar');
                            }
                        } else {
                            $el.removeClass('sticky');
                            debug('Stickybar: Detach Stickybar');
                        }
                    }
                }


                $(window).on('scroll resize', function () {
                    healthStream.stickybar();
                });

                healthStream.stickybar();

                debug('Stickybar: Conversion complete');

            } else {

                debug('Stickybar: Exiting due to not meeting minimum requirements');

            }
        });
    }


    /*  =============================================================================
        END: Closing the anonymous function and return
        ========================================================================== */

    pageReady(function () {
        // checkjQuery("1.8", "\\HLC\\Scripts\\jquery-1.8.3.min.js", init);
    });
})();