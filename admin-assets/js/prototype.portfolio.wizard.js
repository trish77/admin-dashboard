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
        });
    }).change();

});



// Adding author to Publication modal
$( ".toggle-author" ).click(function() {
    event.preventDefault();
    $( "#wizard-author-add" ).slideToggle( "fast", function() {
    });
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

    $('.modal-footer').load('portfolio-wizard-modal2.php .section-footer-we');
});

// Showing and hiding and storing settings locally
$( ".hide-section" ).click(function() {
    event.preventDefault();
    $("." + $(this).data('section') + "-container").slideToggle( "fast", function() {
    });
    $( "." + $(this).data("section") + "-container-hidden" ).slideToggle( "fast", function() {
    });
    $('.wizard-nav-link.' + $(this).data('section')).addClass( "strikethru" );
    $('.li' + $(this).data('section')).addClass( "strikethru" );

    var storageName = $(this).data("section");
    localStorage.setItem(storageName, "Hidden");
    //document.getElementById("result").innerHTML = (storageName + " = " + localStorage.getItem(storageName));
});

$( ".show-section" ).click(function() {
    event.preventDefault();
    $("." + $(this).data('section') + "-container").slideToggle( "fast", function() {
    });
    $( "." + $(this).data("section") + "-container-hidden" ).slideToggle( "fast", function() {
    });
    $('.wizard-nav-link.' + $(this).data('section')).removeClass( "strikethru" );
    $('.li' + $(this).data('section')).removeClass( "strikethru" );
    var storageName = $(this).data("section");
    localStorage.setItem(storageName, "Shown");
    //document.getElementById("result").innerHTML = (storageName + " = " + localStorage.getItem(storageName));
});


// Showing and hiding and storing settings locally
$( ".show-add" ).click(function() {
    event.preventDefault();
    $("." + $(this).data('section') + "-container-add").addClass( "show" );
    $("." + $(this).data('section') + "-container").addClass( "hidden" );
    $( "." + $(this).data("section") + "-container-hidden" ).addClass( "hidden" );
    $("." + $(this).data('section') + "-next-step").addClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").addClass( "show" );
});

$( ".hide-add" ).click(function() {
    event.preventDefault();
    $("." + $(this).data('section') + "-container-add").removeClass( "show" );
    $("." + $(this).data('section') + "-container").removeClass( "hidden" );
    $( "." + $(this).data("section") + "-container-hidden" ).removeClass( "hidden" );
    $("." + $(this).data('section') + "-next-step").removeClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").removeClass( "show" );
});

$( ".show-manage" ).click(function() {
    event.preventDefault();
    $("." + $(this).data('section') + "-container-manage").addClass( "show" );
    $("." + $(this).data('section') + "-container").addClass( "hidden" );
    $( "." + $(this).data("section") + "-container-hidden" ).addClass( "hidden" );
    $("." + $(this).data('section') + "-next-step").addClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").addClass( "show" );
});

$( ".hide-manage" ).click(function() {
    event.preventDefault();
    $("." + $(this).data('section') + "-container-manage").removeClass( "show" );
    $("." + $(this).data('section') + "-container").removeClass( "hidden" );
    $( "." + $(this).data("section") + "-container-hidden" ).removeClass( "hidden" );
    $("." + $(this).data('section') + "-next-step").removeClass( "hidden" );
    $("." + $(this).data('section') + "-save-experience").removeClass( "show" );
});

/*
$(document).ready(function(){
    document.getElementById("result").innerHTML =
    "Work Experience = " + localStorage.getItem("work-experience") + " | " +
    "Education = " + localStorage.getItem("education") + " | " +
    "Licenses = " + localStorage.getItem("licenses") + " | " +
});
*/

// MODAL AND IFRAME SIZE CHECKING AND REDRAWING
$(document).ready(function () {

    $(document).on('click', '.size-check', function () {
        var frame = $('#portfolio-wizard-modal', window.parent.document);
        var height = $("#wizard-content").height();
        frame.height(height);
    });

    $(document).on('click', '.size-check-nav', function () {
        var frame = $('#portfolio-wizard-modal', window.parent.document);
        var height = $("#wizard-content").height();
        var navHeight = $("ul.nav").height();
        frame.height(height);
    });

    $('.nav-focus').on('click', '.nav-default', function () {
        var frame = $('#portfolio-wizard-modal', window.parent.document);
        var height = $("#wizard-content").height();
        var navHeight = $("ul.nav").height();
        frame.height(height);
    });

});


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


// MODAL SWAPPING CODE
$( ".add-committee-work" ).click(function(e) {
    e.preventDefault();
    $('#modal-memberships').modal('hide');
    var delay = setTimeout(function(){ $('#modal-committee-work').modal('show'); }, 400);
    $('#modal-committee-work').find(".new-memberships-group").hide();
    $('#modal-committee-work').find(".modal-footer").hide();
    $('#modal-committee-work').find(".modal-footer.alt").show();

});
$( ".close-committee-work" ).click(function(e) {
    e.preventDefault();
    $('#modal-committee-work').modal('hide');
    $('#modal-committee-work').find(".modal-footer").show();
    $('#modal-committee-work').find(".modal-footer.alt").hide();
    var delay = setTimeout(function(){ $('#modal-memberships').modal('show'); }, 400);
    $('#modal-committee-work').find(".new-memberships-group").show();
});
$( ".refresh-committee-work" ).click(function(e) {
    e.preventDefault();
    $('#modal-committee-work').modal('hide');
    var delay = setTimeout(function(){ $('#modal-committee-work').modal('show'); }, 400);
});


$( ".add-memberships" ).click(function(e) {
    e.preventDefault();
    $('#modal-committee-work').modal('hide');
    var delay = setTimeout(function(){ $('#modal-memberships').modal('show'); }, 400);
    $('#modal-memberships').find(".new-work-committees-group").hide();
    $('#modal-memberships').find(".modal-footer").hide();
    $('#modal-memberships').find(".modal-footer.alt").show();

});
$( ".close-memberships" ).click(function(e) {
    e.preventDefault();
    $('#modal-memberships').modal('hide');
    $('#modal-memberships').find(".modal-footer").show();
    $('#modal-memberships').find(".modal-footer.alt").hide();
    var delay = setTimeout(function(){ $('#modal-committee-work').modal('show'); }, 400);
    $('#modal-memberships').find(".new-work-committees-group").show();
});
$( ".refresh-memberships" ).click(function(e) {
    e.preventDefault();
    $('#modal-memberships').modal('hide');
    var delay = setTimeout(function(){ $('#modal-memberships').modal('show'); }, 400);
});


