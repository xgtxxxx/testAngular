/**
 * angular.module('angularApp')是获取app.js里面声明的app，该app是单例。在此不能在module里面加上[]。
 */
var app = angular.module('angularApp');
//parent controller
/**
 * 声明controller
 * 注意:
 * 1、声明controller必须有一个名字，不能重名。如：DeclareCtrl，
 * 2、function前面必须写上需要注入的service，
 */
app.controller('ControllerCtrl',['$scope','$rootScope',function($scope,$rootScope){
	//每个$scope都可以获取到$rootScope
	$scope.isEqual = $scope.$root===$rootScope;//isEqual==true;
	
	$rootScope.rootData = 'This is root scope, but all scope can read';
	
	$scope.parentData = 'This is parent scope, all child scope can read';
	
	
}]);

app.controller('ChildCtrl',['$scope',function($scope){
	var parentData = $scope.$parent.parentData;
	$scope.myParentData = parentData;
}]);