function LoginController($scope, $rootScope, $http, $state) {
  $scope.username = '';
  $scope.password = '';

  $scope.login = function () {
    
    $http.get('http://localhost:1880/users')
      .then((res) => {

        var isMatched = false;
        res.data.some(function (user) {
          if (user.username == $scope.username && user.password == $scope.password) {
            isMatched = true;
          }
        });

        if (isMatched) {
          $rootScope.username = $scope.username;
          $state.go('dashboard');
        } else {
          alert("Login failed. Please try with correct credentials");
        }

      });
  }
}

let LoginComponent = {
  templateUrl: 'login/login.html',
  controller: LoginController
};

angular.module('app')
  .component('loginComponent', LoginComponent)
  ;
