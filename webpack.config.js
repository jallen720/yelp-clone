const webpack      = require('webpack');
const fs           = require('fs');
const path         = require('path');
const hjsWebpack   = require('hjs-webpack');
const precss       = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');
const dotenv       = require('dotenv');

const join         = path.join;
const resolve      = path.resolve;
const DefinePlugin = webpack.DefinePlugin;

const NODE_ENV        = process.env.NODE_ENV;
const isDev           = NODE_ENV === 'development';
const rootDir         = resolve(__dirname);
const srcDir          = join(rootDir, 'src');
const nodeModulesDir  = join(rootDir, 'node_modules');
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;
const cssLoadersRegex = /(^|!)(css-loader)($|!)/;

var config = hjsWebpack({
    in               : join(srcDir, 'app.js'),
    out              : join(rootDir, 'dist'),
    isDev            : isDev,
    clearBeforeBuild : true,
});

config.postcss = [].concat([
    precss({}),
    autoprefixer({}),
    cssnano({}),
]);


////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Configure CSS loaders.
//
////////////////////////////////////////////////////////////////////////////////////////////////////
function createIsLoaderFilter(regex) {
    return (loader) => {
        return loader &&
               loader.loader &&
               loader.loader.match(regex);
    };
}

function findLoader(loaders, regex) {
    const match = loaders.filter(createIsLoaderFilter(regex));
    return match ? match[0] : null;
}


// Find initial loader in config.module.loaders.
const cssLoader = findLoader(config.module.loaders, cssLoadersRegex);

// Clone cssLoader and modify to support loading modules.
const newloader = Object.assign({}, cssLoader, {
    test    : /\.module\.css$/,
    include : [ srcDir ],

    loader: cssLoader
        .loader
        .replace(cssLoadersRegex, `$1$2?modules&localIdentName=${cssModulesNames}$3`),
});

config.module.loaders.push(newloader);

cssLoader.test   = new RegExp(`[^module]${cssLoader.test.source}`);
cssLoader.loader = newloader.loader;

// Add another loader for loading non-module css (e.g. font-awesome).
config.module.loaders.push({
    test    : /\.css$/,
    include : [ nodeModulesDir ],
    loader  : 'style!css'
});


////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Configure environment.
//
////////////////////////////////////////////////////////////////////////////////////////////////////
function getEnvironmentMemoMerger(environment) {
    return (memo, key) => {
        memo[`__${key.toUpperCase()}__`] = JSON.stringify(environment[key]);
        return memo;
    };
}

const dotenvEnvironment = dotenv.config();

const localEnvironment = dotenv.config({
    path   : join(rootDir, 'config', `${NODE_ENV}.config.js`),
    silent : true,
});

// Merge localEnvironment with dotenvEnvironment.
const environment = Object.assign({}, dotenvEnvironment, localEnvironment);

const defines =
    Object
        .keys(environment)
        .reduce(
            getEnvironmentMemoMerger(environment),
            { __NODE_ENV__: JSON.stringify(NODE_ENV) });

config.plugins = [ new DefinePlugin(defines) ].concat(config.plugins);


module.exports = config;
