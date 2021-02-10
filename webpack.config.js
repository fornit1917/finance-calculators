const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    entry: {
        appCreditCalculator: "./src/scripts/app-credit-calculator.tsx",
        appInvestCalculator: "./src/scripts/app-invest-calculator.tsx",
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        https: false,
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "credit-calculator.html",
            chunks: ["appCreditCalculator"],
            inject: "body",
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "invest-calculator.html",
            chunks: ["appInvestCalculator"],
            inject: "body",
        }),
    ],
};
