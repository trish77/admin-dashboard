(function (window, $) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.catalog = {};

    healthStream.catalog.carousel = function(){
        var slides = $('.section-carousel .hs-item').length;

        $('.section-carousel').slick({
          dots: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 8000,
          speed: 300,
          slidesToShow: (slides>=3)?3:slides,
          slidesToScroll: (slides>=3)?3:slides,
          responsive: [
            {
              breakpoint: 1280,
              settings: {
                autoplay: true,
                speed: 300,
                slidesToShow: (slides>=2)?2:slides,
                slidesToScroll: (slides>=2)?2:slides,
                infinite: true,
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                dots: true,
                arrows: false
              }
            }
          ]
        });
    };

    healthStream.catalog.categories = {
        init: function(){
            var T = this;

            // Update the Category Sliders when results are returned
            $('nav.category-slider')
                .on('categories.initialize',function(event,data){
                    $('nav.category-slider ul').html(data.nav);
                    $(window).resize();
                })
                .on('categories.updated',function(event,data){
                    T.slideNext(data);
                });

            // Attach event handlers
            $('nav.category-slider')
                .on('click','.cs-item > a',function(e){
                    e.preventDefault();
                    T.next($(this));
                })
                .on('click','.cs-back',function(e){
                    e.preventDefault();
                    T.back($(this));
                });

            // Initial Call for Categories & Results
            T.get(null,'categories.initialize');
        },
        back: function($el){
            var T = this,
                $navs = $('.category-slider'),
                $wrap = $el.closest('.cs-wrap'),
                $level = $el.closest('.cs-level'),
                id = $el.parents('.cs-item:eq(1)').find('a:first').attr('data-id');

            $wrap.addClass('cs-sliding');
            $level.removeClass('active');
            $level.animate({
                    left: '100%',
                    right: '-100%'
                },
                200,
                function() {
                    $wrap.removeClass('cs-sliding');
                    $level.parents('.cs-level:first').addClass('active');
                    if ( $wrap.find('.active').length > 0 ) {
                        $wrap.height($wrap.find('.active').height());
                    } else {
                        $wrap.height('auto');
                    }
                    $navs.html($wrap);
                    $(window).resize();
                }
            );

            T.get(id,'categories.previous');
        },
        get: function(id,event){
             $.getJSON('api.catalog.php', {id:id}, function(data) {
                // Delay for prototype only, simulating ajax loading
                setTimeout(function(){
                    $('nav.category-slider').trigger(event,data);
                },500);
            });
        },
        next: function($el){
            var T = this,
                $wrap = $el.closest('.cs-wrap'),
                $item = $el.closest('.cs-item');

            if ( !$item.hasClass('selected') ) {
                $wrap.find('.selected').removeClass('selected');
                $item.addClass('cs-loading');
                T.get($el.attr('data-id'),'categories.updated');
            }
        },
        slideNext: function(data){
            var $item = $('.cs-item.cs-loading'),
                $navs = $('.category-slider'),
                $wrap = $item.closest('.cs-wrap'),
                $level = $item.find('.cs-level:first');

            $item.removeClass('cs-loading');
            $level.find('ul').html(data.nav);

            if ( $level.find('ul').html() !== '' ) {
                $wrap.addClass('cs-sliding');
                $level.animate({
                        left: 0,
                        right: 0
                    },
                    300,
                    function() {
                        $wrap.removeClass('cs-sliding').find('.active').removeClass('active');
                        $level.addClass('active');
                        $wrap.height($level.height());
                        $navs.html($wrap);
                        $(window).resize();
                    }
                );
            } else {
               $item.addClass('selected');
               $navs.html($wrap);
               $(window).resize();
            }
        }
    };

    healthStream.catalog.results = {
        init: function(){
            // Update the Search Results when results are returned
            $('nav.category-slider')
                .on('categories.initialize categories.updated categories.previous',function(event,data){
                    $('#catalog-results').html(data.results);
                    $('.catalog-results-count').html(data.count);
                    $(window).resize();
                });
        }
    };



    $(window).on('load', function(){
        healthStream.catalog.carousel();
        healthStream.catalog.categories.init();
        healthStream.catalog.results.init();
    });

}(window, jQuery));