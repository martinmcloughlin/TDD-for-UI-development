casper.test.begin('testing.html contains stuff', 1, function (test) {
    casper.start('./site/compiled/index.html', function () {
        test.assertTitle('title');
    });

    casper.run(function() {
        test.done();
    });
});