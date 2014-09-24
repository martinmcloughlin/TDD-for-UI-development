var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var uncss = require('gulp-uncss');
var glob = require('glob');

gulp.task('sasscompiler', ['templates'], function () {

    gulp.src('./development/sass/*.scss')
        .pipe(sass())                                   // convert sass to css
        .pipe(uncss({
            html: glob.sync('./output/*.html')
        }))                                             // clean it up
        .pipe(minifyCSS())                              // minify it
        .pipe(rename({suffix: '-min'}))                 // rename it
        .pipe(gulp.dest('./output/css'));               // store it
});