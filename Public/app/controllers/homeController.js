/**
 * Created by Zakaria on 01/02/2017.
 */
angular.module('devmediaApp')
  .controller('HomeController', ['$http', '$scope', '$rootScope', 'siteUrl', 'toastr',
    function ($http, $scope, $rootScope, siteUrl, toastr) {
      $scope.task = {};
      $scope.tasks = [];
      $scope.saveTaskLoading = false;
      $scope.submitted = false;

      /*
       * first action on view load
       */
      init();

      /*
       |--------------------------------------------------------------------------
       | Needed functions
       |--------------------------------------------------------------------------
       */
      function init() {
        initTasks();
      }

      /*
       * load all tasks from database
       */
      function initTasks() {
        $http.get(siteUrl.apiUrl + 'tasks').then(function (resp, status, headers, config) {
          $scope.tasks = resp.data;
        }, function (resp) {
          toastr.error(resp.data.message, resp.status)
        })
      };
      /*
       |--------------------------------------------------------------------------
       | Scoped functions
       |--------------------------------------------------------------------------
       */

      /*
       * detect if user interacted with the field
       */
      $scope.interacted = function (field) {
        return $scope.submitted || field.$dirty;
      };

      /*
       * Clear Task form
       */
      $scope.clearTaskForm = function () {
        $scope.TaskForm.$pristine;
        $scope.task = {};
      }

      /*
       * change task status
       */
      $scope.taskChanged = function (task, id) {
        if (task.finished) {
          document.getElementById(id).style.textDecoration = "line-through";
          $('#' + id).addClass("active");
        }

        else {
          document.getElementById(id).style.textDecoration = "none";
          $('#' + id).removeClass("active");
        }
      }

      /*
       * change all task's status
       */
      $scope.allTasksChecked = function () {

      }
      /*
       * Submit form info when clicking on saveChanges button
       */
      $scope.submitTaskForm = function () {
        // start loading
        $scope.saveTaskLoading = true;
        $scope.submitted = true;
        if ($scope.TaskForm.$valid) {

          $http.post(siteUrl.apiUrl + 'tasks', $scope.task)
            .then(function (resp) {
              $scope.saveTaskLoading = false;
              toastr.success(' Your task has been saved!')
              $scope.tasks.push(resp.data)
              $scope.clearTaskForm()
            }, function (resp) {
              if (resp.status !== 401) {
                toastr.error(resp.data.message, resp.status)
              }
              $scope.saveTaskLoading = false;
            });
        }
        else {
          $scope.saveTaskLoading = false;
        }
      }
    }])