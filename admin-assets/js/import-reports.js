$(function() {

    $('.date-range__control').on('change', function(e) {
        var $control = $(this);
        var $custom = $('.date-range__custom');
        if ($control.val() === 'custom') {
            $('#modal-custom-range').modal('show');

        } else {
            $('#modal-custom-range').modal('hide');
            $('.change-date-range-container').hide();
            $('.import-results-date-range-label').text(" - " + $control.val())
        }
    });
    
    $(".change-date-range").on("click", function(e){
        e.preventDefault();
        $('#modal-custom-range').modal('show');
    });

    $('#modal-custom-range').on('hide.bs.modal', function () {
        $('.datepicker').hide();
        $('.change-date-range-container').show().css("display", "inline-block");
      });

    $('#rangeSelect').on('click', function() {
        $('.import-results-date-range-label').html('- Aug 15, 2017 - Aug 15, 2018 ')
    });

    $('.input-group.date').datepicker({
        autoclose: true
    });

});

(function(window, $) {
    'use strict';
    window.HealthStream = window.HealthStream || {};
    var healthStream = window.HealthStream;

    healthStream.studentImportProgressSummary = {};
    healthStream.studentImportProgressSummary.resultsDataTable = function() {
        var studentImportProgressSummaryTbl = $('#studentImportProgressSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"studentImportProgressSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        studentImportProgressSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(studentImportProgressSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(studentImportProgressSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.StudentImportProgressSummaryHeader').html($("#studentImportProgressSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.studentImportSuccess = {};
    healthStream.studentImportSuccess.resultsDataTable = function() {
        var studentImportSuccessTbl = $('#studentImportSuccess').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"studentImportSuccessBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        studentImportSuccessTbl.columns().iterator('column', function(ctx, idx) {
            $(studentImportSuccessTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(studentImportSuccessTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.studentImportHeader').html($("#studentImportSuccess_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.studentImportSuccessSummary = {};
    healthStream.studentImportSuccessSummary.resultsDataTable = function() {
        var studentImportSuccessSummaryTbl = $('#studentImportSuccessSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"studentImportSuccessSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        studentImportSuccessSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(studentImportSuccessSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(studentImportSuccessSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.studentImportSuccessSummaryHeader').html($("#studentImportSuccessSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.studentImportErrorSummary = {};
    healthStream.studentImportErrorSummary.resultsDataTable = function() {
        var studentImportErrorSummaryTbl = $('#studentImportErrorSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"studentImportErrorSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        studentImportErrorSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(studentImportErrorSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(studentImportErrorSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.studentImportErrorDetail = {};
    healthStream.studentImportErrorDetail.resultsDataTable = function() {
        var studentImportErrorDetailTbl = $('#studentImportErrorDetail').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"studentImportErrorDetailBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        studentImportErrorDetailTbl.columns().iterator('column', function(ctx, idx) {
            $(studentImportErrorDetailTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(studentImportErrorDetailTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.jobFunctionProgressSummary = {};
    healthStream.jobFunctionProgressSummary.resultsDataTable = function() {
        var jobFunctionProgressSummaryTbl = $('#jobFunctionProgressSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"jobFunctionProgressSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });
        jobFunctionProgressSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(jobFunctionProgressSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(jobFunctionProgressSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            // $('.SupplementalMgrImportProgressSummaryHeader').html($("#suppMgrImportProgressSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.jobFunctionSuccessSummary = {};
    healthStream.jobFunctionSuccessSummary.resultsDataTable = function() {
        var jobFunctionSuccessSummaryTbl = $('#jobFunctionSuccessSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"studentImportSuccessBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        jobFunctionSuccessSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(jobFunctionSuccessSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(jobFunctionSuccessSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.jobFunctionHeader').html($("#jobFunctionSuccess_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.jobFunctionSuccess = {};
    healthStream.jobFunctionSuccess.resultsDataTable = function() {
        var jobFunctionSuccessTbl = $('#jobFunctionSuccess').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"jobFunctionSuccessBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        jobFunctionSuccessTbl.columns().iterator('column', function(ctx, idx) {
            $(jobFunctionSuccessTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(jobFunctionSuccessTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.jobFunctionSuccessHeader').html($("#jobFunctionSuccess_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.jobFunctionErrorSummary = {};
    healthStream.jobFunctionErrorSummary.resultsDataTable = function() {
        var jobFunctionErrorSummaryTbl = $('#jobFunctionErrorSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"jobFunctionErrorSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        jobFunctionErrorSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(jobFunctionErrorSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(jobFunctionErrorSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.jobFunctionErrorDetail = {};
    healthStream.jobFunctionErrorDetail.resultsDataTable = function() {
        var jobFunctionErrorDetailTbl = $('#jobFunctionErrorDetail').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"jobFunctionErrorDetailBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
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
            "pageLength": 5
        });

        jobFunctionErrorDetailTbl.columns().iterator('column', function(ctx, idx) {
            $(jobFunctionErrorDetailTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(jobFunctionErrorDetailTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.suppMgrImportSuccess = {};
    healthStream.suppMgrImportSuccess.resultsDataTable = function() {
        var suppMgrImportSuccessTbl = $('#suppMgrImportSuccess').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"suppMgrImportSuccessBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        suppMgrImportSuccessTbl.columns().iterator('column', function(ctx, idx) {
            $(suppMgrImportSuccessTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(suppMgrImportSuccessTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.SupplementalMgrHeader').html($("#suppMgrImportSuccess_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.suppMgrImportSuccessSummary = {};
    healthStream.suppMgrImportSuccessSummary.resultsDataTable = function() {
        var suppMgrImportSuccessSummaryTbl = $('#suppMgrImportSuccessSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"suppMgrImportSuccessSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        suppMgrImportSuccessSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(suppMgrImportSuccessSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(suppMgrImportSuccessSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.SupplementalMgrImportSuccessSummaryHeader').html($("#suppMgrImportSuccessSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.suppMgrImportErrorSummary = {};
    healthStream.suppMgrImportErrorSummary.resultsDataTable = function() {
        var suppMgrImportErrorSummaryTbl = $('#suppMgrImportErrorSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"suppMgrImportErrorSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        suppMgrImportErrorSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(suppMgrImportErrorSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(suppMgrImportErrorSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.SuppMgrImportErrorSummaryHeader').html($("#suppMgrImportErrorSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.suppMgrImportErrorDetail = {};
    healthStream.suppMgrImportErrorDetail.resultsDataTable = function() {
        var suppMgrImportErrorDetailTbl = $('#suppMgrImportErrorDetail').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"suppMgrImportErrorDetailBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        suppMgrImportErrorDetailTbl.columns().iterator('column', function(ctx, idx) {
            $(suppMgrImportErrorDetailTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(suppMgrImportErrorDetailTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.SuppMgrImportErrorDetailHeader').html($("#suppMgrImportErrorDetail_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.roleImportProgressSummary = {};
    healthStream.roleImportProgressSummary.resultsDataTable = function() {
        var roleImportProgressSummaryTbl = $('#roleImportProgressSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"roleImportProgressSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        roleImportProgressSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(roleImportProgressSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(roleImportProgressSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.RoleImportProgressSummaryHeader').html($("#roleImportProgressSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.roleImportSuccessSummary = {};
    healthStream.roleImportSuccessSummary.resultsDataTable = function() {
        var roleImportSuccessSummaryTbl = $('#roleImportSuccessSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"roleImportSuccessSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        roleImportSuccessSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(roleImportSuccessSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(roleImportSuccessSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.RoleImportSuccessSummaryHeader').html($("#roleImportSuccessSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.roleImportErrorSummary = {};
    healthStream.roleImportErrorSummary.resultsDataTable = function() {
        var roleImportErrorSummaryTbl = $('#roleImportErrorSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"roleImportErrorSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        roleImportErrorSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(roleImportErrorSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(roleImportErrorSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.RoleImportErrorSummaryHeader').html($("#roleImportErrorSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.roleActionSummary = {};
    healthStream.roleActionSummary.resultsDataTable = function() {
        var roleActionSummaryTbl = $('#roleActionSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"roleActionSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        roleActionSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(roleActionSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(roleActionSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.RoleActionSummaryHeader').html($("#roleActionSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.roleImportErrorDetail = {};
    healthStream.roleImportErrorDetail.resultsDataTable = function() {
        var roleImportErrorDetailTbl = $('#roleImportErrorDetail').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"roleImportErrorDetailBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        roleImportErrorDetailTbl.columns().iterator('column', function(ctx, idx) {
            $(roleImportErrorDetailTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(roleImportErrorDetailTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.RoleImportErrorDetailHeader').html($("#roleImportErrorDetail_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.licenseImportSummary = {};
    healthStream.licenseImportSummary.resultsDataTable = function() {
        var licenseImportSummaryTbl = $('#licenseImportSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"licenseImportSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        licenseImportSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(licenseImportSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(licenseImportSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.LicenseImportSummaryHeader').html($("#licenseImportSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.licenseImportProgressSummary = {};
    healthStream.licenseImportProgressSummary.resultsDataTable = function() {
        var licenseImportProgressSummaryTbl = $('#licenseImportProgressSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"licenseImportProgressSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        licenseImportProgressSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(licenseImportProgressSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(licenseImportProgressSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.LicenseImportProgressSummaryHeader').html($("#licenseImportProgressSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.licenseImportSuccessSummary = {};
    healthStream.licenseImportSuccessSummary.resultsDataTable = function() {
        var licenseImportSuccessSummaryTbl = $('#licenseImportSuccessSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"licenseImportSuccessSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        licenseImportSuccessSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(licenseImportSuccessSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(licenseImportSuccessSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.LicenseImportSuccessSummaryHeader').html($("#licenseImportSuccessSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.licenseImportErrorSummary = {};
    healthStream.licenseImportErrorSummary.resultsDataTable = function() {
        var licenseImportErrorSummaryTbl = $('#licenseImportErrorSummary').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"licenseImportErrorSummaryBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        licenseImportErrorSummaryTbl.columns().iterator('column', function(ctx, idx) {
            $(licenseImportErrorSummaryTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(licenseImportErrorSummaryTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.LicenseImportErrorSummaryHeader').html($("#licenseImportErrorSummary_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };

    healthStream.licenseImportErrorDetail = {};
    healthStream.licenseImportErrorDetail.resultsDataTable = function() {
        var licenseImportErrorDetailTbl = $('#licenseImportErrorDetail').DataTable({
            "bSortClasses": false,
            "paging": true,
            "order": [
                [0, "asc"]
            ],
            "dom": 'ft<"licenseImportErrorDetailBottom"rlip>',
            "columnDefs": [{
                "visible": false,
                "targets": "hideOnLoad",
            }, {
                "orderable": false,
                "targets": "unsortable"
            }],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
            "pageLength": 5
        });

        licenseImportErrorDetailTbl.columns().iterator('column', function(ctx, idx) {
            $(licenseImportErrorDetailTbl.column(idx).header()).append('<span class="sort-icon"/>');
        });

        expandMobileRow();
        generateDynamicDataTitles();
        customizeColumns(licenseImportErrorDetailTbl);
        keepDropDownMenuOpen();
        updateTableHeaderFooter();
        //place default info into Results header
        function updateTableHeaderFooter() {
            $(".dataTables_info").hide();
            $('.LicenseImportErrorDetailHeader').html($("#licenseImportErrorDetail_info").html());
        }
        //reinitialize jquery when table is redrawn (pagination)
        $(".dataTable").on('draw.dt', function() {
            expandMobileRow();
            generateDynamicDataTitles();
            updateTableHeaderFooter();
        });
    };


    $(window).on('load', function() {
        $.fn.DataTable.ext.pager.numbers_length = 5;
        healthStream.studentImportProgressSummary.resultsDataTable();
        healthStream.studentImportSuccessSummary.resultsDataTable();
        healthStream.studentImportSuccess.resultsDataTable();
        healthStream.studentImportErrorSummary.resultsDataTable();
        healthStream.studentImportErrorDetail.resultsDataTable();

        healthStream.jobFunctionSuccess.resultsDataTable();
        healthStream.jobFunctionErrorSummary.resultsDataTable();
        healthStream.jobFunctionErrorDetail.resultsDataTable();
        healthStream.jobFunctionProgressSummary.resultsDataTable();
        healthStream.jobFunctionSuccessSummary.resultsDataTable();

        healthStream.suppMgrImportSuccessSummary.resultsDataTable();
        healthStream.suppMgrImportSuccess.resultsDataTable();
        healthStream.suppMgrImportErrorSummary.resultsDataTable();
        healthStream.suppMgrImportErrorDetail.resultsDataTable();

      //  healthStream.suppMgrImportProgressSummary.resultsDataTable();
        healthStream.roleImportProgressSummary.resultsDataTable();
        healthStream.roleImportSuccessSummary.resultsDataTable();
        healthStream.roleImportErrorSummary.resultsDataTable();
        healthStream.roleActionSummary.resultsDataTable();
        healthStream.roleImportErrorDetail.resultsDataTable();

        healthStream.licenseImportProgressSummary.resultsDataTable();
        healthStream.licenseImportSummary.resultsDataTable();
        healthStream.licenseImportSuccessSummary.resultsDataTable();
        healthStream.licenseImportErrorSummary.resultsDataTable();
        healthStream.licenseImportErrorDetail.resultsDataTable();




    });




}(window, jQuery));