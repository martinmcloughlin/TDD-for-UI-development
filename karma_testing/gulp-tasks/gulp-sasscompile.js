var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");

gulp.task('sasscompiler', function () {
    console.log('sass task');
    gulp.src('./development/sass/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({suffix: '-min'}))
        .pipe(gulp.dest('./output/css'));
});