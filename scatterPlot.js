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

  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);
};

const combineXYValues = (xValues, yValues) => {
  if (xValues.length != yValues.length) {
    throw new Error('There are different numbers of x and y values.');
  }

  return xValues.map((x,i) => [x, yValues[i]]);
};

createBrowserTitle('Scatter Plot');
