var React = require('react');
var ReactDOMServer = require('react-dom/server');

var ReactApp = React.createFactory(require('../app/components/Main.jsx'));



module.exports = function (app) {

    app.get('/', function (req, res) {

        var object = {
            name: 'sabeur'
        };

        var reactHtml = ReactDOMServer.renderToString(ReactApp({data: object}));

        res.render('index', {
            data: JSON.stringify(object),
            html: reactHtml,
            jsHash: 'main.js',
            cssHash: 'main.css'

        });
    });

    app.get('/data', (req, res) => {

        res.json({"sabeur": 'Data'})

    });

};
