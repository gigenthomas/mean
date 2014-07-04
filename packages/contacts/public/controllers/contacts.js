'use strict';

angular.module('mean.contacts').controller('ContactsController', ['$scope', 'Global', 'Contacts',
    function($scope, Global, Contacts) {
        $scope.global = Global;
        $scope.package = {
            name: 'contacts'
        };
    }
]);
