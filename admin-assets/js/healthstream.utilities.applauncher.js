(function(window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.utilities = window.HealthStream.utilities || {};
    var healthStream = window.HealthStream;

    healthStream.utilities.applauncher = function() {
        $('.app-drawer-icon').click(function() {
            if ($('.app-drawer-content').hasClass("drawer-open")) {
                $('.app-drawer-content').hide();
                $('.app-drawer-content').removeClass("drawer-open");
                $('.app-drawer-container').removeClass("active");
            } else {
                $('.app-drawer-content').show();

                $('.app-drawer-content').addClass("drawer-open");
                $('.app-drawer-container').addClass("active");
            }
        });

        $(window).click(function() {
            if ($('.app-drawer-content').hasClass("drawer-open")) {
                $('.app-drawer-content').hide();
                $('.app-drawer-content').removeClass("drawer-open");
                $('.app-drawer-container').removeClass("active");
            }
        });
        $('.app-drawer-content').click(function(event) {
            event.stopPropagation();
        });
        $('.app-drawer-icon').click(function(event) {
            event.stopPropagation();
        });


        // ----------------------------------
        //  Site-Header
        // ----------------------------------
        $(".site-header .trigger-open-app-launcher").click(function(e) {
            $(".app-launcher-mobile").show();
            $('html, body').css({
                // 'overflow': 'hidden',
                'height': '100%'
            });

            e.stopPropagation();
            e.preventDefault();
        });
        $(".app-launcher-mobile .trigger-close").click(function(e) {
            // console.log('close');
            $(".app-launcher-mobile").hide();
            $('html, body').css({
                'overflow': 'auto',
                'height': 'auto'
            });
            e.preventDefault();
        });
        $(".app-launcher-mobile").click(function(e) {
            e.stopPropagation();
        });
        $(window).click(function() {
            $(".app-launcher-mobile").hide();
        });

    }
}(window, jQuery));