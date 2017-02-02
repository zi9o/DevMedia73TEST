/**
 * Created by Zakaria on 31/01/2017.
 */

angular.module('devmediaApp', ["ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize", 'ngMessages', 'ngResource', 'toastr', 'ngAnimate', 'ngTouch',
    'angular-loading-bar', 'angular-ladda'])

  /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
  .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      // global configs go here
    });
  }])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    })


    // Now set up the states

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/home.html',
        controller: 'HomeController',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'devmediaApp',
              insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
              files: [
                'assets/global/plugins/datatables/datatables.min.css',
                'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                'assets/global/plugins/datatables/datatables.all.min.js',
                'app/controllers/homeController.js',
              ]
            });
          }]
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'app/views/404.html',
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'app/views/403.html',
        data: {
          ignoreState: true
        }
      })
  })
  /* Init global settings and run the app */
  .run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
  }]);