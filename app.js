var app = angular.module("admin", ["ngRoute", "xeditable"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/login", {
      templateUrl: "template/login.htm",
      controller: "loginCtrl"
    })
    .when("/", {
      templateUrl: "template/login.htm",
      controller: "loginCtrl"
    })
    .when("/admin", {
      templateUrl : "template/admin.htm",
      controller: "adminCtrl"
    })
    .when("/landoj", {
      templateUrl: "template/landoj.htm",
      controller: "landojCtrl"
    })
    .when("/membrecoj", {
      templateUrl:"template/membrecoj.htm",
      controller: "membrecojCtrl"
    })
    .when("/kotizoj/:id", {
      templateUrl:"template/kotizoj.htm",
      controller: "kotizojCtrl"
    })
    .when("/perantoj", {
      templateUrl:"template/perantoj.htm",
      controller: "perantojCtrl"
    });
});

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
