'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;


    $scope.authenticated = $scope.global.authenticated ;

}]);