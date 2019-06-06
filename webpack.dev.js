const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const Stylish = require('webpack-stylish')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const PACKAGE = require('./package.json')
const version = PACKAGE.version

module.exports = {
    mode: 'development',
    entry: {
        main: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web',
    devtool: 'eval-source-map',
    stats: {
        all: false,
        errors: true,
        performance: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets'
                        }
                    }
                ]
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin({
            format: `  ${chalk.blue('build')} ${chalk.yellow('[:bar]')} ${chalk.green.bold(':percent')} (:elapsed seconds) ${chalk.cyan(':msg')}`
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            excludeChunks: ['server']
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: '@@environment',
                replacement: 'dev'
            },
            {
                pattern: '@@version',
                replacement: version
            }
        ]),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(),
        new Stylish()
    ]
}
