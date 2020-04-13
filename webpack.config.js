const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => ({
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        progress: true,
        hot: true,
        proxy: {
            '/send.php': {
                target: 'http://localhost/abroad/dist/send.php'
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts',
                        publicPath: '../fonts',
                        useRelativePath: true
                    }
                }
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                        publicPath: '../img',
                        useRelativePath: true
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            title: 'ABroad - mice services provider',
            favicon: 'src/favicon.ico'
        }),
        new CopyWebpackPlugin([
            {
                from: './src/img/',
                to: 'img'
            },
            {
                from: './src/send/',
                to: './'
            }
        ])
    ]
});