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

// fire up webserver
gulp.task('webserver', function() {
    gp.connect.server({
        root: 'site/compiled',
        livereload: true
    });
});

// compile SASS to CSS
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

// compile the jade to HTML
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

// get JSON of JS files
gulp.task('tojson', function () {
    console.log('making JSON');
    gulp.src('./site/assets/js/*.js')
        .pipe(gp.toJson({
            strip: /^.*\/(?=[^\/]*$)/,
            filename: './site/assets/js/allscripts.json'
        }));

});

// concat and uglify JS
gulp.task('compilejs', ['tojson'], function(){
   console.log('compile JS');
    gulp.src('./site/assets/js/**.json')
        .pipe(gp.concatJson2js())
        .pipe(gp.uglify())
        .pipe(gp.rename({
            basename: "scripts", suffix: '-min'
        }))
        .pipe(gulp.dest('./site/compiled/js'));
});


// watch for changes
gulp.task('watch', function() {
    gulp.watch('./site/assets/sass/*.scss', ['sassy']);
    gulp.watch('./site/jade/*.jade', ['templates']);
    gulp.watch('./site/assets/js/*.js', ['compilejs']);
    gulp.watch('./site/compiled/*.html', ['sassy']);
})


// fire all tasks
gulp.task('default', ['sassy', 'webserver', 'compilejs', 'watch']);