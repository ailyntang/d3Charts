document.addEventListener('DOMContentLoaded', function() {
  const req = new XMLHttpRequest();
  req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
  req.send();
  req.onload = () => {
    const json = JSON.parse(req.responseText);
    const xValues = extractXValueAsInt(json);
    const yValues = extractYValueAsDate(json);
    const tooltipData = createTooltipData(json);
    const dopingData = json.map((obj) => obj.Doping);
    createScatterPlot(xValues, yValues, 5, tooltipData, dopingData);
  };
});

const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .attr('id', 'title')
    .text(title);
};

createBrowserTitle("Doping in Alpe d'Huez Races");

const createScatterPlot = (xValues, yValues, radius, tooltipData, dopingData) => {
  const svgWidth = 800;
  const svgHeight = 500;

  const chartPadding = 60;
  const chartWidth = svgWidth - (chartPadding * 2);
  const chartHeight = svgHeight - (chartPadding * 2);

  const axisPadding = 20;
  const xyValues = combineXYValues(xValues, yValues, dopingData);


  // Create title
  d3.select('body')
    .append('div')
    .text("35 fastest rides up Alpe D'Huez: 29 rides have doping allegations")
    .style('text-align', 'center')
    .style('font-family', 'Verdana');

  // Create svg container
  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

  // Create scales
  const xRangeMin = chartPadding;
  const xRangeMax = chartWidth + axisPadding;
  const xScale = d3.scaleLinear()
                   .domain([d3.min(xValues)-1, d3.max(xValues)])
                   .range([xRangeMin, xRangeMax]);

  const yRangeMin = chartHeight + axisPadding;
  const yRangeMax = axisPadding;
  const yScale = d3.scaleTime()
                   .domain([d3.min(yValues), d3.max(yValues)])
                   .range([yRangeMin, yRangeMax]);

  // Create data points
  svg.selectAll('circle')
     .data(xyValues)
     .enter()
     .append('circle')
     .attr('class', 'dot')
     .attr('data-xvalue', (d) => d[0])
     .attr('data-yvalue', (d) => d[1])
     .attr('cx', (d) => xScale(d[0]))
     .attr('cy', (d) => yScale(d[1]))
     .attr('r', radius)
     .style('fill', (d) => {
      if (d[2] === "") return '#008000';
      return '#e0115f';
    });

  // Create axes
  const xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format('d'));

  svg.append('g')
     .attr('id', 'x-axis')
     .attr('transform', 'translate(0,' + yRangeMin + ')')
     .call(xAxis);

  const yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat('%M:%S'));

  svg.append('g')
     .attr('id', 'y-axis')
     .attr('transform', 'translate(50,0)')
     .call(yAxis);

  // Create tooltip
  svg.selectAll('circle')
     .data(tooltipData)
     .append('title')
     .attr('id', 'tooltip')
     .text((d) => d);

  // Create legend
  d3.select('body')
    .append('div')
    .attr('id', 'legend')
    .text('No doping allegations')
    .style('color', '008000');

};

const combineXYValues = (xValues, yValues, dopingData) => {
  if (xValues.length != yValues.length) {
    throw new Error('There are different numbers of x and y values.');
  }

  return xValues.map((x,i) => [x, yValues[i], dopingData[i]]);
};

const extractXValueAsInt = (data) => {
  const xValues = data.map((obj) => obj.Year);
  return xValues;
};

const extractYValueAsDate = (data) => {
  const secondsAsInt = data.map((obj) => obj.Seconds);
  const secondsAsDate = secondsAsInt.map((int) => {
    const date = new Date(1970, 0, 1);
    date.setSeconds(int);
    return date;
  });

  return secondsAsDate;
};

const extractYValueAsInt = (data) => {
  const yValues = data.map((obj) => obj.Seconds);
  return yValues;
};

/**
 * This takes information from a particularly structured json (url below) and converts the json into a tooltip.
 * This function is not reusable for other jsons.
 * @param {json} json A `json` from https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json
 * return {array} An array of strings to display as a tooltip
*/
const createTooltipData = (json) => {
  const output = json.map((obj) => {
    const line1 = obj.Name + ' (' + obj.Nationality + ')';
    const line2 = 'Year: ' + obj.Year + ', Time: ' + obj.Time;
    const line3 = obj.Doping;
    return line1 + '\n' + line2 + '\n' + line3;
  });

  return output;
};
