function DashboardController($scope, $rootScope, $http, $interval) {

  $scope.username = $rootScope.username || 'admin';
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
  }, {
    label: 'Frames Settings',
    id: 'framesettings'
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

  $scope.downloadLogs = function () {

    var path = window.prompt('Enter folder path');

    if (path) {
      $http.get(BASE_URL + 'downloadLogs?path='+path).then(function () {
      
      });
    }  
  }

  $scope.saveFrames = function (frames) {
    var isValid = true;

    frames.forEach(function (frame) {
      if (!(frame.serial >= 0)) {
        frame.serial = '';
        isValid = false;
        alert('Please enter a number');
      }
    });

    if (isValid) {
      frames.forEach(function (frame) {
        $http.post(BASE_URL + 'frame', frame).then((res) => {
          alert('Frame updated successfully');
        });
      });
    }  
    
  }

  $scope.getFormattedDate = function(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '-' + day + '-' + year;
  }

  $scope.getFrames();
  $scope.getComponents();
  
  $scope.getLogs();

  $interval(function () {
    $scope.getLogs();
  }, 2000);

  $scope.getSelectedFrame();
  $scope.getShifts();

}

let DashboardComponent = {
  templateUrl: 'dashboard/dashboard.html',
  controller: DashboardController
};

angular.module('app')
  .component('dashboardComponent', DashboardComponent);
