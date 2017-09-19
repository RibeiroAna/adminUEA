var app = angular.module("admin", ["ngRoute", "xeditable"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/admin", {
        templateUrl : "app-template/admin.htm",
        controller: "adminCtrl"
    })
    .when("/login", {
      templateUrl: "app-template/login.htm",
      controller: "loginCtrl"
    })
    .when("/landoj", {
      templateUrl: "app-template/landoj.htm",
      controller: "landojCtrl"
    })
    .when("/membrecoj", {
      templateUrl:"app-template/membrecoj.htm",
      controller: "membrecojCtrl"
    })
    .when("/kotizoj/:id", {
      templateUrl:"app-template/kotizoj.htm",
      controller: "kotizojCtrl"
    });
});

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
