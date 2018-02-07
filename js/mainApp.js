
  'use strict';
	var myApp = angular.module('myApp',["ngRoute",'ngAnimate']);	

 /*myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'templates/home.html',
          controller:'myCtrl'
        })
        .when('/pracMatras', {
          templateUrl: 'templates/matraTile.html',
          controller:'myCtrl'
        })
        .when('/pracCons', {
          templateUrl: 'templates/home.html',
          controller:'myCtrl'
        })
        .when('/alpha:all', {
          templateUrl: 'templates/home.html',
          controller:'myCtrl'
        })
        .otherwise({
							redirectTo: "/home"
						})

      //$locationProvider.html5Mode(true);
  }])*/

//Filters
	myApp.filter('safeHTML',function($sce){
	    return function(input){
	        return $sce.trustAsHtml(input);
	    }
	});

	myApp.filter('range', function() {
	  return function(input, total) {
	    total = parseInt(total);

	    for (var i=325; i<total; i++) {
	    	var str = '&#2'+i+';'
	      input.push(str);
	    }

	    return input;
	  };
	});