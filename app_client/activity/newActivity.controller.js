(function () {
  angular
    .module('meanApp')
    .controller('newActivityCtrl', newActivityCtrl);

  newActivityCtrl.$inject = ['$http', '$scope', 'Upload', '$timeout', '$location', 'authentication', 'activities'];
  function newActivityCtrl($http, $scope, Upload, $timeout, $location, authentication, activities) {
    var vm = this;

    $http.get('/api/uploads').then(function(response){
      console.log(response.data);
      $scope.uploads = response.data;
    });

    $scope.submit = function(){
      Upload.upload({
        url: '/api/uploads',
        method: 'post',
        data: $scope.upload
      }).then(function (response) {
        console.log(response.data);
        $scope.uploads.push(response.data);
        $scope.upload = {};
      })
    }

    // $scope.uploadFile = function(file) {
    //   file.upload = Upload.upload({
    //     url: 'uploads/', //POST TO API ROUTE
    //     data: {file: file}
    //   });
    //
    //   file.upload.then(function (response) {
    //     $timeout(function () {
    //       file.result = response.data;
    //     });
    //
    //   }, function (response) {
    //     if (response.status > 0)
    //     $scope.errorMsg = response.status + ': ' + response.data;
    //   }, function (evt) {
    //     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    //   });
    // }

    //  vm.activity = {
    //    type : "",
    //    name : "",
    //    owner: authentication.currentUser(), //Owner.Email, Owner.Name
    //    file : {}
    //  };
    //
    //  console.log(vm.activity);
    //
    //
    // vm.onSubmit = function () {
    //   console.log('Uploading activity');
    //   activities
    //     .createActivity(vm.activity)
    //     .error(function(err){
    //       alert(err);
    //     })
    //     .then(function(){
    //       $location.path('activity');
    //     });
    // };
  }

})();
