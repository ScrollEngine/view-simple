var exphbs = require('express3-handlebars');

module.exports = function(app) {
  hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: app.config.view.path + '/views/layouts/main'
  });

  app.locals.title = "Scroll - Simple";
  app.locals.nav = [
    {text:'Page One',url:'/page1'},
    {text:'Page Two',url:'/page2'},
    {text:'Home',url:'/'},
    {text:'Page Three',url:'/page3'},
    {text:'Page Four',url:'/page4'}
  ];

  return {
    ext: hbs.extname,
    hbs: hbs,
    engine: hbs.engine
  };
};
