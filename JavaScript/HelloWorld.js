d3.edge = {};

d3.edge.table = function(){
	var fontSize = 10,
		fontColor = 'red';
	
	var dispatch = d3.dispatch('customHover');

	function hello(_selection){
		_selection.each(function(_data){
			d3.select(this)
				.append('div')
				.style({
					'font-size': fontSize + 'px',
					color: fontColor
				})
				.html('Hello World' + _data)
				.on('click', dispatch.customHover);
		});
	}

	hello.fontSize = function(_x){
		if(!arguments.length) return fontSize;

		fontSize = _x;
		return this;
	}

	hello.fontColor = function(_y){
		if(!arguments.length) return fontColor;

		fontColor = _y;
		return this;
	}

	d3.rebind(hello, dispatch, 'on');
	return hello;
};
