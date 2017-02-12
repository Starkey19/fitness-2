(function() {

  angular
    .module('meanApp')
    .controller('newActivityCtrl', newActivityCtrl);

  newActivityCtrl.$inject = ['$location', 'meanData'];
  function newActivityCtrl($location, meanData) {
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
