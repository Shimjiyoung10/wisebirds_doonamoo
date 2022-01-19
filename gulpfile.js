// REQUIRE
//===================================
const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const del = require("del");
const sass = require('gulp-sass')(require('sass'));

// PATHS
//===================================
const files = {
    indexPath: "./src/*.html",
    cssPath: "./src/css/styles.scss",
    jsPath: "./src/js/index.js",
    imagesPath: "./src/images/**/*",
};

// Path: CSS Libraries
const libPath = ["./src/css/lib/owl.carousel.css", "./src/css/lib/owl.theme.default.css", "./src/css/lib/normalize.css"];

// Path: JS Vendor
const vendorPath = [
    "./src/js/vendor/jquery-3.6.0.min.js",
    "./src/js/vendor/owl.carousel.min.js",
    "./src/js/vendor/jquery.rwdImageMaps.min.js"
];

// TASKS
//===================================

function cleanTask() {
    return del(["./dist/**", "!./dist"]);
}

function indexTask() {
    return src(files.indexPath)
        .pipe(dest("./dist"))
        .pipe(browserSync.stream());
}

// Task: CSS (libraries)
function imageTask() {
    return src(files.imagesPath)
        .pipe(imagemin())
        .pipe(dest("./dist/images"));
}

// Task: CSS
function styleTask() {
    return src(files.cssPath)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(concat("styles.min.css"))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
}

// Task: JS
function scriptTask() {
    return src(files.jsPath)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("./dist/js"))
        .pipe(browserSync.stream());
}

// Task: JS (vendor)
function vendorTask() {
    return src(vendorPath)
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(dest("./dist/js"))
        .pipe(browserSync.stream());
}

// Task: CSS (libraries)
function libTask() {
    return src(libPath)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat("lib.min.css"))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
}

// Task: Watch
function watchTask() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    watch(vendorPath);
    watch(libPath);
    watch(
        [
            files.indexPath,
            files.cssPath,
            files.jsPath,
            files.imagesPath,
        ],
        parallel(
            indexTask,
            styleTask,
            scriptTask,
            imageTask,
            vendorTask,
            libTask,
        )
    );
}

// Exports
exports.default = series(
    cleanTask,
    parallel(
        indexTask,
        styleTask,
        scriptTask,
        imageTask,
        vendorTask,
        libTask,
    ),
    watchTask
);