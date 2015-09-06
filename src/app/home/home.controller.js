'use strict';

angular.module('ang04')

  .controller('HomeCtrl', function ($scope, $filter,$state, $stateParams, userService,ngTableParams,sidebarService) {

    var
      current_state = $state.current.name,
      type_filter = $state.params.type;

	$scope.employees = [];
	$scope.hideEmptyFilter = false;
	
	$scope.employees = angular.fromJson(userService.getUsers());
	sidebarService.setTotal($scope.employees);
	sidebarService.setState(current_state);
	
	$scope.notEmptyFPower = function(item){
		var count = 0;
		angular.forEach($scope.employees, function(employee) {
		  count += employee.fPower ? 1 : 0;
		});
		if(count==0 || current_state === item){return $scope.hideEmptyFilter = true;}
	}
	
	$scope.notEmptyFrich = function(item){
		var count = 0;
		angular.forEach($scope.employees, function(employee) {
		  count += employee.frich ? 1 : 0;
		});
		if(count==0 || current_state === item){return $scope.hideEmptyFilter = true;}

	}
	
	$scope.notEmptyFgenius = function(item){
		var count = 0;
		angular.forEach($scope.employees, function(employee) {
		  count += employee.fgenius ? 1 : 0;
		});
		if(count==0 || current_state === item){return $scope.hideEmptyFilter = true;}
	}
	
    //filter
    $scope.customFilter = function () {

      if(current_state !== 'home'){
        console.log(current_state);
        var filter = null;
        switch (current_state) {
          case 'power':
            filter = {fPower:true};
            break;
          case 'rich':
            filter = {frich:true};
            break;
          case 'genius':
            filter = {fgenius:true};
            break;
        }

        return filter;

      }

    };
    //end filter

    //sort
    var data = $scope.employees;

    $scope.tableParams = new ngTableParams({
      sorting: {
        fName: 'asc'     // initial sorting
      },
      filter: $scope.filters
    }, {
      total: 1, // length of data
      counts: [],
      getData: function($defer, params) {
        $scope.employees = $filter('orderBy')($scope.employees, params.orderBy());
        $defer.resolve($scope.employees);

        var orderedData = params.sorting() ?
          $filter('filter')(data, params.filter()) :
          $scope.employees;

        $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

      }
    });

    //end sort

    $scope.form = {};

    $scope.addUser = function(){
      var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });

      var firstName = $scope.form.firstName || false;
      var superPower = $scope.form.superPower || false;
      var rich = $scope.form.rich || false;
      var genius = $scope.form.genius || false;

      $scope.newEmployee = {id: id, fName: firstName, fPower:superPower,frich:rich,fgenius:genius};
      console.log($scope.newEmployee);
      $scope.employees.push($scope.newEmployee);
      userService.toEmployeeUpdate($scope.employees);
      sidebarService.setTotal($scope.employees);
      $state.go('home');
    };

    $scope.employeeRemove = function(employee){
      $scope.newEmployee = {};
      $scope.newEmployee.id = employee.id;
      $scope.removeUser($scope.newEmployee.id);
    };

    $scope.removeUser = function(newId){
      _.remove($scope.employees, { id: newId });
      userService.toEmployeeUpdate($scope.employees);
      $state.go('home');
    };

    $scope.employeeUpdate = function(employee){
      $scope.newEmployee = {};
      $scope.newEmployee.id = employee.id;
      $scope.newEmployee.firstName = employee.fName;
      $scope.newEmployee.superPower = employee.fPower;
      $scope.newEmployee.rich = employee.frich;
      $scope.newEmployee.genius = employee.fgenius;
      sidebarService.setTotal($scope.employees);
      userService.toEmployeeUpdate($scope.employees);
    };

	
    $scope.obj = {};
    $scope.obj.disabledIndex = -1;
	
  });
