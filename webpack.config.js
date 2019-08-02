/**
 * Created by Miro on 19/7/26.
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        // index: ['./src/index.js'],
        // example: ['./example/index.js']
        index: ['./example/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 9000
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 80
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            // Also generate a test.html
            filename: 'index.html',
            template: './index.html',
            // inject: false // 不自动引入
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({
            env: JSON.stringify(
                'https://webpack.docschina.org/plugins/define-plugin/'
            )
        })
    ],
    resolve: {
        alias: {
            utils$: path.resolve(__dirname, './src/utils/common.js')
        }
    },
    devtool: ' source-map'
}