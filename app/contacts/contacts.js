'use strict';

// Contact List Controller
angular.module('myApp.contacts', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsCtrl'
        });
    }])

    .controller('ContactsCtrl', [
        '$scope', '$location', '$q', '$http', 'ContactsService',
        function ($scope, $location, $q, $http, contactsService) {

            // Get latest contact list from server when app is loaded for first time.
            // After the API responds, contacts are added to local storage.
            $scope.getContacts = function() {
                $http.get("https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts")
                    .then(function(response) {
                        contactsService.updateContactsInLocalStorage(response.data);
                        $scope.contacts = contactsService.getContacts();
                    }, function(response) {
                        // defer the promise
                        return $q.reject(response.data);
                    });
            };

            // Redirect to contact from for editing contact on click of edit icon in list.
            $scope.editContact = function (id) {
                $location.path('/edit/' + id);
            };

            // Delete contact from list when delete icon is clicked.
            $scope.deleteContact = function (id) {
                contactsService.deleteContact(id);
                $scope.contact = contactsService.resetContactForm();
                $location.path('/contacts');
            };

            $scope.getContacts();
        }]);