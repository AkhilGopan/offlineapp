(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('dashboardController', Controller);
  
    Controller.$inject = ['$scope','$state','$rootScope','$location','toaster','$http','SessionService','localStorageService','$uibModal','PATHS','PermissionService','dashboardService','$timeout','$translate'];
    /* @ngInject */
    function Controller($scope, $state, $rootScope,$location,toaster,$http,SessionService,localStorageService,$uibModal,PATHS,PermissionService,dashboardService,$timeout,$translate) {
     
        SessionService.getSession(); // get session details
        var vm = this;
        vm.user = {};
        vm.disabled = false;
        vm.loader = false;
        this.auth = function(data){
           
             if (data && data.length == 4) {
                vm.disabled = true;
                vm.loader = true;
                $timeout(function(){
                    dashboardService.loginpad(data).then(doneCallbacks, failCallbacks)
                },2000)
             }
            
        }


        function doneCallbacks(data){
            if(data.success){
                 toaster.pop('success',"Done",data.message)
                 $location.path('/employee'); 
            }
            else{
                 vm.disabled = false;
                  vm.loader = false;
                 toaster.pop('error',"Failed",data.message)
            }
           vm.user.auth = null
           
        }
        function failCallbacks(err){
            toaster.pop('error','Error',err)
            console.log(err)
            vm.user.auth = null
            vm.disabled = false;
            vm.loader = false;
        }

        activateUserController()
        function activateUserController (){
        

        }//activateUserController
  		
    }
})();