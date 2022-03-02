'use strict';

// Contact form controller
angular.module('myApp.contactForm', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add', {
            templateUrl: 'contactForm/contactForm.html',
            controller: 'ContactFormController'
        });
        $routeProvider.when('/edit/:contactId', {
            templateUrl: 'contactForm/contactForm.html',
            controller: 'ContactFormController'
        });
    }])

    .controller('ContactFormController', [
        '$scope',  '$routeParams','$location', 'ContactsService', 'localStorageService',
        function ($scope, $routeParams, $location, contactsService) {

            var contactId = $routeParams.contactId ? $routeParams.contactId : false;

            if(contactId){
                // If contact id exist then form is being used for editing contact.
                $scope.edit = true;
                $scope.contact = contactsService.getContactDetails(contactId);
                
                $scope.editContactDetails = function () {
                    contactsService.editContactDetails($scope.contact);
                    $scope.contact = contactsService.resetContactForm();
                    $location.path('/contacts');
                };
            }else{
                // If contact id is not present then same form is used for creating new contact.
                $scope.createContact = function () {
                    contactsService.addContact($scope.contact);
                    $scope.contact = contactsService.resetContactForm();
                    $location.path('/contacts');
                };
            }
        }]);