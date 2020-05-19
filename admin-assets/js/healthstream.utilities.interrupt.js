(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.utilities = window.HealthStream.utilities || {};
    var healthStream = window.HealthStream;

    healthStream.utilities.interrupt = function ( options ) {

        var imagePath = healthStream.constants.imageDir,
            settings = {},
            html = '',
            template = '';

        // quick template for interruption modal w/ replace tags
        template += '<div id="modal-interrupt" data-backdrop="static" class="modal modal-interrupt fade">';
        template += '<div class="modal-dialog">';
        template += '<div class="modal-content">';
        template += '<div class="modal-body">';
        template += '<div class="modal-icon">[[icon]]</div>';
        template += '<div class="modal-title">[[title]]</div>';
        template += '<div class="modal-text">[[text]]</div>';
        template += '</div>';
        template += '<div class="modal-footer">[[actions]]</div>';
        template += '</div></div></div>';

        settings.title = options.title || 'A title is required for the growl call';
        settings.text = decodeURIComponent(options.text) || null;
        settings.actions = '';

        switch(options.type){
            case 'success':
                settings.image = '<img src="' + imagePath + 'icon-success.png" />';
                break;
            case 'info':
                settings.image = '<img src="' + imagePath + 'icon-info.png" />';
                break;
            case 'warning':
                settings.image = '<img src="' + imagePath + 'icon-warning.png" />';
                break;
            case 'failure':
                settings.image = '<img src="' + imagePath + 'icon-failure.png" />';
                break;
            default:
                settings.image = '';
        }

        if ( options.actions && options.actions.length > 0 ) {
            $(options.actions).each(function(i){
                settings.actions += '<a href="' + (this.url || '#') + '" id="' + (this.id || 'interrupt-action-' + i ) + '" class="btn ' + ((this.type)?'btn-' + this.type:'btn-default') + '">' + (this.label || 'Label Required') + '</a>';
            });
        }

        html = template.replace('[[icon]]',settings.image).replace('[[title]]',settings.title).replace('[[text]]',settings.text).replace('[[actions]]',settings.actions);

        $('#modal-interrupt').remove();
        $('body').append(html);
        $('#modal-interrupt').modal();
        if ( settings.image !== '' ) {
            $('#modal-interrupt .modal-content').addClass('modal-has-icon');
        }
        $('#modal-interrupt a[href="#"].btn').click(function(e){
            e.preventDefault();
            $('#modal-interrupt').modal('hide');
        });

    }

}(window, jQuery));