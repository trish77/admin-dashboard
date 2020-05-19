(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.stickybar = function(){
        var $sb = $('.stickybar');
        if ( $sb.length > 0 ) {
            $sb.each(function(){
                var $el = $(this);
                if( $(window).scrollTop() + $(window).innerHeight() <= $el.offset().top ) {
                    $el.addClass('sticky');
                } else {
                    $el.removeClass('sticky');
                }
            });
        }
    };

    $(window).on('load', function(){
        healthStream.stickybar();
        $(window).on('scroll resize',function(){
            healthStream.stickybar();
        });
    });

}(window, jQuery));

