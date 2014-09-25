var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    gp = require('gulp-load-plugins')(), // note camelCases hyphenated-names
    glob = require('glob');


// fire up webserver

gulp.task('webserver', function() {
    console.log('starting webserver');
    gp.connect.server({
        root: 'site/compiled',
        livereload: true
    });
});


// JAVASCRIPT COMPILE

// concat and uglify JS

gulp.task('compilejs', ['tojson'], function(){
    console.log('compile JS from JSON list');
    gulp.src('./site/assets/js/**.json')
        .pipe(gp.concatJson2js())
        .pipe(gp.uglify())
        .pipe(gp.rename({
            basename: "scripts", suffix: '-min'
        }))
        .pipe(gulp.dest('./site/compiled/js'));
});

// get JSON of JS files

gulp.task('tojson', function () {
    console.log('making JSON list of JS files for compilation');
    gulp.src('./site/assets/js/*.js')
        .pipe(gp.toJson({
            strip: /^.*\/(?=[^\/]*$)/,
            filename: './site/assets/js/allscripts.json'
        }));

});


// CASPER TESTS

// trigger the Casper tests

gulp.task('caspertest', ['sassy'], function () {
    console.log('running Casper tests');
    var tests = glob.sync('./site/test-scripts/casper/*.js');
    var casperChild = spawn('casperjs', ['test'].concat(tests));
    casperChild.stdout.on('data', function (data) {
        gp.util.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });
    casperChild.on('close', function (code) {
        var success = code === 0; // Will be 1 in the event of failure
        // Do something with success here
        console.log('casper tests all complete')
    });
});


// COMPILE CONTENT / DISPLAY

// compile SASS to CSS

gulp.task('sassy', ['templates'], function() {
    console.log('compile SASS to CSS');
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
    console.log('compile the jade to HTML');
    var YOUR_LOCALS = {};
    gulp.src('./site/jade/*.jade')
        .pipe(gp.jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gp.htmlPrettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./site/compiled'))
        .pipe(gp.connect.reload());
});


// watch for changes

gulp.task('watch', function() {
    console.log('change watcher starting');
    gulp.watch('./site/assets/sass/*.scss', ['caspertest']);
    gulp.watch('./site/jade/*.jade', ['caspertest']);
    gulp.watch('./site/assets/js/*.js', ['compilejs']);
    //gulp.watch('./site/compiled/*.html', ['caspertest']);
});


// fire all tasks

gulp.task('default', ['webserver', 'compilejs', 'caspertest', 'watch']);