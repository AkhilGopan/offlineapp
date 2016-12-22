
(function () {
    'use strict';

    angular
        .module('welcomeEmployee')
        .factory('empService', serviceFn);

    serviceFn.$inject = ['$http','$location','toaster','$q','$state'];
    /* @ngInject */
    function serviceFn($http,$location,toaster,$q,$state) {
        var service = {};
        service.loginpad                       = employeeLogin;
        service.terminateEmployeeSession       = endsession;
        service.authEmployee                   = authenticate;
        return service;
        
        /////////
       

        function employeeLogin(data) {
           return $http.post('/api/v1/employeeLogin',{minifpin: data}).then(handleSuccess, handleError('Error getting all users'));
        }
        function endsession() {
           //return $http.post('/api/v1/authenticateemployee'}).then(handleSuccess, handleError('Error getting all users'));
           $http.post('/api/v1/terminateempsession')
                    .success(function (data) {
                    if (!data.data.employee._id) {
                        $location.path('/dashboard');
                        toaster.pop('success', "Success", "You have terminated session")
                    }
                    else{
                        alert("Failed")
                    }
                })
                    .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        function authenticate(){
            var deferred = $q.defer();
                   $http.get('/api/v1/authenticateemployee',{cache: false})
                     .success(function(data) { 
                       if(data.data == 0 || data.data == null){
                             $location.path('/dashboard');
                             deferred.resolve({success: false, data: null});
                          }
                          else{
                             deferred.resolve({success: true, data: data});
                          }
                     }).error(function(msg, code) {
                        deferred.reject(msg);
                     });
                   return deferred.promise;
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