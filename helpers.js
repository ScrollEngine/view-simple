module.exports = function(provided) {
  var helpers = {};

  // allows passing of JSON data to the client JavaScript
  helpers.json = function(context) {
    return JSON.stringify(context);
  };

  // if var === value type conditional
  helpers.when = function(variable, value, options) {
    if(variable === value) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  };

  for(var helper in provided) {
    helpers[helper] = provided[helper];
  }

  return helpers;
};
