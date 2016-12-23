var webpack = require('webpack');

module.exports = {
    entry : './public/javascripts/index.js',
    output: {
        filename: 'bundle.js',
        path    : __dirname + '/app'
    },

    module: {
        loaders: [
            {
                test   : /\.scss$/,
                loader : 'style!css!sass',
            },
            {
                test   : /\.js$/,
                loader: 'babel'
            },
            {
                test   : /\.html$/,
                loader: 'raw'
            }
        ]
    }
};