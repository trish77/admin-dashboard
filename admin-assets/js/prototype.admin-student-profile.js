$(function () {
  $(".view-chart").click(function (e) {
    var ieversion = checkIEVersion();
    var newWindow = "";

    //If not IE9, then open in new window - otherwise open in new tab/window
    if (ieversion != "9.0") {
      e.preventDefault();

      var url = "dashboard-manager-team-chart-test10.php";
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

      newWindow = window.open(url, title, "toolbar=0,menubar=0,location=0,status=0,scrollbars=1, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
    }
  });
});

function getInternetExplorerVersion() {
  // Returns the version of Windows Internet Explorer or a -1
  // (indicating the use of another browser).
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
    healthStream.studentSearchResults.resultsDataTable();
    healthStream.myTeamMesageAllTable.resultsDataTable();
  });
})(window, jQuery);

$(function () {
  $("#btn-photo-remove").click(function () {
    $(".photomgmt-image").html('<img src="/content/images/avatar-default.png">');
    $(".photomgmt-preview").html('<img src="/content/images/avatar-default.png">');
    $("#btn-photo-remove").addClass("disabled");
  });
  $("#btn-photo-upload").click(function () {
    $(".photomgmt-image").html('<img src="/content/images/prototype-actors/bbrune.jpg">');
    $(".photomgmt-preview").html('<img src="/content/images/prototype-actors/bbrune.jpg');
    $("#btn-photo-remove").removeClass("disabled");
  });
  $("#modal-photomgmt").on("show.bs.modal", function () {
    $(".photomgmt-image").html('<img src="/content/images/prototype-actors/bbrune.jpg">');
    $(".photomgmt-preview").html('<img src="/content/images/prototype-actors/bbrune.jpg');
    $("#input-photo-file").val("");
  });

  $("#input-photo-file").change(function () {
    var allowed = ["jpeg", "jpg", "png", "gif"];
    var file = $(this).val();
    var test = file.substring(file.lastIndexOf(".") + 1).toLowerCase();

    if (file.length === 0) {
      $("#input-photo-file").closest(".form-group").removeClass("has-error");
      $("#btn-photo-upload").addClass("disabled");
      $("#photomgmt-server").hide();
    } else if ($.inArray(test, allowed) < 0) {
      $("#input-photo-file").closest(".form-group").addClass("has-error");
      $("#btn-photo-upload").addClass("disabled");
      $("#photomgmt-server").show();
    } else {
      $("#input-photo-file").closest(".form-group").removeClass("has-error");
      $("#btn-photo-upload").removeClass("disabled");
      $("#photomgmt-server").hide();
      readURL(this);
    }
  });

  $(".date-range__control").on("change", function () {
    var $control = $(this);
    var $parent = $control.closest(".date-range");
    var $custom = $parent.find(".date-range__custom");
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

  $("#printRangeSelect").on("change", function () {
    if ($(this).val() === "custom") {
      $("#printRangeCustom").removeClass("hide");
    } else {
      $("#printRangeCustom").addClass("hide");
    }
  });

  $(".input-group.date").datepicker({todayBtn: "linked", autoclose: true, orientation: "top"}).css("position", "relative");

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var $modalImage = $(".modal .photomgmt-image img");
        $modalImage.attr("src", e.target.result);
        var $cropData = $("#cropData");

        $modalImage.cropper("destroy").cropper({
          aspectRatio: 1 / 1,
          preview: ".photomgmt-preview",
          crop: function (e) {
            $cropData.val(JSON.stringify($(this).cropper("getCropBoxData")));
          }
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  var hoverProfileCard = '<img src="/content/images/prototype-actors/brynn.jpg" alt="Contact" class="media-object img-circle img-thumbnail thumb96 hcard-image">' + '<div class="hcard-name"><h3 class="mt0">Marie S. Chambers<br><small>Nurse Manager - Acute Care</small></h3>' + '<p class="text-muted">17 Tasks / <span class="text-warning">3 Past Due</span></p>' +
  // '<div class="hcard-data-item"><i class="fa fa-fw fa-hospital-o"></i>Nurse Manager (Acute Care)</div>' +
  // '<div class="hcard-data-item"><i class="fa fa-fw fa-stethoscope"></i>Radiology Department</div>' +
  '<div class="hcard-data-item"><i class="fa fa-fw fa-phone"  style="margin-top:10px;"></i>567-123-4567</div>' + '<div class="hcard-data-item"><i class="fa fa-fw fa-laptop"></i><a hhref="#modal-message-single" data-toggle="modal">mchambers@jupiterhealth.net</a></div>' + "</div>" + '<div class="hcard-bottom"><a href="dashboard-profile-dev-ready.php" class="btn btn-xs btn-default">View Profile</a> ' + '<a  href="#modal-message-single" data-toggle="modal" class="btn btn-xs btn-default">Message</a></div>';

  // $(".team-member-link").hovercard({
  //     detailsHTML: hoverProfileCard,
  //     width: 400,
  //     delay: 500,
  //      cardImgSrc: 'http://ejohn.org/files/short.sm.jpg'
  // });

  HealthStream.utilities.applauncher();

  //enable tooltips
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

  window.scrollTo(0, 0);

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

  // RESET SLAT AND SELECT2 FOR ADDING NEW EMPLOYEES
  $("#modal-note-add-employee").on("show.bs.modal", function () {
    var $modal = $(this);
    $modal.find(".js-employee-list").show().find("select").select2("val", "");
    $modal.find(".js-employee-selection").hide();
  });
  $(".attach-document").click(function () {
    console.log("hey");
    $("#modal-select-documents").modal("show");
    $("#modal-note-add-employee").modal("hide");
  });
  //End Validate Send Group Message

  $("#modal-note-add-employee").on("shown.bs.modal", function () {
    handleNoteTypeChange($("input[name=type]:checked").val());
  });

  $("input[name=type]").change(function () {
    handleNoteTypeChange($(this).val());
  });

  // RESET SLAT AND SELECT2 FOR ADDING NEW EMPLOYEES
  $("#modal-note-add-employee").on("show.bs.modal", function () {
    var $modal = $(this);
    $modal.find(".js-employee-list").show().find("select").select2("val", "");
    $modal.find(".js-employee-selection").hide();
  });
  $(".attach-document").click(function () {
    console.log("hey");
    $("#modal-select-documents").modal("show");
    $("#modal-note-add-employee").modal("hide");
  });

  $(".toggle-select-all").click(function () {
    $(".team-message-all-table .checkbox:enabled").prop("checked", $(this).prop("checked"));
  });
});