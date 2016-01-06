var React = require('react');
var ReactDOMServer = require('react-dom/server');

var ReactApp = React.createFactory(require('../app/components/Main.jsx'));

module.exports = function (app) {

  app.get('/:admin?', function (req, res) {
    var isAdmin = req.params.admin ? true : false;
    var isDev = process.env.NODE_ENV !== 'production'
    var reactHtml = ReactDOMServer.renderToString(ReactApp({data: {admin: isAdmin}}));
    res.render('index', {
      html: reactHtml,
      data: JSON.stringify({admin: isAdmin}),
      jsHash: isDev ? 'http://localhost:8080/main.js' : '/assets/main.js',
      cssHash: isDev ? 'http://localhost:8080/main.css' : '/assets/main.css',

    });
  });

  app.post('/new', function(req, res) {
    if(!Object.keys(req.body))
           res.json('all good');
       else
           res.json({
               success: false,
               error: "json invalid"
           }, 400);

  });
};
