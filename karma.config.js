var webpack = require('karma-webpack');
'use strict';
module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],


        plugins: [
            webpack,
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-htmlfile-reporter',
            'karma-mocha-reporter'
        ],
        
        files: [
            {pattern: './.utilities/phantomFills.js'}, //polyfill
            //{pattern: './app/**/**/*.test.js', watched: true, included: true, served: true}
            './.utilities/tests.webpack.js'
        ],

        reporters: ['mocha'],

        preprocessors: {
            './.utilities/tests.webpack.js': ['webpack']
        },
        //  'PhantomJS', Chrome

        browsers: ['PhantomJS'],

        logLevel: config.LOG_INFO,

        singleRun: true,
        autoWatch: false,
        colors: true,


        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
                    loader: 'babel-loader'
                }]
            },
            webpackMiddleware: {noInfo: true}
        }

    });
};
