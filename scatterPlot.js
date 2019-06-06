const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .attr('id', 'title')
    .text(title);
};

const createScatterPlot = (xValues, yValues, radius) => {
  const svgWidth = 800;
  const svgHeight = 500;

  const svg = d3.select('body')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);
};

createBrowserTitle('Scatter Plot');
