const createBrowserTitle = (title) => {
  d3.select('body')
    .append('title')
    .text(title);
};

createBrowserTitle('Scatter Plot');
