const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');   

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "../dist"),
        clean: true
    },
    resolve: {
        extensions: ['.js','.ts', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules:{
                                localIdentName: '[local]--[md4:hash:7]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
             favicon: 'public/favicon.ico',
        })
    ]
};

module.exports = config;