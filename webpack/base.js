/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import autoprefixer from 'autoprefixer';
import postcssMergeRules from 'postcss-merge-rules';
import postcssDiscardDuplicates from 'postcss-discard-duplicates';
import postcssDiscardUnused from 'postcss-discard-unused';

const config = {
    entry: [
        path.resolve(__dirname, '../', 'src', 'scripts', 'index'),
        path.resolve(__dirname, '../', 'src', 'styles', 'index.sass'),
    ],

    output: {
        path: path.resolve(__dirname, '../', 'assets'),
        publicPath: '/assets/',
        filename: path.join('scripts', 'bundle.js'),
    },

    plugins: [
        new ExtractTextPlugin(path.join('styles', 'styles.css')),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    ['css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader']
                ),
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader',
            },
        ],
    },

    postcss() {
        return [
            autoprefixer,
            postcssMergeRules,
            postcssDiscardDuplicates,
            postcssDiscardUnused(),
        ];
    },
};

export default config;
