

function openNav() {
	document.getElementById("mySidebar").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("mySidebar").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
}

am5.ready(function () {

	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	var root = am5.Root.new("chartdiv");


	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	root.setThemes([
		am5themes_Animated.new(root)
	]);


	// Create the map chart
	// https://www.amcharts.com/docs/v5/charts/map-chart/
	var chart = root.container.children.push(am5map.MapChart.new(root, {
		panX: "rotateX",
		// panY: "rotateY",
		// projection: am5map.geoOrthographic()
		projection: am5map.geoOrthographic()
	}));


	// Create series for background fill
	// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
	var backgroundSeries = chart.series.push(
		am5map.MapPolygonSeries.new(root, {})
	);
	backgroundSeries.mapPolygons.template.setAll({
		fill: am5.color(0x146DFF),
		fillOpacity: 0.2,
		strokeOpacity: 0
	});
	backgroundSeries.data.push({
		geometry:
			am5map.getGeoRectangle(90, 180, -90, -180)
	});


	// Create main polygon series for countries
	// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
	var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
		geoJSON: am5geodata_worldLow
	}));
	polygonSeries.mapPolygons.template.setAll({
		fill: am5.color(0x146DFF),
		fillOpacity: 0.15,
		strokeWidth: 0.25,
		stroke: root.interfaceColors.get("background")
	});
	
	// change color on hover for countries 
	polygonSeries.mapPolygons.template.states.create("hover", {
	  fill: am5.color(0xF90349) //F90349
	});

	// Create point series
	var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

	pointSeries.data.setAll([{
		"geometry": {
			"type": "Point",
			"coordinates": [-73.778137, 40.641312]
		},
		"name": "New York",
		"what": "gja",
		"org": "U of New York",
		"purpose": "Build Trees"
	}, {
		"geometry": {
			"type": "Point",
			"coordinates": [-0.454296, 51.470020]
		},
		"name": "[bold]Study Abroad\n" + "[unbold]London, UK\n" + "2001-Present\n" + "[underline]more",
		"what": "duple tuple",
		"org": "University of London",
		"purpose": "Build boats"

	}, {
		"geometry": {
			"type": "Point",
			"coordinates": [116.597504, 40.072498],
		},
		"name": "Beijing",
		"what": "Big company",
		"org": "U of China",
		"purpose": "Build cars"

	}]);

	//EXAMPLE FOR DB CALL
	$.post("/db", { query: "SELECT * FROM csvjson" }, function (res, req, status) {
		console.log(res[0].TITLE);
		//pointSeries.data.setAll(res.body);
	});
	//console.log("HI\n");
	//console.log(data[0]);

	pointSeries.bullets.push(function () {
		var circle = am5.Circle.new(root, {
			radius: 5,
			fill: am5.color(0xffba00),
			tooltipText: "{name}",
		});

		var ttt = circle.tooltipText;

		circle.events.on("click", function (ev) {
			var markerData = ev.target.dataItem.dataContext;
			var markerDetails = "Name: " + markerData.name + ", What: " + markerData.what + ", Org: " + markerData.org + ", Purpose: " + markerData.purpose;
			sidebarElement.innerHTML = markerDetails;
			ttt.setText(markerData);
		});

		return am5.Bullet.new(root, {
			sprite: circle
		});
	});


	// Make stuff animate on load
	chart.appear(1000, 100);

}); // end am5.ready()
