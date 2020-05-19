(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.checkable = function(){
        var $checkables = $('.checkable');

        $checkables.each(function(){
            var $checkable = $(this);

            if ( $checkable.find('input[type=checkbox]').prop('checked') ) {
                $checkable.addClass('checkable-checked');
            } else {
                $checkable.removeClass('checkable-checked');
            }

        });

        if ( $checkables.hasClass('checkable-checked') ) {
            $(window).trigger('checked.hstm.checkable');
        } else {
            $(window).trigger('unchecked.hstm.checkable');
        }
    }

    $(window).on('load', function(){

        // bind to all checkable checkboxes
        $('body').on('change', '.checkable input[type="checkbox"]', function(){
            $(window).trigger('update.hstm.checkable');
        });

        // behavior for radio-like checkables
        $('body').on('click', '.checkable-single label', function(e){
            var $checkable = $(this).closest('.checkable-single');
            var $checkables = $checkable.siblings('.checkable-single');
            var $checkbox = $checkable.find('input[type=checkbox]');

            // prevent label from changing checkbox
            e.preventDefault();

            // manually set checkbox property
            $checkables.find('input[type=checkbox]').prop('checked',false);
            $checkbox.prop('checked', !$checkbox.prop('checked') );

            // update all checkables
            $(window).trigger('update.hstm.checkable');
        });

        // update all checkables
        $(window).trigger('update.hstm.checkable');
    });

    $(window).on('update.hstm.checkable', function(){
        // console.log('updating checkable');
        healthStream.checkable();
    });

    $(window).on('unchecked.hstm.checkable', function() {
        // console.log('disable checkable dependants');
        $('.js-checkable-dependent').addClass('disabled');
    });

    $(window).on('checked.hstm.checkable', function() {
        // console.log('enable checkable dependants');
        $('.js-checkable-dependent').removeClass('disabled');
    });

}(window, jQuery));