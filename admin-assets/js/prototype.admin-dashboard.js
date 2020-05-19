$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        WebkitAnimation: "webkitAnimationEnd"
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement("div"));

    this.addClass("animated " + animationName).one(animationEnd, function () {
      $(this).removeClass("animated " + animationName);

      if (typeof callback === "function") 
        callback();
      }
    );

    return this;
  }
});

$(function () {
  $(".expand-panel-warning").click(function () {
    $(".action-results-row-warning").slideDown("slow");
    $(".expand-panel-warning").hide();
  });
  $(".action-results-row-warning .collapse-panel").click(function () {
    $(".action-results-row-warning").slideUp("slow");
    $(".expand-panel-warning").show();
  });

  $(".view-chart").click(function (e) {
    var ieversion = checkIEVersion();
    var newWindow = "";

    //If not IE9, then open in new window - otherwise open in new tab/window
    if (ieversion != "9.0") {
      e.preventDefault();

      var url = "dashboard-manager-team-chart-test9.php";
      var title = "OrgChart";
      var w = screen.width * 0.65;
      var h = screen.height * 0.6;

      // Fixes dual-screen position                         Most browsers      Firefox
      var dualScreenLeft = window.screenLeft != undefined
        ? window.screenLeft
        : screen.left;
      var dualScreenTop = window.screenTop != undefined
        ? window.screenTop
        : screen.top;

      var width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width;
      var height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height;

      var left = width / 2 - w / 2 + dualScreenLeft + 75;
      var top = height / 2 - h / 2 + dualScreenTop;

      newWindow = window.open(url, title, "resizable=1,toolbar=0,menubar=0,location=0,status=0,scrollbars=1, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
    }
  });

  $(".date-range__control").on("change", function () {
    var $control = $(this);
    var $custom = $control.siblings(".date-range__custom");
    if ($control.val() === "custom") {
      $custom.addClass("date-range__custom--open");
    } else {
      $custom.removeClass("date-range__custom--open");
    }
  });

  $("#rangeSelect").on("change", function () {
    if ($(this).val() === "custom") {
      $("#rangeCustom").removeClass("hide");
    } else {
      $("#rangeCustom").addClass("hide");
    }
  });

  $(".hide-unhide").click(function (e) {
    if ($(this).hasClass("btn")) {
      e.preventDefault();
      $(this).closest("tr").removeClass("hidden").removeClass("hidden-show-item").addClass("item-highlight");
      $(this).removeClass("unhide-item").removeClass("hide-item").removeClass("hide-unhide").text("Message");
      $(this).parents(".btn-group").find(".dropdown-menu").find(".unhide-item").removeClass("unhide-item").addClass("hide-item").text("Hide");
    } else {
      if ($(this).hasClass("hide-item")) {
        e.preventDefault();
        $(this).parents(".btn-group").find("a").first().text("Un-hide");
        $(this).closest("tr").addClass("hidden").addClass("item-highlight");
        if ($(".show-hidden").is(":checked")) {
          $(this).closest("tr").addClass("hidden-show-item");
        }
        $(this).removeClass("hide-item").addClass("unhide-item").text("Un-hide");
      } else {
        e.preventDefault();
        $(this).closest("tr").removeClass("hidden").removeClass("hidden-show-item").addClass("item-highlight");
        $(this).removeClass("unhide-item").addClass("hide-item").text("Hide");
        $(this).parents(".btn-group").find(".hide-item").first().removeClass("hide-item").removeClass("hide-unhide").text("Message");
      }
    }
  });

  $(".modal-cert .show-hidden-items input").click(function (e) {
    if ($(this).is(":checked")) {
      // $('.cert-table').show();
      // $('#certTable_wrapper').show();
      $(".section.cert-results").show();
      $(".certHeader").show();
      $(".section.no-cert-results").hide();
      // $('#certTable_filter').show();
      // $('#certTable_wrapper .bottom').show();
    } else {
      // $('#certTable_wrapper').hide();
      // $('.cert-table').hide();
      // $('#certTable_filter').hide();
      // $('#certTable_wrapper .bottom').hide();
      $(".section.cert-results").hide();
      $(".certHeader").hide();
      $(".section.no-cert-results").show();
    }
  });

  $(".kebab").click(function (e) {
    e.stopPropagation();
    var dropdown = $(this).find(".kebab-dropdown");
    dropdown.toggleClass("active");
  });

  // $('.kebab-hide-widget').click(function(e) {
  //     e.stopPropagation();
  //     if ($(this).hasClass('kebab-hide-license-widget')) {
  //         $('.ws-license-widget').find('.ws-toggle-widget').text('Show');
  //     } else if ($(this).hasClass('kebab-hide-cert-widget')) {
  //         $('.ws-cert-widget').find('.ws-toggle-widget').text('Show');
  //     } else if ($(this).hasClass('kebab-hide-assignment-widget')) {
  //         $('.ws-assignment-widget').find('.ws-toggle-widget').text('Show');
  //     } else if ($(this).hasClass('kebab-hide-assessment-widget')) {
  //         $('.ws-assessment-widget').find('.ws-toggle-widget').text('Show');
  //     } else if ($(this).hasClass('kebab-hide-card-widget')) {
  //         $('.ws-card-widget').find('.ws-toggle-widget').text('Show');
  //     } else if ($(this).hasClass('kebab-hide-knowledgeq-widget')) {
  //         $('.ws-card-widget').find('.ws-toggle-widget').text('Show');
  //         $(this).parents('.panel-knowledgeq').fadeOut();
  //     }
  //     $(this).parents('.panel-metrics').fadeOut();
  // });

  $(document).click(function (e) {
    var container = $(".kebab-dropdown.active");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $(container).removeClass("active");
    }
  });

  $(".kebab-hide-button-widget").click(function (e) {
    e.stopPropagation();
    $(this).parents(".button-widget").fadeOut();
    $(".ws-task-widget").find(".ws-toggle-widget").text("Show");
  });

  $(".kebab-show-hidden-employees.hidden-licenses").click(function () {
    $(".modal-license .show-hidden").prop("checked", true);
    $("#modal-license").modal();
    $(".modal-license").find(".hidden").addClass("hidden-show-item").addClass("item-highlight");
  });
  $(".kebab-show-hidden-employees.hidden-certifications").click(function () {
    $(".modal-cert .show-hidden").prop("checked", true);
    $("#modal-cert").modal();
    $(".modal-cert").find(".hidden").addClass("hidden-show-item").addClass("item-highlight");
  });
  $(".kebab-show-hidden-employees.hidden-assignments").click(function () {
    $(".modal-dashboard-assignment .show-hidden").prop("checked", true);
    $("#modal-dashboard-assignment").modal();
    $(".modal-dashboard-assignment").find(".hidden").addClass("hidden-show-item").addClass("item-highlight");
  });
  $(".kebab-show-hidden-employees.hidden-assessments").click(function () {
    $(".modal-dashboard-assessment .show-hidden").prop("checked", true);
    $("#modal-dashboard-assessment").modal();
    $(".modal-dashboard-assessment").find(".hidden").addClass("hidden-show-item").addClass("item-highlight");
  });
  $(".kebab-show-hidden-employees.hidden-assessments").click(function () {
    $(".modal-dashboard-assessment .show-hidden").prop("checked", true);
    $("#modal-dashboard-assessment").modal();
    $(".modal-dashboard-assessment").find(".hidden").addClass("hidden-show-item").addClass("item-highlight");
  });
  $(".kebab-show-hidden-employees.hidden-cards").click(function () {
    $(".modal-dashboard-cards .show-hidden").prop("checked", true);
    $("#modal-dashboard-cards").modal();
    $(".modal-dashboard-cards").find(".hidden").addClass("hidden-show-item").addClass("item-highlight");
  });

  $(".show-modal-license").click(function () {
    $(".modal-license .show-hidden").prop("checked", false);
    $("#modal-license").modal();
    $(".modal-license").find(".hidden-show-item").removeClass("hidden-show-item").addClass("item-highlight");
  });
  $(".show-modal-expiring").click(function () {
    $(".modal-expiring .show-hidden").prop("checked", false);
    $("#modal-expiring").modal();
    $(".modal-expiring").find(".hidden-show-item").removeClass("hidden-show-item").addClass("item-highlight");
  });

  $(".show-modal-cert").click(function () {
    $(".modal-cert .show-hidden").prop("checked", false);
    $("#modal-cert").modal();
    $(".modal-cert").find(".hidden-show-item").removeClass("hidden-show-item").addClass("item-highlight");
  });
  $(".show-modal-assignments").click(function () {
    $(".modal-dashboard-assignment .show-hidden").prop("checked", false);
    $("#modal-dashboard-assignment").modal();
    $(".modal-dashboard-assignment").find(".hidden-show-item").removeClass("hidden-show-item").addClass("item-highlight");
  });

  $(".show-modal-cards").click(function () {
    $(".modal-dashboard-cards .show-hidden").prop("checked", false);
    $("#modal-dashboard-cards").modal();
    $(".modal-dashboard-cards").find(".hidden-show-item").removeClass("hidden-show-item").addClass("item-highlight");
  });

  $(".show-modal--manage-organization").click(function () {
    $("#manage-organization").modal();
  });

  $(".manage-students").click(function () {
    $("#manage-students").modal();
  });

  $(".manage-org-properties").click(function () {
    $("#org-properties").modal();
  });

  $(".ws-toggle-license-widget").click(function () {
    if ($(".license-widget").is(":visible")) {
      $(".license-widget").fadeOut();
      $(this).text("Show");
    } else {
      $(".license-widget").fadeIn();
      $(this).text("Hide");
    }
  });
  $(".ws-toggle-cert-widget").click(function () {
    if ($(".cert-widget").is(":visible")) {
      $(".cert-widget").fadeOut();
      $(this).text("Show");
    } else {
      $(".cert-widget").fadeIn();
      $(this).text("Hide");
    }
  });
  $(".ws-toggle-assignment-widget").click(function () {
    if ($(".assignment-widget").is(":visible")) {
      $(".assignment-widget").fadeOut();
      $(this).text("Show");
    } else {
      $(".assignment-widget").fadeIn();
      $(this).text("Hide");
    }
  });
  $(".ws-toggle-assessment-widget").click(function () {
    if ($(".assessment-widget").is(":visible")) {
      $(".assessment-widget").fadeOut();
      $(this).text("Show");
    } else {
      $(".assessment-widget").fadeIn();
      $(this).text("Hide");
    }
  });
  $(".ws-toggle-task-widget").click(function () {
    if ($(".assessment-tasks-widget").is(":visible")) {
      $(".assessment-tasks-widget").fadeOut();
      $(this).text("Show");
    } else {
      $(".assessment-tasks-widget").fadeIn();
      $(this).text("Hide");
    }
  });
  $(".ws-toggle-card-widget").click(function () {
    if ($(".cards-widget").is(":visible")) {
      $(".cards-widget").fadeOut();
      $(this).text("Show");
    } else {
      $(".cards-widget").fadeIn();
      $(this).text("Hide");
    }
  });
});

function getInternetExplorerVersion() {
  // (indicating the use of another browser).  Returns the version of Windows Internet Explorer or a -1
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == "Microsoft Internet Explorer") {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
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
  return ver;
}(function (window, $) {
  "use strict";
  window.HealthStream = window.HealthStream || {};
  var healthStream = window.HealthStream;

  healthStream.licenseSearchResults = {};
  healthStream.licenseSearchResults.resultsDataTable = function () {
    var LicensesTable = $("#licenseTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [3, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ licenses",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ licenses",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    LicensesTable.columns().iterator("column", function (ctx, idx) {
      $(LicensesTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    $(".show-hidden-licenses").click(function (e) {
      var checked = this.checked;
      LicensesTable.rows().every(function () {
        var row = this.node();
        if (checked) {
          if ($(row).hasClass("hidden")) {
            $(row).addClass("hidden-show-item").addClass("item-highlight");
          }
        } else {
          if ($(row).hasClass("hidden")) {
            $(row).removeClass("hidden-show-item").addClass("item-highlight");
          }
        }
      });
      LicensesTable.draw();
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(LicensesTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".licenseHeader").html($("#licenseTable_info").html());
      $("#licenseTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.upcomingClassesSearchResults = {};
  healthStream.upcomingClassesSearchResults.resultsDataTable = function () {
    var upcomingClassesTable = $("#UpcomingClassesTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [3, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ employees",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ employees",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    upcomingClassesTable.columns().iterator("column", function (ctx, idx) {
      $(upcomingClassesTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(upcomingClassesTable);
    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".upcomingClassesHeader").html($("#UpcomingClassesTable_info").html());
      $("#UpcomingClassesTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.expiringCourseSearchResults = {};
  healthStream.expiringCourseSearchResults.resultsDataTable = function () {
    var expiringCourseTable = $("#expiringCourseTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [3, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ employees",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ employees",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    expiringCourseTable.columns().iterator("column", function (ctx, idx) {
      $(expiringCourseTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(expiringCourseTable);
    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".expiringCourseHeader").html($("#expiringCourseTable_info").html());
      $("#expiringCourseTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.expiredCourseSearchResults = {};
  healthStream.expiredCourseSearchResults.resultsDataTable = function () {
    var expiredCourseTable = $("#expiredCourseTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [3, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ employees",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ employees",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    expiredCourseTable.columns().iterator("column", function (ctx, idx) {
      $(expiredCourseTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(expiredCourseTable);
    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".expiredCourseHeader").html($("#expiredCourseTable_info").html());
      $("#expiredCourseTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.certSearchResults = {};
  healthStream.certSearchResults.resultsDataTable = function () {
    var CertsTable = $("#certTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [3, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ licenses",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ licenses",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    CertsTable.columns().iterator("column", function (ctx, idx) {
      $(CertsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    $(".show-hidden-certs").click(function (e) {
      var checked = this.checked;
      CertsTable.rows().every(function () {
        var row = this.node();
        if (checked) {
          if ($(row).hasClass("hidden")) {
            $(row).addClass("hidden-show-item").addClass("item-highlight");
          }
        } else {
          if ($(row).hasClass("hidden")) {
            $(row).removeClass("hidden-show-item").addClass("item-highlight");
          }
        }
      });
      CertsTable.draw();
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(CertsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".certHeader").html($("#certTable_info").html());
      $("#certTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.assignmentSearchResults = {};
  healthStream.assignmentSearchResults.resultsDataTable = function () {
    var AssignmentsTable = $("#assignmentsTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [1, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
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
      pageLength: 10
    });

    AssignmentsTable.columns().iterator("column", function (ctx, idx) {
      $(AssignmentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    $(".show-hidden-assignments").click(function (e) {
      var checked = this.checked;
      AssignmentsTable.rows().every(function () {
        var row = this.node();
        if (checked) {
          if ($(row).hasClass("hidden")) {
            $(row).addClass("hidden-show-item").addClass("item-highlight");
          }
        } else {
          if ($(row).hasClass("hidden")) {
            $(row).removeClass("hidden-show-item").addClass("item-highlight");
          }
        }
      });
      AssignmentsTable.draw();
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(AssignmentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".outstandingAssignmentsHeader").html($("#assignmentsTable_info").html());
      $("#assignmentsTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.studentSearchResults = {};
  healthStream.studentSearchResults.resultsDataTable = function () {
    var manageStudentsTable = $("#manageStudentsTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [1, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
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
      pageLength: 10
    });

    manageStudentsTable.columns().iterator("column", function (ctx, idx) {
      $(manageStudentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    /*     $(".show-hidden-assignments").click(function (e) {
                              var checked = this.checked;
                              manageStudentsTable.rows().every(function () {
                                var row = this.node();
                                if (checked) {
                                  if ($(row).hasClass("hidden")) {
                                    $(row).addClass("hidden-show-item").addClass("item-highlight");
                                  }
                                } else {
                                  if ($(row).hasClass("hidden")) {
                                    $(row).removeClass("hidden-show-item").addClass("item-highlight");
                                  }
                                }
                              });
                              manageStudentsTable.draw();
                            }); */

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(manageStudentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".manageStudentsTableHeader").html($("#manageStudentsTable_info").html());
      $("#manageStudentsTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.assessmentSearchResults = {};
  healthStream.assessmentSearchResults.resultsDataTable = function () {
    var AssessmentsTable = $("#assessmentsTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [4, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ records",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ records",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    AssessmentsTable.columns().iterator("column", function (ctx, idx) {
      $(AssessmentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    $(".show-hidden-assessments").click(function (e) {
      var checked = this.checked;
      AssessmentsTable.rows().every(function () {
        var row = this.node();
        if (checked) {
          if ($(row).hasClass("hidden")) {
            $(row).addClass("hidden-show-item").addClass("item-highlight");
          }
        } else {
          if ($(row).hasClass("hidden")) {
            $(row).removeClass("hidden-show-item").addClass("item-highlight");
          }
        }
      });
      AssessmentsTable.draw();
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(AssessmentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".outstandingAssessmentsHeader").html($("#assessmentsTable_info").html());
      $("#assessmentsTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.studentSearchResults = {};
  healthStream.studentSearchResults.resultsDataTable = function () {
    var teamTable = $("#myTeamTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [1, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          width: "35px",
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ records",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ records",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    teamTable.columns().iterator("column", function (ctx, idx) {
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
      $(".myTeamTableHeader").html($("#myTeamTable_info").html());
      $("#myTeamTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.myTeamMesageAllTable = {};
  healthStream.myTeamMesageAllTable.resultsDataTable = function () {
    var teamTable = $("#myTeamMessageAllTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [1, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          visible: false,
          targets: "hideOnLoad"
        }, {
          orderable: false,
          targets: "unsortable"
        }
      ],
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ records",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ records",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      pageLength: 10
    });

    teamTable.columns().iterator("column", function (ctx, idx) {
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
      $(".myTeamMessageAllTableHeader").html($("#myTeamMessageAllTable_info").html());
      $("#myTeamMessageAllTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  $(window).on("load", function () {
    $.fn.DataTable.ext.pager.numbers_length = 5;

    healthStream.studentSearchResults.resultsDataTable();
    healthStream.certSearchResults.resultsDataTable();
    healthStream.upcomingClassesSearchResults.resultsDataTable();
    healthStream.expiringCourseSearchResults.resultsDataTable();
    healthStream.expiredCourseSearchResults.resultsDataTable();
    healthStream.studentSearchResults.resultsDataTable();
    healthStream.licenseSearchResults.resultsDataTable();
    healthStream.myTeamMesageAllTable.resultsDataTable();
    healthStream.assessmentSearchResults.resultsDataTable();
    healthStream.assignmentSearchResults.resultsDataTable();
  });
})(window, jQuery);

$(function () {
  //Testing this feature in Prototype only.  Not Dev ready.
  var hoverHTMLDemoBasic = '<img src="/content/images/prototype-actors/brynn.jpg" alt="Contact" class="media-object img-circle img-thumbnail thumb96 hcard-image">' + '<div class="hcard-name"><h3 class="mt0">Marie S. Chambers<br><small>Nurse Manager - Acute Care</small></h3>' + '<p class="text-muted">17 Tasks / <span class="text-warning">3 Past Due</span></p>' + '<div class="hcard-data-item"><i class="fa fa-fw fa-phone"  style="margin-top:10px;"></i>567-123-4567</div>' + '<div class="hcard-data-item"><i class="fa fa-fw fa-laptop"></i><a href="#modal-message-single" data-toggle="modal">mchambers@jupiterhealth.net</a></div>' + "</div>" + '<div class="hcard-bottom"><a href="dashboard-profile-dev-ready.php" class="btn btn-xs btn-default">View Profile</a> ' + '<a  href="#modal-message-single" data-toggle="modal" class="btn btn-xs btn-default">Message</a></div>';

  HealthStream.utilities.applauncher();

  var upcomingClassesData = {
    datasets: [
      {
        data: [
          13, 36
        ],
        backgroundColor: ["rgba(59, 185, 220, 1)", "rgba(243, 243, 243, 1)"]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Upcoming Classes",, "No Upcoming Classes"]
  };

  function animateLeft($src, $tgt) {
    var $parent = $src.parent();

    var width = $parent.width();
    var srcWidth = $src.width();

    $src.css({position: "absolute"});
    $tgt.hide().appendTo($parent).css({left: width, position: "absolute"});

    $src.animate({
      left: -width
    }, 500, function () {
      $src.hide();
      $src.css({left: null, position: null});
      $tgt.show().animate({
        left: 0
      }, 500, function () {
        $tgt.css({left: null, position: null});
      });
    });
  }

  $(".team-view-next").click(function () {
    $(".first-10-employees").animate({
      right: 262
    }, 500);

    $(".next-10-employees").show().css({right: -262}).animate({
      right: 0
    }, 500);
  });

  $(".team-view-previous").click(function () {
    $(".next-10-employees").animate({
      left: 262
    }, 500);

    $(".first-10-employees").show().css({left: -262}).animate({
      left: 0
    }, 500);
  });

  // var upcomingClassesChart = new Chart($('#upcomingClassesChart'), {
  //     type: 'doughnut',
  //     data: {
  //         datasets: [{
  //             data: [13, 20],
  //             backgroundColor: [
  //                 'rgba(59, 185, 220, 1)',
  //                 'rgba(243, 243, 243, 1)',
  //             ],
  //         }],
  //         labels: [
  //             'Scheduled Soon',
  //         ]
  //     },
  //     options: {
  //         legend: {
  //             display: false
  //         },
  //         tooltips: {
  //             enabled: true
  //         },
  //         cutoutPercentage: 85,
  //         tooltips: {
  //             mode: 'index',
  //             intersect: false,
  //         },
  //         hover: {
  //             mode: 'index',
  //             intersect: true
  //         },
  //         maintainAspectRatio: false,
  //         responsive: true,
  //     }

  // });

  var upcomingExpirationsData = {
    datasets: [
      {
        data: [
          9, 130, 477
        ],
        backgroundColor: ["rgba(254, 157, 63, 1)", "rgba(59, 185, 220, 1)",  "rgba(243, 243, 243, 1)"]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Expired", "Expiring Soon", "All Good!"]
  };

  var upcomingExpirationsChart = new Chart($("#UpcomingExpirationsChart"), {
    type: "doughnut",
    data: upcomingExpirationsData,
    options: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      cutoutPercentage: 85,
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "index",
        intersect: true
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });
  upcomingExpirationsChart;

  var StudentAssignmentsChartData = {
    datasets: [
      {
        data: [
          213, 1120, 3211
        ],
        backgroundColor: ["rgba(254, 157, 63, 1)", "rgba(59, 185, 220, 1)",  "rgba(243, 243, 243, 1)"]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Past Due", "Due Soon", "Completed"]
  };

  var StudentAssignmentsChart = new Chart($("#StudentAssignmentsChart"), {
    type: "doughnut",
    data: StudentAssignmentsChartData,
    options: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      cutoutPercentage: 90,
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "index",
        intersect: true
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });
  StudentAssignmentsChart;

  var outstandingCertificationsData = {
    datasets: [
      {
        data: [
          234, 1123, 3789
        ],
        backgroundColor: ["rgba(254, 157, 63, 1)", "rgba(59, 185, 220, 1)",  "rgba(243, 243, 243, 1)"]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Overdue", "Due Soon", "All Good!"]
  };

  var outstandingCertificationsChart = new Chart($("#OutstandingCertificationsChart"), {
    type: "doughnut",
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
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "index",
        intersect: true
      },
      animation: {
        onComplete: function (animation) {
          $(".svg-box").addClass("animate-in");
        }
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });

  $('[data-toggle="tooltip"]').tooltip();

  $(".btn-message-team-continue").click(function (e) {
    e.preventDefault();
    if ($(".modal-team-message-all input[type=checkbox]:checked").length < 1) {
      $(".error-message").show();
    } else {
      $(".error-message").hide();
      $("#modal-team-message-all").modal("hide");
      $("#modal-message-group").modal("show");
    }
  });

  var outstandingCovid19LearningData = {
    datasets: [
      {
        data: [
          3, 2, 44
        ],
        backgroundColor: ["rgba(254, 157, 63, 1)", "rgba(59, 185, 220, 1)", "rgba(243, 243, 243, 1)"]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Past Due", "Due Soon", "Not Outstanding"]
  };

  $('[data-toggle="tooltip"]').tooltip();

  $(".btn-message-team-continue").click(function (e) {
    e.preventDefault();
    if ($(".modal-team-message-all input[type=checkbox]:checked").length < 1) {
      $(".error-message").show();
    } else {
      $(".error-message").hide();
      $("#modal-team-message-all").modal("hide");
      $("#modal-message-group").modal("show");
    }
  });

  //search employees - POC only.
  $(".btn-search-employees").click(function () {
    $(".team-member-link").hide();
    var txt = $(".text-search-employees").val();

    $(".team-member-link").each(function () {
      if ($(this).find(".employee-name").text().toUpperCase().indexOf(txt.toUpperCase()) != -1) {
        $(this).fadeIn(450);
      }
    });
    $(".number-employees").text($(".team-member-link:visible").length);
  });

  $(".btn-search-employees-clear").click(function () {
    $(".text-search-employees").val("");
    $(".btn-search-employees").click();
    $(".number-employees").text($(".team-member-link:visible").length);
  });

  //Start Validate Send Group Message

  var form = $("#SendGroupMessage");

  $(".btn-send-message").click(function () {
    form.validate().settings.ignore = ":disabled,:hidden";
    if (form.valid()) {
      $("#modal-message-group").modal("hide");
      return true;
    } else {
      form.validate().focusInvalid();
      return false;
    }
  });
  var validator = form.validate({
    ignore: [],
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    focusInvalid: true,
    rules: {
      subject_group: {
        required: true
      },
      message_group: {
        required: true
      }
    },
    errorClass: "help-block",

    highlight: function (element, errorClass, validClass) {
      var elem = $(element);
      elem.parents(".form-group").addClass("has-error");
    },

    unhighlight: function (element, errorClass, validClass) {
      var elem = $(element);
      elem.parents(".form-group").removeClass("has-error");
    }
  });

  $("#modal-message-group").on("hidden.bs.modal", function (e) {
    $(this).find("#subject_group, #message_group").val("").end();
  });
  //End Validate Send Group Message

  $(".toggle-select-all").click(function () {
    $(".team-message-all-table .checkbox:enabled").prop("checked", $(this).prop("checked"));
  });

  $("section.section.cert-results").hide();
  $(".certHeader").hide();

  $("body").on("click", "#searchStudentBtn", function () {
    $(".hidden, .modal-footer").removeClass("hidden");
    $("#studentSearchForm").addClass("hidden");
  });



    /*   var defaultData = [
      {
      text: 'CORP - ACME HealthCare',
      href: '#parent1',
      nodes: [{
        text: 'CORP - ACME HealthCare Enterprise',
        nodes: [{
          text: 'HEX01 - ACME Express Clinic',
          href: '#child1',
        }, {
          text: 'GEN01 - ACME General Medical Center',
          href: '#child2'
        }
      }]
      },
      {
        text: 'CORP - ACME Community HealthCare',
        href: 'parent2',
        nodes: [{
          text: 'CORP - ACME Community Enterprise',
          nodes: [{
            text: 'ASER - ACME Southeast Region',
            href: '#child1',
          }, {
            text: 'ACHS - Cortes Hospital',
            href: '#child2',
          }, {
            text: 'AMHS - Magellan Hospital',
            href: '#child2'
          }]
        },
      },
      {
        text: 'Ascension',
        href: '#parent3',
          nodes: [{
            text: 'HEX01 - ACME Express Clinic',
            href: '#child1',
          }, {
            text: 'GEN01 - ACME General Medical Center',
            href: '#child2'
          }]
      }
      }]*/

    var tree = [
      {
        text: "Parent 1",
        nodes: [
          {
            text: "Child 1",
            nodes: [
              {
                text: "Grandchild 1"
              },
              {
                text: "Grandchild 2"
              }
            ]
          },
          {
            text: "Child 2"
          }
        ]
      },
      {
        text: "Parent 2"
      },
      {
        text: "Parent 3"
      },
      {
        text: "Parent 4"
      },
      {
        text: "Parent 5"
      }
    ];

    $('#treeview1').treeview({
      data: tree
    });

  });