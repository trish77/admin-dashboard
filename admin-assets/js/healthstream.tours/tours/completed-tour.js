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

        $(".nav-main .nav").append("<li><div class='container-fluid'><div class='row'><span href='#' class='btn btn-info col-xs-10' id='startTour'>" + icons.Car + localization.startTour + "</span></div></div></li>");

        // Create unique tour name so multiple users on same machine will see tour for first time
        // Tour name should contain only alphanumerics, underscores and hyphens
        var userName = $(".nav-account .name").html();
        var tourName = "completedTour" + userName.replace(/\s+/g, '').replace(/[^a-z0-9\s]/gi, '');

        //create tour and add steps
        var tour = new window.Tour({
            name: tourName,
            storage:false,
            template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title bg-info'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-sm btn-default popover-previous' data-role='prev'>" + icons.LeftAngle + "</button><button class='btn btn-sm btn-success popover-next' data-role='next'>" + icons.RightAngle + "</button><button class='popover-close' data-role='end'>"+ icons.Close +"</button></div></div>",
            onShow: function() { $('body').addClass('tour-open'); },
            onHide: function() { $('body').removeClass('tour-open'); }
            });

        tour.addSteps([
            {
                element: "",
                placement: "bottom",
                title: localization.welcomeToCompleted,
                content: localization.welcomeContent,
                orphan: true,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".section-results",
                placement: "top",
                title: localization.completedTasks,
                content: localization.completedTasksContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".fph-secondary ul li:first",
                placement: "bottom",
                title: localization.completionSummary,
                content: localization.completionSummaryContents
            },
            {
                element: ".panel-group-slats",
                placement: "top",
                title: localization.ceCreditSummary,
                content: localization.ceCreditSummaryContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".section-refinement-options:visible",
                placement: "top",
                title: localization.completedFilters,
                content: localization.completedFiltersContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat-default .title a:visible:first ",
                placement: "top",
                title: localization.linkedNames,
                content: localization.linkedNamesContent,
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
                element: ".action:first",
                placement: "bottom",
                title: localization.actions,
                content: localization.actionsContent,
                backdrop: true,
                backdropPadding: 5
            },
        ]);
        //conditional step for if the user has an assessment and has permission to print.  
        //the logic was too complex to put it one sigle selector. 

        if($('.meta-type:contains("Assessment")').parents('.slat-default').find('.action:contains("Print")').length > 0){
            
        }

         tour.addSteps([
             {
                element: ".section-results-header-sort .btn",
                placement: "bottom",
                title: localization.completedSort,
                content: localization.completedSortContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".section-results-header-sort .btn",
                placement: "bottom",
                title: localization.completedSort,
                content: localization.completedSortContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".fph-cell-button .btn-focus:visible:first",
                placement: "bottom",
                title: localization.printButton,
                content: localization.printButtonContent,
                backdrop: true
            },
            {
                element: ".stickybar-floater",
                placement: "top",
                title: localization.completedButtonBar,
                content: localization.completedButtonBarContent,
                backdrop: true
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