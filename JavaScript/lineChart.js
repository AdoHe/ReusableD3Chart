function lineChart(){
	var margin = {top:20, right: 10, bottom: 30, left: 50},
		width = 800,
		height = 500,
		xValue = function(d){return d[0]; },
		yValue = function(d){return d[1]; };

	var xScale = d3.time.scale(),
		yScale = d3.scale.linear(),
		xAxis = d3.svg.axis().scale(xScale).orient('bottom'),
		yAxis = d3.svg.axis().scale(yScale).orient('left');

	var line = d3.svg.line().x(X).y(Y);

	function chart(selection){
		selection.each(function(data){
			
			console.log(data);
			
			data = data.map(function(d, i){
				return [xValue.call(data, d, i), yValue.call(data, d, i)];
			});

			//Update the x-scale
			xScale.domain(d3.extent(data, function(d){return d[0]; }))
				.range([0, width]);

			//Update the y-scale
			yScale.domain([0, d3.max(data, function(d){return d[1]; })])
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
		});
	}

	//The x-value accessor for line generator
	function X(d){
		return xScale(d[0]);
	}

	//The y-value accessor for line generator
	function Y(d){
		return yScale(d[1]);
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
