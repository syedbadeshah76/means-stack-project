var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/customer', {
            templateUrl: "./components/customer.html",
        })
        .when('/material', {
            templateUrl: "./components/material.html",
        })
        .when('/invoice', {
            templateUrl: "./components/invoice.html",
        })
});


myApp.run(function($rootScope){
    $rootScope.customers=[] 
    $rootScope.materials=[]
    $rootScope.invoiceItems=[]
})