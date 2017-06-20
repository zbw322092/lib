app.factory('WebApiBase', 
  [
    '$log',
    '$q',
    '$http',
  function(
    $log,
    $q,
    $http
  ) {

    function WebApiBase() {

    };

    angular.extend(WebApiBase.prototype, {
      
      // base data which will send to server in every request
      baseData: {},

      // parse http response data
      responseDataParser: function(response) {
        var result = response.data || {};
        return {
          code: result.code || '0000',
          message: result.message || '',
          data: result.data ? result.data: {}
        }
      },

      // error parse which deal with http response error
      responseErrorParser: function(response) {
        var result = response.data || {};
        return {
          code: result.code || '9999',
          message: result.message || 'server error',
          data: result.data ? result.data : {}
        }
      },
      
      // gather request data which will be sent to server
      getRequestData: function(data) {
        return angular.extend(this.baseData, data);
      },

      // perform http request
      request: function(settting, resProcess) {
        var deferred = $q.defer();
        
        $http(settting)
          .then(this.bind(function(result) {
            result = this.responseDataParser(result);
            result = angular.isFunction(resProcess) ? resProcess(result) : result;
            deferred.resolve(result);
          }))
          .catch(this.bind(function(error) {
            error = this.responseErrorParser(error);
            deferred.reject(error)
          }));

        return deferred.promise;
      },

      bind: function(fn, context) {
        var args = [context || this, fn].concat(Array.prototype.slice.call(arguments, 2));
        return angular.bind.apply(angular.bind, args);
      }

    });

    return WebApiBase;

  }]);