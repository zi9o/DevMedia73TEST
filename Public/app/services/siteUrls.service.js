/**
 * Created by Zakaria on 01/02/2017.
 */
angular.module('devmediaApp')
  .service('siteUrl', function ($location) {
    this.baseUrl = $location.protocol() + '://' + location.host;
    this.apiUrl = $location.protocol() + '://' + location.host + '/api' + '/';
  });