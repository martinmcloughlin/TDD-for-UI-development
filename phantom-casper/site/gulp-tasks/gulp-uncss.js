/**
 * Created by martinmcloughlin on 22/09/2014.
 */
var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('cssclean', function() {
    return gulp.src('./output/css/base-min.css')
        .pipe(uncss({
            html: ['./output/*.html']
        }))
        .pipe(gulp.dest('./output/css/cln'));
});