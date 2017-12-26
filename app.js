var app = angular.module("admin", ["ngRoute", "xeditable", "ui.mask", "ngSanitize"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
