(function() {
    'use strict';

    angular
        .module('mainServerapp')
        .controller('not_found', NotFoundController)
        .controller('main', Controller)

    
    /* @ngInject */
    function NotFoundController() {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        }
    }

   

    Controller.$inject = ['$scope','$state','$rootScope','$http','$window','localStorageService','SessionService','toaster','empService','$translate'];
    
     /* @ngInject */
    function Controller($scope, $state, $rootScope,$http, $window,localStorageService,SessionService,toaster,empService,$translate) {
        var core = this;
        core.logout = function () {
      
            localStorageService.clearAll();
            $rootScope.token  = {};
            $rootScope.user = {}
            SessionService.logOut();
        }

         core.terminate = function () {
            empService.terminateEmployeeSession()
        }
        $scope.changeLanguage = function(langKey) {
          $translate.use(langKey);
        };

    }
})();