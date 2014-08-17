angular.module('tweetMapModule', ['google-maps'])
.controller('TweetMapController', ['$scope', function ($scope) {
  // Enable the new Google Maps visuals until it gets enabled by default.
  // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
  google.maps.visualRefresh = true;

  // default latitude and longitude values. kinda at the center of the global
  // in the north pacific ocean
  $scope.lat = 45.521071299999996;
  $scope.lon = -122.88757439999998;

  var setGeoLocation = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position){
            $scope.lat = position.coords.latitude;
            $scope.lon = position.coords.longitude;
          },
          function( error ){
            console.log( "Something went wrong: ", error );
          },
          {}
        );
    }    
  };

  $scope.map = {
    center: {        
        latitude: $scope.lat,
        longitude: $scope.lon
    },
    zoom: 3,
    events : {
      'click': function (mapModel, eventName, originalEventArgs) {
        var e = originalEventArgs[0];
        var lat = e.latLng.lat(),
        lon = e.latLng.lng();

        console.log('lat '+lat);
        console.log('lon '+lon);
        // make service call here
        //scope apply required because this event handler is outside of the angular domain
        $scope.$apply();
      }    
    }
  };

  setGeoLocation();
}]);
