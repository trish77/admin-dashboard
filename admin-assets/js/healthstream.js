(function(){

    "use strict";

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.constants = {
        imageDir: './content/images/'
    };

    healthStream.init = function(){


        // ----------------------------------
        //  Site-Header
        // ----------------------------------
        $(".site-header .trigger-open").click(function(e){
            if ( $(this).hasClass('trigger-open-header') ) {
                $(".site-header").addClass('site-header-open');
                $('html, body').css({
                    'overflow': 'hidden',
                    'height': '100%'
                });
            }
            else if ( $(this).hasClass('trigger-open-account') ) {
                $(".nav-account").addClass('nav-account-open');
            }
            
            e.preventDefault();
        });
        $(".site-header .trigger-close").click(function(e){
            $(".site-header").removeClass('site-header-open');
            $(".nav-account").removeClass('nav-account-open');
            $('html, body').css({
                'overflow': 'auto',
                'height': 'auto'
            });
            e.preventDefault();
        });
     
        // ----------------------------------
        //  Focus Nav
        // ----------------------------------
        $('.nav-focus .toggle').on('click', function(e){
          $(this).parents('.nav-focus').toggleClass('nav-focus-open');
          e.preventDefault();
        });
        $('.nav-focus li a')
          .on('click touchstart', function (e) {
            var $t = $(this),
                isPage = !!$t.attr('data-page');

            if ( !isPage ) {
                $t.tab('show');
                $t.parents('.nav-focus').find('.nav-mobile span span').text($t.text());
                $t.parents('.nav-focus-open').find('.nav-mobile a').click();
                e.preventDefault();
            }
          });
        $('a[data-toggle="focus"]').click(function (e) {
          e.preventDefault();
          $('.nav-focus a[href="' + $(this).attr('href') + '"]').click();
        });

        // ----------------------------------
        //  Page Tabs
        // ----------------------------------
        $('.nav-pagetabs .toggle').on('click', function(e){
          $(this).parents('.nav-pagetabs').toggleClass('nav-pagetabs-open');
          e.preventDefault();
        });
        $('.nav-pagetabs li a')
          .on('click touchstart', function (e) {
            var $t = $(this),
                isPage = !!$t.attr('data-page');

            if ( !isPage ) {
                $t.tab('show');
                $t.parents('.nav-pagetabs-open').find('.nav-mobile a').click();
                e.preventDefault();
            }
          });
        $('a[data-toggle="focus"]').click(function (e) {
          e.preventDefault();
          $('.nav-pagetabs a[href="' + $(this).attr('href') + '"]').click();
        });



        // ----------------------------------
        //  Question & Answer
        // ----------------------------------
        $('label.answer').click(function(){
            var $t = $(this),
                $a = $t.closest('.question').find('.answer');
            $a.removeClass('selected').has('input:checked').addClass('selected');
        });


        // ----------------------------------
        //  Slat Nested Collapse Toggle
        // ----------------------------------
        $('.collapse-group').collapse({
          toggle: false
        });
        $('.collapse-toggle').click(function(e){
            $(this).siblings('.collapse-group').collapse('toggle');
            e.preventDefault();
        });
        $('.collapse-group').on('shown.bs.collapse hidden.bs.collapse', function(){
            $(window).resize();
        });


        // ----------------------------------
        //  Collapsing Tabs Nav
        // ----------------------------------
        $('.nav-collapsing-tabs')
            .on('click','.nav-header',function(e){
                $('.nav-collapsing-tabs').toggleClass('in');
                e.preventDefault();
            })
            .on('click','.nav a',function(e){
                $('.nav-collapsing-tabs .nav-header span').text($(this).text());
                $('.nav-collapsing-tabs').removeClass('in');
                e.preventDefault();
            });

        // ----------------------------------
        //  Select2 Controls
        // ----------------------------------
        if ( $(".control-select2").length > 0 ) {
            $(".control-select2").select2({
                placeholder: "Select all that apply"
            }).on("select2-selecting", function() {
                $(window).resize();
            });
        }
    };

    $(window).on('load', function(){
        healthStream.init();
    });

})();