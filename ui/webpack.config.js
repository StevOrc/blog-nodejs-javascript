// Module nodeJS facilitant l'accès aux path
const path = require('path');
// Plugin HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, "src/index.js"),
        form: path.join(__dirname, "src/form/form.js"),
        topbar: path.join(__dirname, "src/assets/javascript/topbar.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from: './src/assets/images/*', to: 'assets/images', flatten: true},
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, "./src/index.html"),
            chunks: ['main', 'topbar']
        }),
        new HtmlWebpackPlugin({
            filename: "form.html",
            template: path.join(__dirname, "./src/form/form.html"),
            chunks: ['form', 'topbar']
        })
    ],
    stats: "minimal",
    devtool: "source-map",
    mode: "development",
    devServer: {
        open: false,
        contentBase: "./dist",
        inline: true,
        port: 4000
    }
}