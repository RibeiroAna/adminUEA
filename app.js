var app = angular.module("admin", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/admin", {
        templateUrl : "app-template/admin.htm",
        controller: "adminCtrl"
    })
    .when("/login", {
      templateUrl: "app-template/login.htm",
      controller: "loginCtrl"
    });
});
