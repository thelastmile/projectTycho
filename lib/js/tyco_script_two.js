/*
=================================================
data binding circles
=================================================
*/
var sliderCircles = function (input, color) {
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
			 .duration(500)
			 .attr("r", function(d){ 
					if(d.location !== 'total') {
				return Math.sqrt(parseInt(d.cases) * 1);	
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
			 .duration(500)
			 .attr("r", function(d){ 
					if(d.location !== 'total') {
				return Math.sqrt(parseInt(d.postcases) * 1);	
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
						.select('#val-two')
						.text("Pre cases " + d.cases);
				d3.select('#data-box-two')
						.select('#val-four')
						.text("- Post cases " + d.postcases);
				d3.select('#data-box-two')
						.select('#val-three')
						.text(function(){ 
							var pre = parseInt(d.cases);
							var post = parseInt(d.postcases);
							if(pre > post) {
								var percent = parseFloat(1 - (post/pre))
								return Math.floor(percent * 100) + '%  ' + 'Decrease';
							} else {
								return post + '% ' + 'Increase';
							}
					})
		})
		.on('mouseout', function (){
				d3.select('#data-box-two').classed('hidden', true);
		})
};

var anCircles = function (input, color) {
	var circles = svg2.selectAll("g")
		.data(input, function(d) {return d.cases});	
	circles.enter()
		.append('g')
		.append("circle")
		.attr('class', color)
		.transition()
		.ease('linear')
		.duration()
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];})

			.attr("r", function(d){
					if(d.location !== 'total') {
				return Math.sqrt(parseInt(d.cases) * 1);	
				}
			})
		circles.exit()
			.attr("class", color)
			.transition()
			.ease('linear')
			.duration()
			.remove();
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
			d3.select('.seasons').text("Winter");
		} else
		if(month == '333333' || month == '416667'|| month == '5' ) {
				d3.select('.seasons').text("Spring");
		} else
		if(month == '583333' || month == '666667'|| month == '75' ) {
				d3.select('.seasons').text("Summer");
		} else {
		if(month == '833333' || month == '916667' || month == "")  
				d3.select('.seasons').text("Fall");
		}	
};

//adds labels to html//
var labels = function (input, counter) {
	d3.select('#pre-txt').text('Pre-Vaccine');
	d3.select('#post-txt').text('Post-Vaccine');
	var date = input[1].time;
	if(date.length === 4) {
		date = parseInt(date) - 1;
	} else {
		date = date.slice(0 ,4);
	}
	var check = input[1].month_yr;
	var smonth = check.split('');
	var i = parseInt(smonth[0]);
	var k = smonth[0];
	var t =	k.match(/[a-z]/gi);
	var mystring = "";
	if(t == null){
		mystring = check.split('').reverse().slice(0,3).reverse().join('');
	}
	if(Array.isArray(t)) {
		mystring = input[1].month_yr.slice(0, 3);
	}
	d3.select('#year').text( mystring + " " + date);
	var num = 42;
	if(input[1].disease.toUpperCase() === 'POLIO') {
			num = 49;
	}
	d3.select('#cases').text(input[num].cases);
	//iterate over data object to set pictures and text//
	d3.json('data/diseaseData.json', function(data){
		for (var i = 0; i < data.length; i++) {
			if(input[1].disease === data[i].name) {
				var pic = document.getElementById('sym-pic');
				pic.src = "images/" + data[i].pic[0];
				$('#description-txt').text(data[i].description);
			}
		}
	})
};
var comparelables = function (input) {
	var num = 42;
	if(input[1].disease.toUpperCase() === 'POLIO COMPARISON') {
			num = 49;
	}
	d3.select("#cases-one").text(input[num].cases)
	d3.select("#cases-two").text(input[num].postcases)
}
/*
=================================================
map
=================================================
*/
var  drawBigMap = function(input) {
	var margin = 75, location_data;
	d3.json('data/us-states.json', function(geo_data){	
	   svg2 = d3.select(".board")
		.append('svg')
		.attr('class', 'shadow')
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
var clearAnimationButtons = function() {
	d3.select('#measles-animate').remove();
	d3.select('#measles-stop-animate').remove();
	d3.select('#chikenpox-animate').remove();
	d3.select('#chickenpox-animate').remove();
	d3.select('#chickenpox-stop-animate').remove();
	d3.select('#flu-animate').remove();
	d3.select('#flu-stop-animate').remove();
	d3.select('#polio-stop-animate').remove();
	d3.select('#polio-animate').remove();
};
//removes data and labels//
var clearAll = function () {
	d3.select('#mid-txt').text('');
	d3.select('#measles-return').remove();
	d3.select('#polio-return').remove();
	d3.select('.clearMap').remove();
	d3.select('#year').text('');
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
	d3.selectAll('.modal-link').classed('hidden', true);
	d3.select('.six').classed('hidden', true)
	d3.select('#poxCompare').classed('hidden', true);
	d3.select('#measlesCompare').classed('hidden', true);
	d3.select('#polioCompare').classed('hidden', true);
};

var displays = function() {
	d3.select('.five').classed('hidden', false);
	d3.select('.stats-holder').classed('hidden', false);
	d3.select('.stats-holder-two').classed('hidden', true);
	d3.select('.legend-holder').classed('hidden', false);
};

var clearIntervals = function() {
	clearInterval(intervalOne);
	clearInterval(intervalTwo);
	clearInterval(intervalThree);
	clearInterval(intervalFour);
};
/*
=================================================
button handlers
=================================================
*/
$('.navbar-collapse button').on('click', function() {
	$('.navbar-collapse button').removeClass('poxSelected');
	$(this).addClass('poxSelected');
});

$('#mcomp').on('click', function() {
	$(this).addClass('card_clicked card back');
	//$(this).addClass('card');
	//$(this).addClass('back');
});
/*
=================================================
graph data
=================================================
*/
var poxGraph = function () {	
	d3.json('data/poxGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true);
		d3.select('.six').classed('hidden', false);
		lineChart(graph);
	})
};

var measlesGraph = function () {	
	d3.json('data/measlesGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true);
		d3.select('.six').classed('hidden', false);
		lineChart(graph);
	})
};

var fluGraph = function () {	
	d3.json('data/fluGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true);
		d3.select('.six').classed('hidden', false);
		lineChart(graph);
	})
};

var polioGraph = function () {	
	d3.json('data/polioGraph.json', function (graph) {
		d3.select('.five').classed('hidden', true);
		d3.select('.six').classed('hidden', false);
		lineChart(graph);
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
