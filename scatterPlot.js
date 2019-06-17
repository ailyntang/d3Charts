document.addEventListener('DOMContentLoaded', function() {
  const req = new XMLHttpRequest();
  req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
  req.send();
  req.onload = () => {
    const json = JSON.parse(req.responseText);
    const xValues = extractXValueAsInt(json);
    const yValues = extractYValueAsInt(json);
    createScatterPlot(xValues, yValues, 5);
  };
});

const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .attr('id', 'title')
    .text(title);
};

createBrowserTitle("Doping in Alpe d'Huez Races");

const createScatterPlot = (xValues, yValues, radius) => {
  const svgWidth = 800;
  const svgHeight = 500;

  const chartPadding = 60;
  const chartWidth = svgWidth - (chartPadding * 2);
  const chartHeight = svgHeight - (chartPadding * 2);

  const axisPadding = 20;
  const xyValues = combineXYValues(xValues, yValues);

  // Create svg container
  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

  // Create scales
  const xRangeMin = chartPadding + axisPadding;
  const xRangeMax = chartWidth + axisPadding;
  const xScale = d3.scaleLinear()
                   .domain([d3.min(xValues), d3.max(xValues)])
                   .range([xRangeMin, xRangeMax]);

  const yRangeMin = chartHeight + axisPadding;
  const yRangeMax = axisPadding;
  const yScale = d3.scaleLinear()
                   .domain([d3.min(yValues), d3.max(yValues)])
                   .range([yRangeMin, yRangeMax]);

  const tooltip = d3.select('body')
                    .data(xyValues)
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('data-year', (d) => d[0]);

  // Create data points
  svg.selectAll('circle')
     .data(xyValues)
     .enter()
     .append('circle')
     .attr('class', 'dot')
     .attr('data-xvalue', (d) => d[0])
     .attr('data-yvalue', (d) => d[1])
     .attr('cx', (d) => xScale(d[0]))
     .attr('cy', (d) => chartHeight - yScale(d[1]))
     .attr('r', radius);

  // Create axes
  const xAxis = d3.axisBottom(xScale);
  svg.append('g')
     .attr('id', 'x-axis')
     .attr('transform', 'translate(0,' + yRangeMin + ')')
     .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
     .attr('id', 'y-axis')
     .attr('transform', 'translate(50,0)')
     .call(yAxis);
};

const combineXYValues = (xValues, yValues) => {
  if (xValues.length != yValues.length) {
    throw new Error('There are different numbers of x and y values.');
  }

  return xValues.map((x,i) => [x, yValues[i]]);
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



