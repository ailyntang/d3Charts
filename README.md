# d3Charts
*Visualisations of data using d3, based on the freeCodeCamp curriculum*

See these projects live at [https://ailyntang.github.io/d3Charts/]()

My goal with these projects is to understand enough d3 so that I can move on to build a full stack project. So I have actively chosen to move on once I have learnt enough d3 for the particular task at hand. Below are examples of the trade-offs I made along the way, to prioritse my time to learn other coding things in the future.


**Ugly charts**

It kills me to have ugly charts. Seriously. I'm an ex-management consultant, so trust me, I take charts seriously! But CSS is a huge time suck for me, so onwards I move. When it counts in my future projects, I will take the time to make those charts beautiful!

**Failed tests**

Not all the freeCodeCamp tests pass. The failed tests are those which I deem as design decisions, rather than those testing an accurate implementation of the d3 library.

For example, in the bar chart project, I chose to convert the date string "1950-01-01" to a real date, using `new Date("1950-01-01")`. The test failed, as it was looking for a string rather than a `Date`. I chose to let this fail rather than refactor my code. Doing my best to prioritise my time effectively for learning, rather than perfectionism in an imperfect, codenewbie world.

**NOT DRY code**

If you delve into the `.js` files, you'll notice that I've written the same methods multiple times. Very un-DRY of me (Don't Repeat Yourself). It would have been more efficient to export the methods and re-use them.

However I learn best through rote learning. So I have redone each freeCodeCamp project from scratch. This helps me cement the knowledge in my head. I'm following the style of "Learn XXX The Hard Way".