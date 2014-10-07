var gulp = require('gulp'),
    chalk = require('chalk'),
    karma = require('karma'),
    spawn = require('child_process').spawn,
    gp = require('gulp-load-plugins')(), // note camelCases hyphenated-names
    glob = require('glob');


// A - fire all main tasks

gulp.task('default', ['webserver', 'compilejs', 'compilejasmine', 'caspertest', 'watch']);


// A1 - fire up webserver

gulp.task('webserver', function() {
    console.log(
        chalk.white.bgRed.bold(
            ' Server starting '
        )
    );
    gp.connect.server({
        root: 'site/compiled',
        livereload: true
    });
});


// A2 - JAVASCRIPT COMPILE

// A2.1 concat and uglify JS

gulp.task('compilejs', ['tojson'], function(){
    console.log(
        chalk.black.bgCyan.bold(
            ' concatenating JS files '
        )
    );
    gulp.src('./site/assets/js/**.json')
        .pipe(gp.concatJson2js())
        .pipe(gp.uglify())
        .pipe(gp.rename({
            basename: 'scripts', suffix: '-min'
        }))
        .pipe(gulp.dest('./site/compiled/js'))
        .pipe(gp.connect.reload());
});

// A2.2 concat jasmine scripts

gulp.task('compilejasmine', ['tojsonjasmine'], function(){
    console.log(
        chalk.black.bgCyan.bold(
            ' concatenating Jasmine tests '
        )
    );
    gulp.src('./site/test-scripts/jasmine/**.json')
        .pipe(gp.concatJson2js())
        //.pipe(gp.uglify())
        .pipe(gp.rename({
            basename: 'jasminetests'
        }))
        .pipe(gulp.dest('./site/compiled/js/jasmine-tests'))
        .pipe(gp.connect.reload());
});

// A2.1.1 get JSON of JS files

gulp.task('tojson', function () {
    console.log(
        chalk.black.bgCyan.bold(
            ' Compiling list of JS files '
        )
    );
    gulp.src('./site/assets/js/*.js')
        .pipe(gp.toJson({
            strip: /^.*\/(?=[^\/]*$)/,
            filename: './site/assets/js/allscripts.json'
        }));

});

// A2.2.1. make JSON of Jasmine Tests
gulp.task('tojsonjasmine', function () {
    console.log(
        chalk.black.bgCyan.bold(
            ' Compiling list of Jasmine tests '
        )
    );
    gulp.src('./site/test-scripts/jasmine/*.js')
        .pipe(gp.toJson({
            strip: /^.*\/(?=[^\/]*$)/,
            filename: './site/test-scripts/jasmine/alljasmine.json'
        }));

});

// A3 - CASPER TESTS

// trigger the Casper tests

gulp.task('caspertest',/* ['uncssit'], */ ['sassy'], function () {
    var tests = glob.sync('./site/test-scripts/casper/*.js');
    var casperChild = spawn('casperjs', ['test'].concat(tests));
    casperChild.stdout.on('data', function (data) {
        gp.util.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });
    casperChild.on('close', function (code) {
        var success = code === 0; // Will be 1 in the event of failure
        // Do something with success here
        if (success == false) {
            console.log(
                chalk.white.bgRed.bold(
                    ' Casper is scared of failure '
                )
            );

        } else {
            console.log(
                chalk.black.bgGreen.bold(
                    ' Casper is a friendly ghost '
                )
            );
        }
    });
});


// A4 - COMPILE CONTENT / DISPLAY

// A4.3 compile SASS to CSS

gulp.task('sassy', ['templates'], function() {
    console.log(
        chalk.black.bgCyan.bold(
            ' Converting Sass to CSS '
        )
    );
    gulp.src('./site/assets/sass/bootstrap.scss')
        .pipe(gp.sass())                        // convert sass to CSS
        .pipe(gp.rename({basename: 'main'}))      // rename it
        .pipe(gp.minifyCss())                   // minify it
        .pipe(gp.rename({suffix: '-min'}))
        .pipe(gulp.dest('./site/compiled/css')) // store it

});

// A4.1 strip the css back

gulp.task('uncssit', ['sassy'], function() {
    gulp.src('./site/compiled/css/main.css')
        .pipe(gp.uncss({
            html: glob.sync('./site/compiled/*.html'),
            ignore: [
                '.fade',
                '.fade.in',
                '.collapse',
                '.collapse.in',
                '.navbar-collapse',
                '.navbar-collapse.in',
                '.navbar-fixed-top',
                '.collapsing',
                '.alert-danger',
                '.visible-xs',
                '.open',
                /^.*\b(open)\b.*$/,
                '.noscript-warning'
            ]
        }))
        .pipe(gp.minifyCss())                   // minify it
        .pipe(gp.rename({suffix: '-min'}))
        .pipe(gulp.dest('./site/compiled/css'))
        .pipe(gp.connect.reload());
});

// A4.1 compile the jade to HTML

gulp.task('templates', function() {
    console.log(
        chalk.black.bgCyan.bold(
            ' Compiling Jade to HTML '
        )
    );
    var YOUR_LOCALS = {};
    gulp.src('./site/jade/*.jade')
        .pipe(gp.jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gp.htmlPrettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./site/compiled'))
        .pipe(gp.connect.reload());
});


// A5 - watch for changes

gulp.task('watch', function() {
    gulp.watch('./site/assets/sass/**/*.scss', ['caspertest']);
    gulp.watch('./site/jade/*.jade', ['caspertest']);
    gulp.watch('./site/jade/blocks/**/*.jade', ['templates']);
    gulp.watch('./site/jade/templates/**/*.jade', ['templates']);
    gulp.watch('./site/assets/js/*.js', ['compilejs']);
    gulp.watch('./site/test-scripts/jasmine/*.js', ['compilejasmine']);
});


// B - DEPLOY TASKS

// B1 - SFTP

gulp.task('uploader',['deployable'], function () {
    console.log(
        chalk.black.bgCyan.bold(
                ' Deployables transfer starting '
        )
    );
    return gulp.src('site/compiled/*')
        .pipe(gp.sftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234'
        }))
        .on('error', function(){
            console.log(
                chalk.white.bgRed.bold(
                        ' ERROR ON FILETRANSFER '
                )
            );
        })
        .on('success', function(){
            console.log(
                chalk.white.bgGreen.bold(
                        ' SUCCESS ON FILETRANSFER '
                )
            );
        });

});


// B1.1 - fire 'deployables' tasks

gulp.task('deployable', ['webserver2'], function(){
    console.log(
        chalk.black.bgWhite.bold(
                '          Deployables now ready        ' + '\n' +
                ' Files created are compiled for upload '
        )
    );
});

// B1.1.1 - fire up webserver

gulp.task('webserver2', ['stripjasmine'], function() {
    console.log(
        chalk.black.bgCyan.bold(
                ' Deployables server starting '
        )
    );
    gp.connect.server({
        root: 'site/compiled',
        livereload: true,
        port: 8086
    });
});

// B1.1.1.1 - Strip Jasmine

gulp.task('stripjasmine', function() {
    console.log(
        chalk.white.bgRed.bold(
            ' Stripping jasmine from deployables '
        )
    );
    var pagestrip = glob.sync('./site/compiled/**/*.html');
    gulp.src(pagestrip)
        .pipe(gp.htmlReplace({keepUnassigned: false}))
        .pipe(gulp.dest('./site/compiled/'));
});