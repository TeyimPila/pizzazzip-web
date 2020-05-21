const commonPaths = require('./common-paths');

const config = {
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        contentBase: commonPaths.outputPath,
        compress: true,
        historyApiFallback: true,
        hot: false,
        port: 9000
    }
};

module.exports = config;
