var app = angular.module("admin", ["ngRoute", "xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
