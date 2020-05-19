; (function () {
    'use strict';

    var jQuery;

    function featureTitleiconOverride(cssClass, imageUrl) {
        jQuery(document).find("a." + cssClass).each(function () {
            /* If image doesn't exist we need to add it.  Otherwise rely on CSS. */
            if (jQuery(this).find('img').length == 0) {
                jQuery(this).prepend("<img alt='" + this.text + "' src='" + imageUrl + "' border='0' />");
            }
        });
    }

    function init(minJQuery) {
        jQuery = minJQuery;

        jQuery(document).ready(function () {
            featureTitleiconOverride('featureTitleicon_back', "/HLC/Images/Override/ArrowLeft_Admin.png");
            featureTitleiconOverride('featureTitleicon_search', "/HLC/Images/Override/Admin_search.png");
            featureTitleiconOverride('featureTitleicon_add', "/HLC/Images/Override/Admin_plus.png");
            featureTitleiconOverride('featureTitleicon_preview', "/HLC/Images/Override/iconLG-PreviewRF.png");
            featureTitleiconOverride('featureTitleicon_permissions', "/HLC/Images/Override/iconLG-PermissionsRF.png");
            featureTitleiconOverride('featureTitleicon_coursePublish', "/HLC/Images/Override/iconLG-PublishRF.png");
            featureTitleiconOverride('featureTitleicon_scanStudents', "/HLC/Images/Override/iconLG-ScanStudentsRF.png");
            featureTitleiconOverride('featureTitleicon_virtualClassLaunch', "/HLC/Images/Override/iconLG-VirtualClassLaunchRF.png");
            featureTitleiconOverride('featureTitleicon_register', "/HLC/Images/Override/iconLG-ClassRegisterStudents.png");
            featureTitleiconOverride('featureTitleicon_registerMgmt', "/HLC/Images/Override/iconLG-ClassManageRegistration.png");
            featureTitleiconOverride('featureTitleicon_grade', "/HLC/Images/Override/iconLG-GradeStudentsRF.png");
            featureTitleiconOverride('featureTitleicon_classCopy', "/HLC/Images/Override/iconLG-Copy.png");
            featureTitleiconOverride('featureTitleicon_roster', "/HLC/Images/Override/iconLG-ReportRF.png");
            featureTitleiconOverride('featureTitleicon_newClassCalendar', "/HLC/Images/Override/iconLG-ClassAddCalendarRF.png");
            featureTitleiconOverride('featureTitleicon_newClass', "/HLC/Images/Override/iconLG-ClassAddRF.png");
            featureTitleiconOverride('featureTitleicon_recurringClass', "/HLC/Images/Override/iconLG-ClassAddrecurringRF.png");
            featureTitleiconOverride('featureTitleicon_manage', "/HLC/Images/Override/iconLG-Manage.png");
            featureTitleiconOverride('featureTitleicon_promote', "/HLC/Images/Override/iconLG-Promote.png");
            featureTitleiconOverride('featureTitleicon_print', "/HLC/Images/Override/iconLG-Print.png");
            featureTitleiconOverride('featureTitleicon_manageAffiliations', "/HLC/Images/Override/iconLG-Manage_Affiliations.png");
            featureTitleiconOverride('featureTitleicon_upload', "/HLC/Images/Override/iconLG-Upload.png");
        });
    };

    pageReady(function() {
    checkjQuery("1.8", "\\HLC\\Scripts\\jquery-1.8.3.min.js", init);
    });
})();