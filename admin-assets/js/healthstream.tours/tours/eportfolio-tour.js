$(document).ready(function () {

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

    if (!$.isEmptyObject(healthStream.tour.localization)) {

        var localization = healthStream.tour.localization;

        $(".nav-main .nav").append("<li><div class='container-fluid'><div class='row'><span href='#' class='btn btn-info col-xs-10' id='startTour'>" + icons.Car + localization.startTour + "</span></div></div></li>");

        // Create unique tour name so multiple users on same machine will see tour for first time
        // Tour name should contain only alphanumerics, underscores and hyphens
        var userName = $(".nav-account .name").html();
        var tourName = "toDoTour" + userName.replace(/\s+/g, '').replace(/[^a-z0-9\s]/gi, '');

        //create tour and add steps
        var tour = new window.Tour({
            name: tourName,
            storage: false,
            template: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title bg-info"></h3><div class="popover-content"></div><div class="popover-navigation"><div class="btn-group"><button class="btn btn-sm btn-default " data-role="prev"><i class="fa-chevron-left fa"></i> ' + localization.prev + '</button><button class="btn btn-sm btn-success" data-role="next">' + localization.next + ' <i class="fa-chevron-right fa"></i></button></div><button class="btn btn-sm btn-default" data-role="end">' + localization.endTour + '</button></div></div> ',
            onShow: function () {
                $('body').addClass('tour-open');
            },
            onHide: function () {
                $('body').removeClass('tour-open');
            }
        });

        tour.addSteps([
            {
                element: "",
                placement: "bottom",
                title: localization.welcomeToEportfolio,
                content: localization.welcomeToEportfolioContent,
                orphan: true,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat-group:first",
                placement: "top",
                title: localization.eportfolioSections,
                content: localization.eportfolioSectionsContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat-group-header-actions:first .btn-group:first",
                placement: "bottom",
                title: localization.addRecord,
                content: localization.addRecordContent,
                backdrop: true,
                backdropPadding: 5,

//                onHidden: function () {
////                    $('.slat-group-header-actions:first .dropdown-menu').show();
//                    $('.slat-group-header-actions:first .dropdown-menu').closest(".btn-group").find(".dropdown-toggle").trigger("click");
//                }
            },
            {
                element: ".slat-group-header-actions:first .btn-group .btn-group",
                placement: "top",
                title: localization.customizeEportfolio,
                content: localization.customizeEportfolioContent,
                backdrop: true,
                backdropPadding: 5,
                onShown: function (){
                    $('.slat-group-header-actions:first .dropdown-menu').closest(".btn-group").addClass("open");
                    
                },

                onHidden: function () {
                   $('.slat-group-header-actions:first .dropdown-menu').closest(".btn-group").removeClass("open");
                }
            },

//            {
//                element: ".stickybar.sticky .import-mode-btn ",
//                placement: "top",
//                title: localization.importRecords,
//                content: localization.importRecordsContent,
//                backdrop: true,
//                backdropPadding: 5,
//                autoscroll:false,
//
//            },


            {
                element: ".section-box-import .import-mode-btn ",
                placement: "bottom",
                title: localization.importRecords,
                content: localization.importRecordsContent,
                backdrop: true,
                backdropPadding: 5
            },
            {
                element: ".slat-group .slat:visible .action:first",
                placement: "bottom",
                title: localization.manageRecords,
                content: localization.manageRecordsContent,
                backdrop: true,
                backdropPadding: 5,
            },
            {
                element: ".slat-attention:visible:first",
                placement: "bottom",
                title: localization.attentionItems,
                content: localization.eportfolioAttentionItemsContent,
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

        //Restart tour when user clicks the button
        $("#startTour").click(function () {
            tour.init();
            tour.restart();
            $(".trigger-close").click();
        });

        $(".startTour").click(function () {
            tour.init();
            tour.restart();
            $(".trigger-close").click();
            $('#modal-welcome').modal('hide');
        });
    }
});