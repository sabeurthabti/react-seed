// es6 and jsx support

console.log("hello")
require("babel-core/register");
//settings
var SpecReporter = require('jasmine-spec-reporter');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
jasmine.getEnv().addReporter(new SpecReporter({
    displayStacktrace: true
}));

beforeAll(function () {

    //any tasks to run before all tests

});

beforeEach(function () {
    process.env.NODE_ENV = "";
});

