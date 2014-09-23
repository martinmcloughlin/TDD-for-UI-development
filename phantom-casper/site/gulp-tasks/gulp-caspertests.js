var spawn = require('child_process').spawn,
    gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('testing', function () {
    var tests = ['./development/test-files/testone.js', './development/test-files/testtwo.js'];

    var casperChild = spawn('casperjs', ['test'].concat(tests));

    casperChild.stdout.on('data', function (data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });

    casperChild.on('close', function (code) {
        var success = code === 0; // Will be 1 in the event of failure

        // Do something with success here
    });
});