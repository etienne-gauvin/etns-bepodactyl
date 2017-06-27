var path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/scripts/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/build')
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    externals: {
    },
};