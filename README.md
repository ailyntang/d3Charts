# d3Charts
*Visualisations of data using d3, based on the freeCodeCamp curriculum*

See these projects live at [https://ailyntang.github.io/d3Charts/]()

Also, I have moved on even though some tests have failed. The failing tests are those which I deem as design decisions, rather than those testing an accurate implementation of the d3 library.

For example, in the bar chart project, I chose to convert the date string "1950-01-01" to a real date, using `new Date("1950-01-01")`. The test failed, as it was looking for a string rather than a `Date`. I chose to let this fail rather than refactor my code.
