const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const CopyPlugin = require('copy-webpack-plugin')
const PACKAGE = require('./package.json')
const version = PACKAGE.version

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web',
    devtool: '#source-map',

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            },
                            minifyFontValues: false
                        }
                    ]
                }
            }),
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                sourceMap: true
            })
        ]
    },
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
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
                // Loads CSS into a file when you import it via Javascript
                // Rules are set in MiniCssExtractPlugin
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: '@@environment',
                replacement: 'production'
            },
            {
                pattern: '@@version',
                replacement: version
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new WebpackPwaManifest({
            name: 'Morfits',
            short_name: 'Morfits',
            description: 'The Morfits game, aplication',
            background_color: '#A7F8E7',
            theme_color: '#ac452a',
            'theme-color': '#ac452a',
            start_url: '/',
            display: 'fullscreen',
            orientation: 'portrait'
        }),
        new CopyPlugin([
            {
                from: './src/loading-screen',
                to: './loading-screen'
            }
        ])
    ]
}
