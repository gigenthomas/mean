'use strict';

angular.module('mean.contacts').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('contacts example page', {
            url: '/contacts/example',
            templateUrl: 'contacts/views/index.html'
        });
    }
]);
