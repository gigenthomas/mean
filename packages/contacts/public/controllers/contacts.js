'use strict';

angular.module('mean.contacts').controller('ContactsController', ['$scope','$stateParams', '$location', 'Global', 'Contacts',
    function($scope,$stateParams, $location,  Global, Contacts) {
        $scope.global = Global;
        $scope.package = {
            name: 'contacts'
        };


        $scope.hasAuthorization = function(contact) {
            if (!contact|| !contact.user) return false;
            return $scope.global.isAdmin || contact.user._id === $scope.global.user._id;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var contact = new Contacts({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    cellPhone:this.cellPhone
                });
                contact.$save(function(response) {
                    $location.path('contacts/' + response._id);
                });

                this.firstName = '';
                this.lastName = '';
                this.cellPhone = '' ;
            } else {
                $scope.submitted = true;
            }
        };



        $scope.remove = function(contact) {
            if (contact) {
                contact.$remove();

                for (var i in $scope.contacts) {
                    if ($scope.contacts[i] === contact) {
                        $scope.contacts.splice(i, 1);
                    }
                }
            } else {
                $scope.contact.$remove(function(response) {
                    $location.path('contacts');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var contact = $scope.contact;
                if (!contact.updated) {
                    contact.updated = [];
                }
                contact.updated.push(new Date().getTime());

                contact.$update(function() {
                    $location.path('contacts/' + contact._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Contacts.query(function(contacts) {
                $scope.contacts = contacts;
            });
        };


        $scope.findOne = function() {
            Contacts.get({
                contactId: $stateParams.contactId
            }, function(contact) {
                $scope.contact = contact;
            });
        };


    }



]);
