(function(window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.checklist = {};

    healthStream.checklist.init = function() {
        var T = this;

        // Toggle buttons and set value
        $('.checklist-actions').on('click', '.btn', function() {
            T.setValue($(this));
        });

        // Clear comment value on add/remove
        $('.checklist-item-review .collapse-toggle').click(function() {
            $(this).closest('.checklist-item').find('textarea').val('');
        });

        // Mark All Success
        $('.js-checklist-all-success').click(function(e) {
            e.preventDefault();
            healthStream.checklist.markAllSuccess();
        });
        // Mark All Methods of Verification as
        $('.js-checklist-all-verified').click(function(e) {
            e.preventDefault();
            healthStream.checklist.markAllVerified($(this));
        });

        $(".checklist-methods input[value='6']").change(function(){
            $(this).nextAll('input').first().toggleClass("hidden");
        });
    };

    healthStream.checklist.setValue = function($el) {
        var $item = $el.closest('.checklist-item'),
            $value = $item.find('input[type="hidden"]');

        if (!$item.hasClass('checklist-item-locked')) {
            if ($el.hasClass('checklist-btn-pass')) {
                $el.toggleClass('btn-default btn-success selected');
                 healthStream.checklist.prefillMOV($el);
            } else if ($el.hasClass('checklist-btn-skip')) {
                $el.toggleClass('btn-default btn-skip selected');
            } else {
                $el.toggleClass('btn-default btn-danger selected');
                 healthStream.checklist.prefillMOV($el);
            }
            $el.siblings('.btn').removeClass('btn-danger btn-success btn-skip selected').addClass('btn-default');

            if ($item.find('.checklist-actions .btn.selected:not(".btn-skip")').length > 0) {
                $item.addClass('checklist-item-selected');
                $value.val($el.text());
            }
            //if n/a button is selected, give slat a different selected class
            else if ($item.find('.checklist-actions .btn-skip.selected').length > 0) {
                $item.addClass('checklist-item-selected-skip');
                $item.removeClass('checklist-item-selected');
                $value.val($el.text());
            } else {
                // nothing selected, remove values
                healthStream.checklist.removeValue($el);
            }
        }
    };

    healthStream.checklist.removeValue = function($el) {
        var $item = $el.closest('.checklist-item'),
            $value = $item.find('input[type="hidden"]');

        $item.removeClass('checklist-item-selected');
        $value.val('');
        if ($item.find('.collapse-group.in').length > 0) {
            $item.find('.collapse-toggle').trigger('click');
        }

        if ($item.find('.checkbox input:checked').length > 0) {
            $item.find('.checkbox input').prop("checked", false);
        }
    };

    healthStream.checklist.clearMine = function() {
        $('.checklist-item').each(function() {
            var $el = $(this);
            if (!$el.hasClass('checklist-item-locked')) {
                $el.find('input[type="hidden"]').val('');
                $el.find('.btn.selected').trigger('click');
                $el.find('.checkbox input:checked').prop("checked", false);
            }
        $(".js-checklist-all-verified-menu .active").trigger("click");
        $(".prefill-mov-items .checkbox input").prop('checked', false);
        $(".panel-heading a:not('.collapsed')").trigger("click");

        });
    };

    healthStream.checklist.markAllSuccess = function() {
        $('.checklist-item').each(function() {
            var $el = $(this);
            if (!$el.hasClass('checklist-item-locked')) {
                $el.find('.checklist-btn-pass').not('.selected').trigger('click');
            }
        });
    };


    healthStream.checklist.prefillMOV = function($el){

        //if we use pills use this function
        $(".prefill-mini .active input").each(function(){
            var prefillVal = $(this).val();

            var thisTasksMOVCheckbox = $el.parents(".checklist-item").find(".checklist-methods .checkbox input");

            thisTasksMOVCheckbox.each(function(){
                var methodVal =  $(this).val();

                if(prefillVal === methodVal){
                    $(this).prop("checked", true);
                }
            });
        });

        //if we use panel and checkboxes use this function
        $(".prefill-mov-items .checkbox input:checked").each(function(){
            var prefillVal = $(this).val();

            var thisTasksMOVCheckbox = $el.parents(".checklist-item").find(".checklist-methods .checkbox input");

             thisTasksMOVCheckbox.each(function(){
                var methodVal =  $(this).val();

                if(prefillVal === methodVal){
                    $(this).prop("checked", true);
                }
            });

        });
    };

    $(window).on('load', function() {
        healthStream.checklist.init();
    });

}(window, jQuery));
