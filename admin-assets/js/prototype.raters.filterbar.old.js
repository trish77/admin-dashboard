

    $(function(){
        //RANDOM LITTLE DO-DADS

        $('.js-sort').on('change',function(){
            var $target = $('#' + $(this).attr('data-target'));
            var directions = $(this).find('option:selected').attr('data-directions').split('|');
            var html = '';

            html += '<option value="desc">'+directions[0]+'</option>';
            html += '<option value="asc">'+directions[1]+'</option>';
            $target.html(html);
        });

        $('.js-sort-primary').on('change',function(){
            var primary = $(this).find('option:selected').text();

            $('.js-sort-secondary option').show();

            if (  $('.js-sort-secondary').val() === primary ) {
                $('.js-sort-secondary').val('None').change();
            }

            $('.js-sort-secondary option').each(function(){
                if ( $(this).text() === primary ) {
                    $(this).hide();
                }
            });
        });
       
        $('.js-state-detail').on('click',function(e){
            var name = $(this).attr('data-actor');
            var $modal = $('#modal-state-detail');
            var $body = $modal.find('.modal-body');
            e.preventDefault();
            $body.html('Waiting on ' + name + ' to sign off');
            $modal.modal('show');
        });

        $('.js-state-detail-approval').on('click',function(e){
            var $modal = $('#modal-state-detail-approval');
            e.preventDefault();
            $modal.modal('show');
        });

        $('.js-progress').on('click',function(){
            var $modal = $('#modal-progress');
            var id = $(this).attr('data-id');
            var html = '';
            var data = [
                {
                    'assessment' : 'Competency Appraisal',
                    'progress' : [
                        ['Rater','Crane, Darcy L.','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Employee','Conner, Rosalyn F.','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 1','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 2','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 3','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                    ]
                },
                {
                    'assessment' : 'Competency Appraisal',
                    'progress' : [
                        ['Rater','Crane, Darcy L.','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Employee','Juniper, Stephanie P.','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 1','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 2','Not Yet Started'],
                        ['Peer','Peer 3','Not Yet Started']
                    ]
                },
                {
                    'assessment' : 'Competency Appraisal',
                    'progress' : [
                        ['Rater','Crane, Darcy L.','<div class="progress-bar" style="width:43%;">43%</div>'],
                        ['Employee','Montoya, Alice G.','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 1','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 2','Not Yet Started'],
                        ['Peer','Peer 3','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                    ]
                },
                {
                    'assessment' : 'Competency Appraisal',
                    'progress' : [
                        ['Rater','Crane, Darcy L.','Not Yet Started'],
                        ['Employee','Park, Jennifer S.','<div class="progress-bar" style="width:43%;">43%</div>'],
                        ['Peer','Peer 1','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>'],
                        ['Peer','Peer 2','Not Yet Started'],
                        ['Peer','Peer 3','<div class="progress-bar progress-bar--submitted" style="width:100%;">Submitted</div>']
                    ]
                },
                {
                    'assessment' : 'Performance Appraisal',
                    'progress' : [
                        ['Rater','Crane, Darcy L.','Not Yet Started'],
                        ['Employee','Juniper, Stephanie P.','Not Yet Started'],
                        ['Peer','Peer 1','Not Yet Started'],
                        ['Peer','Peer 2','Not Yet Started'],
                        ['Peer','Peer 3','Not Yet Started']
                    ]
                }
            ];



            $(data[id].progress).each(function(){
                html += '<tr>';
                html += '<td class="modal-progress__role">' + this[0] + '</td>';
                html += '<td class="modal-progress__name">' + this[1] + '</td>';
                html += '<td class="modal-progress__progress"><div class="progress">' + this[2] + '</div></td>';
                html += '</tr>';
            });

            $modal.find('.modal-title').text(data[id].assessment);
            $modal.find('.modal-progress__table tbody').html(html);
            $modal.modal('show');

        });

        $('.js-revert').click(function(e){
            e.preventDefault();
            HealthStream.utilities.interrupt({
                type: 'failure',
                title: 'You are about revert this assessment',
                text: '<p>Reverting an assessment from the Review state to the Evaluate state allows:</p><ul><li>Configuration of a new Reflective Plan</li><li>Modifications to the Reflective Plan configuration, if one was already created</li><li>The employee and peer(s) to submit their ratings, if they have not already done so</li></ul><p>Reverting this assessment to the Evaluate state will</p><ul><li>Delete any Sign Off(s) and Sign Off comments</li><li>Delete the Reflective Plan, if one was created</li><li>Delete any Approval(s) and Approval Comment(s)</li><li>Require movement through the Approval process again, if appropriate</li></ul>',
                actions: [
                    {
                        type: 'danger',
                        label: 'Yes, Revert this Assessment'
                    },
                    {
                        label: 'Cancel'
                    }
                ]
            });
        });

        $('.js-reset').click(function(e){
            e.preventDefault();
            HealthStream.utilities.interrupt({
                type: 'failure',
                title: 'You are about to reset this assessment',
                text: '<p>Resetting the assessment will:</p><ul><li>Delete all ratings, comments, goals, and associated documents</li><li>Remove alternate rater and peer(s)</li></ul>',
                actions: [
                    {
                        type: 'danger',
                        label: 'Yes, Reset this Assessment'
                    },
                    {
                        label: 'Cancel'
                    }
                ]
            });
        });

        $('.js-delete').click(function(e){
            e.preventDefault();
            HealthStream.utilities.interrupt({
                type: 'failure',
                title: 'You are about to delete this assessment',
                text: '<p>Are you sure you want to DELETE this assessment and all ratings, comments, goals, and associated documents?',
                actions: [
                    {
                        type: 'danger',
                        label: 'Yes, Delete this Assessment'
                    },
                    {
                        label: 'Cancel'
                    }
                ]
            });
        });

        //NEW SORTING GROUPING AND FILTERING STUFF

        //Reset filters buttons from the Sort & Filter modal and dropdown
        $(".reset-filters").click(function(){
             resetGroupFilterSort();             
        });

        //Column Header click even - we need to do some sorting now.
        $(".sort").click(function(e){

             e.preventDefault();

            //find out which column we're sorting
            var classNames = $(this).attr("class").toString().split(' ');
            var column = "";

            $.each(classNames, function (i, className) {
                if(className.match('^sort-')){
                    var parts = className.split('-');
                    column = parts[1];
                }
            });

            var dir;
            var secondarySortColumn;
            var secondarySortDirection;

            dir = $(this).attr("data-sortdir");

            sortAssessments (column, dir, 'none' ,'none');

            stripeAssessments();

        });
        

        $('.dd-filter').change(function() {
            //prototype only
            var id = $(this).prop("id");
            var value = $(this).find('option:selected').val();
            var evaluateTitleIds = ['11','10','2','17','1','3','8'];
            var evaluateEmpIds = ['7','5','4','8','6','3','2','1'];
            var reviewTitleIds = ['1','9'];
            var reviewEmpIds = ['6','8']
            var approvalTitleIds = ['12','6','4'];
            var approvalEmpIds = ['9','5','2','3']
             var actionableTitleIds = ['11','10','2','17','1','9','3','8'];
            var actionableEmpIds = ['7','5','8','6','3','2','1'];
            var statevalue = $('#filter-state').find('option:selected').val();
             var typevalue = $('#filter-type').find('option:selected').val();
              var assignmentvalue = $('#filter-assignment').find('option:selected').val();

           $('#filter-title option').show();
           $('#filter-employee option').show();


          //  if (id == 'filter-state' || id=='filter-type'|| id == 'filter-assignment') {
                //filter the title and employee dropdowns. 
           //     switch (id) {
          //          case 'filter-state':
                        if (statevalue =='assigned' || statevalue =='closed') {
                            $('#filter-title option').hide();
                            $('#filter-employee option').hide();
                        }
                        else if (statevalue =='all' || statevalue =='all-not-closed') {
                           //do nothing
                        }
                        else if (statevalue =='evaluate') {
                            $('#filter-title option').each(function() {
                                if($(this).val()!= 'all'){
                                    if ($.inArray($(this).val(), evaluateTitleIds) == -1 ) {
                                        $(this).hide();
                                    }
                                   
                                }
                            
                            });
                            $('#filter-employee option').each(function() {
                                if($(this).val()!= 'all'){
                                    if ($.inArray($(this).val(), evaluateEmpIds) == -1 ) {
                                        $(this).hide();
                                    }
                                    
                                }
                            });
                        }
                         else if (statevalue =='review') {
                           
                            $('#filter-title option').each(function() {
                                 if($(this).val()!= 'all'){
                                    if ($.inArray($(this).val(), reviewTitleIds) == -1 ) {
                                        $(this).hide();
                                    }
                                    
                                 }
                            });
                            $('#filter-employee option').each(function() {
                                if($(this).val()!= 'all'){
                                    if ($.inArray($(this).val(), reviewEmpIds) == -1 ) {
                                        $(this).hide();
                                    }
                                    
                                }
                            });
                        }
                   // break;
                    //case 'filter-type': 

                   // break;
                  //  case 'filter-assignment': 
                    if (assignmentvalue =='actionable') {
                        $('#filter-title option').each(function() {
                                 if($(this).val()!= 'all'){
                                    if ($.inArray($(this).val(), actionableTitleIds) == -1 ) {
                                        $(this).hide();
                                    }
                                    
                                 }
                            });
                        $('#filter-employee option').each(function() {
                                if($(this).val()!= 'all'){
                                    if ($.inArray($(this).val(), actionableEmpIds) == -1 ) {
                                        $(this).hide();
                                    }
                                    
                                }
                            });
                    }
                   // break;

               // }
            //}         
            
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

             $('.assessment-data:visible').each(function() {
                //console.log("titleid: " + $(this).data("empid"));
                console.log(" id : " + $(this).data("empid"));
            });
           
        });

        //Submit button from the Filter & Sort modal
        $('#apply-sort-button').click(function() {

            sortAssessments(
                $(".primary-sort-col").val(),
                $(".primary-sort-dir").val(),
                $(".secondary-sort-col").val(),
                $(".secondary-sort-dir").val());
        });

        
       
        //FILTERING
        function filterAssessments(assignmentValue, stateValue, titleId, employeeId, type) {

            assignmentValue = assignmentValue || 'all';
            stateValue = stateValue || 'all-not-closed';
            titleId = titleId || 'all';
            employeeId = employeeId || 'all';
            type = type || 'all';

            //set the filter bar dropdowns
            $('#filter-assignment').val(assignmentValue);
            $('#filter-state').val(stateValue);
            $('#filter-title').val(titleId);
            $('#filter-employee').val(employeeId);
            $('#filter-type').val(type);

            //define the assessments
            var $filterAssessments = $('.assessment').not(".assessment--header");
            $filterAssessments.show();

            //filter the assessments by each filter type
            $filterAssessments.each(function () {
                //FILTER BY ASSIGNMENT
                if (assignmentValue == "all") {
                    //do nothing - no need to hide anything
                }
                else if (assignmentValue == "assigned") {
                    if ($(this).find(".assessment__assignedto").text() === "") {
                        $(this).hide();
                    }
                }
                else if (assignmentValue == "actionable") {
                    if ($(this).attr("data-actionable") != "1") {
                        $(this).hide();
                    }
                }
                else if (assignmentValue == "not-assigned") {
                    if ($(this).find(".assessment__assignedto").text() !== "") {
                        $(this).hide();
                    }
                }
            }).each(function () {
                //FILTER BY STATE
                if (stateValue == "all") {
                    //do nothing - no need to hide anything
                }
                else if (stateValue == "all-not-closed") {
                   if($(this).find(".assessment__state").attr("data-state") == "closed") {
                        $(this).hide();
                   }
                }
                else {
                    if ($(this).find(".assessment__state").attr("data-state") != stateValue) {
                        $(this).hide();
                    }
                }
            }).each(function () {
                //FILTER BY TYPE
                if (type == "all") {
                    //do nothing - no need to hide anything
                }
                else if (type == "employee") {
                   if($(this).find(".meta-type").text().toLowerCase() != "employee assessment") {
                        $(this).hide();
                   }
                }
                else if (type == "approval") {
                    if ($(this).find(".meta-type").text().toLowerCase() != "approval") {
                        $(this).hide();
                    }
                }
            }).each(function () {
                //FILTER BY ASSESSMENT TITLE
                if (titleId == "all") {
                    //do nothing - no need to hide anything
                }
                else {
                    if ($(this).attr("data-titleid") != titleId) {
                        $(this).hide();
                    }
                }
            }).each(function () {
                //FILTER BY EMPLOYEE NAME
                if (employeeId == "all") {
                    //do nothing - no need to hide anything
                }
               
                else {
                    if ($(this).attr("data-empid") != employeeId) {
                        $(this).hide();
                    }
                }
            });
            
             $(window).resize();
        }
        //SORTING
        function sortAssessments(primaryColumn, primaryDirection, secondaryColumn , secondaryDirection ) {
            
            primaryColumn = primaryColumn || 'due';
            primaryDirection = primaryDirection || 'desc';
            secondaryColumn = secondaryColumn || 'assessment';
            secondaryDirection = secondaryDirection || 'asc';

            primaryDirection = primaryDirection == 'asc' ? 'desc': 'asc';
            secondaryDirection = secondaryDirection == 'asc' ? 'desc': 'asc';

            secondaryDirection = secondaryColumn == 'none' ? '': secondaryDirection;

            var $assessments = $('.assessment-data');

            var secondarySelector = getSortSelector(secondaryColumn);
            var primarySelector = getSortSelector(primaryColumn);

            switch (secondarySelector)
            {
                case "":
                //no secondary selection criteria
                    if (primaryColumn == "state"){
                            tinysort('.assessment-data',
                            {selector:primarySelector,order:primaryDirection},
                            {selector:'.assessment__state-description', order:primaryDirection});
                    }
                    else {
                            tinysort('.assessment-data',
                            {selector:primarySelector,order:primaryDirection});  
                    }
                    break; 
                default:
                //sort on primary and secondary
                    if (primaryColumn == "state"){
                            if(secondaryColumn == "state") {
                                tinysort('.assessment-data',
                                {selector:primarySelector,order:primaryDirection},
                                {selector:'.assessment__state-description', order:primaryDirection},
                                {selector:secondarySelector,order:secondaryDirection},
                                {selector:'.assessment__state-description', order:secondaryDirection});
                            }
                            else {
                                tinysort('.assessment-data',
                                {selector:primarySelector,order:primaryDirection},
                                {selector:'.assessment__state-description', order:primaryDirection},
                                {selector:secondarySelector,order:secondaryDirection});
                            }
                    }
                    else {
                            if(secondaryColumn == "state") {
                                tinysort('.assessment-data',
                                {selector:primarySelector,order:primaryDirection},
                                {selector:secondarySelector,order:secondaryDirection},
                                {selector:'.assessment__state-description', order:secondaryDirection});
                            }
                            else {
                                tinysort('.assessment-data',{selector:primarySelector,order:primaryDirection},
                                {selector:secondarySelector,order:secondaryDirection});
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
            html += '<option value="desc">'+directions[0]+'</option>';
            html += '<option value="asc">'+directions[1]+'</option>';
            $target.html(html);
            $modaltarget.html(html);
            
            //set the secondary sort (popout only) direction based on the column
            directions='';
            $target = $('#' + $('.secondary-sort-col').attr('data-target'));
            directions = $('.secondary-sort-col').find('option:selected').attr('data-directions').split('|');
            html = '';
            html += '<option value="desc">'+directions[0]+'</option>';
            html += '<option value="asc">'+directions[1]+'</option>';
            $target.html(html);

             //change the sort direction indicator in the column header
            $(".sort-" + primaryColumn).attr("data-sortdir",primaryDirection);

            displaySortIndicator(primaryColumn, primaryDirection, secondaryColumn, secondaryDirection);

        }

        function getSortSelector(column){
            var selector = "";
             switch(column) {
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
            sortAssessments ();
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
            var totalAssessments = $('.assessment:visible').not(".assessment--header").length;
            var totalAssessmentsAttention = $('.assessment--attention:visible').not(".assessment--header").length;

            $(".results-count").text(totalAssessments);
            $('.focus-pageheader .meta-value:eq(0)').text(totalAssessments);
            $('.focus-pageheader .meta-value:eq(1)').text(totalAssessmentsAttention);
            
            if(totalAssessments === 0) {
                $(".no-assessments").show();
                $(".assessment--header").hide();
            }
            else{
                $(".no-assessments").hide();
                $(".assessment--header").show();
            }
            stripeAssessments();
        }

        function displaySortIndicator(primaryColumn, primaryDirection, secondaryColumn, secondaryDirection){
            var $allColumnHeaders = $(".sort");
            var $primaryColumnHeader = $('.sort-' + primaryColumn);
            var $secondaryColumnHeader = $('.sort-' + secondaryColumn);

            $allColumnHeaders.find("i").remove();

            $primaryColumnHeader.append("<i class='sortdir fa'></i>");
           
            $secondaryColumnHeader.append("<i class='sortdir fa'></i>");
           
            //Primary Sort Header
            if (primaryDirection == 'desc'){
                $primaryColumnHeader.find("i").addClass("fa-caret-up");
            }
            else if (primaryDirection == "asc") {
                $primaryColumnHeader.find("i").addClass("fa-caret-down");
            }

            //Secondary Sort Header
             if (secondaryDirection == 'desc'){
                $secondaryColumnHeader.find("i").addClass("fa-caret-up");
            }
            else if (secondaryDirection == "asc") {
                 $secondaryColumnHeader.find("i").addClass("fa-caret-down");
            }
        }

        $(document).mouseup(function (e)
        {
            //close sort options when click outside of box.
            var container = $("#SortOptions");
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0 && !$(e.target).is(".btn-sort")) // ... nor a descendant of the container
            {
                container.hide();
                container.removeClass("open");
            }
        });

        $('html,body').scrollTop(0);
        
        
    });

    