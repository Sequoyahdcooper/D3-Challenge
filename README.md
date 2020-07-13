# D3-Challenge 
Data Journalism

An assignment was carried out to investigate the relationships between health and financial variables. D3 was utilized to allow transitions with respect to dot positions on a scatter plot based on user selections.

-First, SVG and chart dimensions were defined.

-Next, a SVG element was created as well as a chart group inside of it.

-Then, D3 was used to read in data from a CSV file, and scaling functions were created to convert the data ranges to the right heights and widths.

-Axes were then created.

-After that, groups were appended to the svg, axis classes were created for each, and the axes were called by them.

-Dots were appended to each of these groups, with the circle locations passed to the appropriate scaling functions.

-State abbreviations text was also appended to each of the groups, with the circle locations passed to the appropriate scaling functions.

-Axis titles were then appended to the left and bottom of the chart (all of the axes were present, while only the data for one XY axis pair was to be plotted at any time.

-Finally, the initial axis colors were set to differentiate the axes that were selected vs those that weren't.

-As a bonus, transitions were utilized on axis click to allow users to select the XY axis pairs they wanted such that the circle positions would adjust to reflect the data.
