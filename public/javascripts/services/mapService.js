angular.module('mapService', [])

.factory('mapService', function($rootScope, $http) {

    var googleMapService = {},
        locations = [],
        selectedLat = 39.50,
        selectedLong = -98.35; // Location selector defaults to the center of the US

    googleMapService.clickLat = 0;
    googleMapService.clickLong = 0;

    // Refresh the map when new data is available and should be displayed
    googleMapService.refresh = function(latitude, longitude) {

        locations = [];
        selectedLat = latitude;
        selectedLong = longitude;

        $http.get('/stories').success(function(response) {
            locations = convertToMapPoints(response);
            initialize(latitude, longitude);
        }).error(function() {});
    };

    // Convert coordinate locations in database to points on the map
    var convertToMapPoints = function(response) {

        var locations = [];

        for (var i = 0; i < response.length; i++) {
            var story = response[i];
            var contentString =
                '<p><b>' + story.title + '</b>'+
                '<br><i>by ' + story.author + '</i>'+
                '<br><br>' + story.body +
                '</p>';

            locations.push({
                latlon: new google.maps.LatLng(story.location[1], story.location[0]),
                message: new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 320
                }),
                author: story.author,
                title: story.title,
                body: story.body
            });
        }
        return locations;
    };

    // Initialize map
    var initialize = function(latitude, longitude) {

        var myLatLng = {
            lat: selectedLat,
            lng: selectedLong
        };

        if (!map) {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: myLatLng
            });
        }

        // Loop through each location in the array and place a marker
        locations.forEach(function(n, i) {
            var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: "Big Map",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            });

            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e) {
                // When clicked, open the selected marker's message
                currentSelectedMarker = n;
                n.message.open(map, marker);
            });
        });

        // Set initial location as a red marker
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
        lastMarker = marker;

        map.panTo(new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)));

        // Clicking on the map moves the red marker
        google.maps.event.addListener(map, 'click', function(e) {
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            // When a new spot is selected, delete the old red marker
            if (lastMarker) {
                lastMarker.setMap(null);
            }

            // Create a new red marker and move to it
            lastMarker = marker;
            map.panTo(marker.position);

            googleMapService.clickLat = marker.getPosition().lat();
            googleMapService.clickLong = marker.getPosition().lng();
            $rootScope.$broadcast("clicked");
        });

    };

    // Refresh the page upon window load. Use the initial latitude and longitude
    google.maps.event.addDomListener(window, 'load',
        googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;

});
