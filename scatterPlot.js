const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .attr('id', 'title')
    .text(title);
};

const createScatterPlot = (xValues, yValues, radius) => {
  const svgWidth = 800;
  const svgHeight = 500;

  const chartPadding = 60;
  const chartWidth = svgWidth - (chartPadding * 2);
  const chartHeight = svgHeight - (chartPadding * 2);

  const data = combineXYValues(xValues, yValues);

  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

  const tooltip = d3.select('body')
                    .data(data)
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('data-year', (d) => d[0]);

  svg.selectAll('circle')
     .data(data)
     .enter()
     .append('circle')
     .attr('class', 'dot')
     .attr('data-xvalue', (d) => d[0])
     .attr('data-yvalue', (d) => d[1])
     .attr('cx', (d) => d[0])
     .attr('cy', (d) => d[1])
     .attr('r', radius);
};

const combineXYValues = (xValues, yValues) => {
  if (xValues.length != yValues.length) {
    throw new Error('There are different numbers of x and y values.');
  }

  return xValues.map((x,i) => [x, yValues[i]]);
};

document.addEventListener('DOMContentLoaded', function() {
  const req = new XMLHttpRequest();
  req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
  req.send();
  req.onload = () => {
    const json = JSON.parse(req.responseText);
  };
});
createBrowserTitle('Scatter Plot');

const xValues = [223,215,63,653];
const yValues = [73, 124, 753, 444];
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


createScatterPlot(xValues, yValues, 5);

