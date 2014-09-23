var gulp = require('gulp');
var jade = require('gulp-jade');
var prettify = require('gulp-html-prettify');

gulp.task('templates', function() {
    var YOUR_LOCALS = {};

    gulp.src('./development/jade/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./output'))
});