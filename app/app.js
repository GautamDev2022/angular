'use strict';

angular.module('myApp', [
    'ngRoute',
    'LocalStorageModule',
    'myApp.services.contactsService',
    'myApp.contacts',
    'myApp.contactForm',
]).
    config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('pb');
        $routeProvider.otherwise({redirectTo: '/contacts'});
    }]);

