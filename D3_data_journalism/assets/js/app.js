//Define the SVG Height & Width
var svgHeight = 500;
var svgWidth = 1000;

//Define the Margin Dimensions
var margin = {
    top: 50,
    left: 150,
    bottom: 100,
    right: 50
};

//Define the Chart Dimensions
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

//Create the SVG Element
var svg = d3.select('#scatter')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

//Create the Chart Group
var chartGroup = svg.append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read in the Data from the CSV File
d3.csv('./assets/data/data.csv').then(function(wellness) {

    //Check to Make Sure the Data got Loaded
    console.log(wellness);

    //Convert the Data into the Appropriate Data Types
    wellness.forEach(function(data) {
        data.id = +data.id;
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
        console.log(`The ids are: ${data.id}`);
        console.log(`The ages are: ${data.age}`);
        console.log(`The incomes are: ${data.income}`);
        console.log(`The healthcare absence percentages are: ${data.healthcare}`);
    });

    //Create Scaling Functions for Each KPI
    var idScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.id))
        .range([0, chartWidth]);
    console.log(`The id scale is: ${idScale}`);
    var povertyScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.poverty))
        .range([0, chartWidth]);
    console.log(`The poverty scale is: ${povertyScale}`);
    var incomeScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.income))
        .range([0, chartWidth]);
    console.log(`The income scale is: ${incomeScale}`);
    var ageScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.age))
        .range([0, chartWidth]);
    console.log(`The age scale is: ${ageScale}`);
    var healthcareScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.healthcare))
        .range([chartHeight, 0]);
    console.log(`The healthcare scale is: ${healthcareScale}`);
    var smokeScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.smokes))
        .range([chartHeight, 0]);
    console.log(`The smokes scale is: ${smokeScale}`);
    var obeseScale = d3.scaleLinear()
        .domain(d3.extent(wellness, data => data.obesity))
        .range([chartHeight, 0]);
    console.log(`The obesity scale is: ${obeseScale}`);
    //Assign the Data Scales to the Axes
    var xAxis_1 = d3.axisBottom(incomeScale);
    var yAxis_1 = d3.axisLeft(healthcareScale);
    
    console.log(xAxis_1);
    console.log(yAxis_1);

    //Append Groups and Call Axes
    chartGroup.append('g')
        .classed('axis', true)
        .attr('id', 'yAxis')
        .call(yAxis_1);
    chartGroup.append('g')
        .classed('axis', true)
        .attr('transform', `translate(0, ${chartHeight})`)
        .attr('id', 'xAxis')
        .call(xAxis_1);

    //Set the Axes Colors
    chartGroup.selectAll('.tick')
        .select('text')
        .attr('fill', d3.color('white'));
    chartGroup.select('.tick')
        .select('text')
        .attr('fill', d3.color('white'));

    //Append the Dots to the Chart Group
    //Found Methods at https://www.d3-graph-gallery.com/graph/scatter_basic.html
    //and https://www.dashingd3js.com/svg-text-element
    var dots = chartGroup.append('g')
        .attr('id', 'dots');
    var dots1 =dots.append('g')
        .selectAll('dot')
        .data(wellness)
        .enter()
        .append('circle')
        .attr('cx', d => incomeScale(d.income))
        .attr('cy', d => healthcareScale(d.healthcare))
        .attr('r', 10)
        .style('fill', 'green');
        
    //Append State Abbreviations Text to the Graph
    var abbr = chartGroup.append('g')
        .attr('id', 'abbr');
    abbr.append('g')
        .selectAll('text')
        .data(wellness)
        .enter()
        .append('text')
        .text(d => d.abbr)
        .attr('x', d => incomeScale(d.income)-5)
        .attr('y', d => healthcareScale(d.healthcare))
        .attr('fill', 'white')
        .attr('font-size', "7px");

    //Append Axis Titles
    //Method to Handle Multiple Transformations Found at https://riptutorial.com/svg/example/11163/multiple-transformations
    var healthcareAxis = chartGroup.append('text')
        .attr('transform', `translate(-50, ${chartHeight/2 + margin.top}) rotate(-90)`)
        .classed('healthcare text', true)
        .text('Lacks Healthcare (%)');
    var incomeAxis = chartGroup.append('text')
        .attr('transform', `translate(${chartWidth/2}, ${chartHeight + margin.top})`)
        .classed('income text', true)
        .text('Household Income (Median)');
    var smokeAxis = chartGroup.append('text')
        .attr('transform', `translate(-70, ${chartHeight/2 + margin.top}) rotate(-90)`)
        .classed('smoking text', true)
        .text('Smokes (%)');
    var ageAxis =chartGroup.append('text')
        .attr('transform', `translate(${chartWidth/2}, ${chartHeight + margin.top + 20})`)
        .classed('age text', true)
        .text('Age (Median)');
    var obesityAxis = chartGroup.append('text')
        .attr('transform', `translate(-90, ${chartHeight/2 + margin.top}) rotate(-90)`)
        .classed('obesity text', true)
        .text('Obesity (%)');
    var povertyAxis = chartGroup.append('text')
        .attr('transform', `translate(${chartWidth/2}, ${chartHeight + margin.top + 40})`)
        .classed('poverty text', true)
        .text('In Poverty (%)');

    //Set the Initial Axes Colors
    //Change the Text Color of the Other Axes
    incomeAxis.transition()
        .style('fill', d3.color('white'));
    povertyAxis.transition()
        .style('fill', d3.color('red'));
    ageAxis.transition()
        .style('fill', d3.color('red'));
    healthcareAxis.transition()
        .style('fill', d3.color('white'));
    smokeAxis.transition()
        .style('fill', d3.color('red'));
    obesityAxis.transition()
        .style('fill', d3.color('red'));

    //Bonus
    //Adjusting Axes & Dot Positions
    //Perform Updates to the x & y-coordinates of the Circles Based on the Axes Selected
    incomeAxis.on("click", function() {
        //Append Group and Call Axis
        chartGroup.select('#xAxis').transition()
            .call(xAxis_1);
        //Append the Dots to the Chart Group
        dots.select('g')
            .selectAll('circle')
            .transition()
            .attr('cx', d => incomeScale(d.income));

        //Append State Abbreviations Text to the Graph
        abbr.select('g')
            .selectAll('text')
            .transition()
            .attr('x', d => incomeScale(d.income)-5);
        
        //Change the Text Color of the Other Axes
        incomeAxis.transition()
            .style('fill', d3.color('white'));
        povertyAxis.transition()
            .style('fill', d3.color('red'));
        ageAxis.transition()
            .style('fill', d3.color('red'));
    });
    povertyAxis.on("click", function() {
        var xAxis_2 = d3.axisBottom(povertyScale);
        //Append Group and Call Axis
        chartGroup.select('#xAxis').transition()
            .call(xAxis_2);
        //Append the Dots to the Chart Group
        dots.select('g')
            .selectAll('circle')
            .transition()
            .attr('cx', d => povertyScale(d.poverty));

        //Append State Abbreviations Text to the Graph
        abbr.select('g')
            .selectAll('text')
            .transition()
            .attr('x', d => povertyScale(d.poverty)-5);

        //Change the Text Color of the Other Axes
        incomeAxis.transition()
            .style('fill', d3.color('red'));
        povertyAxis.transition()
            .style('fill', d3.color('white'));
        ageAxis.transition()
            .style('fill', d3.color('red'));
    });
    ageAxis.on("click", function() {
        var xAxis_3 = d3.axisBottom(ageScale);
        //Append Group and Call Axis
        chartGroup.select('#xAxis').transition()
            .call(xAxis_3);
        //Append the Dots to the Chart Group
        dots.select('g')
            .selectAll('circle')
            .transition()
            .attr('cx', d => ageScale(d.age));

        //Append State Abbreviations Text to the Graph
        abbr.select('g')
            .selectAll('text')
            .transition()
            .attr('x', d => ageScale(d.age)-5);

        //Change the Text Color of the Axes
        incomeAxis.transition()
            .style('fill', d3.color('red'));
        povertyAxis.transition()
            .style('fill', d3.color('red'));
        ageAxis.transition()
            .style('fill', d3.color('white'));
    });
    healthcareAxis.on("click", function() {
        //Append Group and Call Axis
        chartGroup.select('#yAxis').transition()
            .call(yAxis_1);
        //Append the Dots to the Chart Group
        dots.select('g')
            .selectAll('circle')
            .transition()
            .attr('cy', d => healthcareScale(d.healthcare));

        //Append State Abbreviations Text to the Graph
        abbr.select('g')
            .selectAll('text')
            .transition()
            .attr('y', d => healthcareScale(d.healthcare));

        //Change the Text Color of the Other Axes
        healthcareAxis.transition()
            .style('fill', d3.color('white'));
        smokeAxis.transition()
            .style('fill', d3.color('red'));
        obesityAxis.transition()
            .style('fill', d3.color('red'));
    });
    smokeAxis.on("click", function() {
        var yAxis_2 = d3.axisLeft(smokeScale);
        //Append Group and Call Axis
        chartGroup.select('#yAxis').transition()
            .call(yAxis_2);
        //Append the Dots to the Chart Group
        dots.select('g')
            .selectAll('circle')
            .transition()
            .attr('cy', d => smokeScale(d.smokes));

        //Append State Abbreviations Text to the Graph
        abbr.select('g')
            .selectAll('text')
            .transition()
            .attr('y', d => smokeScale(d.smokes));

        //Change the Text Color of the Other Axes
        healthcareAxis.transition()
            .style('fill', d3.color('red'));
        smokeAxis.transition()
            .style('fill', d3.color('white'));
        obesityAxis.transition()
            .style('fill', d3.color('red'));
    });
    obesityAxis.on("click", function() {
        var yAxis_3 = d3.axisLeft(obeseScale);
        //Append Group and Call Axis
        chartGroup.select('#yAxis').transition()
            .call(yAxis_3);
        //Append the Dots to the Chart Group
        dots.select('g')
            .selectAll('circle')
            .transition()
            .attr('cy', d => obeseScale(d.obesity));

        //Append State Abbreviations Text to the Graph
        abbr.select('g')
            .selectAll('text')
            .transition()
            .attr('y', d => obeseScale(d.obesity));

        //Change the Text Color of the Other Axes
        healthcareAxis.transition()
            .style('fill', d3.color('red'));
        smokeAxis.transition()
            .style('fill', d3.color('red'));
        obesityAxis.transition()
            .style('fill', d3.color('white'));
    });


    //ToolTips
    //Add ToolTips Element to Body
    var toolTip = d3.select("body").append("div")
        .attr("class", "tooltip");

    //Add ToolTips to Circles
    dots.select('g').selectAll('circle').on("mouseover", function(d, i) {
        toolTip.style("display", "block").style("background-color", d3.color("purple"));
        toolTip.html(`<strong>${wellness[i].state}</strong><br><hr><br>Poverty: ${wellness[i].poverty}<br>Obesity: ${wellness[i].obesity}`)
            .style('fill', d3.color('white'))
            .style('left', "50px")
            .style('top', "50px")
    })
    // Make the ToolTips
    .on("mouseout", function() {
        toolTip.style("display", "none");
      });
}).catch(function(error) {
    console.log(error);
  });