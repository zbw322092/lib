var _envName = window.BLOG.envName;

app.factory('EnvironmentBase', ['extend', function(extend) {

  function EnvironmentBase () {

  }

  angular.extend(EnvironmentBase, {
    extend: extend
  });

  angular.extend(EnvironmentBase.prototype, {
    
    get: function(apiKey, envName) {
      if (!apiKey) {
        console.log('apiKey name is required');
      }

      envName = envName ? envName : _envName;

      var envResult = this[apiKey];
      if (angular.isObject(envResult)) {
        return envResult[envName];
      } else {
        return envResult;
      }

    }

  });

  return EnvironmentBase;

}]);