const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
//mix.browserSync("http://localhost:8000");
mix.webpackConfig({
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "vendor/laravel/spark/resources/js")
        ]
    }
    // devServer: {
    //     proxy: {
    //         "/api": "http://127.0.0.1:8000"
    //     }
    // }
});

// mix.js("resources/js/app.js", "public/js").sass(
//     "resources/sass/app.scss",
//     "public/css"
// );

mix.js("resources/js/app.js", "public/js").version();
mix.sass("resources/sass/app.scss", "public/css").version();
