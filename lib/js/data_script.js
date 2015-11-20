
//d3.csv('data/chickenpoxParsed.csv', function(geo_cor) {
		// console.log(geo_cor)
		// parsePoxData(geo_cor);
		// //getTotals(geo_cor)
		//prePoxData(geo_cor)
		//console.log(geo_cor)
		//prePoxTotals(geo_cor)

//})
var prePoxTotals = function (geo_cor) {
	poxTotals = _.where(geo_cor, {location: "total"});
	poxTotals.splice(0, 276)
	poxTotals.splice(131, poxTotals.length -1 )
	console.log(poxTotals)
	var clean_data = JSON.stringify(poxTotals);
	$('#poxDataGraph').text(clean_data);
};

/*var prePoxTotals = function (geo_cor) {
	var poxTotals = []
	var xny = []
	var counter = 1;
	var sum = 0;
	var y = 1978;
	var year = y.toString();
	var jan = year + ".083333"
	var feb = year + ".166667"
	var mar = year + ".25"
	console.log(jan.toString())
	poxTotals.push(_.where(geo_cor, {location: "total"}));
	var data = poxTotals[0]
		console.log(poxTotals[0])
	
	for (var i = 0; i < data.length; i++) {
		var date = data[i].time
		if(date == jan || date == feb || date || mar ) {
			sum += parseInt(data[i].cases, 10)
			counter++
		}
	};
	console.log(counter)
};*/

var prePoxData = function (geo_cor) {
		var pxAll = [];
		var cng = 1972
		for(var i = 0; i < 43; i++) {
			var num = cng.toString()
			//using underbar to get 1972-2000//
			pxAll.push( 
			_.where(geo_cor, {time: num + ".833333"}),
			_.where(geo_cor, {time: num + ".916667"}),
			_.where(geo_cor, {time: (parseInt(num) + 1).toString()})
			)
			cng++;
		}
		pxAll.splice(0, 69)
		pxAll.splice(34, pxAll.length)
		console.log(pxAll)
		var clean_data = JSON.stringify(pxAll);
		$('#poxDataGraph').text(clean_data);
}
	
var parsePoxData = function (geo_cor) {
		var pxAll = [];
		var cng = 1972
		for(var i = 0; i < 43; i++) {
			var num = cng.toString()
			//using underbar to get 1972-2000//
			pxAll.push(_.where(geo_cor, {time: num + ".083333"}), 
			_.where(geo_cor, {time: num + ".166667"}),
			_.where(geo_cor, {time: num + ".25"}),
			_.where(geo_cor, {time: num + ".333333"}),
			_.where(geo_cor, {time: num + ".416667"}),
			_.where(geo_cor, {time: num + ".5"}),
			_.where(geo_cor, {time: num + ".583333"}),
			_.where(geo_cor, {time: num + ".666667"}),
			_.where(geo_cor, {time: num + ".75"}),
			_.where(geo_cor, {time: num + ".833333"}),
			_.where(geo_cor, {time: num + ".916667"}),
			_.where(geo_cor, {time: (parseInt(num) + 1).toString()}));
			cng++;
		}
		//pxAll.splice(121, 292)
		console.log(pxAll[0])
		var clean_data = JSON.stringify(pxAll[0]);
		$('#poxGraphData').text(clean_data);
}

		//format data for graph//
var getTotals = function (geo_cor) {
	var poxTotals = []
	var xny = []
	poxTotals.push(_.where(geo_cor, {location: "total"}));
	//console.log(poxTotals[0][0].time.slice(0,4))
	var yearCount = 1972;
	var sum = 0;
	for(var i = 0; i< 42; i++) {
		for (var j = 0; j < poxTotals[0].length; j++) {
			var x = parseInt(poxTotals[0][j].time.slice(0,4), 10);
			var y = parseInt(poxTotals[0][j].cases , 10);
			if(x === yearCount) {
				sum += y;
			}
		}
		xny.push({x : yearCount , y: sum})
		yearCount++
		sum = 0;
		}
		var graph_data = JSON.stringify(new Array({color: "rgba(225, 121, 14, 0.7)", key: "Chickenpox", values: xny}));
		$('#poxGraphData').text(graph_data)
};



//d3.csv('data/measlesParsed.csv', function(mdata){
		//console.log(mdata)
		//getMeaslesTotals(mdata)
		//premeaslesTotals(mdata)
//})
var premeaslesTotals = function (mdata) {
	mTotals = _.where(mdata, {location: "total"});
	mTotals.splice(0, 422)
	mTotals.splice(132, mTotals.length -1 )
	console.log(mTotals)
	var clean_data = JSON.stringify(mTotals);
	$('#poxDataGraph').text(clean_data);
};


var getMeaslesTotals = function (mdata) {
	var mTotals = []
	var xny = []
	mTotals.push(_.where(mdata, {location: "total"}));
	console.log(mTotals)
	var yearCount = 1930;
	var sum = 0;
	for(var i = 0; i< 70; i++) {
		for (var j = 0; j < mTotals[0].length; j++) {
			var x = parseInt(mTotals[0][j].time.slice(0,4), 10);
			var y = parseInt(mTotals[0][j].cases , 10);
			if(x === yearCount) {
				sum += y;
			}
		}
		xny.push({x : yearCount , y: sum})
		yearCount++
		sum = 0;
		}
		console.log(xny)
		var graph_data = JSON.stringify(new Array({color: "rgba(244, 67, 54, 0.7)", key: "measles", values: xny}));
		$('#poxGraphData').text(graph_data)
};
var getMeaslesData = function (mdata) {
	var msAll = [];
	//counter for data parser//
	var dt = 1927
		//gets year 2000//
		for(var i = 0; i < 73; i++) {
			var num = dt.toString()
			//using underbar to get 1972-2000//
			msAll.push(_.where(mdata, {time: num + ".083333"}), 
			_.where(mdata, {time: num + ".166667"}),
			_.where(mdata, {time: num + ".25"}),
			_.where(mdata, {time: num + ".333333"}),
			_.where(mdata, {time: num + ".416667"}),
			_.where(mdata, {time: num + ".5"}),
			_.where(mdata, {time: num + ".583333"}),
			_.where(mdata, {time: num + ".666667"}),
			_.where(mdata, {time: num + ".75"}),
			_.where(mdata, {time: num + ".833333"}),
			_.where(mdata, {time: num + ".916667"}),
			_.where(mdata, {time: (parseInt(num) + 1).toString()}));
			dt++;
		}
		console.log(msAll)
		var clean_data = JSON.stringify(msAll);
		$('#poxGraphData').text(clean_data);
};


d3.csv('data/polioParsed.csv', function(idata){
	// console.log(idata)
	prepolioTotals(idata);
	// getPolioTotals(idata)
});


var prepolioTotals = function (idata) {
	pTotals = _.where(idata, {location: "total"});
	pTotals.splice(0, 326)
	pTotals.splice(132, pTotals.length -1 )
	console.log(pTotals)
	var clean_data = JSON.stringify(pTotals);
	$('#poxDataGraph').text(clean_data);
};
var getPolioTotals = function (idata) {
	var pTotals = []
	var xny = []
	pTotals.push(_.where(idata, {location: "total"}));
	console.log(pTotals)
	var yearCount = 1927;
	var sum = 0;
	for(var i = 0; i< 46; i++) {
		for (var j = 0; j < pTotals[0].length; j++) {
			var x = parseInt(pTotals[0][j].time.slice(0,4), 10);
			var y = parseInt(pTotals[0][j].cases , 10);
			if(x === yearCount) {
				sum += y;
			}
		}
		xny.push({x : yearCount , y: sum})
		yearCount++
		sum = 0;
		}
		console.log(xny)
		var graph_data = JSON.stringify(new Array({color: "rgba(76, 175, 80, 0.7)", key: "polio", values: xny}));
		$('#poxGraphData').text(graph_data)
};
var getPolioData = function (idata) {
	var pAll = [];
	//counter for data parser//
	var dt = 1927
		//gets year 2000//
		for(var i = 0; i < 46; i++) {
			var num = dt.toString()
			//using underbar to get 1972-2000//
			pAll.push(_.where(idata, {time: num + ".083333"}), 
			_.where(idata, {time: num + ".166667"}),
			_.where(idata, {time: num + ".25"}),
			_.where(idata, {time: num + ".333333"}),
			_.where(idata, {time: num + ".416667"}),
			_.where(idata, {time: num + ".5"}),
			_.where(idata, {time: num + ".583333"}),
			_.where(idata, {time: num + ".666667"}),
			_.where(idata, {time: num + ".75"}),
			_.where(idata, {time: num + ".833333"}),
			_.where(idata, {time: num + ".916667"}),
			_.where(idata, {time: (parseInt(num) + 1).toString()}));
			dt++;
		}
		pAll.splice(0, 10)
		pAll.splice(531, 11)
		console.log(pAll)
	var clean_data = JSON.stringify(pAll);
		$('#poxMaidata').text(clean_data);
};

// d3.csv('data/influenzaParsed.csv', function(idata){
	 // console.log(idata)
	// getFluTotals(idata)
 // });
var getFluTotals = function (idata) {
	var pTotals = []
	var xny = []
	pTotals.push(_.where(idata, {location: "total"}));
	console.log(pTotals)
	var yearCount = 1927;
	var sum = 0;
	for(var i = 0; i< 25; i++) {
		for (var j = 0; j < pTotals[0].length; j++) {
			var x = parseInt(pTotals[0][j].time.slice(0,4), 10);
			var y = parseInt(pTotals[0][j].cases , 10);
			if(x === yearCount) {
				sum += y;
			}
		}
		xny.push({x : yearCount , y: sum})
		yearCount++
		sum = 0;
		}
		console.log(xny)
		var graph_data = JSON.stringify(new Array({color: "rgba(188, 197, 60, 0.7)", key: "polio", values: xny}));
		$('#poxGraphData').text(graph_data)
}
var getFluData = function (idata) {
	var fAll = [];
	//counter for data parser//
	var dt = 1927
		//gets year 2000//
		for(var i = 0; i < 25; i++) {
			var num = dt.toString()
			//using underbar to get 1972-2000//
			fAll.push(_.where(idata, {time: num + ".083333"}), 
			_.where(idata, {time: num + ".166667"}),
			_.where(idata, {time: num + ".25"}),
			_.where(idata, {time: num + ".333333"}),
			_.where(idata, {time: num + ".416667"}),
			_.where(idata, {time: num + ".5"}),
			_.where(idata, {time: num + ".583333"}),
			_.where(idata, {time: num + ".666667"}),
			_.where(idata, {time: num + ".75"}),
			_.where(idata, {time: num + ".833333"}),
			_.where(idata, {time: num + ".916667"}),
			_.where(idata, {time: (parseInt(num) + 1).toString()}));
			dt++;
		}
		fAll.splice(0, 10)
		console.log(fAll)
	var clean_data = JSON.stringify(fAll);
		$('#poxMap').text(clean_data);
};


var makeJson = function () {
	
var theData = [
	{	name: "polio",
		years: "1927-1972",
		caption: "Skin Symptoms",
		description: "Polio spreads from person to person invading the brain and spinal cord and causing paralysis (inability to move). Because polio has no cure, vaccination is the best way to protect people and is the only way to stop the disease from spreading. The spread of polio has never stopped in Afghanistan and Pakistan.",
		pic: ["polio2.jpg", "polio.jpg" ]},

	{	name: "chickenpox",
		years: "1972-2014",
		caption: "Skin Symptoms",
		description: " Chickenpox is a very contagious disease caused by the varicella-zoster virus (VZV). It causes a blister-like rash, itching, tiredness, and fever. The rash appears first on the trunk and face and can spread over the entire body causing between 250 and 500 itchy blisters…",
		pic: ["chicpox.jpg", "chicpox2.jpg"]},

	{
		name: "measles",
		years: "1930-1999",
		caption: "Skin Symptoms",
		description: "Measles starts with fever, runny nose, cough, red eyes, and sore throat. It’s followed by a rash that spreads over the body. Measles virus is highly contagious virus and spreads through the air through coughing and sneezing. Make sure you and your child are protected with measles, mumps, and rubella (MMR) vaccine.",
		pic: ["measles.jpg", "measles2.jpg" ]},
	{
		name: "flu",
		years: "1930-1951",
		caption: "Skin Symptoms",
		description: "There are many different influenza A viruses; some are found in humans and others in animals. H5 Viruses: Highly pathogenic avian influenza (HPAI) H5 infections have been reported in U.S. birds and poultry. No human infections with these viruses have been detected at this time, however similar viruses have infected people in other countries and caused serious illness and death in some cases." ,
		pic: ["flexslider-vic-webinar.jpg", "measles2.jpg"]}
];
	 var allData = [];
 for(var i = 0; i < theData.length; i++) {
	 allData.push(theData[i])
 }
 console.log(allData)

	var clean_data = JSON.stringify(allData);
		d3.select('#print').text(clean_data);

}
//makeJson();
















d3.json('data/us-states-pox.json', function (json){
	d3.json('data/pox.json', function (data){
		for(var i = 0; i< data.length; i++ ) {
			var dataState = data[i].location.toUpperCase();
			var dataValue = data[i].cases
			for(var j = 0; j < json.features.length; j++) {
				var jsonState = json.features[j].properties.name.toUpperCase();
				if (dataState == jsonState) {
					json.features[j].properties.value = dataValue;
					break
				}
			}
		}
	//console.log(json)
	//drawBigMap(json)
	})
})

var  drawBigMap = function(json) {
var svg2, projection, map, xAxis;
	var color = d3.scale.quantize();
		color.range(["#E1BEE7", "#BA68C8", "#AB47BC", "#9C27B0","#8E24AA","#7B1FA2","#6A1B9A","#4A148C","#EA80FC","#E040FB","#D500F9","#AA00FF"]);
		color.domain([0, 660])
		//get map object//
	
	var margin = 75,
		width = 1315,
		height = 415;
	svg2 = d3.select(".board")
		.append('svg')
		.attr('width', width + margin)
		.attr('height', height + margin)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
	projection = d3.geo.mercator()
	    .scale(width * 3.8)
	    .translate([width/.645 , width * 0.604]);
	var path = d3.geo.path().projection(projection)
		map = svg2.selectAll('path')
		.data(json.features) 
		.enter()
		.append('path')
		.attr('class', 'usa')
		.attr('d', path)
		.attr('id', function(d) { return d.properties.name; })
		.style('fill', function (d) {
			var value = d.properties.value;
			if(value) {
				return color(value)
			} else {
				return "#F3E5F5";
			}
		})
		.style('stroke', '#000')
		.style('stroke-width', 0.5);
};