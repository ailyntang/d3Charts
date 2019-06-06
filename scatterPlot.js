const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .attr('id', 'title')
    .text(title);
};

const createScatterPlot = (xValues, yValues, radius) => {
};

createBrowserTitle('Scatter Plot');
