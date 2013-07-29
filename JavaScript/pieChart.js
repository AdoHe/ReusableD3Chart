function pieChart(){
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
		width = 300,
		height = 250,
		radius = Math.min(width, height) / 2,
		xValue = function(d){return d[0]; },
		yValue = function(d){return d[1]; },
		arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0)
		pie = d3.layout.pie();

	var color = d3.scale.ordinal()
		.range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

	function chart(selection){
		selection.each(function(data){

			//Update the pie-data
			pie.sort(null).value(yValue);

			//Select the svg element, if it exits
			var svg = d3.select(this).selectAll('svg').data([data]);

			//Otherwise create a svg element
			var gEnter = svg.enter().append('svg').append('g');

			//Update the outer dimensions
			svg.attr('width', width)
				.attr('height', height);

			//Update the inner dimensions
			var g = svg.select('g')
				.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

			//Update the arc
			var gg = g.selectAll('.arc')
					.data(pie(data))
				.enter().append('g')
					.attr('class', 'arc');
			
			gg.append('path')
				.attr('d', arc)
				.style('fill', function(d){return color(d.data.age); });

			gg.append('text')
				.attr('transform', function(d){return 'translate(' + arc.centroid(d) + ')'; })
				.attr('dy', '.35em')
				.style('text-anchor', 'middle')
				.text(function(d){return d.data.age; });
		});
	}
	
	chart.x = function(_){
		if(!arguments.length) return xValue;
		xValue = _;

		return this;
	}

	chart.y = function(_){
		if(!arguments.length) return yVaule;
		yValue = _;

		return this;
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
