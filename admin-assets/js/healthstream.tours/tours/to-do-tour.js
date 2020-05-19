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
                title: localization.welcomeToTodoList,
                content: localization.welcomeContent,
                orphan: true,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".filter-target",
                placement: "top",
                title: localization.todoList,
                content: localization.todoListContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".fph-secondary ul li:visible:first",
                placement: "bottom",
                title: localization.taskSummary,
                content: localization.taskSummaryContent
            },
            {
                element: ".slat:visible:first .title",
                placement: "bottom",
                title: localization.view,
                content: localization.viewContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat:visible:first .action",
                placement: "bottom",
                title: localization.action,
                content: localization.actionContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat-message:visible:first",
                placement: "top",
                title: localization.noTasks,
                content: localization.noTasksContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat:not(.slat-attention):visible:first .slat-default",
                placement: "top",
                title: localization.orderOfTasks,
                content: localization.orderOfTasksContent
            },
            {
                element: ".slat-attention:visible:first",
                placement: "bottom",
                title: localization.attentionItems,
                content: localization.attentionItemsContent,
                backdrop: true,
                backdropPadding: 5,
                template: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title bg-attention"></h3><div class="popover-content"></div><div class="popover-navigation"><button class="btn btn-sm btn-default popover-previous" data-role="prev"><i class="fa fa-fw fa-chevron-left"></i></button><button class="btn btn-sm btn-success popover-next" data-role="next"><i class="fa fa-fw fa-chevron-right"></i></button><button class="popover-close" data-role="end"><i class="fa fa-times"></i></button></div></div>' ,
            },
            {
                element: "div.slat[data-filter-category='3']:visible:first .action",
                placement: "top",
                title: localization.electives,
                content: localization.electivesContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".filter-mini",
                placement: "bottom",
                title: localization.filters,
                content: localization.filtersContent,
                backdrop: true,
                backdropPadding: 5
            },
             {
                element: ".list-links li > a:contains('My Submitted Assessments'):first",
                placement: "bottom",
                title: localization.todoSubmittedAssessments,
                content: localization.todoSubmittedAssessmentsContent,
                backdrop: true,
                orphan: false
            },
            {
                element: "#myAssessmentsLink",
                placement: "bottom",
                title: localization.todoOldAssessments,
                content: localization.todoOldContent,
                backdrop: true,
                orphan: false
            },
             {
                element: ".fph-cell-button .btn-focus:visible:first",
                placement: "bottom",
                title: localization.quickStart,
                content: localization.quickStartContent,
                backdrop: true,
                orphan: false
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