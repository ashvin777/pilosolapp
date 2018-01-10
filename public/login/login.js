function LoginController($rootScope, $http, $state) {

  var self = this;

  self.username = '';
  self.password = '';
  self.isLoginFailed = false;
  const BASE_URL = 'http://localhost:1880/';

  self.login = function () {
    $http.get(BASE_URL + 'users')
      .then(self.loginSuccess);
  }

  self.loginSuccess = function (res) {

    var isMatched = false;
    res.data.some(function (user) {
      if (user.username == self.username && user.password == self.password) {
        isMatched = true;
      }
    });
    if (isMatched) {
      self.isLoginFailed = false;
      $rootScope.username = self.username;
      $state.go('dashboard');
    } else {
      self.isLoginFailed = true;
    }

  }
}

let LoginComponent = {
  templateUrl: 'login/login.html',
  controller: LoginController,
  controllerAs: '$ctrl'
};

angular.module('app')
  .component('loginComponent', LoginComponent);
