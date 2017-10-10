app.service('auth', function($window) {
  this.ensalutita = function() {
      if (($window.localStorage.getItem('token') == null) ||
          ($window.localStorage.getItem('token') == 0)) {
        $window.location.href = '#!/login';
      }
  }
});
