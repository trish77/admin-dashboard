
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
        var storageName = $(this).data("section");
        e.preventDefault();
        $btn.toggleClass('btn-success btn-default');
        if($btn.hasClass('btn-success')){
            $btn.html('Selected<i class="fa fa-check visible-xs"></i>');
            localStorage.setItem(storageName, "Shown");
        } else {
            $btn.html('Select<i class="fa fa-plus visible-xs"></i>');
            localStorage.setItem(storageName, "Hidden");
        }
        $("." + $(this).data('section') + "-container").slideToggle( "slow", function() {
        });
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
        $( ".btn-success." + (key)).toggleClass('btn-success btn-default').html('Select<i class="fa fa-plus visible-xs"></i>');
    }
};
});


window.closeModal = function(){
    parent.$('#modal-portfolio-wizard').modal('hide');
    window.location.reload();
};

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

