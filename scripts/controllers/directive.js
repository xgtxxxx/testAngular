app.controller('DirectiveCtrl',['$scope',function($scope){
	$scope.name = 'hello';
	
	$scope.age = function(){
		alert('age : 28');
	}
	
	//link
	$scope.imgs = new Array();
	function add(index){
		for(var i=0; i<4; i++){
			$scope.imgs.push(
			  {
				url : 'images/img.png',
				desc : '图片描述'+index+''+(i+1)
			  }
			);
		}
	};
	var row = 1;
	add(row);
	$scope.addMore = function(){
		add(++row);
	}
	
}]);


app.directive('myEg',function(){
	return {
		restrict : 'E',
		replace : true,//替换标签
		transclude: true,//显示原始类容
		templateUrl : 'templates/egBox.html',
		scope : {
			title : '@',
		}
	}
});

//hello
app.directive('myHello',function(){
	return {
		restrict : 'AEC',
		template : '<div>Hello Directive<div>'
	}
});

//scope用法
app.directive('myScope',function(){
	return {
		restrict : 'E',
		template : '<div>name:{{name}} , address : {{address}} , <a role="button" ng-click="getAge()">点击获取age</a><div>',
		scope : {
			name : '@myName',
			address : '=',
			getAge : '&'
		}
	}
});

//link用法
app.directive('imgbox', function () {
    return{
        templateUrl: 'templates/imgBox.html',
        replace: true,
        restrict: 'EA',
        scope: {
            img : '='
        },
        //element:jquery对象
        link: function (scope, elem, attrs) {
        	console.log(attrs);//directive的属性
            elem.on('mouseenter', function () {
            	elem.context.lastElementChild.style.display = 'block';
            });
            elem.on('mouseleave', function () {
            	elem.context.lastElementChild.style.display = 'none';
            });
        }
    };
});

//综合,controller,require..
app.directive('myTabs', function() {
  return {
	restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope) {
      var panels = $scope.panels = [];

      $scope.select = function(panel) {
        angular.forEach(panels, function(panel) {
          panel.selected = false;
        });
        panel.selected = true;
      };

      this.addPanel = function(panel) {
        if (panels.length === 0) {
          $scope.select(panel);
        }
        panels.push(panel);
      };
    },
    templateUrl: 'templates/my-tabs.html'
  };
})
.directive('myPanel', function() {
  return {
	//require 可以依赖多个directive : ['^myTabs','ngModel']
	//The ^ prefix means that this directive searches for the controller on its parents (without the ^ prefix, the directive would look for the controller on just its own element)
    require: '^myTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    //When a directive requires a controller, it receives that controller as the fourth argument of its link function. 
    //如果require了多个directive，则第四个参数就是一个controller数组
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPanel(scope);
    },
    templateUrl: 'templates/my-panel.html'
  };
});