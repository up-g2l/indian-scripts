
  'use strict';
	var myApp = angular.module('myApp',[]);	

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

//Controllers

		/* myApp.constant('HINDI_ALPHABETS', function($http){
			 
			var aksExm = null;
			$http.get('includes/hindiAkshar.json').then(function(res){
				this.aksExm =  res.data; console.log(res.data);
			},function(res){alert("Some Error");}
			);

			return aksExm;
		}); */

	myApp.controller('myCtrl', ['$scope','$sce', 'HINDI_ALPHABETS',function($scope,$sce, HINDI_ALPHABETS){
		//$scope.imgShow = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
		$scope.imageShow = true;
		$scope.$watch('imageShow',function(){//console.log("Visibility change.");
					for(var i=0;i<$scope.aksVowels.length; i++){
						$scope.aksVowels[i].vizbl = angular.copy($scope.imageShow);						
					}
					for(var i=0;i<$scope.aksConsonants.length; i++){
						$scope.aksConsonants[i].vizbl = angular.copy($scope.imageShow);						
					}
				//alert("Global Image Show option has changed to "+$scope.imageShow);				
			});
		$scope.isShuffled = false;
		$scope.currAks = "&#2325;"
		$scope.gameIndex = 0;
		//$scope.aksConsonants = HINDI_ALPHABETS.aksConsonants;
		$scope.aksConsonants = angular.copy(HINDI_ALPHABETS.aksConsonants);	
		$scope.aksVowels = angular.copy(HINDI_ALPHABETS.aksVowels);
		$scope.matraPattern = HINDI_ALPHABETS.matraPattern;
		$scope.matra = HINDI_ALPHABETS.matra;
		$scope.matras = HINDI_ALPHABETS.matras;
		$scope.modalImg="";	
		$scope.withMatra = function(aksUtf,index){ 
				   	//$scope.matra = $scope.matraPattern.replace(new RegExp("QUEUQ", 'g'),aksUtf);
				   	//$scope.matras = 
				   	/*angular.forEach($scope.matras, function(value, key){
				   		$scope.matras[key] = aksUtf + value;
				   	});*/
				   	$scope.currAks = aksUtf;
				   	$scope.modalImg = $scope.aksConsonants[index].exm;				   	
		        }
		$scope.changeCurrent = function (index){
			$scope.currAkshar = $scope.aksConsonants[index] ;
		}
			

		$scope.toggleShuffle = function(){
			if(!$scope.isShuffled) {  
				$scope.aksConsonants = shuffle($scope.aksConsonants); 
				$scope.aksVowels = shuffle($scope.aksVowels);
			  	$scope.isShuffled = true; 
			}else{    
				$scope.aksConsonants = angular.copy(HINDI_ALPHABETS.aksConsonants);		
				$scope.aksVowels = angular.copy(HINDI_ALPHABETS.aksVowels);			   	
				$scope.isShuffled = false;
			   }

		}

		$scope.toggleAllImg = function(){
			$scope.imageShow = ! $scope.imageShow;				
		}

		function shuffle (sourceArray) { //Fisher-Yates-Durstenfeld shuffle		
			
			    for (var i = 0; i < sourceArray.length - 1; i++) {
			        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

			        var temp = sourceArray[j];
			        sourceArray[j] = sourceArray[i];
			        sourceArray[i] = temp;
			    }			
		    return sourceArray;
		}		

		
	}]);

	myApp.controller('tileCtrl',function($scope){

	});

	myApp.controller('gameTileCtrl',function($scope){
		//$scope.$parent.toggleShuffle();
		/*if($scope.ordered=='true'){
			    	$scope.$parent.toggleShuffle();
			    	$scope.dynamicGameClass = 'btn_primary';
			    }		
			    else{$scope.dynamicGameClass = 'btn_info';}*/
	});

	myApp.controller('modalCtrl',function($scope){
		//$scope.akshar = $scope.$parent.akshar;
		//$scope.modalImg = $scope.aksConsonants[index].exm;
		//$scope.$digest();
	});

//Directives

	myApp.directive('hindiWordTile',function(){
		return{
			restrict: 'E',			
			scope:{akshar:"=", imgdex:"=", action:"&"},
			templateUrl : 'templates/WordTile.html',			
			controller: 'tileCtrl',
			link:function(scope, element, attribute){				
				scope.showMatraModal = function(){ 
					scope.$parent.withMatra(scope.akshar.utf8Code, scope.imgdex);
				}
				scope.imgShow = scope.$parent.imageShow;
				//scope.$watch('imgShow',function(){console.log('Hello');})
			}			
		};
	});

		myApp.directive('hindiVowelTile',function(){
		return{
			restrict: 'E',
			controller: 'tileCtrl',
			scope:{akshar:"=", imgdex:"=", action:"&"},
			templateUrl : 'templates/HindiVowelTile.html',	
			link:function(scope, element, attribute){				
				scope.showMatraModal = function(){ 
					scope.$parent.withMatra(scope.akshar.utf8Code, scope.imgdex);
				}
				scope.imgShow = scope.$parent.imageShow;
			}		
		};
	});

	myApp.directive('hindiGameTile',function(){
		return{
			restrict: 'E',			
			scope:{akshar:"=", imgdex:"=", ordered:"=", action:"&"},
			templateUrl : 'templates/ConsGameTile.html',			
			controller: 'gameTileCtrl',
			link:function(scope, element, attribute){	
				scope.initGame1 = function(){
					scope.$parent.toggleShuffle();
				}
			/*if(scope.ordered =='left'){
			    	scope.$parent.toggleShuffle();
			    	scope.dynamicGameClass = 'btn_primary';
			    }		
			    else{scope.dynamicGameClass = 'btn_info';}	*/	

				scope.showMatraModal = function(){ 
					scope.$parent.withMatra(scope.akshar.utf8Code, scope.imgdex);
				}
				scope.imgShow = scope.$parent.imageShow;
				//scope.$watch('imgShow',function(){console.log('Hello');})
			}			
		};
	});

    myApp.directive('appModal',function(){
		return{
			restrict: 'E',
			templateUrl : 'templates/matraModal.html'
		};
	});

	myApp.directive('gameHeader',function(){
		return{
			restrict: 'E',
			templateUrl : 'templates/header.html'
		};
	});

	myApp.directive('gameCarousel',function(){
		return{
			restrict: 'E',
			templateUrl : 'templates/carousel.html'
		};
	});

		myApp.directive('gameFeaturettes',function(){
		return{
			restrict: 'E',
			templateUrl : 'templates/featurettes.html'
		};
	});

		myApp.directive('gameFooter',function(){
		return{
			restrict: 'E',
			templateUrl : 'templates/footer.html'
		};
	});

	myApp.directive('gameTile',function(){
		return{
			restrict: 'E',			
			scope:{gameImgShow:"&", akshar:"&",action:"&"},			
			templateUrl : 'templates/GameTile.html',
			controller: function($scope){
				$scope.akshar = $scope.$parent.currAks;
				$scope.imageShow = $scope.$parent.imageShow;
			},
			link:function(scope, element, attribute){				    	
				scope.showMatraModal = function(){ 
					scope.$parent.withMatra(scope.akshar.utf8Code, scope.$parent.gameIndex);
				}
				//scope.imgShow = scope.$parent.imageShow;
				scope.imgShow = false;
				scope.akshar = scope.$parent.aksConsonants[scope.$parent.gameIndex];
				scope.next = function (increment){
					        scope.$parent.gameIndex = scope.$parent.gameIndex + increment;
					        if(scope.$parent.gameIndex <  0 || scope.$parent.gameIndex > 35){
					        	scope.$parent.gameIndex = 0;
					        }
					        	scope.akshar = scope.$parent.aksConsonants[scope.$parent.gameIndex];							
				}
				scope.toggleShuffle = function(){					
					scope.$parent.toggleShuffle();
		        }				
			}			
		};
	});

		myApp.directive('matraTile',function(){
		return{
			restrict: 'E',			
			scope:{currMatra:"&", akshar:"&",action:"&"},			
			templateUrl : 'templates/MatraTile.html',
			controller: function($scope){
				$scope.akshar = $scope.$parent.currAks;
				$scope.matras = $scope.$parent.matras;
				$scope.currMatra = '';
				$scope.imageShow = $scope.$parent.imageShow;
			},
			link:function(scope, element, attribute){				    	
				scope.showMatraModal = function(){ 
					if(scope.akshar.matraJoin){scope.$parent.withMatra(scope.akshar.utf8Code, scope.$parent.gameIndex);}
					else return false;
				}
				//scope.imgShow = scope.$parent.imageShow;
				scope.imgShow = false;
				scope.akshar = scope.$parent.aksConsonants[scope.$parent.gameIndex];
				scope.currMatra = scope.akshar.utf8Code ;
				scope.matra = '';

				scope.next = function (increment){
					        scope.$parent.gameIndex = scope.$parent.gameIndex + increment;
					        if(scope.$parent.gameIndex <  0 || scope.$parent.gameIndex > 35){
					        	scope.$parent.gameIndex = 0;
					        }
					        	scope.akshar = scope.$parent.aksConsonants[scope.$parent.gameIndex];	
					        	scope.currMatra = scope.akshar.utf8Code + scope.matra ; 					
				}
				scope.toggleShuffle = function(){					
					scope.$parent.toggleShuffle();
		        }				
		        scope.nextMatra = function(mat){
		        	scope.matra = mat;
		        	scope.currMatra = scope.akshar.utf8Code + scope.matra ; 
		        }
			}			
		};
	});


 

