
(function () {
    'use strict';

    angular
        .module('dashboard')
        .factory('dashboardService', serviceFn);

    serviceFn.$inject = ['$http'];
    /* @ngInject */
    function serviceFn($http) {
        var service = {};
        service.loginpad       = employeeLogin;
        return service;
        
        /////////
       

        function employeeLogin(data) {
           return $http.post('/api/v1/employeeLogin',{minifpin: data}).then(handleSuccess, handleError('Error getting all users'));
        }
       


        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();