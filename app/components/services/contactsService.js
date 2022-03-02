'use strict';

// Service to perform CRUD operations on contacts.
angular.module('myApp.services.contactsService', [])
    .factory('ContactsService', [ 'localStorageService',
        function (localStorageService) {
           
            // Add contact in contact list and update storage.
            var addContact = function (contact) {
                contact.id = contacts.length+1;
                contacts.push(contact);
                updateContactsInLocalStorage(contacts);
            };

            // Edit existing contact in contact list and update latest data in storage.ß
            var editContactDetails = function (contact) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == contact.id) {
                        contacts[i] = contact;
                        updateContactsInLocalStorage(contacts);
                    }
                }
            };

            // Delete contact from contact list and storage.
            var deleteContact = function (id) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == id) {
                        contacts.splice(i, 1);
                        updateContactsInLocalStorage(contacts);
                    }
                }
            };

            // Get contact details for a specific contact.
            var getContactDetails = function (id) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == id) {
                        return contacts[i];
                    }
                }
                return null;
            };
            
            var getContacts = function () {
                return contacts;
            };

            // Clear contact form.
            var resetContactForm = function () {
                return {
                    firstName: '',
                    lastName: '',
                    phone: '',
                };
            };

            var updateContactsInLocalStorage = function (contacts) {
                localStorageService.set('contacts', contacts);
            };
            
            var contacts = localStorageService.get('contacts');

            return {
                addContact: addContact,
                editContactDetails: editContactDetails,
                getContactDetails: getContactDetails,
                deleteContact: deleteContact,
                getContacts: getContacts,
                resetContactForm: resetContactForm,
                updateContactsInLocalStorage: updateContactsInLocalStorage
            };

        }
    ]);



