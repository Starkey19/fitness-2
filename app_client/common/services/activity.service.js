(function () {

  angular
    .module('meanApp')
    .service('activities', activities);

  activities.$inject = ['$http', '$window'];
  function activities ($http, $window) {

    var createActivity = function(activity) {
      //DEBUG - DELETE ME 
      console.log("activity.services.js - create activity");
      console.log(activity);

      return $http.post('/api/activity/new', activity);
    };

    return {
      createActivity : createActivity,
    };
  }
})();
