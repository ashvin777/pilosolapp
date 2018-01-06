angular.module('app', [
  'ui.router',
  'ui.scroll'
  ])
  .config(($stateProvider, $urlRouterProvider) => {

    $stateProvider
      .state('login', {
        url: '/login',
        component: 'loginComponent'
      })

      .state('dashboard', {
        url: '/dashboard',
        component: 'dashboardComponent'
      });

    $urlRouterProvider.otherwise('/login');

  });
