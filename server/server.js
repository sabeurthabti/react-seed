import express from 'express';
import routes from './routes';

var app = module.exports = express();
app.set('port', (process.env.PORT || 5000));

app.set('views', require('path').join(__dirname, '/views'));
app.engine('.hbs', require('express-handlebars')({defaultLayout: 'main', extname: '.hbs', layoutsDir:'server/views/layouts',}));
app.set('view engine', '.hbs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use((err,req,res,next) => {
  if(err){
    console.log(err);
  }
  next();
});
app.use('/assets', express.static('./assets'));

routes(app);

app.listen(app.get('port'), () => {
  console.log('running on port 5000');
});
