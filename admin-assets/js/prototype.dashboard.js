$(function(){
    $('.expand-panel-warning').click(function() {
        $('.action-results-row-warning').slideDown("slow");
        $('.expand-panel-warning').hide();
    });
    $('.action-results-row-warning .collapse-panel').click(function(){
        $('.action-results-row-warning').slideUp("slow");
        $('.expand-panel-warning').show();
    })
		
});