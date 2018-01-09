var app = angular.module("admin", ["ngRoute", "xeditable", "ui.mask",
                                   "ngSanitize", "ngFileUpload", "ngMaterial"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
