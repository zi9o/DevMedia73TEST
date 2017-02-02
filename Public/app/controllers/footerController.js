/**
 * Created by Zakaria on 01/02/2017.
 */
angular.module('devmediaApp')
  .controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
      Layout.initFooter(); // init footer
    });
  }]);