var webpackConfig = require('./webpack.config');

module.exports = (config) => {
    config.set({
        basePath      : '',
        port          : 9876,
        colors        : true,
        logLevel      : config.LOG_INFO,
        autoWatch     : true,
        singleRun     : false,
        concurrency   : Infinity,
        webpack       : webpackConfig,
        webpackServer : { noInfo: true },
        files         : [ 'tests.webpack.js' ],

        preprocessors : {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },

        exclude       : [],
        browsers      : [ 'PhantomJS' ],
        reporters     : [ 'spec' ],

        frameworks: [
            'mocha',
            'chai',
        ],

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-sourcemap-loader',
        ],
    })
};
