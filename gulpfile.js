'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sassLint = require('gulp-sass-lint');

var PATHS = {
  styles: "css/**/*.scss",
  stylesOut: "css/"
}

gulp.task('lint', function() {
  return gulp
    .src(PATHS.styles)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('styles', function() {
  return gulp.src(PATHS.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PATHS.stylesOut));
});

gulp.task('build', ['lint', 'styles']);

gulp.task('watch', ['build'], function() {
  gulp.watch(PATHS.styles, ['build']);
});

gulp.task('default', ['watch']);
