'use strict';

angular.module('ang04', ['ui.router','ngTable'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
	  .state('power', {
        url: '/power',
		templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
		params:{type:"fPower"}
      })
	  .state('rich', {
        url: '/rich',
		templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
		params:{type:"frich"}
      })
	  .state('genius', {
        url: '/genius',
		templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
		params:{type:"fgenius"}
      })
      .state('home.sidebar', {
        templateUrl: 'components/directives/sidebar/sidebar.html'
      })

    $urlRouterProvider.otherwise('/home');
  });