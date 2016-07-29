'use strict';
require.extensions['.scss'] = function () {
  return null;
};

// es6 and jsx support
require("babel-core/register");
require('babel-polyfill');
// require('babel-polyfill');

var SpecReporter = require('jasmine-spec-reporter');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
jasmine.getEnv().addReporter(new SpecReporter({
    displayStacktrace: true
}));


var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

// cssModulesCompile();


global.navigator = {
    userAgent: 'node.js'
};

beforeAll(function () {
    //any tasks to run before all tests

});

beforeEach(function () {
});


function cssModulesCompile() {

  let hook = require('css-modules-require-hook');
  let sass = require('node-sass');
  let path = require('path');

  hook({
    extensions: ['.scss'],
    preprocessCss: function (css, filepath) {
      var result =  sass.renderSync({
        data: css,
        includePaths: [ path.resolve(filepath, '..') ]
      });

      return result.css;
    }
  });

}
