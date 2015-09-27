function lineChart(){
	var margin = {top:20, right: 50, bottom: 30, left: 50},
		width = 960,
		height = 500,
		xValue = function(d){return d[0]; },
		yValue = function(d){return d[1]; };

	var xScale = d3.time.scale(),
		yScale = d3.scale.linear(),
		parseDate = d3.time.format("%d-%b-%y").parse,
		xAxis = d3.svg.axis().scale(xScale).orient('bottom'),
		yAxis = d3.svg.axis().scale(yScale).orient('left'),
		bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return "$" + formatValue(d); };

	var line = d3.svg.line().x(X).y(Y);

	function chart(selection){
		selection.each(function(data){

			console.log(data);

			data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      data.sort(function(a, b) {
        return a.date - b.date;
      });

			//Update the x-scale
			xScale.domain([data[0].date, data[data.length - 1].date])
				.range([0, width]);

			//Update the y-scale
			yScale.domain(d3.extent(data, function(d) { return d.close; }))
				.range([height, 0]);

			//Select the svg if it exits
			var svg = d3.select(this).selectAll('svg').data([data]);

			//Otherwise, create the skeletal chart
			var gEnter = svg.enter().append('svg').append('g');
			gEnter.append('g').attr('class', 'x axis');
			gEnter.append('g').attr('class', 'y axis');
			gEnter.append('path').attr('class', 'line');

			//Update the outer dimension
			svg.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			//Update the inner dimension
			var g = svg.select('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			//Update the x-axis
			g.select('.x.axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			//Update the y-axis
			g.select('.y.axis')
				.call(yAxis);

			//Update the line
			g.select('.line')
				.attr('d', line);

			var focus = gEnter.append('g')
			      .attr('class', 'focus')
			      .style('display', 'none');

			focus.append('circle')
			  .attr('r', 4.5);

			focus.append('text')
			  .attr('x', 9)
			  .attr('dy', '.35em');

			gEnter.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

      function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.close) + ")");
        focus.select("text").text(formatCurrency(d.close));
      }
		});
	}

	//The x-value accessor for line generator
	function X(d){
		return xScale(d.date);
	}

	//The y-value accessor for line generator
	function Y(d){
		return yScale(d.close);
	}

	chart.width = function(_){
		if(!arguments.length) return width;
		width = _;

		return chart;
	}

	chart.height = function(_){
		if(!arguments.length) return height;
		height = _;

		return height;
	}

	chart.margin = function(_){
		if(!arguments.length) return margin;
		margin = _;

		return chart;
	}

	chart.x = function(_){
		if(!arguments.length) return xValue;
		xValue = _;

		return chart;
	}

	chart.y = function(_){
		if(!arguments.length) return yValue;
		yValue = _;

		return chart;
	}

	return chart;
}
