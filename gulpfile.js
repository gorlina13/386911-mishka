"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var sourcemaps = require("gulp-sourcemaps");
var gulpIf = require("gulp-if");
var ghPages = require('gh-pages');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

function style() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
}

function clean() {
  return del("build");
}

function copy() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

function images() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

function webpImages() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

function sprite() {
  return gulp.src("source/img/for-s-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

function html() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

function js() {
  return pipeline(
    gulp.src("source/js/**/*.js"),
    gulpIf(isDevelopment, sourcemaps.init()),
    uglify(),
    rename(function (path) {
      path.basename += ".min";
    }),
    gulpIf(isDevelopment, sourcemaps.write()),
    gulp.dest("build/js")
  );
}

function serve(done) {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

function watch() {
  gulp.watch("source/less/**/*.less", style);
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/js/**/*.js", gulp.series(js, reload));
}

function deploy(done) {
  ghPages.publish("build", done);
}

exports.style = style;
exports.clean = clean;
exports.copy = copy;
exports.images = images;
exports.webpImages = webpImages;
exports.sprite = sprite;
exports.html = html;
exports.js = js;
exports.default = gulp.series(
  clean,
  gulp.parallel(
    copy,
    style
  ),
  sprite,
  images,
  webpImages,
  gulp.parallel(
    html,
    js
  )
);
exports.dev = gulp.series(serve, watch);
exports.deploy = deploy;
