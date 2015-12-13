var React = require('react');
var ReactDOMServer = require('react-dom/server');

var ReactApp = React.createFactory(require('../app/components/Main.jsx'));



module.exports = function (app) {

  app.get('/', function (req, res) {


    var isDev = process.env.NODE_ENV !== 'production'
    var reactHtml = ReactDOMServer.renderToString(ReactApp({data: {}}));

    res.render('index', {
      data: JSON.stringify(object),
      html: reactHtml,
      jsHash: isDev ? 'http://localhost:8080/main.js' : '/assets/main.js',
      cssHash: isDev ? 'http://localhost:8080/main.css' : '/assets/main.css',

    });
  });

  app.get('/data', (req, res) => {

    res.json({"fatemah": 'sabeur'})

  });

};
