var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Firebase = require('firebase');

var ReactApp = React.createFactory(require('../app/components/Main.jsx').default);

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
    var body = req.body;
    if(body) {
      var myFirebaseRef = new Firebase("https://sabeur-links.firebaseio.com/links");

      myFirebaseRef.push({
        url: body.url,
        title: body.title,
        created_at: new Date().getDate()
      }, function(err) {
        if(err) {
          res.json({sucess: false, error: err}, 404)
        } else {
          res.json({sucess: true}, 200)
        }
      })
    }

  });
};
