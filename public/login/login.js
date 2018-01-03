function LoginController($scope, $http) {
  $scope.username = '';
  $scope.password = '';

  $scope.login = function () {
    
    $http.get('http://localhost:1880/users')
      .then((res) => {
        console.log(res);
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
