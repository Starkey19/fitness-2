(function() {

  angular
    .module('fitness')
    .controller('activityCtrl', activityCtrl);

  activityCtrl.$inject = ['$location', 'meanData'];
  function activityCtrl($location, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();
