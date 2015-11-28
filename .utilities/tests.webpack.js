require("babel-core/register"); // es6/jsx/polyfill
var context = require.context('../app', true, /.test\.js$/);
context.keys().forEach(context);
