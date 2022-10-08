const path = require("path");

module.exports = {
    devtool: 'inline-source-map',
    entry: "./src/main.ts",
    mode: "development",
    watch: true,
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 3000,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};
