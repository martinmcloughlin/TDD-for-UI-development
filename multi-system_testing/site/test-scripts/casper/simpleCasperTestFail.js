/**
 * Created by martinmcloughlin on 25/09/2014.
 */
casper.test.begin('testing other html contains stuff', 1, function (test) {
    casper.start('./site/compiled/pagetwo.html', function () {
        test.assertTitle('page 2');
    });

    casper.run(function () {
        test.done();
    });
});