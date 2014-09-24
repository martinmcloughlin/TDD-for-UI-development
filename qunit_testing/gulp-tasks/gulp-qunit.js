var gulp = require('gulp'),
    qunit = require('node-qunit-phantomjs');

gulp.task('test', function() {
    qunit('./output/test.html');
});