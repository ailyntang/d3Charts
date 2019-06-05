# d3Charts
*Visualisations of data using d3, based on the freeCodeCamp curriculum*

For these projects, I've focused on learning d3 rather than CSS, even though it kills me to have ugly charts! My goal is to understand enough d3 so that I can move on to build a full stack project.

Also, I have moved on even though some tests have failed. The failing tests are those which I deem as design decisions, rather than those testing an accurate implementation of the d3 library.

For example, in the bar chart project, I chose to convert the date string "1950-01-01" to a real date, using `new Date("1950-01-01")`. The test failed, as it was looking for a string rather than a `Date`. I chose to let this fail rather than refactor my code.
