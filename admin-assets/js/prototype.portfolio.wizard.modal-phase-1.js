// Retrieving local storage states and hiding the hidden wizard sections
$(document).ready(function(){
    var i,
        ls = localStorage,
        l = ls.length,
        key;

for (var i = 0; i < l; i++) {
        key = ls.key(i);
        if (localStorage.getItem(key) == "Hidden"){
            $("." + (key) + "-container").slideToggle( 0, function() {
            });
            $( "." + (key) + "-container-hidden" ).slideToggle( 0, function() {
            });
            $( ".wizard-nav-link." + (key) ).addClass( "strikethru" );
        }
    };
});

// Slag Group Control
$(function(){
    $('.slat-group-header-collapse-toggle').click(function(e){
        e.preventDefault();
        $(this).closest('.slat-group').find('.collapse-toggle').click();
    });
    $('.slat-group').on('show.bs.collapse hide.bs.collapse','.collapse-group',function(){
        var $group = $(this).closest('.slat-group'),
            $link = $group.find('.slat-group-header-collapse-toggle'),
            labels = ['Show More','Show Less'];

        console.log($link.html());
        if ( $link.html() == labels[0] ) {
            $link.html(labels[1]);
        } else {
            $link.html(labels[0]);
        }
    });
    $('.slat-toggle .btn').click(function(e){
        var $btn = $(this);
        e.preventDefault();
        $btn.toggleClass('btn-success btn-default');
        if($btn.hasClass('btn-success')){
            $btn.html('Selected<i class="fa fa-check visible-xs"></i>');
        } else {
            $btn.html('Select<i class="fa fa-plus visible-xs"></i>');
        }
    });

    $('.nav-focus li > a').on('shown.bs.tab', function (e) {
        $(window).resize();
    });


    $('.form-group.profession').change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=='with-specialty'){
                // hides any previously selected
                $('.professional-specialty').removeClass( "show" );
                $('.professional-specialty').addClass( "hidden" );
                // shows selected
                $("." + $(this).data('profession') + ".professional-specialty").removeClass( "hidden" );
                $("." + $(this).data('profession') + ".professional-specialty").addClass( "show" );
            }
            else{
                // click of any option without a specialty
                $('.professional-specialty').removeClass( "show" );
                $('.professional-specialty').addClass( "hidden" );
            }
            var frame = $('#portfolio-wizard-modal', window.parent.document);
            var height = $("#wizard-content").height();
            frame.height(height - 50);
        });
    }).change();

});


// Show Extra Work Fields
$(document).on('shown.bs.collapse',function(){
    var frame = $('#portfolio-wizard-modal', window.parent.document);
    var height = $("#wizard-content").height();
    frame.height(height - 50);
});

// Hide Extra Work Fields
$(document).on('hidden.bs.collapse',function(){
    var frame = $('#portfolio-wizard-modal', window.parent.document);
    var height = $("#wizard-content").height();
    frame.height(height - 50);
});


// What happens on click of wizard nav
$('.wizard-nav-link').click(function(e) {
    //var $t = $(this);
    var $t = $(this).clone().children().remove().end();
    e.preventDefault();
    $('.wizard-group').fadeOut(0);
    $('#' + $(this).data('rel')).fadeIn(500);
    $('.wizard-nav-link').removeClass( "active" );
    $('.li').removeClass( "active" );
    $(this).addClass( "active" );
    $('.' + $(this).data('rel')).addClass( "active" );
    $('.' + $(this).data('li')).addClass( "active" );
    $('.nav-focus').find('.nav-mobile span span').text($t.text());

    var footerClass = ('.section-footer-' + $(this).data('rel'));
    window.parent.$('.modal-footer').load('portfolio-wizard-modal-phase-1.php ' + footerClass);
});

// Showing and hiding and storing settings locally
$(document).on('click', '.hide-section', function (e) {
    e.preventDefault();
    $("." + $(this).data('section') + "-container").removeClass( "show" );
    $("." + $(this).data('section') + "-container").addClass( "hidden" );
    $("." + $(this).data('section') + "-container-hidden").removeClass( "hidden" );
    $("." + $(this).data('section') + "-container-hidden").addClass( "show" );
    $('.wizard-nav-link.' + $(this).data('section')).addClass( "strikethru" );
    $('.li' + $(this).data('section')).addClass( "strikethru" );

    window.parent.$("." + $(this).data('section') + "-container").slideToggle( "slow", function() {
    });
    window.parent.$("." + $(this).data('section') + "-container-hidden").slideToggle( "slow", function() {
    });

    var storageName = $(this).data("section");
    localStorage.setItem(storageName, "Hidden");
});

$(document).on('click', '.show-section', function (e) {
    e.preventDefault();
    $("." + $(this).data('section') + "-container").removeClass( "hidden" );
    $("." + $(this).data('section') + "-container").addClass( "show" );
    $("." + $(this).data('section') + "-container-hidden").removeClass( "show" );
    $("." + $(this).data('section') + "-container-hidden").addClass( "hidden" );
    $('.wizard-nav-link.' + $(this).data('section')).removeClass( "strikethru" );
    $('.li' + $(this).data('section')).removeClass( "strikethru" );

    window.parent.$("." + $(this).data('section') + "-container").slideToggle( "slow", function() {
    });
    window.parent.$("." + $(this).data('section') + "-container-hidden").slideToggle( "slow", function() {
    });

    var storageName = $(this).data("section");
    localStorage.setItem(storageName, "Shown");
});


// Showing and hiding and storing settings locally
$(document).on('click', '.show-add', function (e) {
    e.preventDefault();
    $("." + $(this).data('section') + "-container-add").addClass( "show" );
    $("." + $(this).data('section') + "-container").addClass( "hidden" );
    $("." + $(this).data('section') + "-next-step").addClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").addClass( "show" );

    // I'm outside the iframe in the parent document
    window.parent.$("." + $(this).data('section') + "-next-step").addClass( "hidden" );
    window.parent.$("." + $(this).data('section') + "-save-experience").addClass( "show" );
});

$(document).on('click', '.show-add-membership', function (e) {
    e.preventDefault();
    $("." + $(this).data('section') + "-container-add-membership").addClass( "show" );
    $("." + $(this).data('section') + "-container-add").addClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").addClass( "hidden" );
    $("." + $(this).data('section') + "-membership-experience").removeClass( "hidden" );
    $("." + $(this).data('section') + "-membership-experience").addClass( "show" );

    // I'm outside the iframe in the parent document
    window.parent.$("." + $(this).data('section') + "-save-experience").addClass( "hidden" );
    window.parent.$("." + $(this).data('section') + "-membership-experience").removeClass( "hidden" );
    window.parent.$("." + $(this).data('section') + "-membership-experience").addClass( "show" );

});

$(document).on('click', '.show-add-committee-work', function (e) {
    e.preventDefault();
    $("." + $(this).data('section') + "-container-add-committee-work").addClass( "show" );
    $("." + $(this).data('section') + "-container-add").addClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").addClass( "hidden" );
    $("." + $(this).data('section') + "-committee-work-experience").removeClass( "hidden" );
    $("." + $(this).data('section') + "-committee-work-experience").addClass( "show" );

    // I'm outside the iframe in the parent document
    window.parent.$("." + $(this).data('section') + "-save-experience").addClass( "hidden" );
    window.parent.$("." + $(this).data('section') + "-committee-work-experience").removeClass( "hidden" );
    window.parent.$("." + $(this).data('section') + "-committee-work-experience").addClass( "show" );

});

$(document).on('click', '.show-manage', function (e) {
    e.preventDefault();
    $("." + $(this).data('section') + "-container-manage").addClass( "show" );
    $("." + $(this).data('section') + "-container").addClass( "hidden" );
    $("." + $(this).data('section') + "-next-step").addClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").addClass( "show" );

    // I'm outside the iframe in the parent document
    window.parent.$("." + $(this).data('section') + "-next-step").addClass( "hidden" );
    window.parent.$("." + $(this).data('section') + "-save-experience").addClass( "show" );
});

// MODAL AND IFRAME SIZE CHECKING AND REDRAWING
$(document).ready(function () {

    $(document).on('click', '.size-check, .hide-section, show-section', function () {
        var frame = $('#portfolio-wizard-modal', window.parent.document);
        var height = $("#wizard-content").height();
        frame.height(height - 50);
    });

    $(document).on('click', '.size-check-nav, .nav-default', function () {
        var frame = $('#portfolio-wizard-modal', window.parent.document);
        var height = $("#wizard-content").height();
        var navHeight = $("ul.nav").height();
        frame.height(height - 50);
    });
});





