(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.prototypeOnly = {
        validate: function () {

            // Currently only handles form elements that support the jQuery.val() method.
            // Modification necessary to include radio, checkboxes, etc.

            $('form.validate').on('submit',function(){
                var $f = $(this),
                    errors = 0;

                $f.find('.required').each(function(){
                    var $t = $(this),
                    $p = $t.parents('.form-group');

                    if ( $t.val() === '' ) {
                        $p.addClass('has-error');
                        errors++;
                    } else {
                        $p.removeClass('has-error');
                    }
                });

            // adjust equallized content height
            $(window).resize();

            if ( errors > 0 ) {
                $f.find('.error:eq(0) .required').focus();
                return false;
            } else {
                alert('The client side validation passed');
                return false;
            }

            });
        }
    };

    $(window).on('load',function(){
        healthStream.prototypeOnly.validate();
    });

}(window, jQuery));