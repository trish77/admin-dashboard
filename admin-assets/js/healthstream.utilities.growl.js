(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.utilities = window.HealthStream.utilities || {};
    var healthStream = window.HealthStream;

    healthStream.utilities.growl = function( options ){

        var imagePath = healthStream.constants.imageDir,
            settings = {
                slide_in_speed: 500,
                fade_out_speed: 400
            };

        settings.title = options.title || 'A title is required for the growl call';
        settings.text = decodeURIComponent(options.text) || null;
        settings.sticky = options.sticky || null;
        settings.time = options.time || null;

        switch(options.type){
            case 'success':
                settings.image = imagePath + 'icon-success.png';
                settings.class_name = 'gritter-item-success';
                break;
            case 'info':
                settings.image = imagePath + 'icon-info.png';
                settings.class_name = 'gritter-item-info';
                break;
            case 'warning':
                settings.image = imagePath + 'icon-warning.png';
                settings.class_name = 'gritter-item-warning';
                break;
            case 'failure':
                settings.image = imagePath + 'icon-failure.png';
                settings.class_name = 'gritter-item-failure';
                break;
        }

        $.gritter.add(settings);

    };

}(window, jQuery));