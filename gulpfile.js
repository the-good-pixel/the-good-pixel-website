const gulp = require('gulp');
const sass = require('gulp-sass');
const dom = require('gulp-dom');
const concat = require("gulp-concat");

gulp.task('unify-core-sass', function () {
  return gulp.src('./public/unify-template-core-assets/include/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/unify-template-core-assets/css'));
});

gulp.task('page-sass', function () {
  return gulp.src('./public/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('default', gulp.parallel('unify-core-sass', 'page-sass'), function () {
  return;
});
