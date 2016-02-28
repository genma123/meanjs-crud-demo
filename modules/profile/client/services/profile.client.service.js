'use strict';

//Profile service used for communicating with the profile REST endpoints
angular.module('profile').factory('Profile', ['$resource',
  function ($resource) {
    return $resource('api/profile/:profileId', {
      profileId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
	  get: {
        method: 'GET'
      }
	}, {
	  query: {
        method: 'GET', isArray: true
      }
	});
  }
]);
