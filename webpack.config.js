const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const WebpackDeleteAfterEmit = require('webpack-delete-after-emit');
const Webpack = require('webpack');
const Path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: Path.resolve(__dirname,'docs'),
        filename: 'bundle.js'
    },
    module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }]
        },{
            test: /\.s?css/,
            use: [{
                loader: 'style-loader'
            },{
                loader: 'css-loader'
            },{
                loader: 'sass-loader',
                options: {
                    includePaths: [
                        Path.resolve(__dirname, 'node_modules/bootswatch/dist/'+process.env.THEME+'/')
                    ]
                }
            }]
        },{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'VueWiki',
            filename: 'vuewiki-'+process.env.THEME+'.html',
            inlineSource: '\.js$',
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
            globs: ['bundle.js']
        })
    ]
}