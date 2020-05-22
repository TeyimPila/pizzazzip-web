const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const config = {
    devtool: 'source-map',
    output: {
        publicPath: '/',
    },
    plugins: [
        new UglifyJsWebpackPlugin({
            sourceMap: true
        }),
        new webpack.EnvironmentPlugin( { ...process.env } ),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

module.exports = config;
