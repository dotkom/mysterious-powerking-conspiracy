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
            components: srcPath('components'),
            helpers: srcPath('helpers'),
            models: srcPath('models'),
            reducers: srcPath('reducers'),
            epics: srcPath('epics'),
        }
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};