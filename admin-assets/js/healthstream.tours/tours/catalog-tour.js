$(document).ready(function(){

    "use strict";

    var healthStream = window.HealthStream = window.HealthStream || {};
    healthStream.tour = healthStream.tour || {};
    healthStream.tour.localization = healthStream.tour.localization || {};

    var constants = healthStream.constants || {};
    var defaultIcons = {
        Car: '<i class="fa fa-car"></i>',
        Close: '<i class="fa fa-times"></i>',
        LeftAngle: '<i class="fa fa-fw fa-chevron-left"></i>',
        RightAngle: '<i class="fa fa-fw fa-chevron-right"></i>'
    };
    var icons = constants.icons ? $.extend({}, defaultIcons, constants.icons) : defaultIcons;

    if ( !$.isEmptyObject(healthStream.tour.localization) ) {

        var localization = healthStream.tour.localization;
        // We have content and can continue setting up the tour
        $(".nav-main .nav").append("<li><div class='container-fluid'><div class='row'><span href='#' class='btn btn-info col-xs-10' id='startTour'>" + icons.Car + localization.startTour + "</span></div></div></li>");

        // Create unique tour name so multiple users on same machine will see tour for first time
        // Tour name should contain only alphanumerics, underscores and hyphens
        var userName = $(".nav-account .name").html();
        var tourName = "catalogTour" + userName.replace(/\s+/g, '').replace(/[^a-z0-9\s]/gi, '');

        // Create tour and add steps
        var tour = new window.Tour({
            name: tourName,
            storage:false,
            template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title bg-info'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-sm btn-default popover-previous' data-role='prev'>" + icons.LeftAngle + "</button><button class='btn btn-sm btn-success popover-next' data-role='next'>" + icons.RightAngle + "</button><button class='popover-close' data-role='end'>"+ icons.Close +"</button></div></div>",
            onShow: function() { $('body').addClass('tour-open'); },
            onHide: function() { $('body').removeClass('tour-open'); },
            onEnd: function() { $('.stickybar .btn').prop('disabled',false); }
            });

        tour.addSteps([
            {
                element: "",
                placement: "bottom",
                title: localization.welcomeToCatalog,
                content: localization.welcomeContent,
                orphan: true,
                backdrop: true,
                backdropPadding: 5,
                onShow: function(){ $('.stickybar .btn').prop('disabled',true); }
            },
            {
                element: ".primary .input-group",
                placement: "bottom",
                title: localization.keywordSearch,
                content: localization.keywordSearchContent,
                backdrop: true
            },
            {
                element: ".catalog-categories:visible:first",
                placement: "top",
                title: localization.categories,
                content: localization.categoriesContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".stickybar .btn-success:visible:first",
                placement: "top",
                title: localization.refineResults,
                content: localization.refineResultsContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat:visible:first .title",
                placement: "bottom",
                title: localization.title,
                content: localization.titleContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".action:first",
                placement: "left",
                title: localization.actions,
                content: localization.actionContentCatalog,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat-nested .collapse-toggle:first ",
                placement: "top",
                title: localization.additionalInformation,
                content: localization.additionalInformationContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: "",
                placement: "bottom",
                title: localization.endOfTour,
                content: localization.endOfTourContent,
                orphan: true,
                backdrop: true
            }
        ]);


        $("#startTour").click(function(){
            tour.init();
            tour.restart();
            $(".trigger-close").click();
        });

    }

});