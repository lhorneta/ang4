'use strict';

angular.module('ang04').factory('userService',  function () {

  function getUsers(){
    return localStorage.getItem('employees') || "[]";
  }

  function toEmployeeUpdate(employees){
    localStorage.setItem('employees', angular.toJson(employees));
  }

  
  return {
    getUsers: getUsers,
    toEmployeeUpdate: toEmployeeUpdate
  };
});