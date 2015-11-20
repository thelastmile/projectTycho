
//animated map for landing page

var  drawMap = function() {
	var margin = 75,
		width = 400,
		height = 150,
		svg,
		location_data,
		projection;
	d3.json('data/us-states.json', function(geo_data){
	   svg = d3.select('#animate')
		.append('svg')
		.attr('class', 'shadow')
		.attr('width', width + margin)
		.attr('height', height + margin)
		.append('g')
		.attr('class', 'map')
	 projection = d3.geo.mercator()
	    .scale(2000)
	    .translate([width/.52, height/.45]);
	var path = d3.geo.path().projection(projection)
	var map = svg.selectAll('path')
		.data(geo_data.features) 
		.enter()
		.append('path')
		.attr('d', path)
		.style('fill', '#ffffff')
		.style('stroke', '#2D2D28')
		.style('stroke-width', 0.5)
	setInterval(function () {
		svg.selectAll("circle")
		.data(addLocations(2))
		.enter()
		.append("circle")
		.transition()
		.duration()
		.attr('class', 'plotts')
		.attr("cx", function(d) {
			   return projection([d.lon, d.lat])[0];})
		.attr("cy", function(d) {
			 return projection([d.lon, d.lat])[1];})
			 .attr("r", 1)
			 .each("end", function(){
			 	d3.select(this)
			 		.transition()
			 		.ease("linear")
			 		.duration(3000)
			 		.attr("r", 45)
			 		.style('opacity', '.0')
			 		.style("stroke", "#ffffff")
			 		.style("stroke-width", 2)
					
			 })
			 removeIt()
	}, 3000);
		})
};
drawMap()

var removeIt = function () {
	d3.selectAll('.plotts').remove();
}

var addLocations = function (num){
	var storage = [];
	for (var i = 0; i < num; i++) {
		storage.push({lat: (Math.random() * 7 + 40 ).toString(), lon: (Math.random() * -19 + -93).toString()})
		storage.push({lat: (Math.random() * 6 + 30 ).toString(), lon: (Math.random() * -18 + -100).toString()})
		storage.push({lat: (Math.random() * 2 + 36 ).toString(), lon: (Math.random() * -10 + -110).toString()})
		storage.push({lat: (Math.random() * 2 + 46 ).toString(), lon: (Math.random() * -10 + -110).toString()})
		storage.push({lat: (Math.random() * 7 + 30 ).toString(), lon: (Math.random() * -17 + -80).toString()})
		storage.push({lat: (Math.random() * 9 + 30 ).toString(), lon: (Math.random() * -17 + -80).toString()})
		storage.push({lat: (Math.random() * 7 + 38	 ).toString(), lon: (Math.random() * -17 + -70).toString()})
	}
	return storage;
}