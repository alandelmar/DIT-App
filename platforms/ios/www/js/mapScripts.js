// Callback function

var listingName;

function initMap() {

    // Object containing campus data for map
    var collegeArray = [
        {
            name: "DIT Aungier Street",
            map: "aungierMap",
            coords: {
                lat: 53.338545,
                lng: -6.26607
            }
          },
        {
            name: "DIT Kevin Street",
            map: "kevinMap",
            coords: {
                lat: 53.337015,
                lng: -6.267933
            },

          },
        {
            name: "DIT Bolton Street",
            map: "boltonMap",
            coords: {
                lat: 53.351406,
                lng: -6.268724
            },

          },
        {
            name: "DIT Cathal Brugha Street",
            map: "cathalMap",
            coords: {
                lat: 53.352044,
                lng: -6.259514,
            }

          }
      ];

    // Outputs the maps with campus markers
    collegeArray.forEach(function (college) {

        // Declaring some variables for later use
        var map;
        var service;

        // Assigning centre for new maps
        var mapCenter = new google.maps.LatLng(college.coords.lat, college.coords.lng);

        // Making a new map on each campus page
        map = new google.maps.Map(document.getElementById(college.map), {
            center: mapCenter,
            zoom: 14,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: true,
            fullscreenControl: false,
            // Map theme to make the map more Apple-esque
            styles: [
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f7f1df"
            }
        ]
    },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#d0e3b4"
            }
        ]
    },
                {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "poi.business",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "poi.medical",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#fbd3da"
            }
        ]
    },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#bde6ab"
            }
        ]
    },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffe15f"
            }
        ]
    },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#efd151"
            }
        ]
    },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
            }
        ]
    },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "black"
            }
        ]
    },
                {
                    "featureType": "transit.station.airport",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#cfb2db"
            }
        ]
    },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#a2daf2"
            }
        ]
    }
]
        });

        // Campus marker
        var marker = new google.maps.Marker({
            position: mapCenter,
            title: college.name,
            icon: 'images/icons/school-campus.png',
            map: map
        });

        // New InfoWindow for Campus marker
        var campusInfoWindow = new google.maps.InfoWindow({
            content: college.name
        });

        // Click listener for Campus marker
        marker.addListener('click', function () {
            campusInfowindow.open(map, marker);
        });

        // Request object for Places API
        var request = {
            location: mapCenter,
            radius: 1500,
            type: ['cafe']
        };

        // Callback handler for Places API
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        // new infoWindow 
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: college.coords,
            radius: 1500,
            type: ['cafe'],
        }, callback);

        // Create a marker for each listing upon success
        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }
        

        

        // createMarker function
        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                icon: 'images/icons/restaurant.png',
                position: place.geometry.location
            });
        
            
            // Opens info balloon on click
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent("<div style='font-family: arial'><strong>" + place.name + "</strong><br>" + place.vicinity + "<br>Rating: " + place.rating + "/5</div>");
                infowindow.open(map, this);
            });
            
        } //End createMarker function
        
    }); //End ForEach loop
    
} //End initMap



// Getting user's current location for directions handover link 
function initialize() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userLocated, locationError);
    } else {
        error('positioning not supported.');
    }
}

function userLocated(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    // Aungier Street Directions Link    
    document.getElementById("AungierUrl").href = "https://www.google.ie/maps/dir/" + lat + "," + long + "/DIT+Aungier+Street,+2+Aungier+St,+Dublin,+D02+HW71/@53.3193291,-6.3323375,13z/data=!3m1!4b1!4m16!1m6!3m5!1s0x48670e9e1f574bf9:0x5b3f9c5138831a0!2sDIT+Aungier+Street!8m2!3d53.3385578!4d-6.2665737!4m8!1m1!4e1!1m5!1m1!1s0x48670e9e1f574bf9:0x5b3f9c5138831a0!2m2!1d-6.2665737!2d53.3385578";
    //Kevin Street Directions Link
    document.getElementById("kevinUrl").href = "https://www.google.ie/maps/dir/" + lat + "," + long + "/Dublin+Institute+of+Technology,+Kevin+Street,+Dublin+2,+D08+X622/@53.3194932,-6.332562,13z/data=!3m1!4b1!4m16!1m6!3m5!1s0x48670c2089d84a1d:0x6e1d03e3d62489ae!2sDublin+Institute+of+Technology!8m2!3d53.3371436!4d-6.2682366!4m8!1m1!4e1!1m5!1m1!1s0x48670c2089d84a1d:0x6e1d03e3d62489ae!2m2!1d-6.2682366!2d53.3371436";
    //Bolton Street Directions Link
    document.getElementById("boltonUrl").href = "https://www.google.ie/maps/dir/" + lat + "," + long + "/DIT+Bolton+Street,+Bolton+Street,+Rotunda,+Dublin/@53.3258209,-6.3282826,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x48670c2a08382af9:0x507d384b97c61154!2m2!1d-6.2694601!2d53.351525";
    //Cathal Brugha Street Directions Link
    document.getElementById("cathalUrl").href = "https://www.google.ie/maps/dir/" + lat + "," + long + "/DIT,+Cathal+Brugha+Street,+Rotunda,+Dublin/@53.326089,-6.3256229,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x48670e868b27747d:0xcae8acc7c9da2681!2m2!1d-6.2595657!2d53.3522428";

}

function locationError(error) {
    alert("Please allow access to location to for directions feature");
}




/*

        // Getting nearby restaurants 
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: {
                lat: 53.338545,
                lng: -6.26607
            },
            radius: 2000,
            type: ['cafe'],
        }, callback);


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        icon: 'http://localhost:8888/AlanDelmar_d16128765/images/icons/restaurant.png',
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent("<b>" + place.name + "</b>");
        infowindow.open(map, this);

*/