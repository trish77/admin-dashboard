// CHART SPLINE
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var data = [{
      "label": "Uniques",
      "color": "#768294",
      "data": [
        ["Mar", 70],
        ["Apr", 85],
        ["May", 59],
        ["Jun", 93],
        ["Jul", 66],
        ["Aug", 86],
        ["Sep", 60]
      ]
    }, {
      "label": "Recurrent",
      "color": "#1f92fe",
      "data": [
        ["Mar", 21],
        ["Apr", 12],
        ["May", 27],
        ["Jun", 24],
        ["Jul", 16],
        ["Aug", 39],
        ["Sep", 15]
      ]
    }];

    var datav2 = [{
      "label": "Hours",
      "color": "#23b7e5",
      "data": [
        ["Jan", 70],
        ["Feb", 20],
        ["Mar", 70],
        ["Apr", 85],
        ["May", 59],
        ["Jun", 93],
        ["Jul", 66],
        ["Aug", 86],
        ["Sep", 60],
        ["Oct", 60],
        ["Nov", 12],
        ["Dec", 50]
      ]
    }, {
      "label": "Commits",
      "color": "#7266ba",
      "data": [
        ["Jan", 20],
        ["Feb", 70],
        ["Mar", 30],
        ["Apr", 50],
        ["May", 85],
        ["Jun", 43],
        ["Jul", 96],
        ["Aug", 36],
        ["Sep", 80],
        ["Oct", 10],
        ["Nov", 72],
        ["Dec", 31]
      ]
    }];

    var datav3 = [{
      "label": "Home",
      "color": "#1ba3cd",
      "data": [
        ["1", 38],
        ["2", 40],
        ["3", 42],
        ["4", 48],
        ["5", 50],
        ["6", 70],
        ["7", 145],
        ["8", 70],
        ["9", 59],
        ["10", 48],
        ["11", 38],
        ["12", 29],
        ["13", 30],
        ["14", 22],
        ["15", 28]
      ]
    }, {
      "label": "Overall",
      "color": "#3a3f51",
      "data": [
        ["1", 16],
        ["2", 18],
        ["3", 17],
        ["4", 16],
        ["5", 30],
        ["6", 110],
        ["7", 19],
        ["8", 18],
        ["9", 110],
        ["10", 19],
        ["11", 16],
        ["12", 10],
        ["13", 20],
        ["14", 10],
        ["15", 20]
      ]
    }];

    var options = {
      series: {
          lines: {
              show: false
          },
          points: {
              show: true,
              radius: 4
          },
          splines: {
              show: true,
              tension: 0.4,
              lineWidth: 1,
              fill: 0.5
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#fcfcfc',
          mode: 'categories'
      },
      yaxis: {
          min: 0,
          max: 150, // optional: use it for a clear represetation
          tickColor: '#eee',
          //position: 'right' or 'left',
          tickFormatter: function (v) {
              return v/* + ' visitors'*/;
          }
      },
      shadowSize: 0
    };

    var chart = $('.chart-spline');
    if(chart.length)
      $.plot(chart, data, options);
    
    var chartv2 = $('.chart-splinev2');
    if(chartv2.length)
      $.plot(chartv2, datav2, options);
    
    var chartv3 = $('.chart-splinev3');
    if(chartv3.length)
      $.plot(chartv3, datav3, options);

  });

})(window, document, window.jQuery);

// CHART AREA
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var data = [{
      "label": "Uniques",
      "color": "#aad874",
      "data": [
        ["Mar", 50],
        ["Apr", 84],
        ["May", 52],
        ["Jun", 88],
        ["Jul", 69],
        ["Aug", 92],
        ["Sep", 58]
      ]
    }, {
      "label": "Recurrent",
      "color": "#7dc7df",
      "data": [
        ["Mar", 13],
        ["Apr", 44],
        ["May", 44],
        ["Jun", 27],
        ["Jul", 38],
        ["Aug", 11],
        ["Sep", 39]
      ]
    }];

    var options = {
                    series: {
                        lines: {
                            show: true,
                            fill: 0.8
                        },
                        points: {
                            show: true,
                            radius: 4
                        }
                    },
                    grid: {
                        borderColor: '#eee',
                        borderWidth: 1,
                        hoverable: true,
                        backgroundColor: '#fcfcfc'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: function (label, x, y) { return x + ' : ' + y; }
                    },
                    xaxis: {
                        tickColor: '#fcfcfc',
                        mode: 'categories'
                    },
                    yaxis: {
                        min: 0,
                        tickColor: '#eee',
                        // position: 'right' or 'left'
                        tickFormatter: function (v) {
                            return v + ' visitors';
                        }
                    },
                    shadowSize: 0
                };

    var chart = $('.chart-area');
    if(chart.length)
      $.plot(chart, data, options);

  });

})(window, document, window.jQuery);

// CHART BAR
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var data = [{
      "label": "Sales",
      "color": "#9cd159",
      "data": [
        ["Jan", 27],
        ["Feb", 82],
        ["Mar", 56],
        ["Apr", 14],
        ["May", 28],
        ["Jun", 77],
        ["Jul", 23],
        ["Aug", 49],
        ["Sep", 81],
        ["Oct", 20]
      ]
    }];

    var options = {
                    series: {
                        bars: {
                            align: 'center',
                            lineWidth: 0,
                            show: true,
                            barWidth: 0.6,
                            fill: 0.9
                        }
                    },
                    grid: {
                        borderColor: '#eee',
                        borderWidth: 1,
                        hoverable: true,
                        backgroundColor: '#fcfcfc'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: function (label, x, y) { return x + ' : ' + y; }
                    },
                    xaxis: {
                        tickColor: '#fcfcfc',
                        mode: 'categories'
                    },
                    yaxis: {
                        // position: 'right' or 'left'
                        tickColor: '#eee'
                    },
                    shadowSize: 0
                };

    var chart = $('.chart-bar');
    if(chart.length)
      $.plot(chart, data, options);

  });

})(window, document, window.jQuery);


// CHART BAR STACKED
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var d1 = [];
        // for (var i = 0; i <= 10; i += 1)
            d1.push(["Main Campus",122]);
            d1.push(["South Campus",115]);
            d1.push(["North Campus",197]);

            var d2 = [];
                // for (var i = 0; i <= 10; i += 1)
                    d2.push(["Main Campus",22]);
                    d2.push(["South Campus",24]);
                    d2.push(["North Campus",14]);

                    var d3 = [];
                        // for (var i = 0; i <= 10; i += 1)
                            d3.push(["Main Campus",10]);
                            d3.push(["South Campus",58]);
                            d3.push(["North Campus",14]);


        // var d2 = [];
        // for (var i = 0; i <= 10; i += 1)
        //     d2.push([parseInt(Math.random() * 30),i]);

        // var d3 = [];
        // for (var i = 0; i <= 10; i += 1)
        //     d3.push([parseInt(Math.random() * 30),i]);


        // ('.chart-bar-stacked');
            $.plot($(".chart-bar-stacked"), [ d1, d2, d3 ], {
                series: {
                    stack: true,
                    lines: { show:false },
                    bars: { show: true, barWidth: 0.6, horizontal:true }
                }
            });


   //  var data = [  {
   //    "label": "Good standing",
   //    "color": "#37bc9b",
   //    "data": [
   //      ["Main Campus", 122],
   //      ["South Campus", 115],
   //      ["North Campus", 197]
   //    ]
   //  }, {
   //    "label": "Expiring soon",
   //    "color": "#f0ad4e",
   //    "data": [
   //      ["Main Campus", 22],
   //      ["South Campus", 45],
   //      ["North Campus", 14]
   //    ]
   //  }, {
   //    "label": "Expired",
   //    "color": "#f05050",
   //    "data": [
   //      ["Main Campus", 10],
   //      ["South Campus", 58],
   //      ["North Campus", 14]
   //    ]
   //  }];

   // var data2 = [  {
   //   "label": "Good standing",
   //   "color": "#37bc9b",
   //   "data": [
   //     ["Main Campus", 122],
   //     ["South Campus", 115],
   //     ["North Campus", 197]
   //   ]
   // }, {
   //   "label": "Expiring soon",
   //   "color": "#f0ad4e",
   //   "data": [
   //     ["Main Campus", 22],
   //     ["South Campus", 45],
   //     ["North Campus", 14]
   //   ]
   // }, {
   //   "label": "Expired",
   //   "color": "#f05050",
   //   "data": [
   //     ["Main Campus", 10],
   //     ["South Campus", 58],
   //     ["North Campus", 14]
   //   ]
   // }];

   //  var options = {
   //                  series: {
   //                      stack: true,
   //                      bars: {
   //                          align: 'center',
   //                          lineWidth: 0,
   //                          show: true,
   //                          barWidth: 0.6,
   //                          fill: 0.9,
   //                          horizontal: true
   //                      },
                       
   //                  },
                  
   //                  grid: {
   //                      borderColor: '#eee',
   //                      borderWidth: 1,
   //                      hoverable: true,
   //                      backgroundColor: '#fcfcfc'
   //                  },
   //                  tooltip: true,
   //                  tooltipOpts: {
   //                      content: function (label, x, y) { return x + ' : ' + y; }
   //                  },
   //                  xaxis: {
   //                      tickColor: '#fcfcfc',
   //                      mode: 'categories'
   //                  },
   //                  yaxis: {
   //                      // position: 'right' or 'left'
   //                      tickColor: '#eee'
   //                  },
   //                  shadowSize: 0
   //              };

   //  var chart = $('.chart-bar-stacked');
   //  if(chart.length)
   //    $.plot(chart, data2, options);

   

  });

})(window, document, window.jQuery);



// CHART DONUT
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var data = [ { "color" : "#39C558",
        "data" : 60,
        "label" : "Coffee"
      },
      { "color" : "#00b4ff",
        "data" : 90,
        "label" : "CSS"
      },
      { "color" : "#FFBE41",
        "data" : 50,
        "label" : "LESS"
      },
      { "color" : "#ff3e43",
        "data" : 80,
        "label" : "Jade"
      },
      { "color" : "#937fc7",
        "data" : 116,
        "label" : "AngularJS"
      }
    ];

    var options = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0.5 // This makes the donut shape
                        }
                    }
                };

    var chart = $('.chart-donut');
    if(chart.length)
      $.plot(chart, data, options);

  });

})(window, document, window.jQuery);

// CHART LINE
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var data = [{
        "label": "Complete",
        "color": "#5ab1ef",
        "data": [
            ["Jan", 188],
            ["Feb", 183],
            ["Mar", 185],
            ["Apr", 199],
            ["May", 190],
            ["Jun", 194],
            ["Jul", 194],
            ["Aug", 184],
            ["Sep", 74]
        ]
    }, {
        "label": "In Progress",
        "color": "#f5994e",
        "data": [
            ["Jan", 153],
            ["Feb", 116],
            ["Mar", 136],
            ["Apr", 119],
            ["May", 148],
            ["Jun", 133],
            ["Jul", 118],
            ["Aug", 161],
            ["Sep", 59]
        ]
    }, {
        "label": "Cancelled",
        "color": "#d87a80",
        "data": [
            ["Jan", 111],
            ["Feb", 97],
            ["Mar", 93],
            ["Apr", 110],
            ["May", 102],
            ["Jun", 93],
            ["Jul", 92],
            ["Aug", 92],
            ["Sep", 44]
        ]
    }];

    var options = {
                    series: {
                        lines: {
                            show: true,
                            fill: 0.01
                        },
                        points: {
                            show: true,
                            radius: 4
                        }
                    },
                    grid: {
                        borderColor: '#eee',
                        borderWidth: 1,
                        hoverable: true,
                        backgroundColor: '#fcfcfc'
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: function (label, x, y) { return x + ' : ' + y; }
                    },
                    xaxis: {
                        tickColor: '#eee',
                        mode: 'categories'
                    },
                    yaxis: {
                        // position: 'right' or 'left'
                        tickColor: '#eee'
                    },
                    shadowSize: 0
                };

    var chart = $('.chart-line');
    if(chart.length)
      $.plot(chart, data, options);

  });

})(window, document, window.jQuery);


// CHART PIE
// ----------------------------------- 
(function(window, document, $, undefined){

  $(function(){

    var data = [{
      "label": "jQuery",
      "color": "#4acab4",
      "data": 30
    }, {
      "label": "CSS",
      "color": "#ffea88",
      "data": 40
    }, {
      "label": "LESS",
      "color": "#ff8153",
      "data": 90
    }, {
      "label": "SASS",
      "color": "#878bb6",
      "data": 75
    }, {
      "label": "Jade",
      "color": "#b2d767",
      "data": 120
    }];

    var options = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0,
                            label: {
                                show: true,
                                radius: 0.8,
                                formatter: function (label, series) {
                                    return '<div class="flot-pie-label">' +
                                    //label + ' : ' +
                                    Math.round(series.percent) +
                                    '%</div>';
                                },
                                background: {
                                    opacity: 0.8,
                                    color: '#222'
                                }
                            }
                        }
                    }
                };

    var chart = $('.chart-pie');
    if(chart.length)
      $.plot(chart, data, options);

  });

})(window, document, window.jQuery);
