/**
 * Created by martinmcloughlin on 22/09/2014.
 */
// test external JS files...

var stest = require('../js/test');

console.log(stest);

var stestVar = simpleTest.nd;

console.log(stestVar);

casper.test.begin('date checker', 1, function suite(test) {

    casper.start('output/test.html', function() {
        //test.assertTitle('title','title here');
        //test.assertEquals(simpleTest.nd, 23);

    });

    casper.run(function() {
        test.done();
    })

});