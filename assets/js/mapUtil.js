function initMap() {

	var myLatlng = new sogou.maps.Point(13522000,3641093);

	var myOptions = {
		'zoom' : 11,
		'center' : myLatlng
	};
	map = new sogou.maps.Map(document.getElementById("map_container"),
			myOptions);

	var busIcon = new sogou.maps.MarkerImage(
			'images/bus.png',
			new sogou.maps.Size(25, 25), new sogou.maps.Point(0, 0),
			new sogou.maps.Point(15, 15));
	stopIcon = new sogou.maps.MarkerImage(
			'images/stop.png',
			new sogou.maps.Size(20, 34), new sogou.maps.Point(0, 0),
			new sogou.maps.Point(15, 15));

	marker = new sogou.maps.Marker({
		position : myLatlng,
		map : map,
		icon : busIcon
	});

	stopsArray = new Array();
	/*
	 * path = new sogou.maps.Polyline({ path : routePoints, strokeColor :
	 * "#0000FF", strokeOpacity : 0.7, strokeWeight : 3 });
	 * 
	 * path.setMap(map);
	 */
}

function addBusStopIcons(line_stops) {

	console.log('addBusStopIcons');
	for ( var i in line_stops) {
		var s =  line_stops[i];
		var myLatlng = new sogou.maps.LatLng(s['Latitude'], s['Longitude']);
		var busMarker = new sogou.maps.Marker({
			position : myLatlng,
			map : map,
			icon : stopIcon,
			title: s['Station_Name']
		});
		console.log('add',s['Latitude'], s['Longitude']);
		stopsArray.push(busMarker);
		busMarker.setMap(map);
	}
}

function clearAllStopIcons() {
	for ( var i in stopsArray) {
		stopsArray[i].setMap(null);
	}
	stopsArray = [];
}

function centerTo(lat, lng){
    map.setCenter(new sogou.maps.LatLng(lat,lng),15);
}

function setBusStop(lat, lng) {

	var myLatlng = new sogou.maps.LatLng(lat, lng);
	var busMarker = new sogou.maps.Marker({
		position : myLatlng,
		map : map,
		icon : stopIcon
	});
}

function moveBusto(lat, lng) {
	var latlng = new sogou.maps.LatLng(lat, lng);
	marker.setPosition(latlng);
	// dont setCenter for the user need to see the Bustop not the bus
	// map.setCenter(latlng);
}

function getLineInfo(line) {
	console.log("getLineInfo(line) start");
	var request = {
		'map' : map,
		'what' : {
			'keyword' : line,
			'classid' : '96'
		},
		'range' : {
			'city' : "上海",
			'boundFlag' : 0
		}
	};
	var search = new sogou.maps.Search();
	search.search(request, function(res) {
		console.log("call back");
		if (res.data != null) {
			console.log("for loop ", res.data.feature);
			for (i in res.data.feature) {
				if ("公交线路" == res.data.feature[i].detail.subcategory) {

					desc = getLineDesc(res.data.feature[i].caption);
					console.log("line ", desc['title'], desc['name'],
							desc['orig'], desc['dest']);
				}
			}
		}
	});
}

function getLineDesc(strDesc) {
	var idx1 = strDesc.indexOf("(");
	var idx2 = strDesc.indexOf("-");
	var idx3 = strDesc.indexOf(")");
	var name = strDesc.substring(0, idx1);
	var orig = strDesc.substring(idx1 + 1, idx2);
	var dest = strDesc.substring(idx2 + 1, idx3);

	var desc = new Array();
	desc['title'] = strDesc;
	desc['name'] = name;
	desc['orig'] = orig;
	desc['dest'] = dest;
	return desc;
}
