var React = require('react');
var ReactDOMServer = require('react-dom/server');

var assets = require('./app/assets/assets.json');
var ReactApp = React.createFactory(require('./app/client/Main.jsx'));

module.exports = function (app) {

    app.get('/', function (req, res) {
       
        var object = {
            name: 'sabeur'
        };

        var reactHtml = ReactDOMServer.renderToString(ReactApp({data: object}));

        res.render('index', {
            data: JSON.stringify(object),
            html: reactHtml,
            jsHash: assets.main.js,
            cssHash: assets.main.css

        });
    });

    app.get('/data', (req, res) => {

        res.json({"sabeur": 'Data'})

    });

};
