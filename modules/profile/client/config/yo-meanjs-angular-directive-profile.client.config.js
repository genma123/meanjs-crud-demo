'use strict';

// Setting up route
angular.module('profile').config(['$stateProvider',
  function ($stateProvider) {
    // Profiles state routing
    $stateProvider
      .state('profile', {
        abstract: true,
        url: '/profile',
        template: '<ui-view/>'
      })
      .state('profile.list', {
        url: '',
        templateUrl: 'modules/profile/client/views/list-profiles.client.view.html'
      })
      .state('profile.create', {
        url: '/create',
        templateUrl: 'modules/profile/client/views/create-profile.client.view.html'/*,
        data: {
          roles: ['user', 'admin']
        } */
      })
      .state('profile.view', {
        url: '/:profileId',
        templateUrl: 'modules/profile/client/views/view-profile.client.view.html'
      })
      .state('profile.edit', {
        url: '/:profileId/edit',
        templateUrl: 'modules/profile/client/views/edit-profile.client.view.html'/*,
        data: {
          roles: ['user', 'admin']
        } */
      });
  }
]);

// Profile module config
angular.module('profile').run(['Menus',
  function (Menus) {
	  console.log("adding menus");
    // Add the profiles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Profiles',
      state: 'profile',
      type: 'dropdown',
      roles: ['*']
    });
	
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'profile', {
      title: 'List Profiles',
      state: 'profile.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'profile', {
      title: 'Create Profile',
      state: 'profile.create' /* ,
      roles: ['*'] // ['user'] */
    });

    // Add the dropdown edit item
    Menus.addSubMenuItem('topbar', 'profile', {
      title: 'Edit Profile',
      state: 'profile.edit' /* ,
      roles: ['*'] // ['user'] */
    });
  }
]);
