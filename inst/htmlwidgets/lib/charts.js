/**
 * Chart JSON
 *
 * creates the required JSON that feeds a Google DataTable
 *
 * @param cols
 *     The column headings
 * @param rows
 *     Rows of data
 **/
function chartJson(cols, rows) {
    return ('{' + cols + ',' + rows + '}');
}


function isChartsLoaded() {
    if (typeof google.visualization === undefined) {
        return false;
    } else {
        return true;
    }
}

/**
 * Chart Type
 *
 * Returns a chart object
 *
 * @param type
 *     String specifying the type of chart (e.g. 'line', 'pie', ...)
 * @param node
 *     document.element 'div' node
 *
 **/
function chartType(type, node) {
    if (type === 'area') {
        return (new google.visualization.AreaChart(node));
    } else if (type === 'bar') {
        return (new google.visualization.BarChart(node));
    } else if (type === 'combo') {
        return (new google.visualization.ComboChart(node));
    } else if (type === 'line') {
        return (new google.visualization.LineChart(node));
    } else if (type === 'pie') {
        return (new google.visualization.PieChart(node));
    } else if (type == 'bubble') {
        return (new google.visualization.BubbleChart(node));
    }
}

/**
 * Chart Options
 *
 * set the options for a chart
 *
 * @param mapObject
 *     map object containing the option data
 **/
function chartOptions(mapObject) {
    var options = {'title': 'Marker location: ' + mapObject.getPosition().toString(),
//                 'chartArea' : {'left': '5%', 'width' : '80%'},
//                 'legend' : 'bottom',
                 'width': 400,
                 'height': 150};

   return (options);
}


/**
 * drawChart
 *
 * @param mapObject
 *     map object that contains the data for the chart
 *
 * @return node
 *     div node containing the chart
 **/
function chartObject(mapObject) {

    //var js = chartJson(mapObject.chart_cols, mapObject.info_window),
    var js = JSON.parse(mapObject.info_window),
        data = new google.visualization.arrayToDataTable(js),
        //data = new google.visualization.DataTable(js),
        //options = chartOptions(mapObject),
        node = document.createElement('div');
    
    console.log(js);

    // get a chart object
    var chart = chartType(mapObject.chart_type, node);

    var options = JSON.parse(mapObject.chart_options);
    //console.log(options);
    
    chart.draw(data, options);
    return (node);

}
