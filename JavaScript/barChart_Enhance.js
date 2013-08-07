d3.chart = {};

d3.chart.bar = function(){
	//Define the basic attributes
	var margin = {top: 20, right: 20, bottom: 20, left: 20},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var gap = 0,
		ease = 'bounce';

	//Dispatch the custome event
	var dispatch = d3.dispatch('customClick');

	//Define the x/y scale functions
	var xScale = d3.scale.ordinal()
		.rangeRoundBounds([0, width], .1);
	var yScale = d3.scale.linear()
		.range([height, 0]);

	//Define the x/y axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom');
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left');

	//Define the x/y accessor functions maybe useful
	var xValue;
	var yValue;

	function _barChart(_selection){
		_selection.each(function(_data){

			//Update the x/y scale domain
			xScale.domain(_data.map(function(d, i){return i; }));
			yScale.domain([0, _data.max(function(d, i){return d; })]);

			//Select the svg if it exists
			var svg = d3.select(this).selectAll('svg').data([_data]);

			//Otherwise create the internal chart
			var gEnter = svg.enter().append('svg').append('g');
			gEnter.append('g').attr('class', 'x axis');
			gEnter.append('g').attr('class', 'y axis');
			gEnter.append('g').attr('class', 'chart');

			//Update the out dimension
			svg.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			//Update the inner dimension
			var g = svg.select('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			//Update the x-axis
			g.select('.x.axis')
				.transition()
				.ease(ease)
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			//Update the y-axis
			g.select('.y.axis')
				.transition()
				.ease(ease)
				.call(yAxis);

			//Update the mainly bar chart
			var gapSize = xScale.rangeBand() / 100 * gap;
			var barWidth = xScale.rangeBand() - gapSize;

			var bars = g.select('chart')
				.selectAll('.bar')
				.data(_data);
			bars.enter().append('rect')
				.attr('class', 'bar')
				.attr({
					x: width,
					y: function(d, i){return yScale(d); },
					width: barWidth,
					height: function(d, i){return height - yScale(d); }
				})
				.on('click', dispatch.customClick);
			bars.transition()
				.ease(ease)
				.attr({
					x: function(d, i){return xScale(i) + gapSize / 2; },
					y: function(d, i){return height - yScale(d); },
					width: barWidth,
					height: function(d){return yScale(d); }
				});
			bars.exit().transition().style({opacity: 0}).remove();
		});
	}

	_barChart.width = function(_){
		if(!arguments.length) return width;

		width = _;
		return this;
	}

	_barChart.height = function(_){
		if(!arguments.length) return height;

		height = _;
		return this;
	}

	_barChart.ease = function(_){
		if(!arguments.length) return ease;

		ease = _;
		return this;
	}

	_barChart.gap = function(_){
		if(!arguments.length) return gap;

		gap = _;
		return this;
	}

	d3.rebind(_barChart, dispatch, 'on');
	return _barChart;
}
