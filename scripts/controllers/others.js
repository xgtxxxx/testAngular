app.controller('OthersCtrl',['$scope',function($scope){
	
	$scope.goods = {
		
	};
	$scope.cart = {
		totalAmount : 0,
		items : []
	};
	$scope.addGoods = function(form){
		if(form.$invalid){
			$('form[name=goodForm]').addClass('error-form');
			return ;
		}
		$scope.cart.items.push(angular.copy($scope.goods));
	};
	$scope.reset = function(){
		$scope.goods = {
		};
		$('form[name=goodForm]').removeClass('error-form');
	};
	$scope.removeGoods = function(index){
		$scope.cart.items.splice(index,1);
	};
	$scope.$watch('cart.items',function(newVal,oldVal){
		var amt = 0;
		angular.forEach($scope.cart.items,function(item){
			amt+=(item.amount*item.count);
		});
		$scope.cart.totalAmount = amt;
	},true);
}]);