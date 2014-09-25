var gulp = require('gulp'),
    /*connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    uncss = require('gulp-uncss'),
    server = require(gulp-server-livereload),
    webserver = require(gulp-webserver),
    */
    gp = require('gulp-load-plugins')(), // note camelCases hyphenated-names
    glob = require('glob');

/*gulp.task('webserver', function() {
    gp.connect.server({
        livereload: true
    });
});*/

gulp.task('webserver', function() {

    gp.connect.server({
        root: 'site/compiled',
        livereload: true
    });

});




gulp.task('sassy', ['templates'], function() {
    gulp.src('./site/assets/sass/main.scss')
        .pipe(gp.sass())                        // convert sass to CSS
        .pipe(gp.uncss({
            html: glob.sync('./site/compiled/*.html')
        }))                                     // clean it up
        .pipe(gp.minifyCss())                   // minify it
        .pipe(gp.rename({suffix: '-min'}))      // rename it
        .pipe(gulp.dest('./site/compiled/css')) // store it
        .pipe(gp.connect.reload());
});

gulp.task('templates', function() {
    var YOUR_LOCALS = {};

    gulp.src('./site/jade/*.jade')
        .pipe(gp.jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gp.htmlPrettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./site/compiled'))
        .pipe(gp.connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./site/assets/sass/*.scss', ['sassy']);
    gulp.watch('./site/jade/*.jade', ['templates']);
    gulp.watch('./site/compiled/*.html', ['sassy']);
})

gulp.task('default', ['sassy', 'webserver', 'watch']);