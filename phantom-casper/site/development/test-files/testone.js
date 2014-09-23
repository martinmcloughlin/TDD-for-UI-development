/**
 * Created by martinmcloughlin on 22/09/2014.
 */

/*casper.test.begin("Hello, Test!", 1, function(test) {
    test.assert(true);
    test.done();
});*/


/**
 * homepage.js - Homepage tests.
 */



casper.test.begin('Tests compiled page structure', 2, function suite(test) {


    casper.start('output/test.html', function() {
        //test.assertTitle('title','title here');
        test.assertExists('div#wrapper', 'wrapper div found');
        test.assertSelectorHasText('h1', 'Welcome to Jade');
        //this.captureSelector("form-screenshot.jpg", "div#wrapper");

    });

    casper.run(function() {
        test.done();
    });
});
