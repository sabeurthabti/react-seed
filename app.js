//ecma6 babel
require("babel-core/register");

var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
app.set('views', require('path').join(__dirname, '/views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use('/assets', express.static('./app/assets'));
var assets = require('./app/assets/assets.json')
console.log(assets);


app.get('/', function(req, res) {
  res.render('index', {

    jsHash: assets.main.js,
    cssHash: assets.main.css

  });
});

app.listen(3000, function() {
  console.log('running on port 30000')
});

// dev only
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config)).listen(8080, 'localhost', function (err, result) {
   if (err) {
     console.log(err);
   }

   console.log('Listening at localhost:8080 ');
})
