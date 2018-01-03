function DashboardController($scope, $rootScope) {
  $scope.username = $rootScope.username;

  $scope.tabs = ['Dashboard', 'Shifts'];
  $scope.activeTab = $scope.tabs[0];

  $scope.setTab = function (tab) {
    $scope.activeTab = tab;
  }
}

let DashboardComponent = {
  templateUrl: 'dashboard/dashboard.html',
  controller: DashboardController
};

angular.module('app')
  .component('dashboardComponent', DashboardComponent);
