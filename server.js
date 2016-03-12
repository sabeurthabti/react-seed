require("babel-core/register");
require.extensions['.scss'] = function () {
  return null
};

var express = require('express');
var app = module.exports = express();
app.set('port', (process.env.PORT || 5000));
app.set('views', require('path').join(__dirname, '/views'));
app.engine('.hbs', require('express-handlebars')({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.use(function(err,req,res,next){
  if(err){
    console.log(err);
  }
  next();
});
app.use('/assets', express.static('./assets'));
require('./routes/index')(app);

app.listen(app.get('port'), function () {
  console.log('running on port 5000')
});
