angular.module('tweetMapModule', ['google-maps'])
.controller('TweetMapController', ['$scope', function ($scope) {
  // Enable the new Google Maps visuals until it gets enabled by default.
  // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
  // google.maps.visualRefresh = true;

  $scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 8,
    events : {
      'click': function (mapModel, eventName, originalEventArgs) {
        var e = originalEventArgs[0];
        var lat = e.latLng.lat(),
        lon = e.latLng.lng();
        $scope.map.clickedMarker = {
          id: 0,
          title: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
          latitude: lat,
          longitude: lon
        };
        //scope apply required because this event handler is outside of the angular domain
        $scope.$apply();
        console.log('latitude : '+lat);
        console.log('longitude : '+lon);
      }    
    }
  }
}]);
