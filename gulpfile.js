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
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),

    // for testing
    mocha = require('gulp-mocha');


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
    //.pipe(buffer())
    //.pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('./public/assets/js'));
  };

  bundle();

  handle
  .on('update', function() {
    bundle();
  });
});

gulp.task('cssmin', function() {
  gulp.src('./public/assets/css/**/*.css')
      .pipe(minifyCss())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./public/assets'));
});

gulp.task('watch', function () {
   gulp.watch('./public/assets/css/**/*.css', ['cssmin']);
});


gulp.task('test', function () {
  return gulp.src('./tests/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['cssmin', 'watch', 'watchify']);
