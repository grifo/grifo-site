/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import baseConfig from './base';

const config = {
    ...baseConfig,

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
    ],
};

export default config;
