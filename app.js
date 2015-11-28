var React = require('react');
var assets = require('./app/assets/assets.json')
console.log(assets);

var ReactApp = React.createFactory(require('./app/client/Main.jsx'));

module.exports = function(app) {
  app.get('/', function(req, res) {
    var object = {
      name: 'sabeur'
    }

    var reactHtml = React.renderToString(ReactApp({data: object}));

    res.render('index', {
      data: JSON.stringify(object),
      html: reactHtml,
      jsHash: assets.main.js,
      cssHash: assets.main.css

    });
  });

}
