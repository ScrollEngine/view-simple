var exphbs = require('express3-handlebars');

module.exports = function(app) {
  hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: app.config.view.path + '/views/layouts/main',
    helpers: {
      // if var === value type conditional
      when: function(variable, value, options) {
        if(variable === value) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      },
      // allows passing of JSON data to the client JavaScript
      json: function(context) {
        return JSON.stringify(context);
      }
    }
  });

  app.locals.title = "Scroll - Simple";
  app.locals.nav = [
    {text:'Page One',url:'/page1'},
    {text:'Page Two',url:'/page2'},
    {icon:'home-outline',url:'/'},
    {text:'Page Three',url:'/page3'},
    {text:'Page Four',url:'/page4'}
  ];

  return {
    ext: hbs.extname,
    hbs: hbs,
    engine: hbs.engine
  };
};
