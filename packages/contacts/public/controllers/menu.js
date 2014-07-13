/**
 * Created by gigent on 7/10/14.
 */
'use strict';

angular.module('mean.contacts').controller('MenuController', ['$scope', 'Global', 'Menus', '$rootScope',
    function($scope, Global, Menus, $rootScope) {
        $scope.global = Global;
        $scope.menus = {};
        $scope.overIcon = false;

        var icons = 'mean-admin/assets/img/icons/';



        // Default hard coded menu items for main menu
        var defaultUserMenu = [{
            'roles': ['authenticated'],
            'title': 'Contact Package View',
            'link': 'contacts example page',
            'icon': icons + 'modules.png'
        }, {
            'roles': ['authenticated'],
            'title': 'Contacts',
            'link': 'all contacts',
            'icon': icons + 'themes.png'
        }];

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('user', defaultUserMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('user', defaultUserMenu);

            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user
            };
        });
    }
]);
