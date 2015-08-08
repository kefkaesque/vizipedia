/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
  jsscripts: ['./db/*.js', './client/*.js','!./node_modules/**'],
  css: './public/assets/css/*.css',
  tests: './spec/*.js'
};
// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(paths.jsscripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(paths.jsscripts, ['jshint']);
});

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['public/assets/dest/*'], cb);
});

/*
gulp-sourcemaps
Write inline source maps
Inline source maps are embedded in the source file.
*/

gulp.task('minify-css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/dest/css'));
});

gulp.task('build-js', ['clean'], function() {
  return gulp.src(paths.jsscripts)
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/dest/javascript'));
});

gulp.task('default', ['watch', 'jshint', 'minify-css', 'build-js'], function() {
  process.exit(0);
});
