/**
 * Created by martinmcloughlin on 22/09/2014.
 */
// test external JS files...

casper.test.begin('date checker', 1, function suite(test) {

    //phantom.injectJs('./development/js/test.js');

    require('development/js/test.js');
    //mymodule.DateGetter();

    var nd = DateGetter.nd;

    //var d = new Date();
    //var nd = d.getDate();

    casper.start('output/test.html', function() {
        //test.assertTitle('title','title here');
        test.assertEquals(nd, 22);

    });

    casper.run(function() {
        test.done();
    })

});