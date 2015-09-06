angular.module('ang04')
  .directive('employee',['$timeout', function($timeout){
    return{
      restrict: 'A',
      templateUrl:'components/directives/employee/employee.html',
      link: function ($scope){

	  
        $scope.update = function (){
          $scope.onUpdate($scope.employee);
        };

        $scope.remove = function (index){

          $scope.disabledIndex = index;

        };

        $scope.removeConfirm = function (){

          $scope.disabledIndex = -1;
          $timeout(function() {
            $scope.onRemove($scope.employee);
          });

        };

        $scope.noDelete = function (){

          $scope.disabledIndex = -1;

        };
      },
      scope: {
        employee: '=',
        onUpdate: '=',
        onRemove: '=',
        disabledIndex: '=',
        index: '='
      }
    }
  }]);
