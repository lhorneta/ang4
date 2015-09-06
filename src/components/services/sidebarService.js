'use strict';

angular.module('ang04').factory('sidebarService',  function ($rootScope) {

  var 	employees = [],
		current_state = null;

  function setTotal(employees){
    $rootScope.employees = employees;
  }
  
  function getTotal(){
	return $rootScope.employees;
  }
  
  function setState(state){
    $rootScope.current_state = state;
  }
  
  function getState(){
	return $rootScope.current_state;
  }

  return {
    getTotal: getTotal,
    setTotal: setTotal,
	setState: setState,
	getState: getState
	};
});