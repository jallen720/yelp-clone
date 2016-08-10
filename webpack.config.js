const webpack    = require('webpack');
const fs         = require('fs');
const path       = require('path');
const hjsWebpack = require('hjs-webpack');

const join    = path.join;
const resolve = path.resolve;

const ROOT = resolve(__dirname);

module.exports = hjsWebpack({
    in               : join(ROOT, 'src/app.js'),
    out              : join(ROOT, 'dist'),
    isDev            : process.env.NODE_ENV === 'development',
    clearBeforeBuild : true,
});
