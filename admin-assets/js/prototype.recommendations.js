$(function () {
    $('#slider').slideReveal({
        trigger: $("#trigger"),
        width: 300,
        overlay: true
    });
});

$('#thumbsUp').click(function(){
    localStorage.setItem("feedback", "positive")
    $('#recFeedback').fadeOut('slow');
    });

$('#thumbsDown').click(function () {
    localStorage.setItem("feedback", "negative")
    $('#recFeedback').fadeOut('slow');
});

$('.times-close').click(function(){
    $('#slider').slideReveal('hide');
});