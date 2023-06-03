const common = require('./webpack.common.config');
const path = require('path');
const glob = require('glob');
const {merge} = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const config = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash:12].js',
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        usedExports: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ]
    },
    plugins:[
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`,  { nodir: true }),
        }),
    ]
})

module.exports = config