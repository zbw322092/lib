app.factory('extend', ['$log', function($log) {
  var nativeCreate = Object.create;
  var DefaultConstructor = function() {};

  var baseCreate = function(prototype) {
    if(!angular.isObject(prototype)) return {};
    if (nativeCreate) {
      return nativeCreate(prototype);
    }

    DefaultConstructor.prototype = prototype;
    var result = new DefaultConstructor();
    DefaultConstructor.prototype = null;
    return result;
  };

  var create = function(prototype, props) {
    if (!angular.isObject(props)) props = {};
    var createdObj = baseCreate(prototype);
    angular.extend(createdObj, props);
    return createdObj;
  };

  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    if (protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function() {
        return parent.apply(this, arguments);
      }
    }

    // extend static props
    angular.extend(child, parent, staticProps);

    child.prototype = create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    return child;
  };
  
  return extend;

}]);
