/**
 * Created by martinmcloughlin on 25/09/2014.
 */
casper.test.begin('testing  contains stuff', 1, function (test) {
    casper.start('./site/compiled/index.html', function () {
        test.assertTitle('title');
    });

    casper.run(function() {
        test.done();
    });
});