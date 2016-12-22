(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('welcomeEmployee', [
            'application.thirdparty'
        ])
        .config(['$stateProvider', 
            '$urlRouterProvider', 
            '$locationProvider', 
            '$httpProvider', 
            '$compileProvider',
            'PATHS',
            function (
                     $stateProvider,
                     $urlRouterProvider, 
                     $locationProvider, 
                     $httpProvider, 
                     $compileProvider,
                     path
                    ) 
            {  
            
            $urlRouterProviderRef = $urlRouterProvider;
            $stateProviderRef = $stateProvider;
            

                $stateProviderRef.state('employeedashboard', {
                    url: '/employee',                    
                    templateUrl: path.TEMPLATE+'employee/welcome.html',
                    controller  : 'employeeWelcomeController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Welcome Employee',bodyClass:"menuavaled employeescreen"},
                    resolve: {
                        session: sessionfn,
                        employee: auth
                    }
                });
                sessionfn.$inject = ['SessionService'];
                function sessionfn(SessionService) {
                    return SessionService.loginResolver().then(function(data){ return data });
                }
                auth.$inject = ['empService'];
                function auth(empService) {
                    return empService.authEmployee().then(function(data){ return data });
                }

        }])
})();