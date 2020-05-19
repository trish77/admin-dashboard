$(function(){
    var f = $('#portfolio-wizard-modal');
    f.load(function(){
        $(document).on('click', '.wizard-nav-link', function (event) {
            event.preventDefault();
            var $t = $(this).clone().children().remove().end();
            f.contents().find('.wizard-group').fadeOut(0);
            f.contents().find('#' + $(this).data('rel')).fadeIn(500);
            f.contents().find('.wizard-nav-link').removeClass( "active" );
            f.contents().find('.li').removeClass( "active" );
            f.contents().find(this).addClass( "active" );
            f.contents().find('.' + $(this).data('rel')).addClass( "active" );
            f.contents().find('.' + $(this).data('li')).addClass( "active" );
            f.contents().find('.nav-focus').find('.nav-mobile span span').text($t.text());
            var footerClass = ('.section-footer-' + $(this).data('rel'));
            $('.modal-footer').load('portfolio-wizard-modal.php ' + footerClass);
           // alert(footerClass);
        });


        $(document).on('click', '.size-check', function () {
            var height = f.contents().find("#wizard-content").height();
            f.height(height - 50);
        });

        $(document).on('click', '.size-check-init', function () {
            var height = f.contents().find("#wizard-content").height();
            f.height(700);
        });

        $(document).on('click', '.size-check-nav, .nav-default', function () {
            var height = f.contents().find("#wizard-content").height();
            var navHeight = f.contents().find("ul.nav").height();
            f.height(height - 50);
        });

        $(document).on('click', '.hide-add', function (event) {
            event.preventDefault();
            f.contents().find("." + $(this).data('section') + "-container-add").removeClass( "show" );
            f.contents().find("." + $(this).data('section') + "-container").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-next-step").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-save-experience").removeClass( "show" );

            $("." + $(this).data('section') + "-next-step").removeClass( "hidden" );
            $("." + $(this).data('section') + "-save-experience").removeClass( "show" );

            var height = f.contents().find("#wizard-content").height();
            var navHeight = f.contents().find("ul.nav").height();
            f.height(height - 50);
        });

        $(document).on('click', '.hide-add-membership', function (event) {
            event.preventDefault();
            f.contents().find("." + $(this).data('section') + "-container-add-membership").removeClass( "show" );
            f.contents().find("." + $(this).data('section') + "-container-add").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-save-experience").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-membership-experience").removeClass( "show" );

            $("." + $(this).data('section') + "-save-experience").removeClass( "hidden" );
            $("." + $(this).data('section') + "-membership-experience").removeClass( "show" );

            var height = f.contents().find("#wizard-content").height();
            var navHeight = f.contents().find("ul.nav").height();
            f.height(height - 50);
        });

        $(document).on('click', '.hide-add-committee-work', function (event) {
            event.preventDefault();
            f.contents().find("." + $(this).data('section') + "-container-add-committee-work").removeClass( "show" );
            f.contents().find("." + $(this).data('section') + "-container-add").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-save-experience").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-committee-work-experience").removeClass( "show" );

            $("." + $(this).data('section') + "-save-experience").removeClass( "hidden" );
            $("." + $(this).data('section') + "-committee-work-experience").removeClass( "show" );

            var height = f.contents().find("#wizard-content").height();
            var navHeight = f.contents().find("ul.nav").height();
            f.height(height - 50);
        });

        $(document).on('click', '.hide-manage', function (event) {
            event.preventDefault();
            f.contents().find("." + $(this).data('section') + "-container-manage").removeClass( "show" );
            f.contents().find("." + $(this).data('section') + "-container").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-next-step").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-save-experience").removeClass( "show" );

            $("." + $(this).data('section') + "-next-step").removeClass( "hidden" );
            $("." + $(this).data('section') + "-save-experience").removeClass( "show" );

            var height = f.contents().find("#wizard-content").height();
            var navHeight = f.contents().find("ul.nav").height();
            f.height(height - 50);
        });

        $(document).on('click', '.hide-manage-author', function (event) {
            event.preventDefault();
            f.contents().find("." + $(this).data('section') + "-container-manage-author").removeClass( "show" );
            f.contents().find("." + $(this).data('section') + "-container-add").addClass( "show" );
            f.contents().find("." + $(this).data('section') + "-author-experience").addClass( "show" );
            f.contents().find("." + $(this).data('section') + "-author-experience-manage").removeClass( "show" );

            $("." + $(this).data('section') + "-save-experience").removeClass( "hidden" );
            $("." + $(this).data('section') + "-author-experience-manage").removeClass( "show" );

            var height = f.contents().find("#wizard-content").height();
            var navHeight = f.contents().find("ul.nav").height();
            f.height(height - 50);
        });


        // Showing and hiding and storing settings locally
        $(document).on('click', '.hide-section', function (event) {
            event.preventDefault();
            $("." + $(this).data('section') + "-container").slideToggle( "slow", function() {
            });
            $(".btn-success." + $(this).data('section')).toggleClass('btn-success btn-default').html('Select<i class="fa fa-plus visible-xs"></i>');

            f.contents().find("." + $(this).data('section') + "-container").removeClass( "show" );
            f.contents().find("." + $(this).data('section') + "-container").addClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-container-hidden").removeClass( "hidden" );
            f.contents().find("." + $(this).data('section') + "-container-hidden").addClass( "show" );
            f.contents().find('.wizard-nav-link.' + $(this).data('section')).addClass( "strikethru" );
            f.contents().find('.li' + $(this).data('section')).addClass( "strikethru" );
            var storageName = $(this).data("section");
            localStorage.setItem(storageName, "Hidden");
        });
    });
});

