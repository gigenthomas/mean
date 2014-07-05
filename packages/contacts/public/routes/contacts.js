'use strict';

angular.module('mean.contacts').config(['$stateProvider',
    function($stateProvider) {

        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };




        $stateProvider
            .state('contacts example page', {
            url: '/contacts/example',
            templateUrl: 'contacts/views/index.html'
        })

            .state('all contacts', {
                url: '/contacts',
                templateUrl: 'contacts/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('create contact', {
                url: '/contacts/create',
                templateUrl: 'contacts/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('edit contact', {
                url: '/contacts/:contactId/edit',
                templateUrl: 'contacts/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })


            .state('contact by id', {
                url: '/contacts/:contactId',
                templateUrl: 'contacts/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });   // Pay special attention to this semicolon

    }
]);
