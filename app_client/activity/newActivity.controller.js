(function () {
  angular
    .module('fitness')
    .controller('newActivityCtrl', newActivityCtrl);

  newActivityCtrl.$inject = ['$http', '$scope', 'Upload', '$timeout', '$location', 'authentication', 'activities'];
  function newActivityCtrl($http, $scope, Upload, $timeout, $location, authentication, activities) {
    var vm = this;

    $http.get('/api/uploads').then(function(response){
      console.log(response.data);
      $scope.uploads = response.data;
    });

    $scope.submit = function(){
      //Set the owner of the upload so we can add it their activities
      $scope.upload.owner = authentication.currentUser().email;
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
  }

})();
