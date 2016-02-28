'use strict';
var /* profilePolicy = require('../policies/profile.server.policy'), */
  profile = require('../controllers/profile.server.controller');
  
module.exports = function(app) {
  // Routing logic   

  // Profile collection routes
  app.route('/api/profile').all(/*profilePolicy.isAllowed NO POLICY FOR NOW*/)
    .get(profile.list)
    .post(profile.create);

  // Single profile routes
  app.route('/api/profile/:profileId').all(/*profilePolicy.isAllowed NO POLICY FOR NOW*/)
    .get(profile.read)
    .put(profile.update)
    /*.delete(profile.delete)*/;

  // Finish by binding the profile middleware
  app.param('profileId', profile.profileByID);
};
