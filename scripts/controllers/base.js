angular.module('angularApp').controller('BaseCtrl',['$scope',function($scope){
	
	$scope.title = 'Base';
	
	$scope.world = 'Angular';
	
	$scope.items = [{
		name : '张三'
	},{
		name : '李四'
	},{
		name : '王五'
	}];
	
	$scope.showDiff = function(){
		var ngif = $('#ngIf')[0];
		var ngShow = $('#ngShow')[0];
		var show = '#ngIf:'+ngif+" , #ngShow:"+ngShow;
		alert(show);
	}
	
	$scope.fireClick = function(param){
		alert(param);
	}
}]);