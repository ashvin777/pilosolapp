function DashboardController($scope, $rootScope, $http) {

  $scope.username = $rootScope.username;
  $scope.frames = [];
  $scope.components = [];
  $scope.logs = [];
  $scope.shifts = [];

  $scope.selectedFrame = '';
  $scope.selectedShift = {};
  
  const BASE_URL = 'http://localhost:1880/';

  $scope.tabs = [{
    label: 'Runtime Settings',
    id: 'runtime'
  }, {
    label: 'Reports',
    id: 'reports'
  }, {
    label: 'Shifts',
    id: 'shifts'
  }];

  $scope.activeTab = $scope.tabs[0];

  $scope.setTab = function (tab) {
    $scope.activeTab = tab;
  }

  $scope.getTime = function (date) {
    return new Date(date).getTime();
  }

  $scope.getFrames = function () {
    $http.get(BASE_URL + 'frames').then(function (frames) {
      $scope.frames = frames.data;
    });
  }

  $scope.getComponents = function () {
    $http.get(BASE_URL + 'components').then(function (components) {
      $scope.components = components.data;
    });
  }

  $scope.getLogs = function () {
    $http.get(BASE_URL + 'logs').then(function (logs) {
      $scope.logs = logs.data;
    });
  }

  $scope.getSelectedFrame = function () {
    $http.get(BASE_URL + 'selectedFrame').then(function (res) {
      $scope.selectedFrame = res.data;
    });
  }

  $scope.setSelectedFrame = function (frame) {
    $scope.selectedFrame = frame;
    $http.put(BASE_URL + 'selectedFrame', { selectedFrame: frame }).then(function (selectedFrame) {
      alert('Frame set successfully');
    });
  }

  $scope.getShifts = function () {
    $http.get(BASE_URL + 'shifts').then(function (res) {
      $scope.shifts = res.data;
    });
  }

  $scope.addShift = function (shift) {
    let data = {};
    data.name = shift.name;
    data.starttime = new Date(shift.starttime).toString().slice(16, 21);
    data.endtime = new Date(shift.endtime).toString().slice(16, 21);

    $http.put(BASE_URL + 'shifts', data).then(function () {
      alert('Shift added successfully');
      $scope.getShifts();
    });
  }

  $scope.deleteShift = function (shift) {

    $http.delete(BASE_URL + 'shifts?id=' + shift.id).then(function () {
      alert('Shift deleted successfully');
      $scope.getShifts();
    });
  }

  $scope.getFrames();
  $scope.getComponents();
  $scope.getLogs();
  $scope.getSelectedFrame();
  $scope.getShifts();

}

let DashboardComponent = {
  templateUrl: 'dashboard/dashboard.html',
  controller: DashboardController
};

angular.module('app')
  .component('dashboardComponent', DashboardComponent);
