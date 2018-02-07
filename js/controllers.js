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
		//$scope.imgShow = true; 
	});

	myApp.controller('modalCtrl',function($scope){
		//$scope.akshar = $scope.$parent.akshar;
		//$scope.modalImg = $scope.aksConsonants[index].exm;
		//$scope.$digest();
	});