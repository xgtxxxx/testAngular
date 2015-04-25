var app = angular.module('angularApp');

app.controller('ServiceApiCtrl', [ '$anchorScroll', '$scope', '$location',
		function($anchorScroll, $scope, $location) {

			$scope.gotoTop = function() {
				$location.hash('anchor-top');
				$anchorScroll();
			};
		} ]);

app.controller('AnchorScrollCtrl', [ '$anchorScroll', '$location', '$scope',
		function($anchorScroll, $location, $scope) {
			$scope.gotoBottom = function() {
				var newHash = 'anchor-bottom';
				if ($location.hash() !== newHash) {
					// set the $location.hash to `newHash` and
					// $anchorScroll will automatically scroll to it
					$location.hash('anchor-bottom');
				} else {
					// call $anchorScroll() explicitly,
					// since $location.hash hasn't changed
					$anchorScroll();
				}
			};
		} ]);

app.animation('.slide', function() {
	return {
		enter : function(element, doneFn) {
			jQuery(element).fadeIn(1000, doneFn);
		},
		leave : function(element, doneFn) {
			jQuery(element).fadeOut(1000, doneFn);
		},
		addClass : function(element, className, done) {
			element.addClass(className);
		}
	}
});
app.controller('AnimateCtrl', [ '$scope', '$animate',
  function($scope, $animate) {
	$scope.items = [ {
		name : 'name1'
	}, {
		name : 'name2'
	}, {
		name : 'name3'
	}, {
		name : 'name4'
	} ];
	var doms = new Array();

	$scope.remove = function() {
		var items = $('.slide');
		doms.push(items[0]);
		$animate.leave(items[0]);
	};
	$scope.addFirst = function() {
		var items = $('.slide-box');
		$animate.enter(doms[0], items[0]);
	};
	$scope.setColor = function() {
		var items = $('.slide');
		$animate.addClass(items[0], 'active-red');
	}
} ]);

app.controller('CacheFactoryCtrl', [ '$scope', '$cacheFactory', function($scope, $cacheFactory) {
	$scope.cacheFactory = $cacheFactory('cacheId');
	
	$scope.cacheInfo = {
		key : '',
		value : ''
	}
	
	$scope.keys = new Array();
	
	$scope.putCache = function() {
	    if(!$scope.cacheFactory.get($scope.cacheInfo.key)){
	    	$scope.keys.push($scope.cacheInfo.key);
	    }
	    $scope.cacheFactory.put($scope.cacheInfo.key, $scope.cacheInfo.value);
	};
	
} ]);

//自定义filter返回偶数item
app.filter('odditems',function(){
    return function(inputArray){
        var array = [];
        for(var i=0;i<inputArray.length;i++){
            if(i%2!==0){
                array.push(inputArray[i]);
            }
        }
        return array;
    }
});
app.controller('FilterCtrl',['$scope','$filter',function($scope,$filter){
	  $scope.originalText = 'hello';
	  $scope.filteredText = $filter('uppercase')($scope.originalText);
	  
	  $scope.date = new Date();
	  
	  $scope.friends=[
	             {name:'John', phone:'555-1276',age:30},
                 {name:'Mary', phone:'800-BIG-MARY',age:40},
                 {name:'Mike', phone:'555-4321',age:33},
                 {name:'Adam', phone:'555-5678',age:32},
                 {name:'Julie', phone:'555-8765',age:20},
                 {name:'Juliette', phone:'555-5678',age:60}];
	  $scope.filterAge = 30;
	  $scope.func = function(e){
		  return e.age>=$scope.filterAge;
	  }
                 
}]);

//注册httpinterceptor；
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
}]).factory('HttpInterceptor', ['$q',  function ($q) {
	//声明HttpInterceptor
	 return {
         request: function (config) {
           console.log("========HttpInterceptor request========")
           console.log(config);
           return config;
         },
         requestError: function (rejection) {
           console.log("========HttpInterceptor requestError========")
           console.log(rejection);
           return $q.reject(rejection);
         },
         response: function (response) {
           console.log("========HttpInterceptor response========")
           console.log(response);
           return response;
         },
         responseError: function (rejection) {
           console.log("========HttpInterceptor response========")
           console.log(rejection);
           return $q.reject(rejection);
         }
       };
}]);
app.controller('HttpCtrl',['$scope','$http',function($scope,$http){
	$http.get('/data/data.json').success(function(data, status, headers, config){
		console.log(data);
		$scope.hello = data.hello;
	}).error(function(data, status, headers, config){
		console.log('error:'+status);
	});
	//另一种写法
	$http({
		url : '/data/data.json',
		method : 'get'
	}).success(function(data, status, headers, config){
		console.log(data);
	}).error(function(data, status, headers, config){
		console.log('error:'+status);
	});
}]);

app.controller('IntervalCtrl',['$scope','$interval',function($scope,$interval){
	 $scope.counter = {
	    sec : 0,
	 	mili: 0
	 };
	 var stop;
     $scope.start = function() {
       // Don't start a new fight if we are already fighting
       if ( angular.isDefined(stop) ) return;
       stop = $interval(function() {
    	   $scope.counter.mili++;
    	  if($scope.counter.mili==10){
    		  $scope.counter.sec += 1;
    		  $scope.counter.mili = 0;
    	  }
       }, 100);
     };

     $scope.stop = function() {
       if (angular.isDefined(stop)) {
         $interval.cancel(stop);
         stop = undefined;
       }
     };

     $scope.reset = function() {
       $scope.counter = {
         sec : 0,
	 	 mili: 0
       }
     };

     $scope.$on('$destroy', function() {
       // Make sure that the interval is destroyed too
       $scope.stop();
     });
}]);

app.controller('StateCtrl',['$scope','$state',function($scope,$state){
	 $scope.goHome = function(){
		 $state.go('home');//home is the name in router
	 }
}]);

//自定义controller