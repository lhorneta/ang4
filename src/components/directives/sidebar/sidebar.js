angular.module('ang04')

.directive('sidebar',[function(){
  return{
    restrict: 'E',
    templateUrl:'components/directives/sidebar/sidebar.html',
	controller: function ($scope, $state, $stateParams, sidebarService){

		$scope.$watch('employees',function(){
			if(sidebarService.getTotal()){
				$scope.totalPersons	= sidebarService.getTotal().length;
				$scope.isEmpty = function() {
					if($scope.employees.length==0){
						return false;
					}else{
						return true;
					} 
					
				}
			}

			$scope.countFilters = function(filter) {

				var count = 0;
				angular.forEach($scope.employees, function(employee) {
				  count += employee[filter] ? 1 : 0;
				});

				return count;
			};
			return sidebarService.getTotal();
		},function(newValue,oldValue) {

		},true);
		
		$scope.$watch('current_state',function(){

				var current_state = sidebarService.getState();

				$scope.isActive =function(item){
					if(current_state === item){
						return $scope.showActiveFilter = true;
					}
				}
				
				
				return sidebarService.getState();
			},function(newValue,oldValue) {

		},true);
	
    }
 
  }
}]);
