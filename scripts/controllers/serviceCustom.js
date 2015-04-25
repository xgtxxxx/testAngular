var app = angular.module('angularApp');

//$modal dependence ui-bootstrap
app.factory('factoryService',['$modal', function ($modal){
	 return {
         openModal : function (params) {
           return $modal.open({
             templateUrl: 'modalTemplate',
             controller: 'ModalTemplateCtrl',
             resolve: {
            	 params : function(){
            		 return params;
            	 }
             }
           });
         }
	 };
}]);

app.controller('ModalTemplateCtrl',['$scope','$modalInstance','params',function($scope, $modalInstance, params){
	$scope.hello = params;
	$scope.ok = function(){
		alert($scope.hello);
	}
	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
}]);

//service

app.service('cookieUtil',['$cookieStore',function($cookieStore){
	
	this.put = function(key,value){
		$cookieStore.put(key, value);
	}
	this.get = function(key){
		return $cookieStore.get(key);
	}
}]);

//provider

app.provider('Msg',function(){
	this.$get = ['$modal',function($modal){
		return{
			alert : function(title,info){
				return $modal.open({
	             templateUrl: 'alertTemplate',
	             controller: 'MsgCtrl',
	             size : 'sm',
	             resolve: {
	            	 params : function(){
	            		 return {
	            			 title : title,
	            			 info : info
	            		 };
	            	 }
	             }
	           });
			},
			confirm : function(title,info,func){
				return $modal.open({
	             templateUrl: 'confirmTemplate',
	             controller: 'MsgCtrl',
	             size : 'sm',
	             resolve: {
	            	 params : function(){
	            		 return {
	            			 title : title,
	            			 info : info,
	            			 callback : func
	            		 };
	            	 }
	             }
	           });
			}
		}
	}]
});
app.controller('MsgCtrl',['$scope','$modalInstance','params',function($scope, $modalInstance, params){
	$scope.params = params;
	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
		if($scope.params.callback){
			return $scope.params.callback("no");
		}
	}
	
	$scope.ok = function(){
		$modalInstance.dismiss('cancel');
		return $scope.params.callback("yes");
	}
}]);



app.controller('ServiceCustomCtrl',['$scope','factoryService','cookieUtil','Msg',function($scope, factory, cookieUtil, Msg){
	$scope.openModal = function(){
		factory.openModal($scope.hello);
	};
	
	var key = "mycookie";
	
	$scope.value="";
	$scope.putCookie = function(){
		cookieUtil.put(key,$scope.value);
		$scope.cookie = cookieUtil.get(key);
	}
	
	$scope.alert = function(){
		Msg.alert("Alter",$scope.msg);
	}
	
	$scope.confirm = function(){
		Msg.confirm("Confirm",$scope.msg,function(flag){
			alert(flag);
		});
	}
}]);

