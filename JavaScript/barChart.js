function barChart(){
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = 800,
		height = 500;
	
	//Define the scale property
	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);
	var yScale = d3.scale.linear()
		.range([height, 0]);

	//Define the axis property
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom');
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left');
	
	//Define the x/y value accessor
	var xValue;
	var yValue;
	
	//Define the x/y property
	var xProperty;
	var yProperty;

	function chart(selection){
		selection.each(function(data){
			data.forEach(function(d){d.frequency = +d.frequency; });
			var keys = Object.keys(data[0]);
			keys.forEach(function(key){
					
			});

			//Update the x-scale
			xScale.domain(data.map(function(d){return d[xProperty]; }));

			console.log(data);
			//Update the y-scale
			yScale.domain([0, d3.max(data, function(d){ return d[yProperty]; })]);

			//Select the svg if it exists
			var svg = d3.select(this).selectAll('svg').data([data]);

			//Otherwise create the skeletal chart
			var gEnter = svg.enter().append('svg').append('g');
			gEnter.append('g').attr('class', 'x axis');
			gEnter.append('g').attr('class', 'y axis');

			//Update the outer-dimension
			svg.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			//Update the inner-dimension
			var g = svg.select('g')
						.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			//Update the x-axis
			g.select('.x.axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			//Update the y-axis
			g.select('.y.axis')
				.call(yAxis);

			//Update the rect area
			g.selectAll('.bar')
				.data(data)
				.enter().append('rect')
				.attr('class', 'bar')
				.attr('x', function(d){return xScale(d[xProperty]); })
				.attr('y', function(d){return yScale(d[yProperty]); })
				.attr('width', xScale.rangeBand())
				.attr('height', function(d){return height - yScale(d[yProperty]); });
		});
	}
	
	chart.width = function(_){
		if(!arguments.length) return width;
		
		width = _;
		return chart;
	}

	chart.height = function(_){
		if(!arguments.length) return height;

		height = _;
		return chart;
	}
	
	chart.x = function(_){
		if(!arguments.length) return xProperty;

		xProperty = _;
		return chart;
	}

	chart.y = function(_){
		if(!arguments.length) return yProperty;

		yProperty = _;
		return chart;
	}

	return chart;
}
