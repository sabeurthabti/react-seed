require("babel-core/register"); // es6/jsx/polyfill
var context = require.context('../app', true, /.spec\.js$/);
context.keys().forEach(context);
