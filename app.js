var app = angular.module("admin", ["ngRoute", "xeditable", "ngSanitize"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
