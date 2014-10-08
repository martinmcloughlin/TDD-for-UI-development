/**
 * Created by martinmcloughlin on 25/09/2014.
 */

casper.test.begin('testing  contains stuff', 5, function (test) {
    casper.start('./site/compiled/index.html', function () {
        test.assertTitle('title');
        test.assertExists('.breadcrumb');
        test.assertExists('.navbar');
        test.assertExists('.navbar-toggle');
    });

    casper.then(function () {
        this.click('.dropdown a');
        casper.log('dropdown clicked to show');
        test.assertVisible('.dropdown-menu');
    });


    casper.run(function () {
        test.done();
    });
});