function barChart(){
	var margin = {top: 10, right: 20, bottom: 10, left: 20},
		width = 800,
		height = 500;
	
	//Define the scale
	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);
	var yScale = d3.scale.linear()
		.range([height, 0]);

	//Define the axis
	var xAxis = d3.svg.axis()
		.scale(xScale);
	var yAxis = d3.svg.axis()
		.scale(yScale);

	//Define the x/y accessor
	var xValue;
	var yValue;

	function chart(selection){
		selection.each(function(data){
			
			//Update the x-scale
			xScale.domain([]);

			//Update the y-scale
			yScale.domain([]);

			//Select the svg if it exists
			var svg = d3.select(this).selectAll('svg').data([data]);

			//Otherwise create the skeletal chart
			var gEnter = svg.enter().append('svg').append('g');
			gEnter.append('g').attr('x axis');
			gEnter.append('g').attr('y axis');

			//Update the outer-dimension
			svg.attr('width', width)
				.attr('height', height);

			//Update the inner-dimension
			var g = svg.select('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
			
			//Update the x-axis
			g.select('.x.axis')
				.call(xAxis);

			//Update the y-axis
			g.select('.y.axis')
				.call(yAxis);
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

	return chart;
}
