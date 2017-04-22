const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.js', '.css', '.html']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        new CommonsChunkPlugin({
            names: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    devtool: "source-map",

    devServer: {
        contentBase: './dist',
        port: 3000,
        proxy: {
            '/**': 'http://localhost:8080'
        }
    }
};