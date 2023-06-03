const {merge} = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = merge(common, {
    mode: 'development',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, "../dist")
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        },
        client: {
            overlay: true
        },
        liveReload: false
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
});

module.exports = config;