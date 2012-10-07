'use strict';

coinMap.controller('MainCtrl', function ($scope) {
    // Set empty infowindow variable
    var infowindow;

    // Set helper function to generate the content for Google Maps info bubble for easy re-use
    var generateInfoContent = function (coin) {

        var windowContent = '<div class="bubble"><h3>' + coin.name + '</h3>';

        if (coin.image !== "") {
            windowContent += '<img src="images/' + coin.image + '" />';
        }

        if (coin.collected === true) {
            windowContent += '<p>You have this coin</p>';
        } else {
            windowContent += '<p>You <strong>do not</strong> have this coin</p>';
        }

        windowContent += '</div>';

        return windowContent;
    };
    
    // Helper function to help set a marker's icon
    var generateIconImage = function (collected) {
        var markerIcon = 'images/marker-default.png'; // create default marker variable
    
        if (collected === true) {
            markerIcon = 'images/marker-green.png'; // overwrite it if the coin is collected
        }
        
        // create a new MarkerImage object with the markerIcon set above
        var pinImage = new google.maps.MarkerImage(
                            markerIcon,
                            new google.maps.Size(21, 34),
                            new google.maps.Point(0,0),
                            new google.maps.Point(10, 34)
                        );
                        
        return pinImage;
    };
    
    // helper function to help set the icon's shadow
    var generateIconShadow = function () {
        var markerShadow = 'images/marker-shadow.png'; // the image for the shadow
        
        // create a new MarkerImage object that holds said shadow image
        var pinShadow = new google.maps.MarkerImage(
                            markerShadow,
                            new google.maps.Size(40, 37),
                            new google.maps.Point(0, 0),
                            new google.maps.Point(12, 35)
                        );
        return pinShadow;        
    };
    
    // Default array of 50 state quarters
    var stateCoins = [
        { "id": 0, "name": "Delaware", "state": "Delaware", "year": 1999, "image": "delaware.png", "collected": false, "lat": 38.910833, "lng": -75.52767 },
        { "id": 1, "name": "Pennsylvania", "state": "Pennsylvania", "year": 1999, "image": "pennsylvania.png", "collected": false, "lat": 41.203322, "lng": -77.194525 },
        { "id": 2, "name": "New Jersey", "state": "New Jersey", "year": 1999, "image": "newjersey.png", "collected": false, "lat": 40.058324, "lng": -74.405661 },
        { "id": 3, "name": "Georgia", "state": "Georgia", "year": 1999, "image": "georgia.png", "collected": false, "lat": 32.157435, "lng": -82.907123 },
        { "id": 4, "name": "Connecticut", "state": "Connecticut", "year": 1999, "image": "connecticut.png", "collected": false, "lat": 41.603221, "lng": -73.087749 },
        { "id": 5, "name": "Massachusetts", "state": "Massachusetts", "year": 2000, "image": "massachusetts.png", "collected": false, "lat": 42.407211, "lng": -71.382437 },
        { "id": 6, "name": "Maryland", "state": "Maryland", "year": 2000, "image": "maryland.png", "collected": false, "lat": 39.045755, "lng": -76.641271 },
        { "id": 7, "name": "South Carolina", "state": "South Carolina", "year": 2000, "image": "scarolina.png", "collected": false, "lat": 33.836081, "lng": -81.163724 },
        { "id": 8, "name": "New Hampshire", "state": "New Hampshire", "year": 2000, "image": "newhampshire.png", "collected": false, "lat": 43.193852, "lng": -71.572395 },
        { "id": 9, "name": "Virginia", "state": "Virginia", "year": 2000, "image": "virginia.png", "collected": false, "lat": 37.431573, "lng": -78.656894 },
        { "id": 10, "name": "New York", "state": "New York", "year": 2001, "image": "ny.png", "collected": false, "lat": 40.714353, "lng": -74.005973 },
        { "id": 11, "name": "North Carolina", "state": "North Carolina", "year": 2001, "image": "ncarolina.png", "collected": false, "lat": 35.759573, "lng": -79.0193 },
        { "id": 12, "name": "Rhode Island", "state": "Rhode Island", "year": 2001, "image": "rhodeisland.png", "collected": false, "lat": 41.580095, "lng": -71.477429 },
        { "id": 13, "name": "Vermont", "state": "Vermont", "year": 2001, "image": "vermont.png", "collected": false, "lat": 44.558803, "lng": -72.577841 },
        { "id": 14, "name": "Kentucky", "state": "Kentucky", "year": 2001, "image": "kentucky.png", "collected": false, "lat": 37.839333, "lng": -84.270018 },
        { "id": 15, "name": "Tennessee", "state": "Tennessee", "year": 2002, "image": "tennessee.png", "collected": false, "lat": 35.517491, "lng": -86.580447 },
        { "id": 16, "name": "Ohio", "state": "Ohio", "year": 2002, "image": "ohio.png", "collected": false, "lat": 40.417287, "lng": -82.907123 },
        { "id": 17, "name": "Louisiana", "state": "Louisiana", "year": 2002, "image": "louisiana.png", "collected": false, "lat": 31.244823, "lng": -92.145024 },
        { "id": 18, "name": "Indiana", "state": "Indiana", "year": 2002, "image": "indiana.png", "collected": false, "lat": 40.267194, "lng": -86.134902 },
        { "id": 19, "name": "Mississippi", "state": "Mississippi", "year": 2002, "image": "mississippi.png", "collected": false, "lat": 32.354668, "lng": -89.398528 },
        { "id": 20, "name": "Illinois", "state": "Illinois", "year": 2003, "image": "illinois.png", "collected": false, "lat": 40.633125, "lng": -89.398528 },
        { "id": 21, "name": "Alabama", "state": "Alabama", "year": 2003, "image": "alabama.png", "collected": false, "lat": 32.318231, "lng": -86.902298 },
        { "id": 22, "name": "Maine", "state": "Maine", "year": 2003, "image": "maine.png", "collected": false, "lat": 45.253783, "lng": -69.445469 },
        { "id": 23, "name": "Missouri", "state": "Missouri", "year": 2003, "image": "missouri.png", "collected": false, "lat": 37.964253, "lng": -91.831833 },
        { "id": 24, "name": "Arkansas", "state": "Arkansas", "year": 2003, "image": "arkansas.png", "collected": false, "lat": 35.20105, "lng": -91.831833 },
        { "id": 25, "name": "Michigan", "state": "Michigan", "year": 2004, "image": "michigan.png", "collected": false, "lat": 44.314844, "lng": -85.602364 },
        { "id": 26, "name": "Florida", "state": "Florida", "year": 2004, "image": "florida.png", "collected": false, "lat": 27.664827, "lng": -81.515753 },
        { "id": 27, "name": "Texas", "state": "Texas", "year": 2004, "image": "texas.png", "collected": false, "lat": 31.968599, "lng": -99.901813 },
        { "id": 28, "name": "Iowa", "state": "Iowa", "year": 2004, "image": "iowa.png", "collected": false, "lat": 41.878003, "lng": -93.097702 },
        { "id": 29, "name": "Wisconsin", "state": "Wisconsin", "year": 2004, "image": "wisconsin.png", "collected": false, "lat": 43.78444, "lng": -88.787868 },
        { "id": 30, "name": "California", "state": "California", "year": 2005, "image": "california.png", "collected": false, "lat": 36.778261, "lng": -119.417932 },
        { "id": 31, "name": "Minnesota", "state": "Minnesota", "year": 2005, "image": "minnesota.png", "collected": false, "lat": 46.729553, "lng": -94.6859 },
        { "id": 32, "name": "Oregon", "state": "Oregon", "year": 2005, "image": "oregon.png", "collected": false, "lat": 43.804133, "lng": -120.554201 },
        { "id": 33, "name": "Kansas", "state": "Kansas", "year": 2005, "image": "kansas.png", "collected": false, "lat": 39.011902, "lng": -98.484246 },
        { "id": 34, "name": "West Virginia", "state": "West Virginia", "year": 2005, "image": "wvirginia.png", "collected": false, "lat": 38.597626, "lng": -80.454903 },
        { "id": 35, "name": "Nevada", "state": "Nevada", "year": 2006, "image": "nevada.png", "collected": false, "lat": 38.80261, "lng": -116.419389 },
        { "id": 36, "name": "Nebraska", "state": "Nebraska", "year": 2006, "image": "nebraska.png", "collected": false, "lat": 41.492537, "lng": -99.901813 },
        { "id": 37, "name": "Colorado", "state": "Colorado", "year": 2006, "image": "colorado.png", "collected": false, "lat": 39.550051, "lng": -105.782067 },
        { "id": 38, "name": "North Dakota", "state": "North Dakota", "year": 2006, "image": "ndakota.png", "collected": false, "lat": 47.551493, "lng": -101.002012 },
        { "id": 39, "name": "South Dakota", "state": "South Dakota", "year": 2006, "image": "sdakota.png", "collected": false, "lat": 43.969515, "lng": -99.901813 },
        { "id": 40, "name": "Montana", "state": "Montana", "year": 2007, "image": "montana.png", "collected": false, "lat": 46.879682, "lng": -110.362566 },
        { "id": 41, "name": "Washington", "state": "Washington", "year": 2007, "image": "washington.png", "collected": false, "lat": 47.751074, "lng": -120.740139 },
        { "id": 42, "name": "Idaho", "state": "Idaho", "year": 2007, "image": "idaho.png", "collected": false, "lat": 44.068202, "lng": -114.742041 },
        { "id": 43, "name": "Wyoming", "state": "Wyoming", "year": 2007, "image": "wyoming.png", "collected": false, "lat": 43.075968, "lng": -107.290284 },
        { "id": 44, "name": "Utah", "state": "Utah", "year": 2007, "image": "utah.png", "collected": false, "lat": 39.32098, "lng": -111.093731 },
        { "id": 45, "name": "Oklahoma", "state": "Oklahoma", "year": 2008, "image": "oklahoma.png", "collected": false, "lat": 35.007752, "lng": -97.092877 },
        { "id": 46, "name": "New Mexico", "state": "New Mexico", "year": 2008, "image": "newmexico.png", "collected": false, "lat": 34.51994, "lng": -105.87009 },
        { "id": 47, "name": "Arizona", "state": "Arizona", "year": 2008, "image": "arizona.png", "collected": false, "lat": 34.048928, "lng": -111.093731 },
        { "id": 48, "name": "Alaska", "state": "Alaska", "year": 2008, "image": "alaska.png", "collected": false, "lat": 64.200841, "lng": -149.493673 },
        { "id": 49, "name": "Hawaii", "state": "Hawaii", "year": 2008, "image": "hawaii.png", "collected": false, "lat": 19.896766, "lng": -155.582782 }
    ];

    // Default array of "territory" quarters
    var territoryCoins = [
        { "id": 50, "name": "District of Columbia", "state": "District of Columbia", "year": 2009, "image": "dc.png", "collected": false, "lat": 38.895112, "lng": -77.036366 },
        { "id": 51, "name": "Puerto Rico", "state": "Puerto Rico", "year": 2009, "image": "pr.png", "collected": false, "lat": 18.220833, "lng": -66.590149 },
        { "id": 52, "name": "Guam", "state": "Guam", "year": 2009, "image": "guam.png", "collected": false, "lat": 13.444304, "lng": 144.793731 },
        { "id": 53, "name": "American Samoa", "state": "American Samoa", "year": 2009, "image": "samoa.png", "collected": false, "lat": -14.305941, "lng": -170.6962  },
        { "id": 54, "name": "U.S. Virgin Islands", "state": "U.S. Virgin Islands", "year": 2009, "image": "virginislands.png", "collected": false, "lat": 18.335765, "lng": -64.896335 },
        { "id": 55, "name": "Northern Mariana Islands", "state": "Northern Mariana Islands", "year": 2009, "image": "marianaislands.png", "collected": false, "lat": 15.0979, "lng": 145.6739 }
    ];

    // Default array of quarters in the "America the Beautiful" set
    var americaTheBeautifulCoins = [
        { "id": 56, "name": "Hot Springs National Park", "state": "Arkansas", "year": 2010, "image": "hotsprings.jpg", "collected": false, "lat": 34.531946, "lng": -93.032585 },
        { "id": 57, "name": "Yellowstone National Park", "state": "Wyoming", "year": 2010, "image": "yellowstone.jpg", "collected": false, "lat": 44.422574, "lng": -110.586703 },
        { "id": 58, "name": "Yosemite National Park", "state": "California", "year": 2010, "image": "yosemite.jpg", "collected": false, "lat": 37.770596, "lng": -119.510771 },
        { "id": 59, "name": "Grand Canyon National Park", "state": "Arizona", "year": 2010, "image": "grandcanyon.jpg", "collected": false, "lat": 36.069637, "lng": -111.875153 },
        { "id": 60, "name": "Mt. Hood National Forest", "state": "Oregon", "year": 2010, "image": "mthood.jpg", "collected": false, "lat": 45.236762, "lng": -121.411491 },
        { "id": 61, "name": "Gettysburg National Military Park", "state": "Pennsylvania", "year": 2011, "image": "gettysburg.jpg", "collected": false, "lat": 39.81232, "lng": -77.246263 },
        { "id": 62, "name": "Glacier National Park", "state": "Montana", "year": 2011, "image": "glacier.jpg", "collected": false, "lat": 48.759613, "lng": -113.787022 },
        { "id": 63, "name": "Olympic National Park", "state": "Washington", "year": 2011, "image": "olympic.jpg", "collected": false, "lat": 47.807357, "lng": -123.577954 },
        { "id": 64, "name": "Vicksburg National Military Park", "state": "Mississippi", "year": 2011, "image": "vicksburg.jpg", "collected": false, "lat": 32.348997, "lng": -90.849643 },
        { "id": 65, "name": "Chickasaw National Recreation Area", "state": "Oklahoma", "year": 2011, "image": "chickasaw.jpg", "collected": false, "lat": 34.45766, "lng": -97.001466 },
        { "id": 66, "name": "El Yunque National Forest", "state": "Puerto Rico", "year": 2012, "image": "yunque.jpg", "collected": false, "lat": 18.294356, "lng": -65.784727 },
        { "id": 67, "name": "Chaco Culture National Historical Park", "state": "New Mexico", "year": 2012, "image": "chacoculture.jpg", "collected": false, "lat": 36.058346, "lng": -107.958955 },
        { "id": 68, "name": "Acadia National Park", "state": "Maine", "year": 2012, "image": "acadia.jpg", "collected": false, "lat": 44.338556, "lng": -68.273335 },
        { "id": 69, "name": "Hawaii Volcanoes National Park", "state": "Hawaii", "year": 2012, "image": "hawaiivolcanoes.jpg", "collected": false, "lat": 19.299004, "lng": -155.356957 },
        { "id": 70, "name": "Denali National Park", "state": "Alaska", "year": 2012, "image": "denali.jpg", "collected": false, "lat": 63.1148, "lng": -151.192606 }
    ];

    // Check if localStorage is set already, if not, set every coin to "false"
    // If localStorage had been set previous, replace 'collected' value with true for the coins that had been set to true before
    // TODO: Find a neater solution for using localStorage and initialising the application parameters
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++ ) {
            if( localStorage['coin_' + i] === "true" ) {
                if ( i < 50 ) {
                    stateCoins[i].collected = true;
                } else if ( i >= 50 && i < 56 ) {
                    territoryCoins[i - 50].collected = true;
                } else {
                    americaTheBeautifulCoins[i - 56].collected = true;
                }
            }
        }
    } else {
        for( var i = 0; i <= 70; i++ ) {
            localStorage['coin_' + i] = false;
        }
    }

    // Make the (possibly changed) arrays available to the scope
    $scope.stateCoins = stateCoins;
    $scope.territoryCoins = territoryCoins;
    $scope.americaTheBeautifulCoins = americaTheBeautifulCoins;

    // Save the collected status of the coin
    $scope.saveCoin = function(id, collected) {
    
        // Save it to localStorage
        localStorage['coin_' + id] = collected;
        
        // Change the icon on the map
        $scope.myMarkers[id].setIcon(generateIconImage(collected));
        
    }

    // Empty markers array
    $scope.myMarkers = [];

    // Set starting variables for the map
    $scope.mapOptions = {
        center: new google.maps.LatLng(50.77515821727249,-113.203125),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Add marker function, gets called for each coin in the arrays
    $scope.addMarker = function(coin) {
        var GLatLng = new google.maps.LatLng(coin.lat, coin.lng);
        
        var marker = new google.maps.Marker({
            map: $scope.coinMap,
            position: GLatLng,
            icon: generateIconImage(coin.collected),
            shadow: generateIconShadow()
        });
        


        // Add the marker into an array for reference
        $scope.myMarkers.push(marker);

        // Add a click event to the marker
        google.maps.event.addListener(marker, "click", function() {
            if (infowindow) { infowindow.close(); } // Close any InfoWindows that may be open
            
            var windowContent = generateInfoContent(coin); // Generate the bubble content
            infowindow = new google.maps.InfoWindow({content: windowContent }); // Create InfoWindow
            infowindow.open($scope.coinMap, marker); // Open the InfoWindow
        });
    };

    // Pan map function that's used to center the map when a coin link is clicked

    $scope.panMap = function(coin) {
        if (infowindow) { infowindow.close(); } // Close any InfoWindows that may be open

        // commented out to let autopan do the work, for now
        //var GLatLng = new google.maps.LatLng(coin.lat, coin.lng); // Create LatLng object
        //$scope.coinMap.panTo(GLatLng); // Center the map to the coin's latitude/longitude
        
        if ( $scope.coinMap.getZoom() < 7 ) {
            $scope.coinMap.setZoom(7); // Zoom in some, but only if we're not zoomed in already
        }

        var windowContent = generateInfoContent(coin); // Generate bubble content

        infowindow = new google.maps.InfoWindow({content: windowContent }); // Create InfoWindow
        infowindow.open($scope.coinMap, $scope.myMarkers[coin.id]); // Open the InfoWindow
    };
});
