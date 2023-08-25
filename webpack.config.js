const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js')   // this is the path to the file that webpack will start the dependancy graph
    },
    output: {
        path: path.resolve(__dirname, 'dist'),          // sets the path to the file where to compile the dependancy bundles
        filename: '[name]-[contenthash].js',             // sets the name of the file to the one specified in the ENTRY
        clean: true,
        assetModuleFilename: '[name]-[contenthash][ext]',                            
        //   The [contenthash] substitution will add a unique hash based on the content of an asset. When the asset's content changes, [contenthash] will change as well.
    },
    devtool: 'source-map',       // ueful for debugging
    devServer: {                // setting up a local devServer
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,             // opens the browser automatically
        hot: true,              // hot reloading
        compress: true,
        historyApiFallback: true,
        liveReload: true,
        watchFiles: {
            paths: ['src/**/*.js', 'public/**/*', 'src/*.html'],
            options: {
              usePolling: false,
            },
          },
    },
    module: {                       //this is used for loaders
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // exclude node modules so that you don't mess with that
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {        // asset (image) loader                       
                test: /\.(png|svg|jpg|jpeg|gif)$/i, 
                type: 'asset/resource'
            }
        ],
    },
    plugins: [                      //this is used for plugins
        new HtmlWebpackPlugin({
            title: 'Awesome Movie Library',
            filename: 'index.html',
            template: 'src/template.html',  //path to the template HTML file
            }
        ),
        new CopyPlugin({
            patterns: [
              {
                from: "./src/styles/style.css",
                to: "styles/style.css",
              },
            ],
          }),
        new Dotenv({
            path: './.env'
        })
    ]
}
