var _envName = window.BLOG.getEnvName();

app.factory('EnvironmentBase', ['extend', function(extend) {

  function EnvironmentBase () {

  }

  angular.extend(EnvironmentBase, {
    extend: extend
  });

  angular.extend(EnvironmentBase.prototype, {
    
    get: function(key, envName) {
      if (!key) {
        console.log('Key name is required');
      }

      var envResult = this[key];
      if (angular.isObject(envResult)) {
        return envResult[envName];
      } else {
        return envResult;
      }

    }

  });

  return EnvironmentBase;

}]);