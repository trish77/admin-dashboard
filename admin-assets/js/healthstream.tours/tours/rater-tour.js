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
        var tourName = "toDoTour" + userName.replace(/\s+/g, '').replace(/[^a-z0-9\s]/gi, '');

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
                title: localization.welcomeToRater,
                content: localization.welcomeContent,
                orphan: true,
                backdrop: true,
                backdropPadding: 5,
                onNext: function(){
                    $('nav > ul > li:nth-child(1) > div > a').click();
                }
            },
             {
                duration: 400,
                orphan: true,
                template: "<div style='display: none'></div>"
            },
            {
                element: ".assessment-summary nav > ul > li:nth-child(1)",
                placement: "bottom",
                title: localization.ActionItemsTab,
                content: localization.ActionItemsTabContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".groups-action",
                placement: "top",
                title: localization.groupedBy,
                content: localization.groupedByActionContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".groups-employee",
                placement: "top",
                title: localization.groupedBy,
                content: localization.groupedByEmployeeContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".groups-assessment",
                placement: "top",
                title: localization.groupedBy,
                content: localization.groupedByAssessmentContent,
                backdrop: true,
                backdropPadding: 5,
                onNext: function(){
                    $('nav > ul > li:nth-child(2) > div > a').click();
                },
                onShown: function() {
                    $('.groups-assessment').addClass('tour-step-backdrop');
                }
            },
            {
                element: ".assessment-summary nav > ul > li:nth-child(2)",
                placement: "bottom",
                title: localization.allAssessmentsTab,
                content: localization.allAssessmentsTabContent,
                backdrop: true,
                backdropPadding: 5,
                onPrev: function(){
                    $('nav > ul > li:nth-child(1) > div > a').click();
                }
               
            },
            {
                element: ".filter-bar-flat",
                placement: "bottom",
                title: localization.ratersFilters,
                content: localization.ratersFiltersContent,
                backdrop: true,
                backdropPadding: 5,
                
            },
            {
                element: ".btn-sort-filter",
                placement: "bottom",
                title: localization.ratersSort,
                content: localization.ratersSortContent,
                backdrop: true,
                backdropPadding: 5,
            },
             {
                element: ".action-badge-solid-blue:first",
                placement: "bottom",
                title: localization.ratersActionItems,
                content: localization.ratersActionItemsContent,
                backdrop: true,
                backdropPadding: 5,
              
            },
             {
                element: ".action a.hidden-xs:not(:contains('View')):first",   
                placement: "bottom",
                title: localization.ratersAction,
                content: localization.ratersActionContent,
                backdrop: true,
                backdropPadding: 5,
              
            },
              {
                element: ".action a.hidden-xs:contains('View'):first",
                placement: "bottom",
                title: localization.ratersViewAction,
                content: localization.ratersViewActionContent,
                backdrop: true,
                backdropPadding: 5,
              
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

        //Restart tour when user clicks the button
        $("#startTour").click(function(){
            tour.init();
            tour.restart();
            $(".trigger-close").click();
        });
    }
});