var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ghPages = require('gulp-gh-pages');

gulp.task('default',  ['watch']);

gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy-html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public/'));
})

gulp.task('build-css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('build-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['jshint', 'build-js']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
  gulp.watch('src/*.html', ['copy-html']);
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});