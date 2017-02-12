(function () {

  angular
    .module('meanApp')
    .controller('newActivityCtrl', newActivityCtrl);

  newActivityCtrl.$inject = ['$scope', '$location', 'authentication'];
  function newActivityCtrl($scope, $location, authentication) {
    var vm = this;

     vm.activity = {
       type : "",
       name : "",
       owner: authentication.currentUser(), //Owner.Email, Owner.Name
       file : {}
     };

     console.log(vm.activity);


    vm.onSubmit = function () {
      console.log('Uploading activity');
      activities
        .createActivity(vm.activity)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('activity');
        });
    };
  }

})();
