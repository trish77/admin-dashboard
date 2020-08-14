(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.utilities = window.HealthStream.utilities || {};
    var healthStream = window.HealthStream;

    healthStream.utilities.equalize = function(){

        var ids = [];

        function setMinHeights() {
            $(ids).each(function(){
                var $obj = $("[data-equalize='" + this + "']"),
                equalHeight = 0;

                $obj
                    .each(function(){
                        var $t = $(this),
                            thisHeight;
                        $t.css('min-height',0);
                        thisHeight = $t.outerHeight();
                        if(thisHeight > equalHeight){
                            equalHeight = thisHeight;
                        }
                    })
                    .each(function(){
                        var $t = $(this),
                        newHeight = equalHeight,
                        ignoreBefore = 600; // @screen-md

                        if ( $(window).innerWidth() >= ignoreBefore ) {
                            $t.addClass('equalized').css('min-height',newHeight);
                        }

                    });
            });
        }

        $("[data-equalize]").each(function(){
            var id = $(this).attr('data-equalize');
            if($.inArray(id, ids) === -1) {
                ids.push(id);
            }
        });

        // block ie8 for performance reasons
        if ( !$('html').hasClass('ie8') ) {
            $(window).on('resize', function(){
                setMinHeights();
            });
            setMinHeights();
            setMinHeights();
        }

        // switching tabs
        $('a[data-toggle="tab"], .nav-focus li a').on('shown.bs.tab', function(){
            setMinHeights();
            $(window).resize();
        });

    }

    $(window).on('load', function(){
        healthStream.utilities.equalize();
    });

}(window, jQuery));