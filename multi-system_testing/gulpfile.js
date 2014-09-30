var gulp = require('gulp'),
    chalk = require('chalk'),
    karma = require('karma'),
    spawn = require('child_process').spawn,
    gp = require('gulp-load-plugins')(), // note camelCases hyphenated-names
    glob = require('glob');


// fire up webserver

gulp.task('webserver', function() {
    console.log(
        chalk.white.bgRed.bold(
            '                 ' + '\n' +
            ' Server starting ' + '\n' +
            '                 '
        )
    );
    gp.connect.server({
        root: 'site/compiled',
        livereload: true
    });
});


// JAVASCRIPT COMPILE

// 2. concat and uglify JS

gulp.task('compilejs', ['tojson'], function(){
    console.log(
        chalk.black.bgCyan.bold(
            '                        ' + '\n' +
            ' concatenating JS files ' + '\n' +
            '                        '
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

// 3 concat jasmine scripts

gulp.task('compilejasmine', ['tojsonjasmine'], function(){
    console.log(
        chalk.black.bgCyan.bold(
            '                             ' + '\n' +
            ' concatenating Jasmine tests ' + '\n' +
            '                             '
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

// 2.1. get JSON of JS files

gulp.task('tojson', function () {
    console.log(
        chalk.black.bgCyan.bold(
            '                            ' + '\n' +
            ' Compiling list of JS files ' + '\n' +
            '                            '
        )
    );
    gulp.src('./site/assets/js/*.js')
        .pipe(gp.toJson({
            strip: /^.*\/(?=[^\/]*$)/,
            filename: './site/assets/js/allscripts.json'
        }));

});

// 3.1. make JSON of Jasmine Tests
gulp.task('tojsonjasmine', function () {
    console.log(
        chalk.black.bgCyan.bold(
            '                                 ' + '\n' +
            ' Compiling list of Jasmine tests ' + '\n' +
            '                                 '
        )
    );
    gulp.src('./site/test-scripts/jasmine/*.js')
        .pipe(gp.toJson({
            strip: /^.*\/(?=[^\/]*$)/,
            filename: './site/test-scripts/jasmine/alljasmine.json'
        }));

});


// CASPER TESTS

// trigger the Casper tests

gulp.task('caspertest', ['sassy'], function () {
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
                    '                             ' + '\n' +
                    ' Casper is scared of failure ' + '\n' +
                    '                             '
                )
            );

        } else {
            console.log(
                chalk.black.bgGreen.bold(
                    '                            ' + '\n' +
                    ' Casper is a friendly ghost ' + '\n' +
                    '                            '
                )
            );
        }
    });
});


// COMPILE CONTENT / DISPLAY

// compile SASS to CSS

gulp.task('sassy', ['templates'], function() {
    console.log(
        chalk.black.bgCyan.bold(
            '                        ' + '\n' +
            ' Converting Sass to CSS ' + '\n' +
            '                        '
        )
    );
    gulp.src('./site/assets/sass/bootstrap.scss')
        .pipe(gp.sass())                        // convert sass to CSS
        .pipe(gp.uncss({
            html: glob.sync('./site/compiled/*.html')
        }))                                     // clean it up
        .pipe(gp.minifyCss())                   // minify it
        .pipe(gp.rename({basename: 'main', suffix: '-min'}))      // rename it
        .pipe(gulp.dest('./site/compiled/css')) // store it
        .pipe(gp.connect.reload());
});

// compile the jade to HTML

gulp.task('templates', function() {
    console.log(
        chalk.black.bgCyan.bold(
            '                        ' + '\n' +
            ' Compiling Jade to HTML ' + '\n' +
            '                        '
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


// watch for changes

gulp.task('watch', function() {
    gulp.watch('./site/assets/sass/**/*.scss', ['caspertest']);
    gulp.watch('./site/jade/*.jade', ['caspertest']);
    gulp.watch('./site/jade/blocks/**/*.jade', ['templates']);
    gulp.watch('./site/jade/templates/**/*.jade', ['templates']);
    gulp.watch('./site/assets/js/*.js', ['compilejs']);
    gulp.watch('./site/test-scripts/jasmine/*.js', ['compilejasmine']);
});


// fire all main tasks

gulp.task('default', ['webserver', 'compilejs', 'compilejasmine', 'caspertest', 'watch']);





// DEPLOY TASKS

// Strip Jasmine

gulp.task('stripjasmine', function() {
    console.log(
        chalk.white.bgRed.bold(
            '                                    ' + '\n' +
            ' Stripping jasmine from deployables ' + '\n' +
            '                                    '
        )
    );
    var pagestrip = glob.sync('./site/compiled/**/*.html');
    gulp.src(pagestrip)
        .pipe(gp.htmlReplace({keepUnassigned: false}))
        .pipe(gulp.dest('./site/compiled/'));
});

// fire up webserver

gulp.task('webserver2', ['stripjasmine'], function() {
    console.log(
        chalk.black.bgCyan.bold(
            '                             ' + '\n' +
            ' Deployables server starting ' + '\n' +
            '                             '
        )
    );
    gp.connect.server({
        root: 'site/compiled',
        livereload: true,
        port: 8086
    });
});

// SFTP

gulp.task('uploader',['deployable'], function () {
    console.log(
        chalk.black.bgCyan.bold(
            '                               ' + '\n' +
            ' Deployables transfer starting ' + '\n' +
            '                               '
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
                    '                       ' + '\n' +
                    ' ERROR ON FILETRANSFER ' + '\n' +
                    '                       '
                )
            );
        })
        .on('success', function(){
            console.log(
                chalk.white.bgGreen.bold(
                    '                         ' + '\n' +
                    ' SUCCESS ON FILETRANSFER ' + '\n' +
                    '                         '
                )
            );
        });

});

// fire 'deployables' tasks

gulp.task('deployable', ['webserver2'], function(){
    console.log(
        chalk.black.bgWhite.bold(
            '                                       ' + '\n' +
            '          Deployables now ready        ' + '\n' +
            ' Files created are compiled for upload ' + '\n' +
            '                                       '
        )
    );
});