/*
=================================================
on-load
=================================================
*/
$(document).ready(function () {
	d3.select('.five').classed('hidden', false);
	d3.select('#welcome-txt').classed('hidden', false);
	hideSliders();
	drawBigMap();
});
//global variables needed to append svg and circles//
var svg2, svg1, xAxis, projection;
var board = d3.select(".board")
var width =  parseInt(board.style('width'), 10);
var height =  parseInt(board.style('height'), 10);
var intervalOne = null;
var intervalTwo = null;
var intervalThree = null;
var intervalFour = null;
/*
=================================================
data calls                                      
=================================================
*/
d3.json("data/poxData.json", function (pxAll){
	runPox(pxAll)
});
d3.json("data/measlesData.json", function (msAll){
	d3.json("data/measlesCompare.json", function(cAll) {
		runMeaslesCompare(cAll, msAll);
		runMeasles(msAll);
	})
});
d3.json("data/fluData.json", function (fAll){
	runFlu(fAll);
});
d3.json("data/polioData.json", function (pAll){
	d3.json("data/polioCompare.json", function(cAll) {
		runPolioCompare(cAll, pAll);
		runPolio(pAll);
	})
});
/*
=================================================
compare functions
=================================================
*/
var runMeaslesCompare = function(pre, msAll) {
		var class1 = "comps";
		var class2 = "comps-two";
	d3.select('#measlesCompare').on('click', function (){
		clearIntervals();
		clearAnimationButtons();
		clearAll();
		d3.select('.five').classed('hidden', false);
		hideSliders();
		$('#sldr-five').show();
		compareMeasles();
		var years = ['January','February', 'March','April', 'May','June' ,'July','August' ,'September','October' ,'November', 'December'];
		var range = years.length;
		addAxis(years, range);
		compCircles(pre[0], class1, class2);
		labels(pre[0], 0);
		comparelables(pre[0]);
		d3.select('#link-msls').classed('hidden', false);
		d3.select('#pre-txt').text('');
		d3.select('#post-txt').text('');
	})
	var compareMeasles = function () {
		d3.select('#sldr-five').on('change', function (){
			compCircles(pre[this.value], class1, class2);
			labels(pre[this.value], this.value)
			comparelables(pre[this.value])
		})

		svg2.selectAll('circle').remove();
		d3.select('.stats-holder').classed('hidden', true);
		d3.select('.stats-holder-two').classed('hidden', false);
		$('.btn-container').append("<button id='measles-return' class='btn btn-return'>Return to Timeline</button>");
		d3.select('#cases-one').style("color", "rgba(158, 218, 98, 0.7)");
		d3.select('#cases-two').style("color", "#9eda62");
		$('#measles-return').on('click', function(){
			svg2.selectAll('g').remove();
			measles();
			labels(msAll[0], 0);
			var color = "mercs"
			sliderCircles(msAll[0], color);
			seasons(msAll[0]);
		})		
	}
};

var runPolioCompare = function(pre, pAll) {
		var class1 = "pcomps";
		var class2 = "pcomps-two";
	d3.select('#polioCompare').on('click', function (){
		clearIntervals();
		clearAnimationButtons();
		clearAll();
		d3.select('.five').classed('hidden', false);
		hideSliders();
		$('#sldr-five').show();
		comparePolio();
		var years = ['January','February', 'March','April', 'May','June' ,'July','August' ,'September','October' ,'November', 'December'];
		var range = years.length;
		addAxis(years, range);
		compCircles(pre[0], class1, class2);
		labels(pre[0], 0);
		comparelables(pre[0]);
		d3.select('#link-polio').classed('hidden', false);
		d3.select('#pre-txt').text('');
		d3.select('#post-txt').text('');
	})
	var comparePolio = function () {
		d3.select('#sldr-five').on('change', function (){
			compCircles(pre[this.value], class1, class2);
			labels(pre[this.value], this.value);
			comparelables(pre[this.value]);
		})
		svg2.selectAll('circle').remove();
		d3.select('.stats-holder').classed('hidden', true);
		d3.select('.stats-holder-two').classed('hidden', false);
		$('.btn-container').append("<button id='polio-return' class='btn btn-return'>Return to Timeline</button>");
		d3.select("#cases-one").style("color", "#d44ff0");
		d3.select("#cases-two").style("color", "#D300FF");
		$('#polio-return').on('click', function(){
			svg2.selectAll('g').remove();
			polio();
			labels(pAll[0], 0);
			var color = "lercs";
			sliderCircles(pAll[0], color);
			seasons(pAll[0]);
		})
	}
};
/*
=================================================
disease selections
=================================================
*/
var runPox = function (pxAll) {
	d3.select('#pox-page').on('click', function () {
		clearIntervals();
		chikenPox();
		labels(pxAll[0], 0);
		d3.select('#cases').style("color", "#50e3c2");
		d3.selectAll('.graph-btn').style("background-color", "#50e3c2");
		d3.selectAll('.cir').style("background-color", "rgba(80,227,194, 0.7)");
		var color = "percs"
		sliderCircles(pxAll[0], color);
		seasons(pxAll[0]);
		clearAnimationButtons();
		$('.btn-container').append("<button id='chickenpox-animate' class='btn btn-return'>Play Animation</button>")
	 
	 d3.select('#chickenpox-animate').on('click', function(){
	 	$('.btn-container').append("<button id='chickenpox-stop-animate' class='btn btn-return'>Stop Animation</button>");
			d3.select('#chickenpox-animate').remove();
			var slideVal = document.getElementById('sldr')
	 		animateDisease(pxAll, color, slideVal);
	 	
	 	$('#chickenpox-stop-animate').on('click', function(){
			d3.select('#chickenpox-stop-animate').remove();
			clearIntervals();
			sliderCircles(pxAll[slideVal.value], color);
			seasons(pxAll[slideVal.value]);
			labels(pxAll[slideVal.value], slideVal.value);
		})
	 })
	})
	d3.select('#sldr').on('change', function (){
		$('#slider-label').hide();
		poxGraph()
		var color = "percs";
		sliderCircles(pxAll[this.value], color);
		labels(pxAll[this.value], this.value);
		seasons(pxAll[this.value]);
	})
};

var runMeasles = function (msAll) {
	d3.select('#measles-page').on('click', function () {
		clearIntervals();
		measles();
		labels(msAll[0], 0);
		d3.select('#cases').style("color", "#9eda62");
		d3.selectAll('.graph-btn').style("background-color", "#9eda62");
		d3.selectAll('.cir').style("background-color", "rgba(158,218,98, 0.7)");
		var color = "mercs";
		sliderCircles(msAll[0], color);
		seasons(msAll[0]);
		clearAnimationButtons();
	$('.btn-container').append("<button id='measles-animate' class='btn btn-return'>Play Animation</button>")
	 		d3.select('#measles-animate').on('click', function(){
	 	$('.btn-container').append("<button id='measles-stop-animate' class='btn btn-return'>Stop Animation</button>");
	 			d3.select('#measles-animate').remove();
	 			var slideVal = document.getElementById('sldr-two')
	 			animateDisease(msAll, color, slideVal);
	 		$('#measles-stop-animate').on('click', function(){
				d3.select('#measles-stop-animate').remove();
				clearIntervals();
				sliderCircles(msAll[slideVal.value], color);
				seasons(msAll[slideVal.value]);
				labels(msAll[slideVal.value], slideVal.value);
			})
	 	})
	})
	d3.select('#sldr-two').on('change', function (){
		$('#slider-label').hide();
		measlesGraph();
		var color = "mercs";
		sliderCircles(msAll[this.value], color);
		labels(msAll[this.value], this.value);
		seasons(msAll[this.value]);	
	})
};

var runFlu = function (fAll) {
	d3.select('#flu-page').on('click', function () {
		clearIntervals();
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
		clearAnimationButtons();
		$('.btn-container').append("<button id='flu-animate' class='btn btn-return'>Play Animation</button>")
	 			d3.select('#flu-animate').on('click', function(){
	 		$('.btn-container').append("<button id='flu-stop-animate' class='btn btn-return'>Stop Animation</button>");
	 			d3.select('#flu-animate').remove();
	 			var slideVal = document.getElementById('sldr-four')
	 			animateDisease(fAll, color, slideVal);
	 		$('#flu-stop-animate').on('click', function(){
				d3.select('#flu-stop-animate').remove();
				clearIntervals();
				sliderCircles(fAll[slideVal.value], color);
				seasons(fAll[slideVal.value]);
				labels(fAll[slideVal.value], slideVal.value);
			})
	 	})
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
		clearIntervals();
		polio();
		labels(pAll[0], 0);
		var color = "lercs";
		d3.select("#cases").style("color", "#d44ff0");
		d3.selectAll(".graph-btn").style("background-color", "#d44ff0");
		d3.selectAll('.cir').style("background-color", "rgba(212,79,240, 0.7)");
		sliderCircles(pAll[0], color);
		seasons(pAll[0]);
		clearAnimationButtons();
	$('.btn-container').append("<button id='polio-animate' class='btn btn-return'>Play Animation</button>")
	 		d3.select('#polio-animate').on('click', function(){
	 	$('.btn-container').append("<button id='polio-stop-animate' class='btn btn-return'>Stop Animation</button>");
	 			d3.select('#polio-animate').remove();
	 			var slideVal = document.getElementById('sldr-three')
	 			animateDisease(pAll, color, slideVal);
	 		$('#polio-stop-animate').on('click', function(){
				d3.select('#polio-stop-animate').remove();
				clearIntervals();
				sliderCircles(pAll[slideVal.value], color);
				seasons(pAll[slideVal.value]);
				labels(pAll[slideVal.value], slideVal.value);
			})
	 	})
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
	var years = [1972, 1974, 1976, 1978, 1980, 2006, 2008, 2010, 2012, 2014];
	var range = years.length;
	addAxis(years, range);
	hideSliders();
	$('#sldr').show();
	d3.select('#link-pox').classed('hidden', false);
	d3.select('#poxCompare').classed('hidden', false);
	displays();
};

var measles =  function () {
	clearAll();
	var years = [1927, 1935, 1943, 1951, 1959, 1967, 1976, 1983, 1991, 1999];
	var range = years.length;
	addAxis(years, range);
	hideSliders();
	$('#sldr-two').show();
	d3.select('#link-msls').classed('hidden', false);
	d3.select('#measlesCompare').classed('hidden', false);
	displays();
	d3.select(".compare-btn").classed("hidden", false)
};

var flu =  function () {
	clearAll();
	var years = [1927, 1930, 1953, 1935, 1938, 1941, 1943, 1945, 1949, 1951];
	var range = years.length;
	addAxis(years, range);
	hideSliders();
	$('#sldr-four').show();
	d3.select('#link-flu').classed('hidden', false);
	displays();
};

var polio =  function () {
	clearAll();
	var years = [1927, 1932, 1937, 1942, 1947, 1952, 1957, 1962, 1967, 1972];
	var range = years.length;
	addAxis(years, range);
	hideSliders();
	$('#sldr-three').show();
	d3.select('#link-polio').classed('hidden', false);
	d3.select('#polioCompare').classed('hidden', false);
	displays();
};
/*
=================================================
animation functions
=================================================
*/
var animateDisease = function(input, color, slider) {
	svg2.selectAll('circle').remove();
	var num = 0;
	var max = input.length;
	intervalOne = setInterval(function(){
		slider.value = num;
		anCircles(input[num], color);
		seasons(input[num]);
		labels(input[num], num);
			num++;
		if (num == max) {
			clearAnimationButtons();
			clearIntervals();
		}
	}, 300)
};
/*
=================================================
axis
=================================================
*/
var addAxis = function (input, range) {
		d3.select("#slider-svg").text('')
		var xScale = d3.scale.ordinal()
		.domain(d3.range([range]))
		.rangeRoundBands([5, width - 40	], 0.05);
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues(input);
		var svg3 = d3.select("#slider-svg")
			.append('svg')	
			.attr('style', 'width: 100%;height:25px;');
		svg3.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, 0)")
			.call(xAxis);
};
