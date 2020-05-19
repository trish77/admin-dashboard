$(function(){

    $('.expand-panel-warning').click(function() {
        $('.action-results-row-warning').slideDown("slow");
        $('.expand-panel-warning').hide();
    });
    $('.action-results-row-warning .collapse-panel').click(function(){
        $('.action-results-row-warning').slideUp("slow");
        $('.expand-panel-warning').show();
    });

    $('.view-full-profile').click(function(e){
        e.preventDefault();
        var destinationurl = 'dashboard-profile-dev-ready.php';
        window.opener.location = destinationurl;
        window.close();
    })


});

(function(window, $) {
    'use strict';
    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;
    healthStream.upcomingClassesSearchResults = {};
    healthStream.upcomingClassesSearchResults.resultsDataTable = function() {
        var ClassesTable = $('#upcomingClassesTable').DataTable({
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"bottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            language: {
                search: "_INPUT_",
                info: "Showing _START_ to _END_ of _MAX_ upcoming classes",
                searchPlaceholder: "Quick Search",
                lengthMenu: "Show _MENU_ upcoming classes",
                paginate: {
                    previous: '<i class="fa fa-chevron-left"></i>',
                    next: '<i class="fa fa-chevron-right"></i>'
                }
            },
            "pageLength": 10
        });

        ClassesTable.columns().iterator( 'column', function (ctx, idx) {
            $( ClassesTable.column(idx).header() ).append('<span class="sort-icon"/>');
          } );

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(ClassesTable);

        keepDropDownMenuOpen();
        updateTableHeaderCounts();
        //place default info into Results header
        function updateTableHeaderCounts() {
            $(".dataTables_info").hide();
            $('.myTeamTableHeader').html($("#myTeamTable_info").html());
            $('#myTeamTable_filter input').css('width', '250px');

            $(".dataTables_info").hide();
            $('.upcomingClassesHeader').html($("#upcomingClassesTable_info").html());
            $('#upcomingClassesTable_filter input').css('width', '250px');
        }
            //reinitialize jquery when table is redrawn (pagination)
            $(".dataTable").on('draw.dt', function() {
                expandMobileRow();
                generateDynamicDataTitles();
                updateTableHeaderCounts();
            });



        };


    healthStream.studentSearchResults = {};
    healthStream.studentSearchResults.resultsDataTable = function() {
        var teamTable = $('#myTeamTable').DataTable({
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"bottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            language: {
                search: "_INPUT_",
                info: "Showing _START_ to _END_ of _MAX_ records",
                searchPlaceholder: "Quick Search",
                lengthMenu: "Show _MENU_ records",
                paginate: {
                    previous: '<i class="fa fa-chevron-left"></i>',
                    next: '<i class="fa fa-chevron-right"></i>'
                }
            },
            "pageLength": 10
        });

        teamTable.columns().iterator( 'column', function (ctx, idx) {
            $( teamTable.column(idx).header() ).append('<span class="sort-icon"/>');
          } );

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(teamTable);

        keepDropDownMenuOpen();
        updateTableHeaderCounts();
        //place default info into Results header
        function updateTableHeaderCounts() {
            $(".dataTables_info").hide();
            $('.myTeamTableHeader').html($("#myTeamTable_info").html());
            $('#myTeamTable_filter input').css('width', '250px');
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderCounts();
        });



    };
    $(window).on('load', function() {
        healthStream.studentSearchResults.resultsDataTable();
        healthStream.upcomingClassesSearchResults.resultsDataTable();
    });
}(window, jQuery));


$(function() {


    //Testing this feature in Prototype only.  Not Dev ready.
    var hoverHTMLDemoBasic = '<img src="/content/images/prototype-actors/brynn.jpg" alt="Contact" class="media-object img-circle img-thumbnail thumb96 hcard-image">' +
        '<div class="hcard-name"><h3 class="mt0">Marie S. Chambers<br><small>Nurse Manager - Acute Care</small></h3>' +
        '<p class="text-muted">17 Tasks / <span class="text-warning">3 Past Due</span></p>' +

        // '<div class="hcard-data-item"><i class="fa fa-fw fa-hospital-o"></i>Nurse Manager (Acute Care)</div>' +
        // '<div class="hcard-data-item"><i class="fa fa-fw fa-stethoscope"></i>Radiology Department</div>' +
        '<div class="hcard-data-item"><i class="fa fa-fw fa-phone"  style="margin-top:10px;"></i>567-123-4567</div>' +
        '<div class="hcard-data-item"><i class="fa fa-fw fa-laptop"></i>mchambers@jupiterhealth.net</div>' +
        '</div>' +

        '<div class="hcard-bottom"><a href="dashboard-profile-full.php" target="_parent" class="btn btn-xs btn-default">View Full Profile</a> ' +

        // '<a href="mailto:mchambers@jupiterhealth.net" class="btn btn-xs btn-default">Message</a></div>';
        '</div>';


    $(".team-member-link").hovercard({
        detailsHTML: hoverHTMLDemoBasic,
        width: 400,
        delay: 500,
        // cardImgSrc: 'http://ejohn.org/files/short.sm.jpg'
    });


    HealthStream.utilities.applauncher();



        var upcomingClassesData = {
            datasets: [{
                data: [13, 36],
                backgroundColor: [
                    'rgba(59, 185, 220, 1)',
                    'rgba(243, 243, 243, 1)',
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Upcoming Classes',
            ]
        };


        var UpcomingAssessmentsChart = new Chart($('#UpcomingClassesChart'), {
            type: 'doughnut',
            data: upcomingClassesData,
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true
                },
                cutoutPercentage: 85,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },
            }

        });

        var upcomingAssessmentsData = {
            datasets: [{
                data: [12, 27, 10],
                backgroundColor: [
                    'rgba(254, 157, 63, 1)',
                    'rgba(59, 185, 220, 1)',
                    'rgba(243, 243, 243, 1)',
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Due Soon',
                'Past Due'
            ]
        };

        var upcomingAssessmentsChart = new Chart($('#UpcomingAssessmentsChart'), {
            type: 'doughnut',
            data: upcomingAssessmentsData,
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true
                },
                cutoutPercentage: 85,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },


            }

        });

        var outstandingCertificationsData = {
            datasets: [{
                data: [49],
                backgroundColor: [
                    'rgba(203, 225, 181, 1)',
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'All Good!',
            ]
        };

        var outstandingCertificationsChart = new Chart($('#OutstandingCertificationsChart'), {
            type: 'doughnut',
            data: outstandingCertificationsData,
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true
                },
                cutoutPercentage: 85,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },
                animation: {
                    onComplete: function(animation) {
                        $('.svg-box').addClass("animate-in");
                    }
                }
            },


        });



        var upcomingLicensesData = {
            datasets: [{
                data: [4, 18, 27],
                backgroundColor: [
                    'rgba(254, 157, 63, 1)',
                    'rgba(59, 185, 220, 1)',
                    'rgba(243, 243, 243, 1)',
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Expired',
                'Expiring Soon'
            ]
        };

        var upcomingLicensesChart = new Chart($('#UpcomingLicensesChart'), {
            type: 'doughnut',
            data: upcomingLicensesData,
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true
                },
                cutoutPercentage: 85,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },

            }

        });
        $('.metric').click(function() {
            $('#modal-upcoming-classes').modal('show');
        });




});