const path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, 'src', subdir); // eslint-disable-line
}

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist', // eslint-disable-line
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            actions: srcPath('actions'),
            assets: srcPath('assets'),
            components: srcPath('components'),
            helpers: srcPath('helpers'),
            models: srcPath('models'),
            reducers: srcPath('reducers'),
            epics: srcPath('epics'),
            stylesheets: srcPath('stylesheets'),
            api: srcPath('api'),
        }
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
        ],
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    }
};