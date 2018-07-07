const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const WebpackDeleteAfterEmit = require('webpack-delete-after-emit');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const Path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: Path.resolve(__dirname,'docs'),
        filename: 'bundle.js'
    },
    cache: true,
    devtool: 'inline-source-map',
    module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['env']
                }
            }]
        },{
            test: /\.s?css/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }, {
                loader: 'sass-loader',
                options: {
                    includePaths: [
                        Path.resolve(__dirname, 'node_modules/bootswatch/dist/'+process.env.THEME+'/')
                    ]
                }
            }]
        }, {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new HtmlWebpackPlugin({
            title: 'VueWiki',
            filename: 'vuewiki-'+process.env.THEME+'.html',
            inlineSource: '\.(js|css)$',
            template: 'src/index.html'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new UglifyJSWebpackPlugin(),
        new VueLoaderPlugin(),
        new Webpack.NormalModuleReplacementPlugin(
            /AsyncLoad\.js/,
            function (resource) {
                resource.request = resource.request.replace(/AsyncLoad/,"AsyncLoad-disabled");
            }
        ),
        new WebpackDeleteAfterEmit({
            globs: ['bundle.*']
        }),
        new Webpack.DefinePlugin({
            THEME: process.env.THEME
        })
    ]
}