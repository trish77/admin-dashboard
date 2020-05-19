(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;
    var constants = healthStream.constants || {};
    var defaultIcons = {
        DownCaretFixed: '<i class="fa-fw fa-caret-down fa"></i>'
    };
    var icons = constants.icons ? $.extend({}, defaultIcons, constants.icons) : defaultIcons;

    healthStream.filtermini = function(){
        var $fm = $('.filter-mini');
        if ( $fm.length > 0 ) {
            $fm
                .on('click','.filter-toggle',function(){
                    $(this).closest('.filter-mini').toggleClass('filter-open');
                })
                .on('filter.init',function(){
                    var $filter = $(this);
                    var target = '#' + $filter.attr('data-target');
                    var total = 0;

                    $(target).find('.slat[data-filter-category]').each(function(){
                        if ( $(this).attr('data-filter-count') !== undefined ) {
                            total = total + ($(this).attr('data-filter-count') * 1);
                        } else {
                            total++;
                        }
                    });

                    $filter.find('input[type="checkbox"]').each(function(){
                        var $input = $(this);
                        var $label = $input.closest('label');
                        var count = 0;

                            $(target).find('.slat[data-filter-category="' + $input.val() + '"]').each(function(){
                                if ( $(this).attr('data-filter-count') !== undefined ) {
                                    count = count + ($(this).attr('data-filter-count') * 1);
                                } else {
                                    count++;
                                }
                            });

                            // count = $(target).find('.slat[data-filter-category="' + $input.val() + '"]').length;

                        if ( $input.is(':checked') ) {
                            $label.addClass('active');
                        }

                        if ( count < 1 ) {
                            if ( $input.val() === "all" ) {
                                $label.append('<span class="badge">' + total + '</span>');
                            } else {
                                $input.closest('li').hide();
                            }
                        } else {
                            $label.append('<span class="badge">' + count + '</span>');
                        }

                    });

                    $(target).addClass('filter-target');
                    $filter.trigger('filter.change');
                })
                .on('click','input[type="checkbox"]',function(){
                    var $input = $(this),
                        $label = $input.closest('label'),
                        $filter = $input.closest('.filter-mini');

                    $filter.find('input[type="checkbox"]').prop('checked', false);
                    $filter.find('label').removeClass('active');
                    $input.prop('checked', true);
                    $label.addClass('active');
                    $filter.removeClass('filter-open');

                    // trigger change
                    $input.closest('.filter-mini').trigger('filter.change');

                })
                .on('filter.change',function(){
                    var $filter = $(this),
                        target = '#' + $filter.attr('data-target'),
                        checked = [],
                        active = $filter.find('.active').html(),
                        text = '';

                    text = '<div class="hidden-xs">Show: ' + icons.DownCaretFixed + '</div>';
                    text += '<div class="visible-xs">Show: ' + active + icons.DownCaretFixed + '</div>';
                    $filter.find('.filter-toggle').html(text).find('input').remove();

                    $filter.find('input[type="checkbox"]:checked').each(function(){
                        checked.push($(this).val());
                    });

                    $(target).children().removeClass('active');

                    $(target).children().each(function(){
                        var $slat = $(this),
                            category = $slat.attr('data-filter-category');

                        if ( $.inArray('all',checked) > -1 || $.inArray(category,checked) > -1 ) {
                            $slat.addClass('active');
                        }
                    });

                    $(window).resize();
                });

                $fm.trigger('filter.init');
        }
    };


    $(function () {
        healthStream.filtermini();
    });

}(window, jQuery));