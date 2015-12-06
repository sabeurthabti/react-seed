require("babel-core/register");
app.set('port', (process.env.PORT || 3000));
require.extensions['.scss'] = function () {
    return null
};

var express = require('express');
var app = module.exports = express();

app.set('views', require('path').join(__dirname, '/views'));
app.engine('.hbs', require('express-handlebars')({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
console.log("HELLLLLLLLL");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use('/assets', express.static('./assets'));
console.log("HELLLLLLLLL222");

app.get('/', function(req, res) {

res.send("hello");

});


app.listen(app.get('port'), function () {
    console.log('running on port 3000')
});
