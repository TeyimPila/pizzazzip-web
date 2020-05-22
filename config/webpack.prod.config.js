const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const commonPaths = require('./common-paths');

const config = {
    devtool: 'source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        contentBase: commonPaths.outputPath,
        compress: true,
        historyApiFallback: true,
        hot: false,
        // port: 9000
    },
    plugins: [
        new UglifyJsWebpackPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

module.exports = config;
