'use strict';

// Profile controller
angular.module('profile').controller('ProfileController', ['$scope', '$stateParams', '$location', 'Authentication', 'Profile',
  function ($scope, $stateParams, $location, Authentication, Profile) {
    $scope.authentication = Authentication;

    // Create new Profile
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'profileForm');

        return false;
      }

      // Create new Profile object
      var profile = new Profile({
        firstname: this.firstname,
        lastname: this.lastname,
		contractingagency: this.contractingagency,
		checkedin: this.checkedin,
		mobilenumber: this.mobilenumber
      });

      // Redirect after save
      profile.$save(function (response) {
        $location.path('profile/' + response._id);

        // Clear form fields
        $scope.firstname = '';
        $scope.lastname = '';
		$scope.contractingagency = '';
		$scope.checkedin = false;
		$scope.mobilenumber = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Profile
    $scope.remove = function (profile) {
      if (profile) {
        profile.$remove();

        for (var i in $scope.profiles) {
          if ($scope.profiles[i] === profile) {
            $scope.profiles.splice(i, 1);
          }
        }
      } else {
        $scope.profile.$remove(function () {
          $location.path('profile');
        });
      }
    };

    // Update existing Profile
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'profileForm');

        return false;
      }

      var profile = $scope.profile;

      profile.$update(function () {
        $location.path('profile/' + profile._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Check In existing Profile
    $scope.checkIn = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'profileForm');

        return false;
      }

      var profile = $scope.profile;
	// TODO - REFACTOR
	profile.checkedin = !profile.checkedin;
	
      profile.$update(function () {
        $location.path('profile/' + profile._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Profiles
    $scope.find = function () {
		console.log("in find");
      $scope.profiles = Profile.query();
    };

    // Find existing Profile
    $scope.findOne = function () {
 		console.log("in find one, profileId: " + $stateParams.profileId);
     $scope.profile = Profile.get({
        profileId: $stateParams.profileId
      });
    };
  }
]);
