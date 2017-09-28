angular.module('admin').config(function($routeProvider){
    $routeProvider
    .when("/login", {
      templateUrl: "components/login/login.htm",
      controller: "loginCtrl"
    })
    .when("/", {
      templateUrl: "components/login/login.htm",
      controller: "loginCtrl"
    })
    .when("/admin", {
      templateUrl : "components/admin/admin.htm",
      controller: "adminCtrl"
    })
    .when("/landoj", {
      templateUrl: "components/landoj/landoj.htm",
      controller: "landojCtrl"
    })
    .when("/membrecoj", {
      templateUrl:"components/membrecoj/membrecoj.htm",
      controller: "membrecojCtrl"
    })
    .when("/kotizoj/:id", {
      templateUrl:"components/kotizoj/kotizoj.htm",
      controller: "kotizojCtrl"
    })
    .when("/perantoj", {
      templateUrl:"components/perantoj/perantoj.htm",
      controller: "perantojCtrl"
    });
});
