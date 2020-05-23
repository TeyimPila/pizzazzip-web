const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const config = {
    devtool: 'source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
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
