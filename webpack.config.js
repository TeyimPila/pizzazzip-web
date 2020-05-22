const webpackMerge = require('webpack-merge');
const commonConfig = require('./config/webpack.common.config');

module.exports = () => {


    const env = process.env.NODE_ENV;

    const determineAddons = (addons) => {
        return [...[addons]]
            .filter(addon => Boolean(addon))
            .map(addon => require(`./config/addons/webpack.${addon}.js`));
    };

    const envConfig = require(`./config/webpack.${env.env}.config`);

    return webpackMerge(commonConfig, envConfig, ...determineAddons(env.addons));
};
