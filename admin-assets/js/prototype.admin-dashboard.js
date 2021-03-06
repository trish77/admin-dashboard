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

  $(".hide-unhide").click(function (e) {
    if ($(this).hasClass("btn")) {
      e.preventDefault();
      $(this).closest("tr").removeClass("hidden-show-item").addClass("item-highlight");
      $(this).removeClass("unhide-item").removeClass("hide-item").removeClass("hide-unhide").text("Message");
      $(this).parents(".btn-group").find(".dropdown-menu").find(".unhide-item").removeClass("unhide-item").addClass("hide-item").text("Hide");
    } else {
      if ($(this).hasClass("hide-item")) {
        e.preventDefault();
        $(this).parents(".btn-group").find("a").first().text("Un-hide");
        $(this).closest("tr").addClass("item-highlight");
        if ($(".show-hidden").is(":checked")) {
          $(this).closest("tr").addClass("hidden-show-item");
        }
        $(this).removeClass("hide-item").addClass("unhide-item").text("Un-hide");
      } else {
        e.preventDefault();
        $(this).closest("tr").removeClass("hidden-show-item").addClass("item-highlight");
        $(this).removeClass("unhide-item").addClass("hide-item").text("Hide");
        $(this).parents(".btn-group").find(".hide-item").first().removeClass("hide-item").removeClass("hide-unhide").text("Message");
      }
    }
  });

  $(".kebab").click(function (e) {
    e.stopPropagation();
    var dropdown = $(this).find(".kebab-dropdown");
    dropdown.toggleClass("active");
  });

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

  $(".show-modal-expiring").click(function () {
    $(".modal-expiring .show-hidden").prop("checked", false);
    $("#modal-expiring").modal();
    $(".modal-expiring").find(".hidden-show-item").removeClass("hidden-show-item").addClass("item-highlight");
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

  healthStream.expiringCourseSearchResults = {};
  healthStream.expiringCourseSearchResults.resultsDataTable = function () {
    var expiringCourseTable = $("#expiringCourseTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
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
        info: "Showing _START_ to _END_ of _MAX_ courses",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ courses",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      lengthMenu: [5,10,50,100],
      pageLength: 5
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
        [0, "asc"]
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
        info: "Showing _START_ to _END_ of _MAX_ courses",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ courses",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      lengthMenu: [5,10,50,100],
      pageLength: 5
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

  healthStream.allCourseSearchResults = {};
  healthStream.allCourseSearchResults.resultsDataTable = function () {
    var allCourseTable = $("#allCourseTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
      ],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
          orderable: false,
          targets: "unsortable"
        }
      ],
      buttons: {
        buttons:
            [
              {
                extend: 'collection',
                text: '<i class="fas fa-download pointer"> <span class="sans">Download</span></i>',
                className: 'pointer',
                buttons:
                    [
                      'excel', 'csv'
                    ]
              }
            ]
      },
      language: {
        search: "Search: _INPUT_",
        info: "Showing _START_ to _END_ of _MAX_ courses",
        searchPlaceholder: "",
        lengthMenu: "Show _MENU_ courses",
        paginate: {
          previous: '<i class="fa fa-chevron-left"></i>',
          next: '<i class="fa fa-chevron-right"></i>'
        }
      },
      lengthMenu: [5,10,50,100],
      pageLength: 5
    });

    allCourseTable.columns().iterator("column", function (ctx, idx) {
      $(allCourseTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(allCourseTable);
    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".allCourseHeader").html($("#allCourseTable_info").html());
      $("#allCourseTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.activeStudentResults = {};
  healthStream.activeStudentResults.resultsDataTable = function () {
    var activeStudentsTable = $("#studentsActiveTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
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

    activeStudentsTable.columns().iterator("column", function (ctx, idx) {
      $(activeStudentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    $(".show-hidden-assignments").click(function (e) {
      var checked = this.checked;
      activeStudentsTable.rows().every(function () {
        var row = this.node();
        if (checked) {
          if ($(row).hasClass("hidden")) {
            $(row).addClass("hidden-show-item").addClass("item-highlight");
          }
          if ($(row).hasClass("unique")) {
            $(row).addClass("hidden");
          }
          if ($(row).hasClass("dup")) {
            $(row).addClass("hidden-show-item").addClass("item-highlight");
          }
        } else {
          if ($(row).hasClass("hidden") || ("dup")) {
            $(row).removeClass("hidden hidden-show-item item-highlight");

          }
        }

      activeStudentsTable.draw();
    });

      expandMobileRow();
      generateDynamicDataTitles();
      customizeColumns(activeStudentsTable);

      keepDropDownMenuOpen();
      updateTableHeaderFooter();

      //place default info into Results header
      function updateTableHeaderFooter() {
        $(".dataTables_info").hide();
        $(".ActiveStudentsTableHeader").html($("#studentsActiveTable_info").html());
        $("#studentsActiveTable_filter input").css("width", "250px");
      }

      //reinitialize jquery when table is redrawn (pagination)
      $(".dataTable").on("draw.dt", function () {
        expandMobileRow();
        generateDynamicDataTitles();
        updateTableHeaderFooter();
      });
    });
  };

  healthStream.uniqueStudentResults = {};
  healthStream.uniqueStudentResults.resultsDataTable = function () {
    var uniqueStudentsTable = $("#studentsUniqueTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
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

    uniqueStudentsTable.columns().iterator("column", function (ctx, idx) {
      $(uniqueStudentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(uniqueStudentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".UniqueStudentsTableHeader").html($("#studentsUniqueTable_info").html());
      $("#studentsUniqueTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.leaveStudentResults = {};
  healthStream.leaveStudentResults.resultsDataTable = function () {
    var leaveStudentsTable = $("#studentsLeaveTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
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

    leaveStudentsTable.columns().iterator("column", function (ctx, idx) {
      $(leaveStudentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(leaveStudentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".LeaveStudentsTableHeader").html($("#studentsLeaveTable_info").html());
      $("#studentsLeaveTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.newStudentResults = {};
  healthStream.newStudentResults.resultsDataTable = function () {
    var newStudentsTable = $("#studentsNewTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
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

    newStudentsTable.columns().iterator("column", function (ctx, idx) {
      $(newStudentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(newStudentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".NewStudentsTableHeader").html($("#studentsNewTable_info").html());
      $("#studentsNewTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.inactiveStudentResults = {};
  healthStream.inactiveStudentResults.resultsDataTable = function () {
    var inactiveStudentsTable = $("#studentsInactiveTable").DataTable({
      bSortClasses: false,
      paging: true,
      order: [
        [0, "asc"]
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

    inactiveStudentsTable.columns().iterator("column", function (ctx, idx) {
      $(inactiveStudentsTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(inactiveStudentsTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".InactiveStudentsTableHeader").html($("#studentsInactiveTable_info").html());
      $("#studentsInactiveTable_filter input").css("width", "250px");
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
      pagingType: "full_numbers",
      order: [
        [0, "asc"]
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
      buttons: {
        buttons:
        [
          {
            extend: 'collection',
            text: '<i class="fas fa-download pointer"> <span class="sans">Download</span></i>',
            className: 'pointer',
            buttons:
              [
                'excel', 'csv'
              ]
          }
        ]
      },
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

  healthStream.upcomingClassesSearchResults = {};
  healthStream.upcomingClassesSearchResults.resultsDataTable = function () {
    var upcomingClassesTable = $("#upcomingClassesTable").DataTable({
      bSortClasses: false,
      paging: true,
      select: true,
      responsive: true,
      order: [[1, "asc"]],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
        {
         // orderable: false,
          targets: [0],
          width: '250px'
        },
        {
          targets: [1],
          width: '100px'
        },
        {
          targets: [2],
          width: '100px'
        },
        {
          targets: [3],
          width: '100px'
        },
        {
          targets: [4],
          width: '80px'
        },
        {
          targets: [5],
          width: '80px'
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

/*
    $('#upcomingClassesTable tbody').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = upcomingClassesTable.row(tr);

      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
      } else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
      }
    });
*/

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
      $(".UpcomingClassesTableHeader").html($("#upcomingClassesTable_info").html());
      $("#upcomingClassesTable_filter input").css("width", "250px");
    }
    //reinitialize jquery when table is redrawn (pagination)
    $(".dataTable").on("draw.dt", function () {
      expandMobileRow();
      generateDynamicDataTitles();
      updateTableHeaderFooter();
    });
  };

  healthStream.ungradedClassesSearchResults = {};
  healthStream.ungradedClassesSearchResults.resultsDataTable = function () {
    var ungradedClassesTable = $("#ungradedClassesTable").DataTable({
      bSortClasses: false,
      paging: true,
      select: true,
      responsive: true,
      order: [[1, "asc"]],
      dom: 'ft<"bottom"rlip>',
      columnDefs: [
       {
          orderable: false,
          targets: "0"
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

    ungradedClassesTable.columns().iterator("column", function (ctx, idx) {
      $(ungradedClassesTable.column(idx).header()).append('<span class="sort-icon"/>');
    });

    expandMobileRow();
    generateDynamicDataTitles();
    customizeColumns(ungradedClassesTable);

    keepDropDownMenuOpen();
    updateTableHeaderFooter();
    //place default info into Results header
    function updateTableHeaderFooter() {
      $(".dataTables_info").hide();
      $(".UngradedClassesTableHeader").html($("#ungradedClassesTable_info").html());
      $("#ungradedClassesTable_filter input").css("width", "250px");
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

    healthStream.expiringCourseSearchResults.resultsDataTable();
    healthStream.expiredCourseSearchResults.resultsDataTable();
    healthStream.allCourseSearchResults.resultsDataTable();
    healthStream.activeStudentResults.resultsDataTable();
    healthStream.newStudentResults.resultsDataTable();
    healthStream.uniqueStudentResults.resultsDataTable();
    healthStream.leaveStudentResults.resultsDataTable();
    healthStream.inactiveStudentResults.resultsDataTable();
    healthStream.upcomingClassesSearchResults.resultsDataTable();
    healthStream.ungradedClassesSearchResults.resultsDataTable();


  });
})(window, jQuery);

$(function () {

  HealthStream.utilities.applauncher();


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


  var upcomingExpirationsData = {
    datasets: [
      {
        data: [
          9, 130
        ],
        backgroundColor: ["rgba(254, 157, 63, 1)", "rgba(59, 185, 220, 1)"]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Expired", "Expiring Soon"]
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



  $('[data-toggle="tooltip"]').tooltip();


  });