/*
=================================================
on load
=================================================
*/
$(document).ready(function () {
	d3.select('.five').classed('hidden', false);
	d3.select('#welcome-txt').classed('hidden', false);
	hideSliders()
	drawBigMap();
})
//global variables needed to append svg and circles//
var svg2, svg1, xAxis, projection;
var board = d3.select(".board")
var width =  parseInt(board.style('width'), 10);
var height =  parseInt(board.style('height'), 10);

/*
=================================================
data calls
=================================================
*/
d3.json("data/poxData.json", function (pxAll){
	runPox(pxAll)
});
d3.json("data/measlesData.json", function (msAll){
	runMeasles(msAll)
});
d3.json("data/fluData.json", function (fAll){
	runFlu(fAll)
});
d3.json("data/polioData.json", function (pAll){
	runPolio(pAll)
});

d3.json("data/measlesCompare.json", function(cAll) {
	runMeaslesCompare(cAll)
});

d3.json("data/polioCompare.json", function(cAll) {
	console.log(cAll)
	runPolioCompare(cAll)
});

/*
=================================================
compare functions
=================================================
*/
var runMeaslesCompare = function(pre) {
		var class1 = "comps";
		var class2 = "comps-two";
	d3.select('#measlesCompare').on('click', function (){
		clearAll();
		hideSliders();
		//drawclearMap();
		$('#sldr-five').show();
		compareMeasles();
		addMeaslesCompAxis();
		compCircles(pre[0], class1, class2);
		//compCirclesSecond(post[0], class2);
		labels(pre[0], 0)
	})
	var compareMeasles = function () {
		d3.select('#sldr-five').on('change', function (){
			compCircles(pre[this.value], class1, class2);
			labels(pre[pre[this.value]], this.value)
		})

		svg2.selectAll('circle').remove();
		d3.select('.stats-holder').classed('hidden', true);
		d3.select('.legend-holder').classed('hidden', true);
		$('.pre-Text').append("<button id='measles-return'>Return to Measles</button>")
		$('#measles-return').on('click', function(){
			console.log('hello')
		})
	}
}

var runPolioCompare = function(pre) {
		var class1 = "pcomps";
		var class2 = "pcomps-two";
	d3.select('#polioCompare').on('click', function (){
		clearAll();
		hideSliders();
		//drawclearMap();
		$('#sldr-five').show();
		comparePolio();
		addMeaslesCompAxis();
		compCircles(pre[0], class1, class2);
		//compCirclesSecond(post[0], class2);
		labels(pre[0], 0)
	})
	var comparePolio = function () {
		d3.select('#sldr-five').on('change', function (){
			compCircles(pre[this.value], class1, class2);
			labels(pre[pre[this.value]], this.value)
		})

		svg2.selectAll('circle').remove();
		d3.select('.stats-holder').classed('hidden', true);
		d3.select('.legend-holder').classed('hidden', true);
		$('.pre-Text').append("<button id='polio-return'>Return to Polo</button>")
		$('#measles-return').on('click', function(){
			console.log('hello')

		})
	}
}

/*
=================================================
disease selections
=================================================
*/
var runPox = function (pxAll) {
	d3.select('#pox-page').on('click', function () {
		//shows chickenpox options//
		chikenPox();
		//loads first label//
		labels(pxAll[0], 0);
		//chages color of national cases//
		d3.select('#cases').style("color", "#50e3c2");
		//changes color of graph - or + buttons//
		d3.selectAll('.graph-btn').style("background-color", "#50e3c2");
		//changes legend circles color//
		d3.selectAll('.cir').style("background-color", "rgba(80,227,194, 0.7)");
		//adds class to circles //
		var color = "percs"
		//selects first data set for load//
		sliderCircles(pxAll[0], color);
		//selects first color for seasons//
		seasons(pxAll[0]);
	})
	//pox slider//
	d3.select('#sldr').on('change', function (){
		//hide slider animation//
		$('#slider-label').hide();
		//pox info//
		poxGraph()
		//passes in class//
		var color = "percs";
		//puts pox circles on page//
		sliderCircles(pxAll[this.value], color);
		//puts labels on page//
		labels(pxAll[this.value], this.value);
		//changes seasons backgrond color
		seasons(pxAll[this.value]);
	})
};
var runMeasles = function (msAll) {
	d3.select('#measles-page').on('click', function () {
		measles();
		labels(msAll[0], 0);
		d3.select('#cases').style("color", "#9eda62");
		d3.selectAll('.graph-btn').style("background-color", "#9eda62");
		d3.selectAll('.cir').style("background-color", "rgba(158,218,98, 0.7)");
		var color = "mercs"
		sliderCircles(msAll[0], color);
		seasons(msAll[0]);	
	})
	d3.select('#sldr-two').on('change', function (){
		$('#slider-label').hide();
		measlesGraph();
		var color = "mercs"
		sliderCircles(msAll[this.value], color);
		labels(msAll[this.value], this.value);
		seasons(msAll[this.value]);	
	})
};
var runFlu = function (fAll) {
	d3.select('#flu-page').on('click', function () {
		flu();
		labels(fAll[0], 0);
		d3.select('#pre-txt').text('');
		d3.select('#post-txt').text('');
		var color = "fercs"
		d3.select('#cases').style("color", "#4a90e2")
		d3.selectAll('.graph-btn').style("background-color", "#4a90e2");
		d3.selectAll('.cir').style("background-color", "rgba(74,144,236, 0.7)");
		sliderCircles(fAll[0], color);
		seasons(fAll[0]);
	})

	d3.select('#sldr-four').on('change', function (){
		$('#slider-label').hide();
		fluGraph();
		var color = "fercs";
		sliderCircles(fAll[this.value], color);
		labels(fAll[this.value], this.value);
		seasons(fAll[this.value]);
	})
};

var runPolio = function (pAll) {
	d3.select('#polio-page').on('click', function () {
		polio();
		labels(pAll[0], 0);
		var color = "lercs";
		d3.select("#cases").style("color", "#d44ff0");
		d3.selectAll(".graph-btn").style("background-color", "#d44ff0");
		d3.selectAll('.cir').style("background-color", "rgba(212,79,240, 0.7)");
		sliderCircles(pAll[0], color);
		seasons(pAll[0]);
	})
	d3.select('#sldr-three').on('change', function (){
		$('#slider-label').hide();
		polioGraph();
		var color = "lercs";
		sliderCircles(pAll[this.value], color);
		labels(pAll[this.value], this.value);
		seasons(pAll[this.value]);	
	})
};
var chikenPox =  function () {
	clearAll();
	addPoxAxis();
	hideSliders();
	$('#sldr').show();
	d3.select('#link-pox').classed('hidden', false);
	d3.select('.five').classed('hidden', false);
	d3.select('.stats-holder').classed('hidden', false);
	d3.select('.legend-holder').classed('hidden', false);
	d3.select('#poxCompare').classed('hidden', false);

};

var measles =  function () {
	clearAll();
	addMeaslesAxis();
	hideSliders();
	$('#sldr-two').show();
	d3.select('#link-msls').classed('hidden', false);
	d3.select('.five').classed('hidden', false);
	d3.select('.stats-holder').classed('hidden', false);
	d3.select('.legend-holder').classed('hidden', false);
	d3.select('#measlesCompare').classed('hidden', false);

};

var flu =  function () {
	clearAll();
	addFluAxis();
	hideSliders();
	$('#sldr-four').show();
	d3.select('#link-flu').classed('hidden', false);
	d3.select('.five').classed('hidden', false);
	d3.select('.stats-holder').classed('hidden', false);
	d3.select('.legend-holder').classed('hidden', false);
	d3.select('#fluCompare').classed('hidden', false);

};

var polio =  function () {
	clearAll();
	addPolioAxis();
	hideSliders();
	$('#sldr-three').show();
	d3.select('#link-polio').classed('hidden', false);
	d3.select('.five').classed('hidden', false);
	d3.select('.stats-holder').classed('hidden', false);
	d3.select('.legend-holder').classed('hidden', false);
	d3.select('#polioCompare').classed('hidden', false);
};
/*
=================================================
axis
=================================================
*/
var addPoxAxis = function () {
		d3.select("#slider-svg").text('')
		var xScale = d3.scale.ordinal()
		.domain(d3.range([10]))
		.rangeRoundBands([5, width - 40	], 0.05);
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues([1972, 1974, 1976, 1978, 1980, 2006, 2008, 2010, 2012, 2014]);
		var svg3 = d3.select("#slider-svg")
			.append('svg')	
			.attr('style', 'width: 100%;height:25px;');
		svg3.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, 0)")
			.call(xAxis);
};

var addMeaslesAxis = function () {
	d3.select("#slider-svg").text('')
		var xScale = d3.scale.ordinal()
		.domain(d3.range([10]))
		.rangeRoundBands([5, width - 40	], 0.05);
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues([1927, 1935, 1943, 1951, 1959, 1967, 1976, 1983, 1991, 1999]);	
		var svg3 = d3.select("#slider-svg")
			.append('svg')	
			.attr('style', 'width:100%;height:25px;');
		svg3.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, 0)")
			.call(xAxis);

};

var addFluAxis = function () {
	d3.select("#slider-svg").text('')
	var xScale = d3.scale.ordinal()
		.domain(d3.range([10]))
		.rangeRoundBands([5, width - 40	], 0.05);
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues([1927, 1930, 1953, 1935, 1938, 1941, 1943, 1945, 1949, 1951]);	
		var svg3 = d3.select("#slider-svg")
			.append('svg')	
			.attr('style', 'width:100%;height:25px;');
		svg3.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, 0)")
			.call(xAxis);
};

var addPolioAxis = function () {
	d3.select("#slider-svg").text('')
		var xScale = d3.scale.ordinal()
		.domain(d3.range([10]))
		.rangeRoundBands([5, width - 40	], 0.05);
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues([1927, 1932, 1937, 1942, 1947, 1952, 1957, 1962, 1967, 1972]);	
		var svg3 = d3.select("#slider-svg")
			.append('svg')	
			.attr('style', 'width:100%;height:25px;');
		svg3.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, 0)")
			.call(xAxis);

};
var addMeaslesCompAxis = function () {
		d3.select("#slider-svg").text('')
		var xScale = d3.scale.ordinal()
		.domain(d3.range([12]))
		.rangeRoundBands([5, width - 40	], 0.05);
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues(['January','February', 'March','April', 'May','June' ,'July','August' ,'September','October' ,'November', 'December']);
		var svg3 = d3.select("#slider-svg")
			.append('svg')	
			.attr('style', 'width: 100%;height:25px;');
		svg3.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, 0)")
			.call(xAxis);
};
/*
=================================================
data binding circles
=================================================
*/
//fuction prints disease data as circles//	
var sliderCircles = function (input, color) {
	//remover previous circles//
	svg2.selectAll('circle').remove();
	svg2.selectAll("circle")
		.data(input)
		.enter()
		.append("circle")
		.attr('class', color)
		.style('stroke', '#fff')
		.style('stroke-width', 1)
		.transition()
		.duration(10)
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];})
		.attr("r", 0.1)
		.each("end", function(){
			d3.select(this)
			 .transition()
			 .ease("linear")
			 .duration(500)
			.attr("r", function(d){ 
				if(d.location !== 'total') {
					return Math.sqrt(parseInt(d.cases) * 1)
				}
			})
			.style('opacity', '.7')
		})
    svg2.selectAll('circle')
		.on('mouseover', function (d){
			//these position locations are bullshit need a fix///
			var xposition = parseInt(d3.select(this).attr('cx'));
			var yposition = parseInt(d3.select(this).attr('cy'));
				d3.select('#data-box').classed('hidden', false);
				d3.select('#data-box')
						.style('right', (width + 40) - xposition + 'px')
						.style('top',  (yposition - 40) + 'px')
						.select('#value')
						.text(d.location);
				d3.select('#data-box')
						.select('#value-two')
						.text(d.month_yr);
				d3.select('#data-box')
						.select('#value-three')
						.text("Cases: " + d.cases)
		})
		.on('mouseout', function (){
				d3.select('#data-box').classed('hidden', true);
		})
};

var compCircles = function (input, class1, class2) {
	svg2.selectAll('g').remove();
	//remover previous circles//
	var circles = svg2.selectAll("g")
		.data(input)
		.enter()
		.append('g')
	circles.append("circle")
		.attr('class', class1)
		.style('stroke', '#fff')
		.style('stroke-width', 1)
		.transition()
		.duration(10)
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];})
		.attr("r", 0.1)
		.each("end", function(){
			d3.select(this)
			 .transition()
			 .ease("linear")
			 .duration(200)
			.attr("r", function(d){ 
					if(d.location !== 'total') {
				return Math.sqrt(parseInt(d.cases) * 1)	
				}
			})
		})
	circles.append("circle")
		.attr('class', class2)
		.style('stroke', '#fff')
		.style('stroke-width', 1)
		.transition()
		.duration(10)
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];})
		.attr("r", 0.1)
		.each("end", function(){
			d3.select(this)
			 .transition()
			 .ease("linear")
			 .duration(200)
			.attr("r", function(d){ 
					if(d.location !== 'total') {
				return Math.sqrt(parseInt(d.postcases) * 1)	
				}
			})
		})
		svg2.selectAll('circle')
		.on('mouseover', function (d){

			//these position locations are bullshit need a fix///
			var xposition = parseInt(d3.select(this).attr('cx'));
			var yposition = parseInt(d3.select(this).attr('cy'));
				d3.select('#data-box-two').classed('hidden', false);
				d3.select('#data-box-two')
						.style('right', (width + 40) - xposition + 'px')
						.style('top',  (yposition - 40) + 'px')
						.select('#val')
						.text(d.location);
				d3.select('#data-box-two')
						.select('#val-three')
						.text(function(){
							var pre = d.cases;
							var post = d.postcases;
							var percent = parseFloat(1 - (post/pre))
							return percent.toFixed(2) + '%  ' + 'Decrease';
					})
		})
		.on('mouseout', function (){
				d3.select('#data-box-two').classed('hidden', true);
		})
};

/*
=================================================
labels
=================================================
*/

//adds text and seasons to season box//
var seasons = function(input) {
	//get numbers that represent the month//
	var month = input[1].time.match(/[0-9]/gi).slice(4).join('');
	//sets thr bacgroundcolor of seasons div//
		if(month == '083333' || month == '166667'|| month == '25' ) {
			d3.select('.seasons').text("Winter")
		} else
		if(month == '333333' || month == '416667'|| month == '5' ) {
				d3.select('.seasons').text("Spring")
		} else
		if(month == '583333' || month == '666667'|| month == '75' ) {
				d3.select('.seasons').text("Summer")
		} else {
		if(month == '833333' || month == '916667' || month == "")  
				d3.select('.seasons').text("Fall")
		}	
};

//adds labels to html//
var labels = function (input, counter) {
	d3.select('#pre-txt').text('Pre-Vaccine');
	d3.select('#post-txt').text('Post-Vaccine');

	var date = input[1].time;
	if(date.length === 4) {
		date = parseInt(date) - 1
	} else {
		date = date.slice(0 ,4)
	}
	var check = input[1].month_yr
	var smonth = check.split('');
	var i = parseInt(smonth[0]);
	var k = smonth[0];
	var t =	k.match(/[a-z]/gi);
	var mystring = "";
	if(t == null){
		mystring = check.split('').reverse().slice(0,3).reverse().join('')
	}
	if(Array.isArray(t)) {
		mystring = input[1].month_yr.slice(0, 3);
	}
	d3.select('#year').text( mystring + " " + date);
	d3.select('#sickness').text("ABOUT " + input[1].disease.toUpperCase());
	var num = 42;
	if(input[1].disease.toUpperCase() === 'POLIO') {
			num = 49
	}
	d3.select('#cases').text(input[num].cases);
	//iterate over data object to set pictures and text//
	d3.json('data/diseaseData.json', function(data){
	for (var i = 0; i < data.length; i++) {
		if(input[1].disease === data[i].name) {
			var pic = document.getElementById('sym-pic')
			pic.src = "images/" + data[i].pic[0];
			$('#description-txt').text(data[i].description);
		}
	}
	})
};
/*
=================================================
map
=================================================
*/
	
//map projection//
var  drawBigMap = function(input) {
	var margin = 75, location_data;
	d3.json('data/us-states.json', function(geo_data){	
	   svg2 = d3.select(".board")
		.append('svg')
		.attr('class', 'shadow')
		.attr('style', 'width:100%;height: 542px;')
		.append('g')
	projection = d3.geo.mercator()
	    .scale(width * 3.8)
	    .translate([width/.669 , width * 0.609]);
	var path = d3.geo.path().projection(projection)
	var map = svg2.selectAll('path')
		.data(geo_data.features) 
		.enter()
		.append('path')
		.attr('d', path)
		.attr('id', function(d) { return d.properties.name; })
		.style('fill', '#ffffff')
		.style('stroke', '#6CC3CD')
		.style('stroke-width', 0.5);
	})
};

/*
=================================================
clearing functions
=================================================
*/
var hideSliders = function () {
	//hides and resets all sliders//
	$('#slider-label').hide();
	$('#sldr').hide();
	$('#sldr').val('0')
	$('#sldr-two').hide();
	$('#sldr-two').val('0');
	$('#sldr-three').hide();
	$('#sldr-three').val('0');
	$('#sldr-four').hide();
	$('#sldr-four').val('0');
	$('#sldr-five').hide();
	$('#sldr-five').val('0');
};

//removes data and labels//
var clearAll = function () {
	d3.select('#measles-return').remove();
	d3.select('#polio-return').remove();
	d3.select('.clearMap').remove();
	d3.select('#year').text('');
	d3.select('#sickness').text('');
	d3.select('#cases').text('');	
	d3.select('.seasons').text("");
	svg2.selectAll('.crcs').remove();
	$('#description-txt').text('');
	$('.dates').text('');
	$('.caption').text('');
	d3.select('#pre-txt').text('');
	d3.select('#post-txt').text('');
	d3.select('.axis').remove();
	//hides initial text//
	d3.select('#welcome-txt').classed('hidden', true);
	d3.select('#poxCompare').classed('hidden', true);
	d3.selectAll('.modal-link').classed('hidden', true);
	d3.select('.six').classed('hidden', true)
	d3.select('#measlesCompare').classed('hidden', true);
	d3.select('#poxCompare').classed('hidden', true);
	d3.select('#polioCompare').classed('hidden', true);
	d3.select('#fluCompare').classed('hidden', true);
};
/*
=================================================
button handlers
=================================================
*/
$('.navbar-collapse button').on('click', function() {
	$('.navbar-collapse button').removeClass('poxSelected');
	$(this).addClass('poxSelected');
})
/*
=================================================
graph data
=================================================
*/
var poxGraph = function () {	
	d3.json('data/poxGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true)
		d3.select('.six').classed('hidden', false)
		lineChart(graph)
	})
};

var measlesGraph = function () {	
	d3.json('data/measlesGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true)
		d3.select('.six').classed('hidden', false)
		lineChart(graph)
	})
};

var fluGraph = function () {	
	d3.json('data/fluGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true)
		d3.select('.six').classed('hidden', false)
		lineChart(graph)
	})
};

var polioGraph = function () {	
	d3.json('data/polioGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true)
		d3.select('.six').classed('hidden', false)
		lineChart(graph)
	})
};
/*
=================================================
linechart
=================================================
*/
var lineChart = function (graph) {
   nv.addGraph(function() {
	    var chart = nv.models.lineChart();
	    var fitScreen = false;
	    var width = 900;
	    var height = 90;
	    var zoom = 1;
	    chart.useInteractiveGuideline(true);
	    chart.xAxis
	        .tickFormat(d3.format('Y'));
	    chart.lines.dispatch.on("elementClick", function(evt) {
	        //console.log(evt);
	    });
	    chart.yAxis
	        //.axisLabel('Chickenpox')
	        .tickFormat(d3.format(',.0f'));
	    d3.select('#chart1 svg')
	        .attr('perserveAspectRatio', 'xMinYMid')
	        .attr('width', width)
					.attr('class', 'poxchart')
	        .attr('height', height)
	        .datum(graph);
	    setChartViewBox();
	    resizeChart();
	    nv.utils.windowResize(resizeChart);
	    d3.select('#zoomIn').on('click', zoomIn);
	    d3.select('#zoomOut').on('click', zoomOut);

	    function setChartViewBox() {
	        var w = width * zoom,
	            h = height * zoom;
	        chart
	            .width(w)
	            .height(h);
	        d3.select('#chart1 svg')
	            .attr('viewBox', '0 0 ' + w + ' ' + h)
	            .transition().duration(500)
	            .call(chart);
	    }
	    function zoomOut() {
	        zoom += .25;
	        setChartViewBox();
	    }
	    function zoomIn() {
	        if (zoom <= .5) return;
	        zoom -= .25;
	        setChartViewBox();
	    }
	    // This resize simply sets the SVG's dimensions, without a need to recall the chart code
	    // Resizing because of the viewbox and perserveAspectRatio settings
	    // This scales the interior of the chart unlike the above
	    function resizeChart() {
	        var container = d3.select('#chart1');
	        var svg = container.select('svg');

	        if (fitScreen) {
	            // resize based on container's width AND HEIGHT
	            var windowSize = nv.utils.windowSize();
	            svg.attr("width", windowSize.width);
	            svg.attr("height", windowSize.height);
	        } else {
	            // resize based on container's width
	            var aspect = chart.width() / chart.height();
	            var targetWidth = parseInt(container.style('width'));
	            svg.attr("width", targetWidth);
	            svg.attr("height", Math.round(targetWidth / aspect));
	        }
	    }
	    return chart;
	});
};
