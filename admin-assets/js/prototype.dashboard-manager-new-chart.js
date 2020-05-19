$(function() {

    $('.expand-panel-warning').click(function() {
        $('.action-results-row-warning').slideDown("slow");
        $('.expand-panel-warning').hide();
    });
    $('.action-results-row-warning .collapse-panel').click(function() {
        $('.action-results-row-warning').slideUp("slow");
        $('.expand-panel-warning').show();
    });

    $('.view-chart').click(function(e) {
        var ieversion = checkIEVersion();
        var newWindow = '';

        //If not IE9, then open in new window - otherwise open in new tab/window
        if (ieversion != '9.0') {
            e.preventDefault();

            var url = 'dashboard-manager-team-chart-test9.php';
            var title = 'OrgChart';
            var w = screen.width * .65;
            var h = screen.height * .6;

            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft + 75;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;

            newWindow = window.open(url, title, 'resizable=1,toolbar=0,menubar=0,location=0,status=0,scrollbars=1, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus();
            }
        }

    })



});

function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function checkIEVersion() {
    var msg = "You're not using Windows Internet Explorer.";
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver == 9.0)
            msg = "You're using Windows Internet Explorer 9.";
        else if (ver == 8.0)
            msg = "You're using Windows Internet Explorer 8.";
        else if (ver == 7.0)
            msg = "You're using Windows Internet Explorer 7.";
        else if (ver == 6.0)
            msg = "You're using Windows Internet Explorer 6.";
        else
            msg = "You have another version of IE";
    }
    // alert( msg );
    return ver
}


(function(window, $) {
    'use strict';
    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    // $.fn.DataTable.ext.pager.numbers_length = 5;

    healthStream.upcomingClassesSearchResults = {};
    healthStream.upcomingClassesSearchResults.resultsDataTable = function() {
        var ClassesTable = $('#upcomingClassesTable').DataTable({
            "paging": true,
            "order": [
                [1, "asc"]
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

        ClassesTable.columns().iterator('column', function(ctx, idx) {
            $(ClassesTable.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(ClassesTable);

        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.upcomingClassesHeader').html($("#upcomingClassesTable_info").html());
            $('.modal-upcoming-classes .modal-footer .paginate').append($(".modal-upcoming-classes .bottom").html());
            $(".modal-upcoming-classes .bottom").html('');
            $('#upcomingClassesTable_filter input').css('width', '250px');
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });



    };

    healthStream.licenseSearchResults = {};
    healthStream.licenseSearchResults.resultsDataTable = function() {
        var LicensesTable = $('#licenseTable').DataTable({
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
                info: "Showing _START_ to _END_ of _MAX_ licenses",
                searchPlaceholder: "Quick Search",
                lengthMenu: "Show _MENU_ licenses",
                paginate: {
                    previous: '<i class="fa fa-chevron-left"></i>',
                    next: '<i class="fa fa-chevron-right"></i>'
                }
            },
            "pageLength": 10
        });

        LicensesTable.columns().iterator('column', function(ctx, idx) {
            $(LicensesTable.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(LicensesTable);

        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.licenseHeader').html($("#licenseTable_info").html());
            $('.modal-license .modal-footer .paginate').append($(".modal-license .bottom").html());
            $(".modal-license .bottom").html('');
            $('#licenseTable_filter input').css('width', '250px');
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });



    };

    healthStream.assignmentSearchResults = {};
    healthStream.assignmentSearchResults.resultsDataTable = function() {
        var AssignmentsTable = $('#assignmentsTable').DataTable({
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

        AssignmentsTable.columns().iterator('column', function(ctx, idx) {
            $(AssignmentsTable.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(AssignmentsTable);

        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.outstandingAssignmentsHeader').html($("#assignmentsTable_info").html());
            $('.modal-dashboard-assignment .modal-footer .paginate').append($(".modal-dashboard-assignment .bottom").html());
            $(".modal-dashboard-assignment .bottom").html('');
            $('#assignmentsTable_filter input').css('width', '250px');
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });



    };


    healthStream.studentSearchResults = {};
    healthStream.studentSearchResults.resultsDataTable = function() {
        var teamTable = $('#myTeamTable').DataTable({
            "paging": true,
            "order": [
                [1, "asc"]
            ],
            "dom": 'ft<"bottom"rlip>',
            "columnDefs": [{
                "width": "35px",
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

        teamTable.columns().iterator('column', function(ctx, idx) {
            $(teamTable.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(teamTable);

        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.myTeamTableHeader').html($("#myTeamTable_info").html());
            $('.modal-team .modal-footer .paginate').append($(".modal-team .bottom").html());
            $(".modal-team .bottom").html('');
            $('#myTeamTable_filter input').css('width', '250px');
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });



    };


    healthStream.myTeamMesageAllTable = {};
    healthStream.myTeamMesageAllTable.resultsDataTable = function() {
        var teamTable = $('#myTeamMessageAllTable').DataTable({
            "paging": true,
            "order": [
                [1, "asc"]
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

        teamTable.columns().iterator('column', function(ctx, idx) {
            $(teamTable.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(teamTable);

        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.myTeamMessageAllTableHeader').html($("#myTeamMessageAllTable_info").html());
            $('.modal-team-message-all .modal-footer .paginate').append($(".modal-team-message-all .bottom").html());
            $(".modal-team-message-all .bottom").html('');
            $('#myTeamMessageAllTable_filter input').css('width', '250px');
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });

    };


    $(window).on('load', function() {
        healthStream.studentSearchResults.resultsDataTable();
        healthStream.upcomingClassesSearchResults.resultsDataTable();
        healthStream.licenseSearchResults.resultsDataTable();
        healthStream.myTeamMesageAllTable.resultsDataTable();
        healthStream.assignmentSearchResults.resultsDataTable();
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
        '<div class="hcard-data-item"><i class="fa fa-fw fa-laptop"></i><a href="mailto:mchambers@jupiterhealth.net">mchambers@jupiterhealth.net</a></div>' +
        '</div>' +
        '<div class="hcard-bottom"><a href="dashboard-profile-marie.php" class="btn btn-xs btn-default">View Profile</a> ' +
        '<a href="mailto:mchambers@jupiterhealth.net" class="btn btn-xs btn-default">Message</a></div>';


    $(".team-member-link").hovercard({
        detailsHTML: hoverHTMLDemoBasic,
        width: 400,
        delay: 500,
        // cardImgSrc: 'http://ejohn.org/files/short.sm.jpg'
    });


    HealthStream.utilities.applauncher();

    var randomScalingFactor = function() {
            return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
        };

        Chart.defaults.global.showScale = false;
           Chart.defaults.global.legend.display = false;
           Chart.defaults.global.tooltips.enabled = false;

    var upcomingClassesData = {
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
                  'Past Due',
                  'Not Outstanding'
              ]


    };



    var UpcomingClassesChart = new Chart($('#UpcomingClassesChart'), {
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
                enabled: false
            },
            hover: {
                mode: 'index',
                intersect: true
            },

            maintainAspectRatio: false,
            responsive: true,
        }

    });
    // var upcomingClassesTrendData = {
    //     datasets: [{
    //         labels: ["", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", ""],
    //         fillColor: "rgba(151,187,205,0.2)",
    //         strokeColor: "rgba(151,187,205,1)",
    //         pointColor: "rgba(151,187,205,1)",
    //         pointStrokeColor: "#fff",
    //         pointHighlightFill: "#fff",
    //         pointHighlightStroke: "rgba(151,187,205,1)",
    //         data: [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19]
    //     }],


    // };



    // var UpcomingClassesTrendChart = new Chart($('#UpcomingClassesTrendChart'), {
    //     type: 'line',
    //     data: upcomingClassesTrendData,
    //         options: {
    //                           point:{display:false},
    //                           scales: {
    //                 yAxes: [{id: "y-axis-0",display: false}],
    //                 xAxes: [{id: "x-axis-0",display: false}]
    //                             }
    //             }

    // });

     Chart.defaults.global.showScale = false;
        Chart.defaults.global.legend.display = false;
        Chart.defaults.global.tooltips.enabled = false;


        var options = {
           showLines: true,
           xAxes:{display: false}
        }
              var data = {
        labels: ["", "", "", "", "", "", "","", "", "", "", "", "", "","", "Nov 2017", "Dec 2017", "Jan 2018"],
        datasets: [

            {
                type: 'line',
                pointRadius: 1,
                label: "My Second dataset",
                backgroundColor: "rgba(255,241,232,1)",
                borderColor: "rgba(252,123,0,0.34)",
                pointColor: "rgba(252,123,0,0.34)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(252,123,0,1)",
                borderWidth: "0",

                data: [7, 8, 10, 9, 12, 1, 12,8, 18, 6, 9,8, 18, 8, 10, 12, 7, 12]
            },
            {
                type: 'line',
                pointRadius: 1,
                label: "My first dataset",
                backgroundColor: "rgba(234,246,250,1)",
                borderColor: "rgba(0,153,204,0.34)",
                pointColor: "rgba(0,153,204,0.34)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                borderWidth: "0",

                data: [28, 48, 40, 19, 46, 27, 20,28, 48, 40, 19, 16, 27, 42,28, 48, 40, 19]
            }
        ]
    };
    //     var data = {
    //     labels: ["", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", ""],
    //     datasets: [
    //         {
    //             // Boolean - if true fill the area under the line
    //             fill: true,
    //           backgroundColor: "rgba(50,50,50,0.2)",
    //             borderColor: "rgba(15,136,180,1)",
    //             pointBackgroundColor: "rgba(15,136,180,1)",
    //             pointBorderWidth: 0,
    //             tension: 0.1,
    //             data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40],
    //             yAxisID: "y-axis-0",
    //         },
    //     ]
    // };
          var ctx = document.getElementById("UpcomingClassesTrendChart").getContext("2d");
           var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                        options: {
                            legend: {
                                display: false
                            },
                            tooltips: {
                                enabled: true
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            hover: {
                                mode: 'label',
                                intersect: true
                            },
                          point:{display:false},
                          scales: {
                yAxes: [{id: "y-axis-0",display: false}],
                xAxes: [{id: "x-axis-0",display: false}]
                            }
            }
                });


           //           var datas = {
           //     labels: ["", "", "", "", "", "", "","", "", "", "", "", "", "","", "Nov 2017", "Dec 2017", "Jan 2018"],
           //     datasets: [
           //         {
           //             pointRadius: 1,
           //             label: "My Second dataset",
           //             backgroundColor: "rgba(255,241,232,1)",
           //             borderColor: "rgba(252,123,0,0.34)",
           //             pointColor: "rgba(252,123,0,0.34)",
           //             pointStrokeColor: "#fff",
           //             pointHighlightFill: "#fff",
           //             pointHighlightStroke: "rgba(252,123,0,1)",
           //             borderWidth: "0",

           //             data: [7, 8, 10, 9, 12, 1, 12,8, 18, 6, 9,8, 18, 8, 10, 12, 7, 12]
           //         }
           //     ]
           // };
           //     var data = {
           //     labels: ["", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", ""],
           //     datasets: [
           //         {
           //             // Boolean - if true fill the area under the line
           //             fill: true,
           //           backgroundColor: "rgba(50,50,50,0.2)",
           //             borderColor: "rgba(15,136,180,1)",
           //             pointBackgroundColor: "rgba(15,136,180,1)",
           //             pointBorderWidth: 0,
           //             tension: 0.1,
           //             data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40],
           //             yAxisID: "y-axis-0",
           //         },
           //     ]
           // // };
           //       var ctx = document.getElementById("UpcomingClassesExpiredTrendChart").getContext("2d");
           //        var myLineChart2 = new Chart(ctx, {
           //                 type: 'line',
           //                 data: datas,
           //                     options: {
           //                         legend: {
           //                             display: false
           //                         },
           //                         tooltips: {
           //                             enabled: true
           //                         },
           //                         tooltips: {
           //                             mode: 'index',
           //                             intersect: false,
           //                         },
           //                         hover: {
           //                             mode: 'label',
           //                             intersect: true
           //                         },
           //                       point:{display:false},
           //                       scales: {
           //             yAxes: [{id: "y-axis-0",display: false}],
           //             xAxes: [{id: "x-axis-0",display: false}]
           //                         }
           //         }
           //             });


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
            'Past Due',
            'Not Outstanding'
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
            maintainAspectRatio: false,
            responsive: true,


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
            },
            maintainAspectRatio: false,
            responsive: true,
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
            'Expiring Soon',
            'Not Outstanding'
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
            maintainAspectRatio: false,
            responsive: true,

        }

    });

    var outstandingAssignementData = {
        datasets: [{
            data: [6, 26, 21],
            backgroundColor: [
                'rgba(254, 157, 63, 1)',
                'rgba(59, 185, 220, 1)',
                'rgba(243, 243, 243, 1)',
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Past Due',
            'Due Soon',
            'Not Outstanding'
        ]
    };

    var outstandingAssignementChart = new Chart($('#outstandingAssignementChart'), {
        type: 'doughnut',
        data: outstandingAssignementData,
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
            maintainAspectRatio: false,
            responsive: true,

        }

    });

    //enable tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // // checkIEVersion();
    // $('.metric').click(function() {
    //     $('#modal-license').modal('show');
    // });



});