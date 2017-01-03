import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
    entry: [
        path.resolve(__dirname, '../', 'src', 'scripts', 'index'),
        path.resolve(__dirname, '../', 'src', 'styles', 'index.sass'),
    ],

    output: {
        path: path.resolve(__dirname, '../', 'assets'),
        publicPath: '/assets/',
        filename: path.join('scripts', 'bundle.js')
    },

    plugins: [
        new ExtractTextPlugin(path.join('styles', 'styles.css'))
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    ['css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader']
                )

            },
        ],
    },

    postcss() {
        return [
            require('autoprefixer'),
            require('postcss-merge-rules'),
            require('postcss-discard-duplicates'),
            require('postcss-discard-unused')()
        ];
    },
};

export default config;
