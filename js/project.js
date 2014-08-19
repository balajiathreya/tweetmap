angular.module('tweetMapModule', ['google-maps'])
.controller('TweetMapController', ['$scope','$http', function ($scope,$http) {
  // Enable the new Google Maps visuals until it gets enabled by default.
  // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
  google.maps.visualRefresh = true;
  
  // defaults to a locale which is global
  DEFAULT_WOEID = 1;

  // default latitude and longitude values. kinda at the center of the global
  // in the north pacific ocean
  $scope.lat = 45.521071299999996;
  $scope.lon = -122.88757439999998;
  $scope.trending = '';
  $scope.selectedLocale = '';

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

  var setTrendingData = function(woeid){
    url = "http://twitterhelper.balajiathreya.com/gettrending?woeid="+woeid;
    var responsePromise = $http.get(url);
    console.log('woeid '+woeid);
    responsePromise.success(function(data, status, headers, config) {      
      $scope.trending = data;
      console.log('trending data: ' + data);
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.trending = data;
    });  
  };

  $scope.map = {
    center: {        
        latitude: $scope.lat,
        longitude: $scope.lon
    },
    options: { draggable: true },
    zoom: 3,
    events : {
      'click': function (mapModel, eventName, originalEventArgs) {
        var e = originalEventArgs[0];
        var lat = e.latLng.lat(),
        lon = e.latLng.lng();
        url = "http://twitterhelper.balajiathreya.com/getWOEID?lat="+lat+'&lon='+lon
        responsePromise = $http.get(url);

        responsePromise.success(function(data, status, headers, config) {
          console.log(data);
	  $scope.trending = data;
          $scope.selectedLocale = data.name;
          woeid = data.woeid;          
          setTrendingData(woeid);
        });

        responsePromise.error(function(data, status, headers, config) {
          $scope.trending = data;
          $scope.selectedLocale = "Couldn't get locale";
          setTrendingData(DEFAULT_WOEID);
        });
        
        // make service call here
        //scope apply required because this event handler is outside of the angular domain
        $scope.$apply();
      }    
    }
  };

  setGeoLocation();
}]);
