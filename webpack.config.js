const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'frontend'),
    build: path.join(__dirname, 'public')
};

const common = {
    entry: {
        vendors: [
            'angular-material',
            'angular-material/angular-material.css',
            'angular-material-icons'
        ],
        app: [
            PATHS.app,
            'webpack-hot-middleware/client?reload=true'
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.js$/,
                loaders: ['ng-annotate', 'babel?cacheDirectory=.cache'],
                include: PATHS.app
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ],
        noParse: ['ws']
    },
    externals: ['ws'],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.bundle.js',
            chunks: ['vendors']
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
            hot: true
        },
        plugins: [
            new NpmInstallPlugin({
                save: true
            }),
           new webpack.HotModuleReplacementPlugin(),
           new webpack.NoErrorsPlugin()
        ],
        devtool: 'eval-source-map'
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    });
}
