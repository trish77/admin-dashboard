(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;
    window.HealthStream.focusbar = window.HealthStream.focusbar || {};


    healthStream.focusbar.depricated = function(){

        /*

        The primary focus bar used at the top of pages was redesigned in Oct 2014, making this version obsolete.
        It is being kept in place until all teams are able to transisition to the new version

        */

        // Focus Charts
        // if (window.Modernizr.canvas && $(".focus").has(".supporting-chart").length > 0) {

        //     $('#progress-chart, .focus-chart').each(function(){

        //         var colors = [$('#theme-primary-lighter').css('background-color'),'#fff',$('#theme-primary').css('background-color')],
        //             data = [],
        //             $chart = $(this),
        //             segments = JSON.parse($chart.attr('data-segments')),
        //             ctx = $chart[0].getContext("2d"),
        //             progress,
        //             chartOptions = {
        //                 segmentStrokeColor: colors[2],
        //                 segmentStrokeWidth: 4,
        //                 percentageInnerCutout: 80,
        //                 animation : true,
        //                 animationEasing : "easeInOutCubic"
        //             };

        //         $(segments).each(function(){
        //           var obj = {
        //             value: this[0],
        //             color: colors[this[1]]
        //           };
        //           data.push(obj);
        //         });

        //         if(data.length < 2) {
        //             chartOptions.segmentShowStroke = false;
        //             chartOptions.percentageInnerCutout = 89;
        //         }
        //         progress = new window.Chart(ctx).Doughnut(data,chartOptions);

        //     });

        // }
    };

    healthStream.focusbar.pageheader = {
        separator: function() {
            if ( $('.fph-separator').length > 0 ) {
                $('.fph-separator').each(function(){
                    var $el = $(this),
                        $fph = $el.closest('.focus-pageheader');
                    if ($fph.has('.fph-secondary').length > 0) {
                        $el.height($fph.height() - $fph.find('.fph-secondary').position().top );
                    }
                });
            }
        },
        // chart: function() {
        //     if (window.Modernizr.canvas && $(".focus-pageheader").has(".fph-chart").length > 0) {
        //         $('.fph-chart').each(function(){
        //             var colors = [$('#theme-primary-lightest').css('background-color'),'#fff',$('#theme-primary').css('background-color')],
        //                 data = [],
        //                 $chart = $(this),
        //                 segments = JSON.parse($chart.attr('data-segments')),
        //                 ctx = $chart[0].getContext("2d"),
        //                 progress,
        //                 chartOptions = {
        //                     segmentStrokeColor: colors[2],
        //                     segmentStrokeWidth: 2,
        //                     percentageInnerCutout: 82,
        //                     animation : true,
        //                     animationEasing : "easeInOutCubic"
        //                 };

        //             $(segments).each(function(){
        //               var obj = {
        //                 value: this[0],
        //                 color: colors[this[1]]
        //               };
        //               data.push(obj);
        //             });

        //             if(data.length < 2) {
        //                 chartOptions.segmentShowStroke = false;
        //                 chartOptions.percentageInnerCutout = 89;
        //             }
        //             progress = new window.Chart(ctx).Doughnut(data,chartOptions);

        //         });
        //     }
        // },
        initialize: function(){
            var fph = this;
            fph.separator();
            // fph.chart();
            $(window).on('resize',function(){
                fph.separator();
            });
        }
    };


    $(window).on('load', function(){
        healthStream.focusbar.depricated();
        healthStream.focusbar.pageheader.initialize();
    });


}(window, jQuery));