/**
 * Created by Zakaria on 01/02/2017.
 */
angular.module('devmediaApp')
  .controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
      App.initComponents(); // init core components
      });
  }])