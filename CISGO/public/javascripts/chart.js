function openNav() {
	var sidebar = document.getElementById("mySidebar");
	if (sidebar.style.width === "250px") {
	  closeNav();
	} else {
	  sidebar.style.width = "250px";
	  document.getElementById("main").style.marginLeft = "250px";
	}
  }


function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
/*
am5.ready(function () {

    var newPoint = new Object();;
    var pointData = [];
    retrieveCountries().then(array => {
        console.log(array);
        array.forEach(function (array, index) {

            console.log(array);
            newPoint = findCoordsByName(array);
            if (newPoint) {
                pointData.push({
                    "geometry": {
                        "type": "Point",
                        "coordinates": [newPoint[1], newPoint[2]]
                    },
                    "name": array,
                    "what": "gja",
                    "org": "U of New York",
                    "purpose": "Build Trees"
                });

                //String value = (String) jsonObject. get("key_name"); 
                console.log("Name: " + JSON.stringify(pointData));
            }
        });
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

        var testArray = [{
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

        }];
        console.log(JSON.stringify(testArray));
        console.log(JSON.stringify(pointData));
        pointSeries.data.setAll(pointData);


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
                // Get the sidebar links
                var sidebarLinks = document.getElementById("mySidebar");

                sidebarLinks.textContent = markerDetails;
                sidebarLinks.style.fontSize = "16px";
                sidebarLinks.style.color = "white";

                ttt.setText(markerData);
            });

            return am5.Bullet.new(root, {
                sprite: circle
            });
        });


        // Make stuff animate on load
        chart.appear(1000, 100);
    });
    console.log("PointData after resolve: " + JSON.stringify(pointData));



}); // end am5.ready()
*/

am5.ready(function () {

    var newPoint = new Object();
    var pointData = [];
    retrieveCountries().then(countries => {
        console.log(countries);

        countries.forEach(function (row, index) {
            var countryName = row[2];

            console.log(countryName);

            newPoint = findCoordsByName(countryName);

            if (newPoint) {
                pointData.push({
                    "geometry": {
                        "type": "Point",
                        "coordinates": [newPoint[1], newPoint[2]]
                    },
                    "country": row[2],
                    "start_date": row[3],
                    "end_date": row[4],
                    "finished": row[5],
                    "S_U_D": row[6],
                    "eng_type": row[7],
                    "time": row[8],
                    "desc": row[9],
                    "link": row[10],
                    "stu_inv": row[11],
                    "stu_role": row[12],
                    "color": row[14],
                    //bulletSettings: {
                    //    fill: am5.color(row[14])
                    //}
                });

                //String value = (String) jsonObject. get("key_name"); 
                console.log("Name: " + JSON.stringify(pointData));
            }
        });

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
            panY: "rotateY",
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

        pointSeries.data.setAll(pointData);

        pointSeries.bullets.push(function () {
            var circle = am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0xffba00),
                tooltipText: "{country}",
            });

            var ttt = circle.tooltipText;

            circle.events.on("click", function (ev) {
                var markerData = ev.target.dataItem.dataContext;
                var markerDetails =
                    "Country: " + markerData.country + "\n" +
                    "Start Date: " + markerData.start_date + "\n" +
                    "End Date: " + markerData.end_date + "\n" +
                    "Finished: " + markerData.finished + "\n" +
                    "S_U_D: " + markerData.S_U_D + "\n" +
                    "Engagement Type: " + markerData.eng_type + "\n" +
                    "Time: " + markerData.time + "\n" +
                    "Description: " + markerData.desc + "\n" +
                    "Link: " + markerData.link + "\n" +
                    "Student Involvement: " + markerData.stu_inv + "\n" +
                    "Student Role: " + markerData.stu_role + "\n";  
                // Get the sidebar links
                var sidebarLinks = document.getElementById("mySidebar");

                sidebarLinks.textContent = markerDetails;
                sidebarLinks.style.fontSize = "16px";
                sidebarLinks.style.color = "white";

                ttt.setText(markerData);
            });

            return am5.Bullet.new(root, {
                sprite: circle
            });
        });


        // Make stuff animate on load
        chart.appear(1000, 100);
    });
    }); // end am5.ready()