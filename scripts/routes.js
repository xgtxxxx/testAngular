angular.module('angularApp').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/404');
	
	$stateProvider
		.state('home_', {
	      url: '',
	      templateUrl: 'views/home.html',
	      controller: 'HomeCtrl'
	    })
	    .state('home', {
	      url: '/home',
	      templateUrl: 'views/home.html',
	      controller: 'HomeCtrl'
	    })
	    .state('declare', {
	      url: '/declare',
	      templateUrl: 'views/declare.html',
	      controller: 'DeclareCtrl'
	    })
	    .state('base', {
	      url: '/base',
	      templateUrl: 'views/base.html',
	      controller: 'BaseCtrl'
	    })
	    .state('controller', {
	      url: '/controller',
	      templateUrl: 'views/controller.html',
	      controller: 'ControllerCtrl'
	    })
	    .state('serviceApi', {
	      url: '/serviceApi',
	      templateUrl: 'views/serviceApi.html',
	      controller: 'ServiceApiCtrl'
	    })
	    .state('serviceCustom', {
	      url: '/serviceCustom',
	      templateUrl: 'views/serviceCustom.html',
	      controller: 'ServiceCustomCtrl'
	    })
	    .state('directive', {
	      url: '/directive',
	      templateUrl: 'views/directive.html',
	      controller: 'DirectiveCtrl'
	    })
	    .state('others', {
	      url: '/others',
	      templateUrl: 'views/others.html',
	      controller: 'OthersCtrl'
	    })
	    .state('404', {
	      url: '/404',
	      templateUrl: 'views/404.html',
	      controller: ''
	    })
}])