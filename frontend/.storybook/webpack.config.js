var path = require('path');
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
        alias: {
            api: path.resolve(__dirname, 'api/'),
            components: path.resolve(__dirname, 'src/components'),
            domain: path.resolve(__dirname, 'src/domain'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            resources: path.resolve(__dirname, 'src/resources'),
            mocks: path.resolve(__dirname, 'src/mocks'),
        },
    },
};
