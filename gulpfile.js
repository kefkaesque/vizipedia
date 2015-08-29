var gulp  = require('gulp'),
    gutil = require('gulp-util'),

    // for browserifying js
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),

    // for uglifying js
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),

    // for compiling CSS
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),

    // for checking js for errors
    jshint = require('gulp-jshint');

gulp.task('watchify', function() {
  var options = {
    entries: ['./client/app.js'],

    // for JSX transforms
    transform: [reactify],
    extensions: ['.js'],
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  };

  var handle = watchify(browserify(options));

  var bundle = function() {
    handle
    .bundle()
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    // .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
  };

  bundle();

  handle
  .on('update', function() {
    bundle();
  });
});

gulp.task('compress', function() {
  return gulp.src('./public/assets/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  gulp.src('./public/assets/css/**/*.css')
      .pipe(minifyCss())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./public/assets'));
});

gulp.task('default', ['css','watchify']);
