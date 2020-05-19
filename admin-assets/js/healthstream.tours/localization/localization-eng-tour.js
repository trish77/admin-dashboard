/*global window*/

(function (window) {
    'use strict';

    window.HealthStream = window.HealthStream || {};
    window.HealthStream.tour = window.HealthStream.tour || {};

    window.HealthStream.tour.localization = {

        // Button values
        startTour: "Take a Tour",
        prev: "Prev",
        next: "Next",
        endTour: "End tour",

        // Titles and content for all steps

        welcomeToTodoList: "Welcome to the To-Do List tour!",
        welcomeContent: "This is a quick tour of this section's features. Click <b>></b> to continue, or <b>X</b> to exit.",

        todoList: "To-Do List",
        todoListContent: "The To-Do list shows tasks that need to be completed.",

        taskSummary: "Task Summary",
        taskSummaryContent: "This summary shows how many tasks you have and how many require immediate attention (if there are any).",

        view: "View",
        viewContent: "View an item by clicking its name...",

        action: "Action",
        actionContent: "...or click the button for the next action.",

        orderOfTasks: "Order of Tasks",
        orderOfTasksContent: "Your To-Do List displays all of the items that you need to complete. They are arranged in chronological order: the closer an item is to being due, the closer it is to the top of the list.",

        attentionItems: "Attention Items",
        attentionItemsContent: "Items that require your immediate attention are always at the top of the list and highlighted in a different color.",

        electives: "Electives",
        electivesContent: "You can quickly unenroll from elective learning by clicking the arrow on the button and then selecting <b>Unenroll</b> to remove the learning from your To-Do List.",

        filters: "Filters",
        filtersContent: "Choose a filter to focus on a certain task type. Select <b>All Tasks</b> to display all of your To-Do List items.",

        quickStart: "Quick Start",
        quickStartContent: "The <b>Quick Start</b> button will take you to your next priority automatically. Give it a try and see how it can save you time!",

        todoSubmittedAssessments: "My Submitted Assessments",
        todoSubmittedAssessmentsContent: "Assessments that you’ve submitted will drop off of your To Do List and be moved to the <b>Submitted Assessments</b> page.",

        todoOldAssessments: "My Assessments (old version)",
        todoOldContent: "The <b>My Assessments (old version)</b> link will take you back to the old My Assessments page.",

        endOfTour: "End of Tour",
        endOfTourContent: "Thanks for taking our tour! To see it again, click the <b>Take a Tour</b> button at the top of the page.",

        noTasks: "No Tasks",
        noTasksContent: "Looks like you're caught up on tasks.",


        /*-----------Completed Tour Steps---------------*/

        welcomeToCompleted: "Welcome to the Completed Tab!",

        completedTasks: "Completed Tasks",
        completedTasksContent: "By default, a list of tasks completed in the past 12 months is displayed.",

        completionSummary: "Completion Summary",
        completionSummaryContents: "This summary shows the total number of completions and estimated time of learning items completed.",

        actions: "Actions",
        actionsContent: "Action buttons enable you to do things like view and print your certificates.",

        additionalInformation: "Additional Information",
        //also used in Catalog Tour
        additionalInformationContent: "Some items have additional details that you can view by choosing the <b>Show additional information</b> link.",

        linkedNames: "Linked Names",
        linkedNamesContent: "When an item is a link, you can click it to view more detailed information about the completion.",

        printButton: "The Print Button",
        printButtonContent: "The Print button enables you to choose what to be included on your transcript and print it.",

        ceCreditSummary: "CE Credit Summary",
        ceCreditSummaryContent: "Any CE credit that you earned during the transcript time frame is displayed here.",

        completedFilters: "Filters",
        completedFiltersContent: "Change the date range or filter by completion type.",

        completedSort: "Sort",
        completedSortContent: "Completions are listed by most recent to oldest. You can also sort by completion name.",

        completedButtonBar: "Button Bar",
        completedButtonBarContent: "Print and other options are always visible in the button bar for your convenience.",


        /*-----------Catalog Steps---------------*/

        welcomeToCatalog: "Welcome to the Catalog Tour!",

        keywordSearch: "Keyword Search",
        keywordSearchContent: "You can search for elective learning by typing keywords in the Search box and clicking the magnifying glass (you can also press the ENTER key on your keyboard).",


        categories: "Categories",
        categoriesContent: "You can also browse for elective learning from the Category Browser.",

        refineResults: "Refine Results",
        refineResultsContent: "Select <b>Refine Results</b> to adjust your search settings.",

        title: "Title",
        titleContent: "Choose an item to see an overview. From there, you can enroll or return to the search results.",

        actionContentCatalog: "You can also choose the button to take the action shown.",

        /*-----------Raters Steps---------------*/

        welcomeToRater: "Welcome to the Raters Tab!",

        ActionItemsTab: "Action Items Tab",
        ActionItemsTabContent: "The <b>Action Items</b> tab allows you to see grouped assessments that you need to take action on.",

        groupedBy: "Grouped Action Items",
        groupedByActionContent: "You can easily manage which assessments you need to take action on grouped by <b>Action Type</b>,",

        groupedByEmployeeContent: "... grouped by <b>Employee Name</b>,",

        groupedByAssessmentContent: "... or grouped by <b>Assessment Name</b>.",

        allAssessmentsTab: "All Assessments Tab",
        allAssessmentsTabContent: "The <b>All Assessments</b> tab will display all assessments that you have permission to see.",

        ratersFilters: "Filters",
        ratersFiltersContent: "Filter down assessments to just the ones you want to see.",

        ratersSort: "Sorting",
        ratersSortContent: "There are additional options for sorting available by using the <b>Sort Options</b> button.",

        ratersActionItems: "Action Items",
        ratersActionItemsContent: "Assessments that you need to take action on are called out with an <b>Action Needed</b> flag.",

        ratersAction: "Action",
        ratersActionContent: "Click the button to complete the next action needed by you.",

        ratersViewAction: "Action",
        ratersViewActionContent: "If action is not required on the assessment, you can click the <b>View</b> button to view the assessment.",


        /*-----------ePortfolio Steps---------------*/

        welcomeToEportfolio: "Welcome to your ePortfolio!",
        welcomeToEportfolioContent: "This is a quick tour of ePortfolio features. Click <b>Next</b> to continue or <b>End Tour</b>, or to exit.",
        
        eportfolioSections: "ePortfolio Sections",
        eportfolioSectionsContent: "Each section allows you to add your own records.",
        
        addRecord: "Add a Record to a Section",
        addRecordContent: "Add a record to a section by clicking the <b>Add</b> button.",
        
        showHideSection: "Showing and Hiding Sections",
        showHideSectionContent: "You can select which sections you want to hide or show by clikcin on the Show/Hide Sections button.", 
        
        importRecords: "Import Records",
        importRecordsContent: "Import records from employers by entering Import Mode.",
        
        manageRecords: "Manage Records",
        manageRecordsContent: "You can view or edit a record by clicking  <b>Manage</b>.",
        

        eportfolioAttentionItemsContent: "Items that require your immediate attention are always at the top of each section and highlighted in a different color.",
        
        customizeEportfolio: "Customizing Your ePortoflio",
        customizeEportfolioContent: "You can move sections up or down on your ePortfolio. You can also hide a section."
        
          


    };
}(window));