    // window.location.hash == '' ? window.location.hash = '#summary' : window.location.hash;
    // var target = window.location.hash,
    //     target = target.replace('#', '') || 'summary';
    // window.location.hash = "";

    // window.onhashchange = function(e) {
    //     if (target != '') {
    //         $('a[href="#' + target + '"]').tab('show');
    //         $('#' + target).addClass("active").addClass("in");
    //     }
    //     // AddToBrowserHistory(target)
    // }

    $(function() {
        //RANDOM LITTLE DO-DADS

        $('.filter-title').hide();
        $('.filter-employee').hide();
        $('.filter-date').hide();

        $('.see-more').click(function(e) {
            e.preventDefault();
            $('.more-employees').show();
            $('.see-more').hide();
        });
        $('.see-less').click(function(e) {
            e.preventDefault();
            $('.more-employees').hide();
            $('.see-more').show();
        });

        $('#dateRangeSelect').change(function() {
            window.location = 'assessment-overview.php?range=' + $(this).val() + '#summary'
        });


        // go to the tab in the URL
        // if (target != '') {
            $('a[href="#summary"]').tab('show');
            $('#summary').addClass("active").addClass("in");
        // }
        $('.summary-link').click (function() {
            console.log('summary');
        });
        $('.details-link').click (function() {
            console.log('details');
        });
        $('a[href="#details"]').click(function() {
                //if user clicks on the 'details assessments' focus nav item,
                //then reset the filtering and sorting
                //vs. if they get there by clicking on a group from the summary page.
                resetGroupFilterSort();
                $('a[href="#details"]').tab('show');
                // $('.nav-pagetabs a[href="#summary"]').parents('li').removeClass("active");
                // $('.nav-pagetabs a[href="#details"]').parents('li').addClass("active");
            });

            $('.nav-pagetabs a[href="#summary"]').click(function() {
                    //if user clicks on the 'details assessments' focus nav item,
                    //then reset the filtering and sorting
                    //vs. if they get there by clicking on a group from the summary page.
                    resetGroupFilterSort();
                    // $('.nav-pagetabs a[href="#details"]').parents('li').removeClass("active");
                    // $('.nav-pagetabs a[href="#summary"]').parents('li').addClass("active");
                });
        if (window.location.hash) {
            // show right tab on load (read hash from address bar)
            // $('a[href="#' + window.location.hash + '"]').tab('show');
        }
        // $('a[href="#' + window.location.hash + '"]').tab('show');

        var clickGroup = getUrlVars()["click"];
        var clickTitleid = getUrlVars()["titleid"];
        var range = getUrlVars()["range"];

        if (range != '' && range != undefined) {
            $("#dateRangeSelect").val(range.replace('#', ''));
        } else {
            $("#dateRangeSelect").val('all');
        }

        //group assessment based on click through
        if (clickGroup == 'title') {
            groupAssessmentsByTitle(clickTitleid.replace('#', ''));
        } else if (clickGroup != '' && clickGroup !== undefined) {
            groupAssessmentsByState(clickGroup);
        }

        if (range != '' && range !== undefined) {
            HandleTextFilters('range', range)
        }

        if ((clickGroup == '' || clickGroup === undefined) && (range == '' || range === undefined || range.replace('#', '') == 'all')) {
            $('.row2').hide();
            $('.filter-bar-flat .row1').css('border-bottom', '');
        } else {
            $('.row2').show();
            $('.row1').css('border-bottom', '1px #e2e2e2 solid');
        }

        function getUrlVars() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        // Change hash for page-reload
        // $('a').on('shown.bs.tab', function(e) {
        //     var target = $(e.target).attr("href");
        //     if (target == "#details") {
        //         //details assessments
        //         // console.log('details');
        //         $('.nav-pagetabs a[href="#details"]').parents('li').addClass("active");
        //         $('.nav-pagetabs a[href="#summary"]').parents('li').removeClass("active");
        //         updateCount();
        //     } else if (target == "#summary") {
        //         //Assessment summary
        //         // console.log('summary');
        //         $('.nav-pagetabs a[href="#details"]').parents('li').removeClass("active");
        //         $('.nav-pagetabs a[href="#summary"]').parents('li').addClass("active");
        //         $('.focus-pageheader .meta-value:eq(0)').text($('#numberOfAssessments').val());
        //         $('.focus-pageheader .meta-value:eq(1)').text($('#numberOfActionItems').val());
        //     }
        //     else {
        //         // console.log('else');
        //         $('.nav-pagetabs a[href="#details"]').parents('li').addClass("active");
        //     }

        //     // AddToBrowserHistory(target.replace('#', ''));
        //     $(window).resize();
        //     $('html,body').scrollTop(0);
        // });

        $('.js-sort').on('change', function() {
            var $target = $('#' + $(this).attr('data-target'));
            var directions = $(this).find('option:selected').attr('data-directions').split('|');
            var html = '';

            html += '<option value="desc">' + directions[0] + '</option>';
            html += '<option value="asc">' + directions[1] + '</option>';
            $target.html(html);
        });

        $('.js-sort-primary').on('change', function() {
            var primary = $(this).find('option:selected').text();

            $('.js-sort-secondary option').show();

            if ($('.js-sort-secondary').val() === primary) {
                $('.js-sort-secondary').val('None').change();
            }

            $('.js-sort-secondary option').each(function() {
                if ($(this).text() === primary) {
                    $(this).hide();
                }
            });
        });

        $('.js-state-detail').on('click', function(e) {
            var name = $(this).attr('data-actor');
            var $modal = $('#modal-state-detail');
            var $body = $modal.find('.modal-body');
            e.preventDefault();
            $body.html('Waiting on ' + name + ' to sign off');
            $modal.modal('show');
        });

        $('.js-state-detail-approval-manager').on('click', function(e) {
            var $modal = $('#modal-state-detail-approval-manager');
            e.preventDefault();
            $modal.modal('show');
        });

        $('.js-progress-modal').on('click', function() {
            var $modal = $('#modal-progress-from-modal');
            var id = $(this).attr('data-id');
            var state = $(this).attr('data-state');
            // console.log(state);
            var html = '';

            var data = [{
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Employee', 'Conner, Rosalyn F.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 3', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                ]
            }, {
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Employee', 'Juniper, Stephanie P.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', 'Not Yet Started']
                ]
            }, {
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', '<div class="progress-bar" style="width:43%;">43%</div>'],
                    ['Employee', 'Montoya, Alice G.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                ]
            }, {
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', 'Not Yet Started'],
                    ['Employee', 'Park, Jennifer S.', '<div class="progress-bar" style="width:43%;">43%</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                ]
            }, {
                'assessment': 'Performance Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', 'Not Yet Started'],
                    ['Employee', 'Juniper, Stephanie P.', 'Not Yet Started'],
                    ['Peer', 'Peer 1', 'Not Yet Started'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', 'Not Yet Started']
                ]
            }];



            $(data[id].progress).each(function() {
                html += '<tr>';
                html += '<td class="modal-progress__role">' + this[0] + '</td>';
                html += '<td class="modal-progress__name">' + this[1] + '</td>';
                html += '<td class="modal-progress__progress"><div class="progress">' + this[2] + '</div></td>';
                html += '</tr>';
            });

            if (state != "evaluate") {
                $(".btn-manage-rater-peers").hide();
            } else {
                $(".btn-manage-rater-peers").show();
            }

            $modal.find('.modal-title').text(data[id].assessment);
            $modal.find('.modal-progress__table tbody').html(html);
            $modal.modal('show');
        });


        $('.js-progress').on('click', function() {
            var $modal = $('#modal-progress');
            var id = $(this).attr('data-id');
            var state = $(this).attr('data-state');
            // console.log(state);
            var html = '';

            var data = [{
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Employee', 'Conner, Rosalyn F.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 3', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                ]
            }, {
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Employee', 'Juniper, Stephanie P.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', 'Not Yet Started']
                ]
            }, {
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', '<div class="progress-bar" style="width:43%;">43%</div>'],
                    ['Employee', 'Montoya, Alice G.', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                ]
            }, {
                'assessment': 'Competency Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', 'Not Yet Started'],
                    ['Employee', 'Park, Jennifer S.', '<div class="progress-bar" style="width:43%;">43%</div>'],
                    ['Peer', 'Peer 1', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', '<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                ]
            }, {
                'assessment': 'Performance Appraisal',
                'progress': [
                    ['Rater', 'Crane, Darcy L.', 'Not Yet Started'],
                    ['Employee', 'Juniper, Stephanie P.', 'Not Yet Started'],
                    ['Peer', 'Peer 1', 'Not Yet Started'],
                    ['Peer', 'Peer 2', 'Not Yet Started'],
                    ['Peer', 'Peer 3', 'Not Yet Started']
                ]
            }];



            $(data[id].progress).each(function() {
                html += '<tr>';
                html += '<td class="modal-progress__role">' + this[0] + '</td>';
                html += '<td class="modal-progress__name">' + this[1] + '</td>';
                html += '<td class="modal-progress__progress"><div class="progress">' + this[2] + '</div></td>';
                html += '</tr>';
            });

            if (state != "evaluate") {
                $(".btn-manage-rater-peers").hide();
            } else {
                $(".btn-manage-rater-peers").show();
            }

            $modal.find('.modal-title').text(data[id].assessment);
            $modal.find('.modal-progress__table tbody').html(html);
            $modal.modal('show');

        });



        $('.js-revert').click(function(e) {
            e.preventDefault();
            HealthStream.utilities.interrupt({
                type: 'failure',
                title: 'You are about revert this assessment',
                text: '<p>Reverting an assessment from the Review state to the Evaluate state allows:</p><ul><li>Configuration of a new Reflective Plan</li><li>Modifications to the Reflective Plan configuration, if one was already created</li><li>The employee and peer(s) to submit their ratings, if they have not already done so</li></ul><p>Reverting this assessment to the Evaluate state will</p><ul><li>Delete any Sign Off(s) and Sign Off comments</li><li>Delete the Reflective Plan, if one was created</li><li>Delete any Approval(s) and Approval Comment(s)</li><li>Require movement through the Approval process again, if appropriate</li></ul>',
                actions: [{
                    type: 'danger',
                    label: 'Yes, Revert this Assessment'
                }, {
                    label: 'Cancel'
                }]
            });
        });

        $('.js-reset').click(function(e) {
            e.preventDefault();
            HealthStream.utilities.interrupt({
                type: 'failure',
                title: 'You are about to reset this assessment',
                text: '<p>Resetting the assessment will:</p><ul><li>Delete all ratings, comments, goals, and associated documents</li><li>Remove alternate rater and peer(s)</li></ul>',
                actions: [{
                    type: 'danger',
                    label: 'Yes, Reset this Assessment'
                }, {
                    label: 'Cancel'
                }]
            });
        });

        $('.js-delete').click(function(e) {
            e.preventDefault();
            HealthStream.utilities.interrupt({
                type: 'failure',
                title: 'You are about to delete this assessment',
                text: '<p>Are you sure you want to DELETE this assessment and all ratings, comments, goals, and associated documents?',
                actions: [{
                    type: 'danger',
                    label: 'Yes, Delete this Assessment'
                }, {
                    label: 'Cancel'
                }]
            });
        });

        //NEW SORTING GROUPING AND FILTERING STUFF

        function HandleTextFilters(type, title) {
            $('.row2').show();
            $('.row1').css('border-bottom', '1px #e2e2e2 solid');
            // $('.row2 .filter-item').hide();
            // $('.row2 .filter-item .filter-text').text('');
            switch (type) {
                case "employee":
                    $('.filter-employee').show();
                    $('#filterbar-panel > div > div.filter-bar-row.row2 > div.filter-item.filter-employee > div > div.filter-text > span').text(title);
                    $('.filter-title').hide();
                    break;

                case "title":
                    $('.filter-title').show();
                    $('#filterbar-panel > div > div.filter-bar-row.row2 > div.filter-item.filter-title > div > div.filter-text > span').text(title);
                    $('.filter-employee').hide();
                    break;
            }
            if (type == 'range' && $('#dateRangeSelect option:selected').val() != 'all') {

                $('.filter-date').show();
                $('.filter-date .filter-text > span').text($('#dateRangeSelect option:selected').text());
            } else {
                $('.filter-date').hide();
            }

        }

        //Reset filters buttons from the Sort & Filter modal and dropdown
        $(".reset-filters").click(function() {
            window.location = 'assessment-overview.php#details'
        });

        //Column Header click even - we need to do some sorting now.
        $(".sort").click(function(e) {

            e.preventDefault();

            //find out which column we're sorting
            var classNames = $(this).attr("class").toString().split(' ');
            var column = "";

            $.each(classNames, function(i, className) {
                if (className.match('^sort-')) {
                    var parts = className.split('-');
                    column = parts[1];
                }
            });

            var dir;
            var secondarySortColumn;
            var secondarySortDirection;

            dir = $(this).attr("data-sortdir");

            sortAssessments(column, dir, 'none', 'none');

            stripeAssessments();

        });


        $('.dd-filter').change(function() {
            filterAssessments(
                $('#filter-assignment').val(),
                $('#filter-state').val(),
                $('#filter-title').val(),
                $('#filter-employee').val(),
                $('#filter-type').val());

            sortAssessments(
                $(".primary-sort-col").val(),
                $(".primary-sort-dir").val(),
                $(".secondary-sort-col").val(),
                $(".secondary-sort-dir").val());

            updateCount();
        });

        //Submit button from the Filter & Sort modal
        $('#apply-sort-button').click(function() {

            sortAssessments(
                $(".primary-sort-col").val(),
                $(".primary-sort-dir").val(),
                $(".secondary-sort-col").val(),
                $(".secondary-sort-dir").val());
        });

        function groupAssessmentsByState(state) {
            filterAssessments(
                null,
                state,
                null,
                null,
                true);

            updateCount();
        }

        function groupAssessmentsByTitle(titleid) {
            filterAssessments(
                null,
                null,
                titleid,
                null,
                true);

            updateCount();
        }



        //FILTERING
        function filterAssessments(assignmentValue, stateValue, titleId, employeeId, type, isOnModal) {
            console.log('filter assessments');
            assignmentValue = assignmentValue || 'assigned';
            stateValue = stateValue || 'all-not-closed';
            titleId = titleId || 'all';
            employeeId = employeeId || 'all';
            type = type || 'all';
            isOnModal = isOnModal || false;

            //set the filter bar dropdowns
            $('#filter-assignment').val(assignmentValue);
            $('#filter-state').val(stateValue);
            $('#filter-title').val(titleId);
            $('#filter-employee').val(employeeId);
            $('#filter-type').val(type);

            //define the assessments
            if (isOnModal) {
                var $filterAssessments = $('.modal-assessment').not(".modal-assessment--header");
            } else {
                var $filterAssessments = $('.assessment').not(".assessment--header");
            }
            $filterAssessments.show();

            //filter the assessments by each filter type
            $filterAssessments.each(function() {
                //FILTER BY ASSIGNMENT
                if (assignmentValue == "all") {
                    //do nothing - no need to hide anything
                } else if (assignmentValue == "assigned") {
                    if ($(this).find(".assessment__assignedto").text() === "") {
                        $(this).hide();
                    }
                } else if (assignmentValue == "actionable") {
                    if ($(this).attr("data-actionable") != "1") {
                        $(this).hide();
                    }
                } else if (assignmentValue == "not-assigned") {
                    if ($(this).find(".assessment__assignedto").text() !== "") {
                        $(this).hide();
                    }
                }
            }).each(function() {
                //FILTER BY STATE
                if (stateValue == "all") {
                    //do nothing - no need to hide anything
                } else if (stateValue == "all-not-closed") {
                    if ($(this).find(".assessment__state").attr("data-state") == "closed") {
                        $(this).hide();
                    }
                } else {
                    if (isOnModal) {
                        console.log('is on modal');
                        console.log($(this).find(".assessment__state").attr("data-action-state"));
                        if ($(this).find(".assessment__state").attr("data-action-state") != stateValue) {
                            $(this).hide();
                        }


                    } else {
                        console.log('is not on modal');
                        if ($(this).find(".assessment__state").attr("data-state") != stateValue) {
                            $(this).hide();
                        }
                    }
                }
            }).each(function() {
                //FILTER BY TYPE
                if (type == "all") {
                    //do nothing - no need to hide anything
                } else if (type == "employee") {
                    if ($(this).find(".meta-type").text().toLowerCase() != "employee assessment") {
                        $(this).hide();
                    }
                } else if (type == "approval") {
                    if ($(this).find(".meta-type").text().toLowerCase() != "approval") {
                        $(this).hide();
                    }
                }
            }).each(function() {
                //FILTER BY ASSESSMENT TITLE
                if (titleId == "all") {
                    //do nothing - no need to hide anything
                } else {
                    if ($(this).attr("data-titleid") != titleId) {
                        $(this).hide();
                    }
                }
            }).each(function() {
                //FILTER BY EMPLOYEE NAME
                if (employeeId == "all") {
                    //do nothing - no need to hide anything
                } else {
                    if ($(this).attr("data-empid") != employeeId) {
                        $(this).hide();
                    }
                }
            });
            if (stateValue != 'all' && stateValue != 'closed') {
                $('.assessment__completed').hide();
                $('#details').removeClass('show-completed');
                $(".primary-sort-col option[value='completed']").remove();
                $(".secondary-sort-col option[value='completed']").remove();
            } else {
                $('.assessment__completed').css('display', 'table-cell');
                $('#details').addClass('show-completed');
                $(".primary-sort-col option").eq(1).before($("<option></option>").val("completed").text("Completed").attr("data-directions", "Newest to Oldest|Oldest to Newest"));
                $(".secondary-sort-col option").eq(2).before($("<option></option>").val("completed").text("Completed").attr("data-directions", "Newest to Oldest|Oldest to Newest"));
            }
            $(window).resize();

        }
        //SORTING
        function sortAssessments(primaryColumn, primaryDirection, secondaryColumn, secondaryDirection) {

            primaryColumn = primaryColumn || 'due';
            primaryDirection = primaryDirection || 'desc';
            secondaryColumn = secondaryColumn || 'assessment';
            secondaryDirection = secondaryDirection || 'asc';

            primaryDirection = primaryDirection == 'asc' ? 'desc' : 'asc';
            secondaryDirection = secondaryDirection == 'asc' ? 'desc' : 'asc';

            secondaryDirection = secondaryColumn == 'none' ? '' : secondaryDirection;

            var $assessments = $('.assessment-data');

            var secondarySelector = getSortSelector(secondaryColumn);
            var primarySelector = getSortSelector(primaryColumn);

            switch (secondarySelector) {
                case "":
                    //no secondary selection criteria
                    if (primaryColumn == "state") {
                        tinysort('.assessment-data', { selector: primarySelector, order: primaryDirection }, { selector: '.assessment__state-description', order: primaryDirection });
                    } else {
                        tinysort('.assessment-data', { selector: primarySelector, order: primaryDirection });
                    }
                    break;
                default:
                    //sort on primary and secondary
                    if (primaryColumn == "state") {
                        if (secondaryColumn == "state") {
                            tinysort('.assessment-data', { selector: primarySelector, order: primaryDirection }, { selector: '.assessment__state-description', order: primaryDirection }, { selector: secondarySelector, order: secondaryDirection }, { selector: '.assessment__state-description', order: secondaryDirection });
                        } else {
                            tinysort('.assessment-data', { selector: primarySelector, order: primaryDirection }, { selector: '.assessment__state-description', order: primaryDirection }, { selector: secondarySelector, order: secondaryDirection });
                        }
                    } else {
                        if (secondaryColumn == "state") {
                            tinysort('.assessment-data', { selector: primarySelector, order: primaryDirection }, { selector: secondarySelector, order: secondaryDirection }, { selector: '.assessment__state-description', order: secondaryDirection });
                        } else {
                            tinysort('.assessment-data', { selector: primarySelector, order: primaryDirection }, { selector: secondarySelector, order: secondaryDirection });
                        }
                    }
                    break;
            }

            //make sure all of the sort controls contain the same selected value
            $('.js-sort-primary').val(primaryColumn);
            $('.js-sort-primary-dir').val(primaryDirection);
            $('.js-sort-secondary').val(secondaryColumn);
            $('.js-sort-secondary-dir').val(secondaryDirection);

            //change the primary sort (mobile and popout) directions based on the column
            var $target = $('#' + $('.primary-sort-col').attr('data-target'));
            var directions = $('.primary-sort-col').find('option:selected').attr('data-directions').split('|');
            var $modaltarget = $('#' + $('.mobile-sort-col').attr('data-target'));
            var html = '';
            html += '<option value="desc">' + directions[0] + '</option>';
            html += '<option value="asc">' + directions[1] + '</option>';
            $target.html(html);
            $modaltarget.html(html);

            //set the secondary sort (popout only) direction based on the column
            directions = '';
            $target = $('#' + $('.secondary-sort-col').attr('data-target'));
            directions = $('.secondary-sort-col').find('option:selected').attr('data-directions').split('|');
            html = '';
            html += '<option value="desc">' + directions[0] + '</option>';
            html += '<option value="asc">' + directions[1] + '</option>';
            $target.html(html);

            //change the sort direction indicator in the column header
            $(".sort-" + primaryColumn).attr("data-sortdir", primaryDirection);

            displaySortIndicator(primaryColumn, primaryDirection, secondaryColumn, secondaryDirection);

        }

        function getSortSelector(column) {
            var selector = "";
            switch (column) {
                case "employee":
                    selector = ".assessment__employee";
                    break;
                case "peerprogress":
                    selector = ".progress-peer";
                    break;
                case "state":
                    selector = ".data-state";
                    break;
                case "due":
                    selector = ".data-date";
                    break;
                case "completed":
                    selector = ".data-completed";
                    break;
                case "type":
                    selector = ".meta-type";
                    break;
                case "assessment":
                    selector = ".assessment__title";
                    break;
                case "employeeprogress":
                    selector = ".data-employee-progress";
                    break;
                case "rater":
                    selector = ".rater-name";
                    break;
                case "raterprogress":
                    selector = ".data-rater-progress";
                    break;
            }
            return selector;
        }

        //HELPER FUNCTIONS
        function resetGroupFilterSort() {
            filterAssessments();
            sortAssessments();
            updateCount();
        }

        function stripeAssessments() {
            var $assessments = $('.assessment:nth-child(n+3)');
            //clear all of the striping
            $assessments.removeClass("assessment--stripe");
            //stripe only the even slats
            $('.assessment:visible:even').not(".assessment--header").addClass("assessment--stripe");
        }

        function updateCount() {
            // if (target != 'summary'){
            // var totalAssessments = $('.assessment:visible').not(".assessment--header").length;
            // var totalAssessmentsAttention = $('.assessment-flag:visible').not(".assessment--header").length;

            // $(".results-count").text(totalAssessments);
            // $('.focus-pageheader .meta-value:eq(0)').text(totalAssessments);
            // $('.focus-pageheader .meta-value:eq(1)').text(totalAssessmentsAttention);

            // if(totalAssessments === 0) {
            //     $(".no-assessments").show();
            //     $(".assessment--header").hide();
            // }
            // else{
            //     $(".no-assessments").hide();
            //     $(".assessment--header").show();
            // }
            stripeAssessments();
            // }
        }

        function displaySortIndicator(primaryColumn, primaryDirection, secondaryColumn, secondaryDirection) {
            var $allColumnHeaders = $(".sort");
            var $primaryColumnHeader = $('.sort-' + primaryColumn);
            var $secondaryColumnHeader = $('.sort-' + secondaryColumn);

            $allColumnHeaders.find("i").remove();

            $primaryColumnHeader.append("<i class='sortdir fa'></i>");

            $secondaryColumnHeader.append("<i class='sortdir fa'></i>");

            //Primary Sort Header
            if (primaryDirection == 'desc') {
                $primaryColumnHeader.find("i").addClass("fa-caret-up");
            } else if (primaryDirection == "asc") {
                $primaryColumnHeader.find("i").addClass("fa-caret-down");
            }

            //Secondary Sort Header
            if (secondaryDirection == 'desc') {
                $secondaryColumnHeader.find("i").addClass("fa-caret-up");
            } else if (secondaryDirection == "asc") {
                $secondaryColumnHeader.find("i").addClass("fa-caret-down");
            }
        }
        $(".assessment-group__box").click(function() {
            goToGroup($(this), true);

        });
        $('.assessment-groups-employee-list tr').click(function(e) {
            e.preventDefault();
            if($(this).find('td').length > 0) {
                goToGroupRow($(this), 'employee', true);
            }

        });
        $('.assessment-groups-assessment-list tr').click(function(e) {
            e.preventDefault();
            if($(this).find('td').length > 0) {
                goToGroupRow($(this), 'title', true);
            }

        });



        function goToGroup($elem, actionableOnly) {
            var $assessmentGroup = $elem.parent(".assessment-group");
            var classNames = $assessmentGroup.attr("class").toString().split(' ');
            var type = "";
            var id = $assessmentGroup.attr("data-id");
            var title = $assessmentGroup.find(".assessment-group__title").text();
            var data = $assessmentGroup.find(".assessment-group__title").data("state");
            var assignment = "";


            if (actionableOnly == true) {
                assignment = "actionable";
            } else {
                assignment = "";
            }

            $.each(classNames, function(i, className) {
                if (className.match('^assessment-group--')) {
                    var parts = className.split('-');
                    type = parts[3];
                }
            });
            if (type != 'state') {
                HandleTextFilters(type, title);
            }
            var range = getUrlVars()["range"];

            if (range !== undefined && range != '') {
                range = range.replace('#', '');
                range = range.replace('summary', '');
            }

            $('.row2').hide();
            $('.filter-bar-flat .row1').css('border-bottom', '');

            //reset the sort
            sortAssessments();

            switch (type) {
                case "state":
                    filterAssessments(assignment, data, undefined, undefined, undefined, true);
                    $('.modal-title').html(title.replace('to', 'to '));
                    $('#modal-assessment-by-state').modal("show");
                    break;

                case "employee":
                    filterAssessments(assignment, undefined, undefined, id, undefined, true);
                    $('.modal-title').html("Assessments for " + title);
                    $('#modal-assessment-by-employee').modal("show");
                    break;

                case "title":
                    filterAssessments(assignment, undefined, id, undefined, undefined, true);
                    $('.modal-title').html("Assessments for " + title);
                    $('#modal-assessment-by-title').modal("show");

                    break;
            }

            updateCount();
            $('html,body').scrollTop(0);
        }

        $('html,body').scrollTop(0);

        $('.assessment[data-state="closed"]').hide();



        function goToGroupRow($elem, type, actionableOnly) {
            var id = $elem.attr("data-id");
            var title = $elem.find("td").first().text();

            assignment = "actionable";
            var range = getUrlVars()["range"];

            if (range !== undefined && range != '') {
                range = range.replace('#', '');
                range = range.replace('summary', '');
            }

            // HandleTextFilters('range', range);
            $('.row2').hide();
            $('.filter-bar-flat .row1').css('border-bottom', '');

            //reset the sort
            sortAssessments();

            switch (type) {

                case "employee":
                console.log('employee');
                    filterAssessments(assignment, undefined, undefined, id, undefined, true);
                    $('.modal-title').html("Assessments for " + title);
                    $('#modal-assessment-by-employee').modal("show");
                    break;

                case "title":
                    filterAssessments(assignment, undefined, id, undefined, undefined, true);
                    $('.modal-title').html("Assessments for " + title);
                    $('#modal-assessment-by-title').modal("show");

                    break;
            }

            // updateCount();
            // $('html,body').scrollTop(0);
        }
        $('.nav-pagetabs a[href="#summary"]').parents('li').addClass("active");

    });


    //ASSESSMENT SUMMARY
    // function AddToBrowserHistory(target) {
    //     // remember the hash in the URL without jumping
    //     target = '#' + target;
    //     if (history.pushState) {
    //         history.pushState(null, null, target);
    //     } else {
    //         location.hash = target;
    //     }
    // }
