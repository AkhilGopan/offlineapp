(function () {
    /**
     * @ngInject
     */
    'use strict';

    var $urlRouterProviderRef = null;
    var $stateProviderRef = null;
    
    angular
        .module('dashboard', [
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
            

                $stateProviderRef.state('dashboard', {
                    url: '/dashboard',                    
                    templateUrl: path.TEMPLATE+'dashboard/dashboard.html',
                    controller  : 'dashboardController',
                    controllerAs  : 'vm',
                    data : { pageTitle: 'Dashboard',bodyClass:"dashboard"},
                    /*resolve: {
                        session: sessionfn
                    }*/
                });
                /*sessionfn.$inject = ['SessionService'];
                function sessionfn(SessionService) {
                    return SessionService.loginResolver().then(function(data){ return data });
                }
*/
        }])
})();





