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
			scope:{akshar:"=", imgdex:"=", action:"&"},
			templateUrl : 'templates/ConsGameTile.html',			
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