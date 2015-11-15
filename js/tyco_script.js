var data = [
	{	name: "polio",
		description: "Polio spreads from person to person invading the brain and spinal cord and causing paralysis (inability to move). Because polio has no cure, vaccination is the best way to protect people and is the only way to stop the disease from spreading. The spread of polio has never stopped in Afghanistan and Pakistan.",
		pic: ["polio.jpg", "polio2.jpg" ]},

	{	name: "chickenpox",
		description: " Chickenpox is a very contagious disease caused by the varicella-zoster virus (VZV). It causes a blister-like rash, itching, tiredness, and fever. The rash appears first on the trunk and face and can spread over the entire body causing between 250 and 500 itchy blisters…",
		pic: ["chicpox.jpg", "chicpox2.jpg"]},

	{
		name: "measles",
		description: "Measles starts with fever, runny nose, cough, red eyes, and sore throat. It’s followed by a rash that spreads over the body. Measles virus is highly contagious virus and spreads through the air through coughing and sneezing. Make sure you and your child are protected with measles, mumps, and rubella (MMR) vaccine.",
		pic: ["measles.jpg", "measles2.jpg" ]},
	{
		name: "influenza",
		description: "There are many different influenza A viruses; some are found in humans and others in animals such as avian flu in birds and poultry.U.S. H5 Viruses: Highly pathogenic avian influenza (HPAI) H5 infections have been reported in U.S. birds and poultry. No human infections with these viruses have been detected at this time, however similar viruses have infected people in other countries and caused serious illness and death in some cases." ,
		pic: "influenza_kid.jpg"}
];

//jquery functions go here//
$(document).ready(function () {
	//hides animation progress bar//
	$('#prog').hide();
	//reset slider to zero on page load//
	$('#sldr').val('0');
	//hides the slider example on load//
	$('#slider-label').hide();
})
var getData = function() {
	d3.csv('data/chickenpoxParsed.csv', function(error, geo_cor){
		if(error) {console.log(error);}
			else
	//console.log(geo_cor)	
		//holds chickenpox data//
		 var pxAll = [];
		 //counter for data parser//
		 var cng = 72
		//gets year 2000//
		var parseData = function () {
			for(var i = 0; i < 43; i++) {
				var num = cng.toString()
				if(num > 99) {
					num = num.substr(1);
				}
		//using underbar to get 1972-2000//
		pxAll.push(_.where(geo_cor, {month_yr: "Jan-"+ num}), 
		_.where(geo_cor, {month_yr: "Feb-"+ num}),
		_.where(geo_cor, {month_yr: "Mar-" + num}),
		_.where(geo_cor, {month_yr: "Apr-"+ num}),
		_.where(geo_cor, {month_yr: "May-"+ num}),
		_.where(geo_cor, {month_yr: "Jun-"+ num}),
		_.where(geo_cor, {month_yr: "Jul-"+ num}),
		_.where(geo_cor, {month_yr: "Aug-"+ num}),
		_.where(geo_cor, {month_yr: "Sep-"+ num}),
		_.where(geo_cor, {month_yr: "Oct-"+ num}),
		_.where(geo_cor, {month_yr: "Nov-"+ num}),
		_.where(geo_cor, {month_yr: "Dec-"+ num}));
		cng++;
	}
}
	//turn off to speed page for testing//
	parseData();

	//console.log(pxAll)

		//remove 1983 - 2005 where there were no cases//
		pxAll.splice(123, 283)

	//draw map
	drawBigMap();
	
	//format data for graph//
	var getTotals = function () {
		var poxTotals = []
		var xny = []
		poxTotals.push(_.where(geo_cor, {location: "total"}));
		var yearCount = 72;
		var longYearCount = 1972
		var sum = 0;
		for(var i = 0; i< 42; i++) {
			for (var j = 0; j < poxTotals[0].length; j++) {
				var x = parseInt(poxTotals[0][j].month_yr.slice(4), 10);
				var y = parseInt(poxTotals[0][j].cases , 10);
				if(x === yearCount) {
					sum += y;
				}
			}
			if(yearCount > 99) {
			var yearCount = yearCount.toString()
				yearCount = yearCount.substr(1);
			}
			xny.push({x : longYearCount , y: sum})
			yearCount++
			longYearCount++
			sum = 0;
		}
		return new Array({
			area: true, 
			key: "Chickenpox", 
			values: xny 
		})
	};

		//add chart on bottom of the page//
		addFocusChart(getTotals());
		//change color//
		//pox slider//
	d3.select('#sldr').on('change', function (){
		//for testing//
		//console.log(this.value);
		sliderCircles(pxAll[this.value]);
		labels(pxAll[this.value], this.value);
		backColor(pxAll[this.value]);
	})
		//counter to iterate over data array//
		var counter = 1;
		//pox selector and animation button//
		d3.select('#pox-btn').on('click' , function () {
			clearAll()
			//sets interval cancel to null//
			var interValidId = null;
			//gets interval value and runs interval//
			interValidId = setInterval(function(){
					circles(pxAll[counter]);
					labels(pxAll[counter], counter);
					backColor(pxAll[counter]);
						counter++	
					if(counter === pxAll.length-1) {
						//shows animation progress bar//
						$('#prog').fadeOut(500);
						counter = 0;
						//clears interval after 36 months//
						clearInterval(interValidId);
						//removes data//
						clearAll();
					}
			}, 600)//time of animation//
		})
	})
};
getData();



//global variables needed to append svg and circles//
var svg2, projection, map
	var board = d3.select(".board")
	var Width =  parseInt(board.style('width'), 10);
	var Height =  parseInt(board.style('height'), 10);
//map projection//
var  drawBigMap = function(input) {
	//calls label for slider//
	sliderLabel()
	d3.select("svg").remove()
	var margin = 75, width = Width, height = Height - 40, location_data;
	//get map object//
	d3.json('data/us-states.json', function(geo_data){	
	   svg2 = d3.select(".board")
		.append('svg')
		.attr('style', 'width:100%;height:500px;')
		.append('g')
	projection = d3.geo.mercator()
	    .scale(Width * 4.2)
	    .translate([width/.6 , width * 0.70]);
	var path = d3.geo.path().projection(projection)
		map = svg2.selectAll('path')
		.data(geo_data.features) 
		.enter()
		.append('path')
		.attr('class', 'usa')
		.attr('d', path)
		.attr('id', function(d) { return d.properties.name; })
		.style('fill', '#90765F')
		.style('stroke', '#fff')
		.style('stroke-width', 0.5);
	})
};
//fuction prints disease data as circles//	
var circles = function (input) {
		//remover previous circles//
		svg2.selectAll('.crcs').remove();
		svg2.selectAll("circle")
		.data(input)
		.enter()
		.append("circle")
		.attr('class', 'crcs')
		.style('stroke', '#fff')
		.style('stroke-width', 1)
		.transition()
		.duration(10)
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];})
		.each("end", function(){
			d3.select(this)
			 .transition()
			 .ease("linear")
			 .duration(150)
			.attr("r", function(d){
			return Math.sqrt(parseInt(d.cases) * 1)
			})
			.style('opacity', '.4')
		})
};
//adds lables to html//
var labels = function (input, counter) {	
	//console.log(counter)
	//shows animation progress bar//
	$('#prog').fadeIn(200).val(counter)
	d3.select('#year').text(input[1].month_yr);
	d3.select('#sickness').text(input[1].disease.toUpperCase());
	d3.select('#cases').text("Total Cases " + input[49].cases);
	//iterate over data object to set pictures and text//
	for (var i = 0; i < data.length; i++) {
		if(input[1].disease === data[i].name) {
			var pic = document.getElementById('sym-pic')
			pic.src = "images/" + data[i].pic[0];
			var pic = document.getElementById('sym2-pic')
			pic.src = "images/" + data[i].pic[1];
			$('.description-txt').text(data[i].description)
		}
	}
}
//adds text and backColor to season box//
var backColor = function(input) {
		d3.select('.seasons').style("background-image" , function (d) {
			//get year from data for post vaccine test''
			var year = input[1].month_yr.match(/[0-9]/gi).join('');
			//find years where there are no cases and print allert//
			if(year >= 72) {
				d3.select('#post-txt').text('Occurrences Pre-Vaccine');
				d3.select('#post2-txt').text('');
			}
			if(year < 72) {
				d3.select('#post-txt').text('Occurrences Post-Vaccine');
				d3.select('#post2-txt').text('No reported cases between Mar-1982-2006');
			} else
			//parses date field removing year fron the month//
			var month = input[1].month_yr.match(/[a-zA-Z]/gi).join('');
			//sets color and text//
			if(month == 'Jan' || month == 'Feb'|| month == 'Mar' ) {
				d3.select('.seasons').text("Winter")
				return 'url(images/winter.png)';
			} else
			if(month == 'Apr' || month == 'May'|| month == 'Jun' ) {
				d3.select('.seasons').text("Spring")
				return 'url(images/spring.png)';
			} else
			if(month == 'Jul' || month == 'Aug'|| month == 'Sep' ) {
				d3.select('.seasons').text("Summer")
				return 'url(images/summer.png)';
			} else {
			if(month == 'Oct' || month == 'Nov'|| month == 'Dec' ) 
				d3.select('.seasons').text("Fall")
				return 'url(images/fall.png)';
			}
		})	
};

//removes map after aninmation//
var clearAll = function () {
	$('#sldr').val('0')
	d3.select('#year').text('');
	d3.select('#sickness').text('');
	d3.select('#cases').text('');	
	d3.select('.seasons').text("");
	svg2.selectAll('.crcs').remove();
	$('.description-txt').text('');
	var pic = document.getElementById('sym-pic')
	pic.src = "images/chicpox.jpg";
	var pic = document.getElementById('sym2-pic')
	pic.src = "images/influenza_kid.jpg";
	d3.select('#post-txt').text('');
	d3.select('#post2-txt').text('');
}

//fuction prints disease data as circles//	
var sliderCircles = function (input) {
		//remover previous circles//
		svg2.selectAll('.crcs').remove();
		svg2.selectAll("circle")
		.data(input)
		.enter()
		.append("circle")
		.attr('class', 'crcs')
		.style('stroke', '#fff')
		.style('stroke-width', 1)
		.transition()
		.duration(10)
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];})
		.each("end", function(){
			d3.select(this)
			 .transition()
			 .ease("linear")
			 .duration(150)
			.attr("r", function(d){
			return Math.sqrt(parseInt(d.cases) * 1)
			})
			.style('opacity', '.7')
		})
    svg2.selectAll('.crcs')
		.on('mouseover', function (d){
			//these position locations are bullshit need a fix///
			var xposition = parseInt(d3.select(this).attr('cx'));
			var yposition = parseInt(d3.select(this).attr('cy'));
				d3.select('#data-box').classed('hidden', false);
				d3.select('#data-box')
						.style('right', (Width + 10) - xposition + 'px')
						.style('top',  yposition + 'px')
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

var addFocusChart = function(input) {
	nv.addGraph(function () {
		var chart = nv.models.lineWithFocusChart();

		chart.brushExtent([50,70]);

		chart.xAxis.tickFormat(d3.format('Y')).axisLabel("1972 -2013");
		chart.x2Axis.tickFormat(d3.format('Y'));
		chart.yAxis.tickFormat(d3.format(',.0f'));
		chart.y2Axis.tickFormat(d3.format(',.0f'));
		chart.useInteractiveGuideline(true);

		d3.select('#chart').append('svg')
		.datum(input)
		.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});
}

//animation to bring attention to slider bar//
var sliderLabel = function () {
		$('#slider-label').fadeIn(2000).animate({'left': '80%'}, 10000).animate({'left': '3%'}, 10000).fadeOut(2000);

}

//temporary data for graph//
var testData = function () {
  return stream_layers(3,128,.1).map(function(data, i) {
    return {
      key: 'Pox' + i,
      area: i === 1,
      values: data
    };
  });
}
console.log(testData())