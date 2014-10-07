/**
 * Created by martinmcloughlin on 25/09/2014.
 */
casper.test.begin('testing  contains stuff', 4, function (test) {
    casper.start('./site/compiled/index.html', function () {
        test.assertTitle('title');
        test.assertExists('.breadcrumb');
        test.assertExists('.navbar');
        test.assertExists('.navbar-toggle');
    });

    casper.run(function() {
        test.done();
    });
});