document.addEventListener('DOMContentLoaded', function() {
  const req = new XMLHttpRequest();
  req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
  req.send();
  req.onload = function() {
    const json = JSON.parse(req.responseText);
    const xValues = json.data.map((d) => new Date(d[0]));
    const yValues = json.data.map((d) => d[1]);
    createBrowserTitle("d3 charts for freeCodeCamp projects");
    createChartTitle("USA's GDP by quarter (US$ billions)")
    createBarChart(xValues, yValues);
  };
});

const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .attr('id', 'title')
    .text(title);
};

const createChartTitle = (title) => {
  d3.select('body')
    .append('h1')
    .text(title)
    .style('text-align', 'center');
};

const createBarChart = (xValues, yValues) => {
  const chartWidth = 800;
  const chartHeight = 500;

  const svgPadding = 60;
  const svgWidth = chartWidth + svgPadding;
  const svgHeight = chartHeight + (svgPadding * 2);
  
  const xPadding = 1;

  // dynamic width for regularly spaced x values
  let xWidth = chartWidth / xValues.length - xPadding;

  if (xWidth <= 0) {
    xWidth = 1;
  }

  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

  const xScale = d3.scaleTime()
                   .domain([d3.min(xValues), d3.max(xValues)])
                   .range([svgPadding, chartWidth]);

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(yValues)])
                   .range([chartHeight, 0]);

  svg.selectAll('rect')
     .data(xValues)
     .enter()
     .append('rect')
     .attr('class', 'bar')
     .attr('width', xWidth)
     .attr('x', (x) => xScale(x))
     .attr('data-date', (x) => x);

  svg.selectAll('rect')
     .data(yValues)
     .attr('height', (yVal) => chartHeight - yScale(yVal))
     .attr('y', (yVal) => yScale(yVal) + svgPadding)
     .attr('data-gdp', (y) => y);

  const xAxis = d3.axisBottom(xScale);
  svg.append('g')
     .attr('id', 'x-axis')
     .attr('transform', 'translate(0, ' + (chartHeight + svgPadding) + ')')
     .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
     .attr('id', 'y-axis')
     .attr('transform', 'translate(' + svgPadding + ', ' + svgPadding + ')')
     .call(yAxis);

  const xyValues = structureXYDataForTooltip(xValues, yValues);
  svg.selectAll('rect')
     .data(xyValues)
     .append('title')
     .text((d) =>d);
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Creates an array of (date, number) elements to display as a tooltip.
 *
 * @param {array} xValues An array of `Date` elements
 * @param {array} yValues An array of floats with one decimal point
 *
 * @return {array} An array of (date, number) elements, displayed as (mmm-yyyy, xxx.x). e.g. (Jan 1930, 242.5)
*/
const structureXYDataForTooltip = (xValues, yValues) => {
  const xValuesFormatted = xValues.map((x) => MONTHS[x.getMonth()] + ' ' + x.getFullYear());
  const xyValues = xValuesFormatted.map((x,i) => x + '\n$' + formatMoney(yValues[i]) + ' billion');
  return xyValues;
};

/**
 * Takes a float and returns an integer with commas, e.g. 1234.5 returns 1,235
*/
const formatMoney = (number) => {
  return Math.round(number).toLocaleString();
}
