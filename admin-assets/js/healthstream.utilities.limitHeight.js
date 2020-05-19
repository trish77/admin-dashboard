(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.utilities = window.HealthStream.utilities || {};
    var healthStream = window.HealthStream;
    var constants = healthStream.constants || {};
    var defaultIcons = {
        DownCaretFixed: '<i class="fa-fw fa-caret-down fa"></i>',
        UpCaretFixed: '<i class="fa-fw fa-caret-up fa"></i>',
    };
    var icons = constants.icons ? $.extend({}, defaultIcons, constants.icons) : defaultIcons;

    healthStream.utilities.limitHeight = function(){

        var toggle = 'limit-height',
            container = 'limit-height',
            link = 'limit-height-link',
            trigger = 'limit-height-trigger';

        $("[data-toggle^='" + toggle + "']").each(function(){

            var $t = $(this),
                labels = $t.attr('data-labels'),
                labelMore = (labels)?labels.split("|")[0]:'Show More',
                labelLess = (labels)?labels.split("|")[1]:'Show Less',
                height = $t.height(),
                visible = $t.is(":visible"),
                limit = (!!$t.attr('data-height'))?$t.attr('data-height'):'100';

            if ( height > limit || !visible) {
                $t
                    .wrapInner('<div class="' + container + '"></div>')
                    .append('<div class="' + link +  '"><a href="#" class="' + trigger + '">' + labelMore + icons.DownCaretFixed + '</a></div>')
                    .on('click', '.'+trigger, function(e){
                        e.preventDefault();
                        if ( $(this).text() === labelMore ) {
                            $(this).html(labelLess + icons.UpCaretFixed);
                            $t.find('.'+container).css({'height':'auto'});

                        } else {
                            $(this).html(labelMore + icons.DownCaretFixed);
                            $t.find('.'+container).css({'height':limit});
                        }
                        $(window).resize();
                    })
                    .find('.'+container).css({'height':limit});
                    $(window).resize();
            }
        });

    };

    $(function () {
        healthStream.utilities.limitHeight();
    });

}(window, jQuery));