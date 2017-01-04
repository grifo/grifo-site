/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import baseConfig from './base';

const config = {
    ...baseConfig,

    devtool: 'cheap-module-eval-source-map',
    debug: true,

    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        hot: true,
        port: '8080',
        inline: true,
        progress: true,
        historyApiFallback: true,
    },
};

export default config;
