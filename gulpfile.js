const gulp = require('gulp'),
  gutil = require('gulp-util'),
  babel = require('gulp-babel'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  ghPages = require('gulp-gh-pages');

const config = {
  jsPattern: 'src/js/**/*.js',
  sassPattern: 'src/sass/**/*.scss',
  production: !!gutil.env.production
};

gulp.task('default',  ['watch']);

gulp.task('jshint', function() {
  return gulp.src(config.jsPattern)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy-html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('copy-audio', function() {
  return gulp.src('src/audio/**')
    .pipe(gulp.dest('public/assets/audio'));
});

gulp.task('build-css', function() {
  return gulp.src(config.sassPattern)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(config.production ? cleanCSS({compatibility: 'ie8'}) : guitil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('build-js', function() {
  return gulp.src(config.jsPattern)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(config.production ? uglify() : gutil.noop()).on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch', function() {
  gulp.watch(config.jsPattern, ['jshint', 'build-js']);
  gulp.watch(config.sassPattern, ['build-css']);
  gulp.watch('src/*.html', ['copy-html']);
  gulp.watch('src/audio/*', ['copy-audio']);
});

gulp.task('deploy', ['copy-html', 'copy-audio', 'build-css', 'build-js'], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

console.log(`Production: ${gutil.env.production}`);
