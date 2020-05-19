(function (window, $) {
  'use strict';

  var Insights = {};

  Insights.defaults = {
    debug: true,
    api: '',
    container: '#insights',
    facet_limit: 4,
    loading_delay: 0,
    profilePageUrl: '',
  };

  Insights.state = {
    loading: true,
    error: false,
    query: {},
    summary: {},
    facets: {},
    results: {},
    profilePicPath: '',
  };

  Insights.debug = function ( log ) {
    var settings = Insights.settings;
    if ( window.console && settings.debug === true ) {
      if ( typeof log === 'string' ) {
        console.log('Insights Debug: ' + log);
      } else {
         console.log(log);
      }
    }
  };

  Insights.setState = function ( changes ) {
    var state = Insights.state;
    var settings = Insights.settings;
    Insights.state = $.extend({},state,changes);
    settings.$app.trigger('update');
  };

  Insights.handleClick = function ( change ) {
    var state = Insights.state;
    var getData = Insights.getData;
    var query = state.query;
    var search = $.extend({},query,{page: 1},change);

    // clean up empty facets
    $.each(search, function( key ) {
      if ( search[key] === null || search[key] === undefined || search[key] === '' ) {
        delete search[key];
      }
    });

    getData(search);
  }

  Insights.getData = function ( options ) {
    var debug = Insights.debug;
    var settings = Insights.settings;
    var state = Insights.state;
    var setState = Insights.setState;
    var loading_delay = settings.loading_delay;

    setState({
      loading: true,
      error: false
    });

    setTimeout(function(){
      $.getJSON(settings.api, options)
        .done(function(data) {
          debug('API Success');
          setState({
            loading: false,
            error: false,
            query: data.query,
            summary: data.summary,
            facets: data.facets,
            results: data.results,
            profilePicPath: data.ProfilePicPath
          });
        })
        .fail(function(data) {
          debug('error');
          setState({
            loading: false,
            error: true
          });
        })
        .complete(function() {
          debug('Updating State');
          debug(Insights.state);
        });
    },loading_delay);
  };

  Insights.updateUI = function () {
    var state = Insights.state;
    var settings = Insights.settings;
    var makeVisualization = Insights.makeVisualization;
    var makeTableRow = Insights.makeTableRow;
    var makeFacet = Insights.makeFacet;
    var $app = settings.$app;
    var covid = state.query.covid;
    var page = state.query.page;
    var rows = state.query.rows;
    var results = state.summary.results;
    var pages = state.summary.pages;
    var $prev = $('button[data-page-previous]');
    var $next = $('button[data-page-next]');
    var $filters = $('.insights__filters');
    var $reset = $('.insights__filters-reset');
    var $covid = $('button[data-covid]');
    var hasAppliedFilter = (
      state.query.employee !== ''
      || state.query.department !== ''
      || state.query.learning_item !== ''
      || state.query.learning_type !== ''
      || state.query.learning_requirement !== ''
      || state.query.category !== ''
      || state.query.covid !== ''
    );

    if ( !state.error && results > 0 ) {

      // DATE RANGE
      var $datarange = $('[data-sync-date]');
      var start = moment(state.query['start'], 'YYYY-MM-DD').format('ll');
      var end = moment(state.query['end'], 'YYYY-MM-DD').format('ll');
      $datarange.text(start + ' - ' + end);

      // FACETS
      $filters.removeClass('is-active');
      $reset.removeClass('is-active');
      var facets_html = '';
      $.each(state.facets, function( index, facet ) {
        if ( facet['id'] !== 'category' ) {
          facets_html += makeFacet(facet);
        }
      });
      $('.insights__facets').html(facets_html);

      if ( hasAppliedFilter ) {
        $reset.addClass('is-active');
      }

      // RESULTS
      var table_html = '';
      $.each(state.results, function( index, row ) {
        table_html += makeTableRow(row);
      });
      $('.temp_rows').html(table_html);

      // RESULTS SHOWING MESSAGE
      var $showing = $('.insights__results-header small');
      var start = ((page - 1) * rows) + 1;
      var end = start + rows - 1;
      end = (results > end)?end:results;
      $showing.text('Showing '+start+'-'+end+' of '+results.toLocaleString('US').split('.')[0]);

      // RESULTS SORT BUTTONS
      var $sort = $('th button[data-sort="'+state.query.sort+'"]');
      var direction = (state.query.direction === 'asc')?'fa-sort-up':'fa-sort-down';
      $('th button').removeClass('is-active');
      $('th button .fa').attr('class','fa fa-sort');
      $sort.addClass('is-active').find('.fa').removeClass('fa-sort').addClass(direction);

      // PAGINATION RESULTS PER PAGE
      $('[data-rows-update]').text(rows);
      $('button[data-rows]').removeClass('disabled');
      $('button[data-rows="'+rows+'"]').addClass('disabled');

      // PAGINATION BUTTONS
      $prev.removeClass('disabled');
        $next.removeClass('disabled');
      if ( page === 1 ) {
        $prev.addClass('disabled');
      }
      if ( page === pages ) {
        $next.addClass('disabled');
      }

      // VISUALIZATIONS
      var chart_options = '';
      $.each(state.summary.visualizations, function( id, option ){
        chart_options += '<li><button class="btn btn-link" data-chart="'+id+'">'+option.name+'</button></li>';
      });
      $('[data-sync-chart-options]').html(chart_options);
      makeVisualization(0);

      // COVID
      if ( state.query.covid === "true" ) {
        $covid.addClass('is-active');
      } else {
        $covid.removeClass('is-active');
      }
    }


  };

  Insights.bindEvents = function () {
    var debug = Insights.debug;
    var settings = Insights.settings;
    var state = Insights.state;
    var handleClick = Insights.handleClick;
    var updateUI = Insights.updateUI;
    var makeVisualization = Insights.makeVisualization;
    var $app = settings.$app;

    $app
      .on('click','button[data-expand]',function(){
        Insights.state.query = {};
        handleClick({start:''});
      });

    $app
      .on('click','button[data-leave]',function(){
        $app.closest('.container').find('a:eq(0)')[0].click();
      });

    $app
      .on('click','.insights__filters-reset',function(){
        handleClick({
          category: '',
          department: '',
          employee: '',
          learning_item: '',
          learning_requirement: '',
          learning_type: ''
        });
      });

    $app
      .on('click','button[data-covid]',function(){
        var query = Insights.state.query;
        var value = query.covid === "true" ? "false" : "true";
        handleClick({covid:value});
      });

    $app
      .on('click','button[data-facet]',function(){
        var search = {};
        var facet = $(this).attr('data-facet');
        var value = $(this).attr('data-value');
        search[facet] = value;
        handleClick(search);
      });

    $app
      .on('click','.insights__facet-view',function(){
        $(this).closest('.insights__facet').toggleClass('is-collapsed').addClass('is-limited');
      });

    $app
      .on('click','th button',function(){
        var query = Insights.state.query;
        var sort = $(this).attr('data-sort');
        var direction = (query.sort !== sort)?'':(query.direction === 'asc')?'desc':'asc';
        handleClick({sort:sort,direction:direction});
      });

    $app
      .on('click','button[data-rows]',function(){
        var query = Insights.state.query;
        var rows = $(this).attr('data-rows');
        handleClick({rows:rows});
      });

    $app
      .on('click','button[data-toggle="filters"]',function(){
        var $filters = $app.find('.insights__filters');
        $filters.toggleClass('is-active');
        $('html, body').animate({ scrollTop:$filters.offset().top }, 250);
      });

    $app
      .on('click','.insights__facet-length',function(){
        var $btn = $(this);
        var $facet = $btn.closest('.insights__facet');
        var labels = $btn.attr('data-labels').split('|');
        var up = labels[1] + ' <i class="fa fa-caret-up"></i>';
        var down = labels[0] + ' <i class="fa fa-caret-down"></i>';
        var label = ($facet.hasClass('is-limited'))?up:down;
        $btn.html(label);
        $facet.toggleClass('is-limited');
      });

    $app
      .on('update', function(){
        var state = Insights.state;
        var $empty = $app.find('.insights__empty');

        var start = moment(state.query.start);
        var end = moment(state.query.end);
        var range = end.diff(start, 'days');
        var max = $('button[data-date]:eq(0)').attr('data-date');

        if ( state.loading ) {
          $app.removeClass('is-error is-empty').addClass('is-loading');
        }
        else if ( state.error ) {
          $app.addClass('is-error');
        }
        else if ( state.results.length === 0 ) {
          $app.addClass('is-empty');
          $empty.removeClass('is-expandable');
          if ( range < max ) {
            $empty.addClass('is-expandable');
          }
        }
        else {
          $app.removeClass('is-loading is-error is-empty');
          updateUI();
        }
      });

    $app
      .on('click','button[data-page-previous]',function(){
        var page = Insights.state.query.page;
        handleClick({page:page - 1});
      });

    $app
      .on('click','button[data-page-next]',function(){
        var page = Insights.state.query.page;
        handleClick({page:page + 1});
      });

    $app
      .on('click','button[data-date]',function(){
        var today = moment();
        var choice = $(this).attr('data-date');
        var start = '';
        if ( choice === 'year' ) {
          start = today.startOf('year').format('YYYY-MM-DD');
        } else {
          start = today.subtract(choice, 'days').format('YYYY-MM-DD');
        }
        // force no filters
        Insights.state.query = {};
        handleClick({start:start});
      });

    $app
      .on('click','button[data-chart]',function(){
        Insights.makeVisualization($(this).attr('data-chart'));
      });

  };

  Insights.init = function ( options ) {
    var debug = Insights.debug;
    var defaults = Insights.defaults;
    var bindEvents = Insights.bindEvents;
    var getData = Insights.getData;
    var settings, $app;
    this.settings = settings = $.extend(defaults,options);
    settings.$app = $app = $(settings.container);
    bindEvents();
    getData(options);

    Chart.defaults.global.defaultFontColor = '#333';
    Chart.defaults.global.defaultFontFamily = "'Open Sans'";
  };

  Insights.makeVisualization = function ( id ) {
    var state = Insights.state;
    var results = state.summary.results;
    var selected_chart = state.summary.visualizations[id];
    var $tiles = $('.insights__summary-tiles');
    var $charts = $('.insights__summary-charts');
    var assigned = '';
    var elective = '';
    var categories = '';

    $('[data-sync-chart]').text(selected_chart.name);

    if ( selected_chart.type === 'tiles' ) {

      $.each(selected_chart.datasets, function( key, value ) {
        switch ( key ) {
          case 'Total Completions':
            $('[data-sync-total-completions]').text(value.toLocaleString('US').split('.')[0]);
            break;
          case 'Top Completion':
            $('[data-sync-top-completion-label]').text(value[0]['name']);
            $('[data-sync-top-completion-value]').text(value[0]['count'].toLocaleString('US').split('.')[0]);
            $('[data-sync-top-completion-button]').attr('data-value',value[0]['id']);
            break;
          case 'Most Completions':
            var initials = '<span>'+value[0]['initials']+'</span>';
            var image = '<img src="'+value[0]['image']+'">';
            $('[data-sync-most-completions-image]').html((value[0]['image'] !== '')?image:initials);
            $('[data-sync-most-completions-name]').text(value[0]['name']);
            $('[data-sync-most-completions-value]').text(value[0]['count'].toLocaleString('US').split('.')[0]);
            $('[data-sync-most-completions-button]').attr('data-value',value[0]['id']);
            break;
          case 'Top Categories':
            $.each(value, function( index, category ) {
              if ( index < 3 ) {
                var category_percent = Math.ceil(category.count / results * 100) + '%';
                categories += '<div class="insights__tile-category">';
                categories += '<span>' + category.name + '</span>';
                categories += '<div class="insights__tile-category-bar">';
                categories += '<div style="width:'+ category_percent +'"></div>';
                categories += '</div>';
                if ( category_percent !== '100%' ) {
                categories += '<button class="insights__tile-button" data-facet="category" data-value="' + category.id + '">View ' + category.name + '</button>';
                }
                categories += '</div>';
              }
            });
            $('[data-sync-top-categories]').html(categories);
            break;
          case 'Assigned vs Elective':
            var $chart = $('#tile-assigned-elective-chart')[0];
            assigned = Math.round(value['Assigned'] / results * 100);
            elective = 100 - assigned;
            $('[data-sync-assigned-percent]').text(assigned + '%');
            $('[data-sync-elective-percent]').text(elective + '%');
            var chart = new Chart($chart, {
              type: 'pie',
              data: {
                datasets: [{
                  data: [assigned,elective],
                  backgroundColor: ['#FE9D3F','rgba(0,0,0,.15)'],
                  borderWidth: 2,
                }],
                labels: ['Assigned','Elective']
              },
              options: {
                tooltips: {
                  enabled: false
                },
                legend: {
                  display: false
                },
                responsive: true
              }
            });
            break;
          case 'Shortest Completion':
            $('[data-sync-shortest-completion]').text(value);
            break;
          case 'Median Completion':
            $('[data-sync-median-completion]').text(value);
            break;
          case 'Longest Completion':
            $('[data-sync-longest-completion]').text(value);
            break;
        }
      });

      $charts.removeClass('is-active');
      $tiles.addClass('is-active');

    } else {

      var selected_chart_data = {
        datasets: [],
        labels: selected_chart.labels,
      }

      $.each(selected_chart.datasets, function( index, data ){
        var set = {
            label: data.label,
            data: data.data,
            pointBackgroundColor: '#FE9D3F',
            borderColor: '#FE9D3F',
            backgroundColor: '#FE9D3F',
            fill: false
        }
        if ( index === 0 ) {
            set = $.extend(set, {
              pointBackgroundColor: '#09C',
              borderColor: '#09C',
              backgroundColor: '#09C',
            });
        }
        selected_chart_data.datasets.push(set);
      });

      $charts.html('<canvas id="insights__chart"></canvas>');
      var ctx = $('#insights__chart')[0].getContext('2d');
      var chart = new Chart(ctx, {
          type: selected_chart.type,
          data: selected_chart_data,
          options: {
            responsive: true,
            aspectRatio: 3.6,
            legend: {
              display: (selected_chart_data.datasets.length > 1)
            },
            scales: {
              yAxes: [{
                ticks: {
                    suggestedMin: 0
                }
              }],
              xAxes: [{
                ticks: {
                    display: (selected_chart.labels.length<=25)
                }
              }],
            }
          }
      });

      $tiles.removeClass('is-active');
      $charts.addClass('is-active');

    }
  };

  Insights.makeFacet = function ( facet ) {
    var state = Insights.state;
    var settings = Insights.settings;
    var facet_limit = settings.facet_limit;
    var facet_template = '<div class="insights__facet{modifiers}"><div class="insights__facet-header"><div class="insights__facet-name">{facet_name}</div><button type="button" class="insights__facet-view"><i class="fa fa-chevron-down"></i></button></div><div class="insights__facet-body"><ul class="insights__facet-list">{options}</ul>{more}</div></div>';
    var option_template = '<li class="{option_class}"><button type="button" data-facet="{facet_id}" data-value="{option_id}"><i class="fa fa-square-o"></i> {option_name} ({option_count})</button></li>';
    var option_remove_template = '<li><button type="button" data-facet="{facet_id}" data-value=""><i class="fa fa-check-square"></i> {option_name} ({option_count})</button></li>';
    var options_html = '';
    var option_class = '';
    var more_html = '';
    var more_label = 'Plus '+(facet['options'].length - facet_limit)+' more';
    var modifiers = '';

    $(facet['options']).each(function( index, option ) {
      var option_html = (state.query[facet['id']] !== option['id'])?option_template:option_remove_template;
      option_class = ( index >= settings.facet_limit)?'is-more':option_class;
      option_html = option_html.replace('{option_id}', option['id']);
      option_html = option_html.replace('{option_class}', option_class);
      option_html = option_html.replace('{option_name}', option['name']);
      option_html = option_html.replace('{option_count}', option['count'].toLocaleString('US').split('.')[0]);
      options_html += option_html;
    });

    if ( facet['options'].length > facet_limit ) {
      more_html = '<button type="button" class="insights__facet-length" data-labels="'+more_label+'|Show less">'+more_label+' <i class="fa fa-caret-down"></i></button>';
      modifiers += ' is-limited';
    }

    var facet_html = facet_template;
    facet_html = facet_html.replace('{modifiers}', modifiers);
    facet_html = facet_html.replace('{options}', options_html);
    facet_html = facet_html.replace('{more}', more_html);
    facet_html = facet_html.replace(/{facet_id}/g, facet['id']);
    facet_html = facet_html.replace(/{facet_name}/g, facet['name']);

    return facet_html;
  }

  Insights.makeTableRow = function ( row ) {
    var profilePageUrl = Insights.settings.profilePageUrl;
    var row_template = '<tr><td>';
    row_template += '<div class="insights__employee">';
    row_template += '<div class="insights__employee-image">';
    row_template += '{image}';
    row_template += '</div>';
    row_template += '<div class="insights__employee-info">';
    row_template += '<a class="insights__employee-name" href="'+ profilePageUrl +'">{display_name}</a>';
    row_template += '<div class="insights__employee-title">{title}</div>';
    row_template += '<div class="insights__employee-department">{department}</div>';
    row_template += '</div>';
    row_template += '</div>';
    row_template += '</td>';
    row_template += '<td>';
    row_template += '<div>{learning_item}</div>';
    row_template += '<div>{learning_requirement} {learning_type}</div>';
    row_template += '</td>';
    row_template += '<td data-col="Started">{started_at}</td>';
    row_template += '<td data-col="Completed">{completed_at}</td>';
    row_template += '</tr>';

    var started_at = moment(row['StartDateTime'], 'YYYY-MM-DD HH:mm').format('MMM D, YYYY [<div>] h:mm a[</div>]');
    var completed_at = moment(row['CompletionDate'], 'YYYY-MM-DD HH:mm').format('MMM D, YYYY [<div>] h:mm a[</div>]');
    var initials = '<span>'+row['FirstName'].substring(0,1) + row['LastName'].substring(0,1)+'</span>';
    var image = (row['ProfileImage'] !== '')?'<img src="'+row['ProfileImage']+'" alt="Image: {display_name}" />':initials;

    var row_html = row_template;
    row_html = row_html.replace('{image}', image);
    row_html = row_html.replace('{profile}', row['ProfileUrl']);
    row_html = row_html.replace(/{display_name}/g, row['DisplayName']);
    row_html = row_html.replace('{title}', row['JobTitle']);
    row_html = row_html.replace('{department}', row['DepartmentName']);
    row_html = row_html.replace('{learning_item}', row['CourseName']);
    row_html = row_html.replace('{learning_type}', row['CourseTypeName']);
    row_html = row_html.replace('{learning_requirement}', row['Assigned_Elective']);
    row_html = row_html.replace('{started_at}', started_at);
    row_html = row_html.replace('{completed_at}', completed_at);
    return row_html;
  }

  window.Insights = Insights;

}(window, jQuery));